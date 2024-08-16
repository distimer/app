import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import React from "react";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import AwaitLock from "await-lock";
import axios, { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

import { getUser } from "api/endpoints/user/user";
import { AXIOS_INSTANCE } from "api/mutator/axios";

import { errors, existsError } from "utils/errors";

const lock = new AwaitLock();

interface AuthProps {
  accessToken: string;
  refreshToken: string;
  setTokens: (AccessToken: string, RefreshToken: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = React.createContext<AuthProps>({} as AuthProps);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = React.useState<string>("");
  const [refreshToken, setRefreshToken] = React.useState<string>("");
  const [loaded, setLoaded] = React.useState(false);

  const getAccessToken = React.useCallback(async () => {
    try {
      const savedAccessToken = await AsyncStorage.getItem("accessToken");
      return savedAccessToken || "";
    } catch (error) {
      console.error("토큰 불러오기 오류:", error);
      return "";
    }
  }, []);

  const getRefreshToken = React.useCallback(async () => {
    try {
      const savedRefreshToken = await AsyncStorage.getItem("refreshToken");
      return savedRefreshToken || "";
    } catch (error) {
      console.error("토큰 불러오기 오류:", error);
      return "";
    }
  }, []);

  const setTokens = React.useCallback(
    async (AccessToken: string, RefreshToken: string) => {
      try {
        await AsyncStorage.setItem("accessToken", AccessToken);
        await AsyncStorage.setItem("refreshToken", RefreshToken);
        setAccessToken(AccessToken);
        setRefreshToken(RefreshToken);
      } catch (error) {
        console.error("토큰 저장 오류:", error);
      }
    },
    [],
  );

  React.useEffect(() => {
    const loadTokens = async () => {
      try {
        const [savedAccessToken, savedRefreshToken] = await Promise.all([
          getAccessToken(),
          getRefreshToken(),
        ]);
        await setTokens(savedAccessToken, savedRefreshToken);
      } catch (error) {
        console.error("초기 토큰 불러오기 오류:", error);
      } finally {
        setLoaded(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadTokens();
  }, [getAccessToken, getRefreshToken, setTokens]);

  const resetTokens = React.useCallback(async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setAccessToken("");
      setRefreshToken("");
    } catch (error) {
      console.error("토큰 삭제 오류:", error);
    }
  }, []);

  const logout = async () => {
    try {
      await axios.delete("https://api.distimer.com/auth/logout", {
        data: { refresh_token: await getRefreshToken() },
      });
    } catch (err) {
      console.error(err);
    } finally {
      await resetTokens();
      queryClient.clear();
    }
  };

  const refresh = React.useCallback(async () => {
    try {
      const res = await axios.post(
        "https://api.distimer.com/auth/refresh",
        {
          refresh_token: await getRefreshToken(),
        },
        {
          timeout: 5000,
        },
      );

      if (!res.data) {
        throw new Error(JSON.stringify(res));
      }

      const data = res.data as {
        access_token: string;
        refresh_token: string;
      };

      await setTokens(data.access_token, data.refresh_token);
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          await resetTokens();
        }
        console.error(
          `Refresh Failed ${JSON.stringify(err.response?.data, null, 2)}`,
        );
      } else {
        console.error(`Refresh Failed`, err);
      }
    }
  }, [getRefreshToken, setTokens, resetTokens]);

  React.useEffect(() => {
    const requestHandler = async (config: InternalAxiosRequestConfig) => {
      console.log(
        `Interceptor --> [${config.method?.toUpperCase()}] ${config.url}`,
      );

      if (!accessToken) {
        return config;
      }

      await lock.acquireAsync();
      const now = moment().unix();
      const expired = jwtDecode<{
        exp: number;
      }>(accessToken).exp;

      if (now + 10 > expired) {
        await refresh();
      }

      lock.release();

      if (!(await getAccessToken())) {
        throw new Error("인증되지 않았습니다.");
      }

      return {
        ...config,
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
          ...config?.headers,
        },
      } as InternalAxiosRequestConfig;
    };

    const requestErrorHandler = async (error: AxiosError) => {
      console.error(
        `Interceptor --> [${error.config?.method?.toUpperCase()}] ${error.config?.url} ${error.code}`,
      );

      return Promise.reject(error);
    };

    const requestInterceptor = AXIOS_INSTANCE.interceptors.request.use(
      (config) => requestHandler(config),
      (error) => {
        if (isAxiosError(error)) {
          return requestErrorHandler(error);
        }
      },
    );

    const responseHandler = (response: AxiosResponse) => {
      console.log(
        `Interceptor <-- [${response.config.method?.toUpperCase()}] ${response.config.url} ${response.status} ${JSON.stringify(response.data, null, 2)}`,
      );

      return response;
    };

    const responseErrorHandler = async (error: AxiosError) => {
      if (error.response?.status) {
        console.error(
          `Interceptor <-- [${error.config?.method?.toUpperCase()}] ${error.config?.url} ${error.response.status} ${JSON.stringify(
            error.response.data,
            null,
            2,
          )}`,
        );
      } else {
        console.error(
          `Interceptor <-- [${error.config?.method?.toUpperCase()}] ${error.config?.url} ${error.code}`,
        );
      }

      if (error.code === "ERR_CANCELED") {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        await resetTokens();
        return Promise.reject(error);
      }

      const message = (error.response?.data as { error: string })?.error;
      if (existsError(message)) {
        Toast.show({
          type: "error",
          props: { message: errors[message] },
        });
      }

      return Promise.reject(error);
    };

    const responseInterceptor = AXIOS_INSTANCE.interceptors.response.use(
      (response) => responseHandler(response),
      (error) => {
        if (isAxiosError(error)) {
          return responseErrorHandler(error);
        }
      },
    );

    return () => {
      AXIOS_INSTANCE.interceptors.request.eject(requestInterceptor);
      AXIOS_INSTANCE.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken, getAccessToken, refresh, resetTokens]);

  React.useEffect(() => {
    const updateUserInfo = async () => {
      const userInfo = await getUser();
      console.log(userInfo);
    };

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      updateUserInfo();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens,
        refresh,
        logout,
      }}>
      {loaded ? children : null}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

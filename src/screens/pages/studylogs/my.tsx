import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";
import { FlatList } from "react-native-gesture-handler";

import { useRoute } from "@react-navigation/native";
import moment from "moment";

import { useMainNavigation } from "navigations";

import { useGetCategory } from "api/endpoints/category/category";
import { useGetStudylogDate } from "api/endpoints/study-log/study-log";

import { useTheme } from "contexts/theme";

import { DateBar, Empty, VStack } from "components/common";
import { Studylog } from "components/features/statistics";
import { Container, Wrapper } from "components/layout";

import { DatePicker } from "screens/sheets";

const MyStudylogs = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "MyStudylogs">>();
  const navigation = useMainNavigation();

  const { styles } = useTheme();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const [targetDate, setTargetDate] = React.useState(
    moment().format("YYYY-MM-DD"),
  );
  const [pickerDate, setPickerDate] = React.useState(new Date());

  React.useEffect(() => {
    if (targetDate === moment().format("YYYY-MM-DD")) return;
    setPickerDate(moment(targetDate).toDate());
  }, [targetDate]);
  React.useEffect(() => {
    if (pickerDate === new Date()) return;
    setTargetDate(moment(pickerDate).format("YYYY-MM-DD"));
  }, [pickerDate]);

  const {
    data: studylogs,
    refetch: refetchStudylogs,
    isRefetching: isStudylogsRefetching,
    isLoadingError,
  } = useGetStudylogDate(
    {
      date: targetDate,
    },
    {
      query: {
        retry: false,
      },
    },
  );
  const {
    data: categories,
    refetch: refetchCategories,
    isRefetching: isCategoriesRefetching,
  } = useGetCategory();

  const data = React.useMemo(() => {
    if (isLoadingError) return [];
    if (studylogs === undefined || categories === undefined) return undefined;
    const result = [];
    for (const studylog of studylogs) {
      let shared;
      if (params?.group) {
        if (studylog.groups_to_share.includes(params.group)) {
          shared = true;
        } else {
          shared = false;
        }
      }
      const category = categories.find((category) =>
        category.subjects.some((subject) => subject.id === studylog.subject_id),
      );
      const subject = categories
        .map((category) => category.subjects)
        .flat()
        .find((subject) => subject.id === studylog.subject_id);
      if (category === undefined || subject === undefined) {
        continue;
      }
      result.push({
        id: studylog.id,
        category: category.name,
        subject: subject.name,
        color: subject.color,
        content: studylog.content,
        start: studylog.start_at,
        end: studylog.end_at,
        shared,
      });
    }

    result.sort((a, b) => {
      return moment(a.start).diff(moment(b.start));
    });

    return result;
  }, [isLoadingError, studylogs, categories, params]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isStudylogsRefetching || isCategoriesRefetching) return;
    setRefreshing(isStudylogsRefetching || isCategoriesRefetching);
  }, [isStudylogsRefetching, isCategoriesRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchStudylogs();
    await refetchCategories();
  };

  return (
    <Container
      title={params?.group ? "내가 공유한 학습기록" : "나의 학습기록"}
      backable
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}
      fixedComponent={
        <DateBar
          title={moment(targetDate).format("YYYY년 M월 D일 (ddd)")}
          onLeft={() => {
            setTargetDate(
              moment(targetDate).subtract(1, "day").format("YYYY-MM-DD"),
            );
          }}
          onCenter={() => {
            sheetRef.current?.present();
          }}
          onRight={() => {
            setTargetDate(
              moment(targetDate).add(1, "day").format("YYYY-MM-DD"),
            );
          }}
        />
      }>
      <Wrapper
        data={data}
        empty={
          <VStack fill justify="center">
            <Empty>학습기록이 없어요.</Empty>
          </VStack>
        }>
        {(data) => (
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={[styles.gap.all[800]]}
            renderItem={({ item }) => (
              <Studylog
                category={item.category}
                subject={item.subject}
                color={item.color}
                content={item.content}
                target={targetDate}
                start={item.start}
                end={item.end}
                shared={item.shared}
                onPress={() => {
                  navigation.navigate("PagesStack", {
                    screen: "EditStudylog",
                    params: { id: item.id, date: targetDate },
                  });
                }}
              />
            )}
          />
        )}
      </Wrapper>
      <DatePicker
        sheetRef={sheetRef}
        onlyDate
        date={pickerDate}
        setDate={setPickerDate}
      />
    </Container>
  );
};

export { MyStudylogs };

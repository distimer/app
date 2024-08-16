/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Distimer Swagger API
 * OpenAPI spec version: 1.0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  GroupctrlAffiliationDTO,
  GroupctrlCreateGroupReq,
  GroupctrlGroupDTO,
  GroupctrlJoinReq,
  GroupctrlModifyGroupReq,
  GroupctrlModifyMemberReq,
  GroupctrlModifyNicknameReq
} from '../../schemas'
import { customInstance } from '../../mutator/axios';
import type { ErrorType, BodyType } from '../../mutator/axios';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * @summary Get All Joined Groups
 */
export const getGroup = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<GroupctrlGroupDTO[]>(
      {url: `/group`, method: 'GET', signal
    },
      options);
    }
  

export const getGetGroupQueryKey = () => {
    return [`/group`] as const;
    }

    
export const getGetGroupInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getGroup>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetGroupQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getGroup>>> = ({ signal }) => getGroup(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData> & { queryKey: QueryKey }
}

export type GetGroupInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getGroup>>>
export type GetGroupInfiniteQueryError = ErrorType<unknown>


export function useGetGroupInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroup>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroup>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroupInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroup>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroup>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroupInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroup>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Get All Joined Groups
 */

export function useGetGroupInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroup>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetGroupInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetGroupQueryOptions = <TData = Awaited<ReturnType<typeof getGroup>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetGroupQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getGroup>>> = ({ signal }) => getGroup(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData> & { queryKey: QueryKey }
}

export type GetGroupQueryResult = NonNullable<Awaited<ReturnType<typeof getGroup>>>
export type GetGroupQueryError = ErrorType<unknown>


export function useGetGroup<TData = Awaited<ReturnType<typeof getGroup>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroup>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroup<TData = Awaited<ReturnType<typeof getGroup>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroup>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroup<TData = Awaited<ReturnType<typeof getGroup>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Get All Joined Groups
 */

export function useGetGroup<TData = Awaited<ReturnType<typeof getGroup>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroup>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetGroupQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Create Group
 */
export const postGroup = (
    groupctrlCreateGroupReq: BodyType<GroupctrlCreateGroupReq>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<GroupctrlGroupDTO>(
      {url: `/group`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: groupctrlCreateGroupReq
    },
      options);
    }
  


export const getPostGroupMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postGroup>>, TError,{data: BodyType<GroupctrlCreateGroupReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postGroup>>, TError,{data: BodyType<GroupctrlCreateGroupReq>}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postGroup>>, {data: BodyType<GroupctrlCreateGroupReq>}> = (props) => {
          const {data} = props ?? {};

          return  postGroup(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostGroupMutationResult = NonNullable<Awaited<ReturnType<typeof postGroup>>>
    export type PostGroupMutationBody = BodyType<GroupctrlCreateGroupReq>
    export type PostGroupMutationError = ErrorType<unknown>

    /**
 * @summary Create Group
 */
export const usePostGroup = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postGroup>>, TError,{data: BodyType<GroupctrlCreateGroupReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof postGroup>>,
        TError,
        {data: BodyType<GroupctrlCreateGroupReq>},
        TContext
      > => {

      const mutationOptions = getPostGroupMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Join Group with Invite Code
 */
export const postGroupJoin = (
    groupctrlJoinReq: BodyType<GroupctrlJoinReq>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<GroupctrlGroupDTO>(
      {url: `/group/join`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: groupctrlJoinReq
    },
      options);
    }
  


export const getPostGroupJoinMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postGroupJoin>>, TError,{data: BodyType<GroupctrlJoinReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postGroupJoin>>, TError,{data: BodyType<GroupctrlJoinReq>}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postGroupJoin>>, {data: BodyType<GroupctrlJoinReq>}> = (props) => {
          const {data} = props ?? {};

          return  postGroupJoin(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostGroupJoinMutationResult = NonNullable<Awaited<ReturnType<typeof postGroupJoin>>>
    export type PostGroupJoinMutationBody = BodyType<GroupctrlJoinReq>
    export type PostGroupJoinMutationError = ErrorType<unknown>

    /**
 * @summary Join Group with Invite Code
 */
export const usePostGroupJoin = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postGroupJoin>>, TError,{data: BodyType<GroupctrlJoinReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof postGroupJoin>>,
        TError,
        {data: BodyType<GroupctrlJoinReq>},
        TContext
      > => {

      const mutationOptions = getPostGroupJoinMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Modify Member
 */
export const putGroupMemberGroupIDMemberID = (
    groupID: string,
    memberID: string,
    groupctrlModifyMemberReq: BodyType<GroupctrlModifyMemberReq>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<GroupctrlAffiliationDTO>(
      {url: `/group/member/${groupID}/${memberID}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: groupctrlModifyMemberReq
    },
      options);
    }
  


export const getPutGroupMemberGroupIDMemberIDMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putGroupMemberGroupIDMemberID>>, TError,{groupID: string;memberID: string;data: BodyType<GroupctrlModifyMemberReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof putGroupMemberGroupIDMemberID>>, TError,{groupID: string;memberID: string;data: BodyType<GroupctrlModifyMemberReq>}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putGroupMemberGroupIDMemberID>>, {groupID: string;memberID: string;data: BodyType<GroupctrlModifyMemberReq>}> = (props) => {
          const {groupID,memberID,data} = props ?? {};

          return  putGroupMemberGroupIDMemberID(groupID,memberID,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutGroupMemberGroupIDMemberIDMutationResult = NonNullable<Awaited<ReturnType<typeof putGroupMemberGroupIDMemberID>>>
    export type PutGroupMemberGroupIDMemberIDMutationBody = BodyType<GroupctrlModifyMemberReq>
    export type PutGroupMemberGroupIDMemberIDMutationError = ErrorType<void>

    /**
 * @summary Modify Member
 */
export const usePutGroupMemberGroupIDMemberID = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putGroupMemberGroupIDMemberID>>, TError,{groupID: string;memberID: string;data: BodyType<GroupctrlModifyMemberReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof putGroupMemberGroupIDMemberID>>,
        TError,
        {groupID: string;memberID: string;data: BodyType<GroupctrlModifyMemberReq>},
        TContext
      > => {

      const mutationOptions = getPutGroupMemberGroupIDMemberIDMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Expel Member
 */
export const deleteGroupMemberGroupIDMemberID = (
    groupID: string,
    memberID: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/group/member/${groupID}/${memberID}`, method: 'DELETE'
    },
      options);
    }
  


export const getDeleteGroupMemberGroupIDMemberIDMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteGroupMemberGroupIDMemberID>>, TError,{groupID: string;memberID: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteGroupMemberGroupIDMemberID>>, TError,{groupID: string;memberID: string}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteGroupMemberGroupIDMemberID>>, {groupID: string;memberID: string}> = (props) => {
          const {groupID,memberID} = props ?? {};

          return  deleteGroupMemberGroupIDMemberID(groupID,memberID,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteGroupMemberGroupIDMemberIDMutationResult = NonNullable<Awaited<ReturnType<typeof deleteGroupMemberGroupIDMemberID>>>
    
    export type DeleteGroupMemberGroupIDMemberIDMutationError = ErrorType<void>

    /**
 * @summary Expel Member
 */
export const useDeleteGroupMemberGroupIDMemberID = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteGroupMemberGroupIDMemberID>>, TError,{groupID: string;memberID: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteGroupMemberGroupIDMemberID>>,
        TError,
        {groupID: string;memberID: string},
        TContext
      > => {

      const mutationOptions = getDeleteGroupMemberGroupIDMemberIDMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Get All Group Members
 */
export const getGroupMemberId = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<GroupctrlAffiliationDTO[]>(
      {url: `/group/member/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getGetGroupMemberIdQueryKey = (id: string,) => {
    return [`/group/member/${id}`] as const;
    }

    
export const getGetGroupMemberIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getGroupMemberId>>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetGroupMemberIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getGroupMemberId>>> = ({ signal }) => getGroupMemberId(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData> & { queryKey: QueryKey }
}

export type GetGroupMemberIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getGroupMemberId>>>
export type GetGroupMemberIdInfiniteQueryError = ErrorType<unknown>


export function useGetGroupMemberIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroupMemberId>>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroupMemberId>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroupMemberIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroupMemberId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroupMemberId>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroupMemberIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroupMemberId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Get All Group Members
 */

export function useGetGroupMemberIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getGroupMemberId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetGroupMemberIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetGroupMemberIdQueryOptions = <TData = Awaited<ReturnType<typeof getGroupMemberId>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetGroupMemberIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getGroupMemberId>>> = ({ signal }) => getGroupMemberId(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData> & { queryKey: QueryKey }
}

export type GetGroupMemberIdQueryResult = NonNullable<Awaited<ReturnType<typeof getGroupMemberId>>>
export type GetGroupMemberIdQueryError = ErrorType<unknown>


export function useGetGroupMemberId<TData = Awaited<ReturnType<typeof getGroupMemberId>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroupMemberId>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroupMemberId<TData = Awaited<ReturnType<typeof getGroupMemberId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroupMemberId>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetGroupMemberId<TData = Awaited<ReturnType<typeof getGroupMemberId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
/**
 * @summary Get All Group Members
 */

export function useGetGroupMemberId<TData = Awaited<ReturnType<typeof getGroupMemberId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getGroupMemberId>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetGroupMemberIdQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Modify Nickname
 */
export const patchGroupNicknameId = (
    id: string,
    groupctrlModifyNicknameReq: BodyType<GroupctrlModifyNicknameReq>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<GroupctrlAffiliationDTO>(
      {url: `/group/nickname/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: groupctrlModifyNicknameReq
    },
      options);
    }
  


export const getPatchGroupNicknameIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchGroupNicknameId>>, TError,{id: string;data: BodyType<GroupctrlModifyNicknameReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof patchGroupNicknameId>>, TError,{id: string;data: BodyType<GroupctrlModifyNicknameReq>}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchGroupNicknameId>>, {id: string;data: BodyType<GroupctrlModifyNicknameReq>}> = (props) => {
          const {id,data} = props ?? {};

          return  patchGroupNicknameId(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PatchGroupNicknameIdMutationResult = NonNullable<Awaited<ReturnType<typeof patchGroupNicknameId>>>
    export type PatchGroupNicknameIdMutationBody = BodyType<GroupctrlModifyNicknameReq>
    export type PatchGroupNicknameIdMutationError = ErrorType<void>

    /**
 * @summary Modify Nickname
 */
export const usePatchGroupNicknameId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchGroupNicknameId>>, TError,{id: string;data: BodyType<GroupctrlModifyNicknameReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof patchGroupNicknameId>>,
        TError,
        {id: string;data: BodyType<GroupctrlModifyNicknameReq>},
        TContext
      > => {

      const mutationOptions = getPatchGroupNicknameIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Quit Group
 */
export const deleteGroupQuitId = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/group/quit/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getDeleteGroupQuitIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteGroupQuitId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteGroupQuitId>>, TError,{id: string}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteGroupQuitId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteGroupQuitId(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteGroupQuitIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteGroupQuitId>>>
    
    export type DeleteGroupQuitIdMutationError = ErrorType<void>

    /**
 * @summary Quit Group
 */
export const useDeleteGroupQuitId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteGroupQuitId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteGroupQuitId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteGroupQuitIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Modify Group Info
 */
export const putGroupId = (
    id: string,
    groupctrlModifyGroupReq: BodyType<GroupctrlModifyGroupReq>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<GroupctrlGroupDTO>(
      {url: `/group/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: groupctrlModifyGroupReq
    },
      options);
    }
  


export const getPutGroupIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putGroupId>>, TError,{id: string;data: BodyType<GroupctrlModifyGroupReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof putGroupId>>, TError,{id: string;data: BodyType<GroupctrlModifyGroupReq>}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putGroupId>>, {id: string;data: BodyType<GroupctrlModifyGroupReq>}> = (props) => {
          const {id,data} = props ?? {};

          return  putGroupId(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutGroupIdMutationResult = NonNullable<Awaited<ReturnType<typeof putGroupId>>>
    export type PutGroupIdMutationBody = BodyType<GroupctrlModifyGroupReq>
    export type PutGroupIdMutationError = ErrorType<unknown>

    /**
 * @summary Modify Group Info
 */
export const usePutGroupId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putGroupId>>, TError,{id: string;data: BodyType<GroupctrlModifyGroupReq>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof putGroupId>>,
        TError,
        {id: string;data: BodyType<GroupctrlModifyGroupReq>},
        TContext
      > => {

      const mutationOptions = getPutGroupIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Delete Group
 */
export const deleteGroupId = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/group/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getDeleteGroupIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteGroupId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteGroupId>>, TError,{id: string}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteGroupId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteGroupId(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteGroupIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteGroupId>>>
    
    export type DeleteGroupIdMutationError = ErrorType<unknown>

    /**
 * @summary Delete Group
 */
export const useDeleteGroupId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteGroupId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteGroupId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteGroupIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
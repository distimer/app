import React from "react";

import moment from "moment";

import { useGetGroupMemberId } from "api/endpoints/group/group";
import {
  useGetStudylogGroupStatisticsTermGroupIdMemberId,
  useGetStudylogGroupTermGroupIdMemberId,
} from "api/endpoints/study-log/study-log";

import { type SharedStatisticsProps, ViewStatistics } from "./shared";

interface OtherStatisticsProps extends SharedStatisticsProps {
  group: string;
  user: string;
}
const OtherStatistics: React.FC<OtherStatisticsProps> = ({
  group,
  user,
  startDate,
  endDate,
  compareStartDate,
  compareEndDate,
  ...props
}) => {
  const {
    data: members,
    refetch: refetchMembers,
    isRefetching: isRefetchingMembers,
  } = useGetGroupMemberId(group);
  const {
    data: statistics,
    refetch: refetchStatistics,
    isRefetching: isStatisticsRefetching,
    isLoadingError: isStatisticsLoadingError,
  } = useGetStudylogGroupStatisticsTermGroupIdMemberId(
    group,
    user,
    {
      start_date: compareStartDate,
      end_date: compareEndDate,
    },
    {
      query: {
        retry: false,
      },
    },
  );
  const {
    data: studylogs,
    refetch: refetchStudylogs,
    isRefetching: isStudylogsRefetching,
    isLoadingError: isStudylogsLoadingError,
  } = useGetStudylogGroupTermGroupIdMemberId(
    group,
    user,
    {
      start_date: startDate,
      end_date: endDate,
    },
    {
      query: {
        retry: false,
      },
    },
  );

  const nickname = React.useMemo(() => {
    if (!members) return undefined;
    const member = members.find((member) => member.user_id === user);
    return member?.nickname;
  }, [members, user]);

  const data = React.useMemo(() => {
    if (isStatisticsLoadingError || isStudylogsLoadingError) {
      return null;
    }
    if (
      nickname === undefined ||
      statistics === undefined ||
      studylogs === undefined
    ) {
      return undefined;
    }
    if (statistics.length === 0 || studylogs.length === 0) {
      return null;
    }

    const statisticsData = [];
    for (const statistic of statistics) {
      const logs = [];
      for (const log of statistic.log) {
        logs.push({
          category_id: log.category_id,
          category_name: log.category_name,
          subject_id: log.subject.id,
          subject_name: log.subject.name,
          subject_color: log.subject.color,
          study_time: log.study_time,
        });
      }

      statisticsData.push({
        date: statistic.date,
        log: logs,
      });
    }

    const targetStatistics = statisticsData.filter((statistic) =>
      moment(statistic.date).isBetween(startDate, endDate, "days", "[]"),
    );

    const studylogsData = [];
    for (const studylog of studylogs) {
      studylogsData.push({
        category_id: studylog.category_id,
        category_name: studylog.category_name,
        subject_id: studylog.subject.id,
        subject_name: studylog.subject.name,
        subject_color: studylog.subject.color,
        start_at: studylog.start_at,
        end_at: studylog.end_at,
      });
    }

    return {
      statistics: targetStatistics,
      studylogs: studylogsData,
      compareStatistics: statisticsData,
    };
  }, [
    isStatisticsLoadingError,
    isStudylogsLoadingError,
    nickname,
    statistics,
    studylogs,
    startDate,
    endDate,
  ]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetchingMembers || isStatisticsRefetching || isStudylogsRefetching)
      return;
    setRefreshing(false);
  }, [isRefetchingMembers, isStatisticsRefetching, isStudylogsRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMembers();
    await refetchStatistics();
    await refetchStudylogs();
  };

  return (
    <ViewStatistics
      {...props}
      nickname={nickname || ""}
      startDate={startDate}
      endDate={endDate}
      compareStartDate={compareStartDate}
      compareEndDate={compareEndDate}
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export { OtherStatistics };

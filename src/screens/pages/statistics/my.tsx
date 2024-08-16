import type { SharedStatisticsProps } from "./shared";

import React from "react";

import moment from "moment";

import { useGetCategory } from "api/endpoints/category/category";
import {
  useGetStudylogStatisticsTerm,
  useGetStudylogTerm,
} from "api/endpoints/study-log/study-log";

import { ViewStatistics } from "./shared";

const MyStatistics: React.FC<SharedStatisticsProps> = ({
  startDate,
  endDate,
  compareStartDate,
  compareEndDate,
  ...props
}) => {
  const {
    data: categories,
    refetch: refetchCategories,
    isRefetching: isCategoriesRefetching,
  } = useGetCategory();
  const {
    data: statistics,
    refetch: refetchStatistics,
    isRefetching: isStatisticsRefetching,
    isLoadingError: isStatisticsLoadingError,
  } = useGetStudylogStatisticsTerm(
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
  } = useGetStudylogTerm(
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

  const data = React.useMemo(() => {
    if (isStatisticsLoadingError || isStudylogsLoadingError) {
      return null;
    }
    if (
      categories === undefined ||
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
        const category = categories.find(
          (category) => category.id === log.category_id,
        );
        if (category === undefined) {
          continue;
        }
        const subject = category.subjects.find(
          (subject) => subject.id === log.subject_id,
        );
        if (subject === undefined) {
          continue;
        }
        logs.push({
          category_id: category.id,
          category_name: category.name,
          subject_id: subject.id,
          subject_name: subject.name,
          subject_color: subject.color,
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
      const category = categories.find((category) =>
        category.subjects.some((subject) => subject.id === studylog.subject_id),
      );
      if (category === undefined) {
        continue;
      }
      const subject = category.subjects.find(
        (subject) => subject.id === studylog.subject_id,
      );
      if (subject === undefined) {
        continue;
      }
      studylogsData.push({
        category_id: category.id,
        category_name: category.name,
        subject_id: subject.id,
        subject_name: subject.name,
        subject_color: subject.color,
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
    categories,
    statistics,
    studylogs,
    startDate,
    endDate,
  ]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (
      isCategoriesRefetching ||
      isStatisticsRefetching ||
      isStudylogsRefetching
    )
      return;
    setRefreshing(false);
  }, [isCategoriesRefetching, isStatisticsRefetching, isStudylogsRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchCategories();
    await refetchStatistics();
    await refetchStudylogs();
  };

  return (
    <ViewStatistics
      {...props}
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

export { MyStatistics };

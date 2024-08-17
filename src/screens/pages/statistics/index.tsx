import type { Type } from "./shared";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { type RouteProp, useRoute } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/ko";

import { MyStatistics } from "./my";
import { OtherStatistics } from "./other";

const Statistics = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "Statistics">>();

  const [type, setType] = React.useState<Type>("daily");

  const [targetDate, setTargetDate] = React.useState(
    moment().format("YYYY-MM-DD"),
  );

  const startDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return targetDate;
      case "weekly":
        return moment(targetDate).startOf("week").format("YYYY-MM-DD");
      case "monthly":
        return moment(targetDate).startOf("month").format("YYYY-MM-DD");
    }
  }, [type, targetDate]);
  const endDate = React.useMemo(() => {
    let target = "";
    switch (type) {
      case "daily":
        target = targetDate;
        break;
      case "weekly":
        target = moment(targetDate).endOf("week").format("YYYY-MM-DD");
        break;
      case "monthly":
        target = moment(targetDate).endOf("month").format("YYYY-MM-DD");
        break;
    }
    if (moment(target).isAfter(moment())) return moment().format("YYYY-MM-DD");
    return target;
  }, [type, targetDate]);

  const compareStartDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return moment(targetDate).subtract(13, "days").format("YYYY-MM-DD");
      case "weekly":
        return moment(targetDate)
          .startOf("week")
          .subtract(1, "week")
          .format("YYYY-MM-DD");
      case "monthly":
        return moment(targetDate)
          .startOf("month")
          .subtract(1, "month")
          .format("YYYY-MM-DD");
    }
  }, [type, targetDate]);
  const compareEndDate = React.useMemo(() => {
    let target = "";
    switch (type) {
      case "daily":
        target = moment(targetDate).format("YYYY-MM-DD");
        break;
      case "weekly":
        target = moment(targetDate).endOf("week").format("YYYY-MM-DD");
        break;
      case "monthly":
        target = moment(targetDate).endOf("month").format("YYYY-MM-DD");
        break;
    }
    if (moment(target).isAfter(moment())) return moment().format("YYYY-MM-DD");
    return target;
  }, [type, targetDate]);

  return params === undefined ? (
    <MyStatistics
      type={type}
      setType={setType}
      targetDate={targetDate}
      setTargetDate={setTargetDate}
      startDate={startDate}
      endDate={endDate}
      compareStartDate={compareStartDate}
      compareEndDate={compareEndDate}
    />
  ) : (
    <OtherStatistics
      type={type}
      setType={setType}
      targetDate={targetDate}
      setTargetDate={setTargetDate}
      startDate={startDate}
      endDate={endDate}
      group={params.group}
      user={params.user}
      compareStartDate={compareStartDate}
      compareEndDate={compareEndDate}
    />
  );
};

export { Statistics };

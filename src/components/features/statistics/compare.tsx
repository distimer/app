/* eslint-disable no-case-declarations */
import type { Statistic, Type } from "screens/pages/statistics/shared";

import React from "react";
import { FlatList } from "react-native-gesture-handler";

import moment from "moment";

import { useTheme } from "contexts/theme";

import { consume } from "utils/func";

import { StackBase, Text, VStack } from "components/common";

interface CompareProps {
  type: Type;
  targetDate: string;
  data: Statistic[];
}

const Compare: React.FC<CompareProps> = ({ type, targetDate, data }) => {
  const { styles, colors } = useTheme();

  const nowStartDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return moment(targetDate).subtract(6, "day").format("YYYY-MM-DD");
      case "weekly":
        return moment(targetDate).startOf("week").format("YYYY-MM-DD");
      case "monthly":
        return moment(targetDate).startOf("month").format("YYYY-MM-DD");
    }
  }, [type, targetDate]);
  const nowEndDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return moment(targetDate).format("YYYY-MM-DD");
      case "weekly":
        return moment(targetDate).endOf("week").format("YYYY-MM-DD");
      case "monthly":
        return moment(targetDate).endOf("month").format("YYYY-MM-DD");
    }
  }, [type, targetDate]);

  const pastStartDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return moment(targetDate).subtract(13, "day").format("YYYY-MM-DD");
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
  const pastEndDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return moment(targetDate).subtract(7, "day").format("YYYY-MM-DD");
      case "weekly":
        return moment(targetDate)
          .endOf("week")
          .subtract(1, "week")
          .format("YYYY-MM-DD");
      case "monthly":
        return moment(targetDate)
          .endOf("month")
          .subtract(1, "month")
          .format("YYYY-MM-DD");
    }
  }, [type, targetDate]);

  const nowData = React.useMemo(() => {
    const result = [];
    for (
      let date = nowStartDate;
      date <= nowEndDate;
      date = moment(date).add(1, "day").format("YYYY-MM-DD")
    ) {
      let sum = 0;
      const target = data.find((item) => item.date === date);
      if (target !== undefined) {
        for (const log of target.log) {
          sum += log.study_time;
        }
      }
      result.push({ date, sum });
    }
    return result;
  }, [data, nowStartDate, nowEndDate]);

  const pastData = React.useMemo(() => {
    const result = [];
    for (
      let date = pastStartDate;
      date <= pastEndDate;
      date = moment(date).add(1, "day").format("YYYY-MM-DD")
    ) {
      let sum = 0;
      const target = data.find((item) => item.date === date);
      if (target !== undefined) {
        for (const log of target.log) {
          sum += log.study_time;
        }
      }
      result.push({ date, sum });
    }
    return result;
  }, [data, pastStartDate, pastEndDate]);

  const title = React.useMemo(() => {
    switch (type) {
      case "daily":
        return {
          compare: "오늘은 지난주에 비해",
          left: "지난주 7일",
          right: "최근 7일",
        };
      case "weekly":
        return {
          compare: "지금까지 이번 주는 저번 주에 비해",
          left: "저번 주",
          right: "이번 주",
        };
      case "monthly":
        return {
          compare: "지금까지 이번 달은 저번 주에 비해",
          left: "저번 달",
          right: "이번 달",
        };
    }
  }, [type]);

  const nowSelectedDates = React.useMemo(() => {
    switch (type) {
      case "daily":
        return [targetDate];
      case "weekly":
      case "monthly":
        const result = [];
        for (
          let date = nowStartDate;
          date <= targetDate;
          date = moment(date).add(1, "day").format("YYYY-MM-DD")
        ) {
          result.push(date);
        }
        return result;
    }
  }, [type, targetDate, nowStartDate]);
  const pastSelectedDates = React.useMemo(() => {
    const result = [];
    switch (type) {
      case "daily":
        result.push(
          moment(targetDate).subtract(1, "week").format("YYYY-MM-DD"),
        );
        break;
      case "weekly":
        for (
          let date = pastStartDate;
          date <= moment(targetDate).subtract(1, "week").format("YYYY-MM-DD");
          date = moment(date).add(1, "day").format("YYYY-MM-DD")
        ) {
          result.push(date);
        }
        break;
      case "monthly":
        for (
          let date = pastStartDate;
          date <= moment(targetDate).subtract(1, "month").format("YYYY-MM-DD");
          date = moment(date).add(1, "day").format("YYYY-MM-DD")
        ) {
          result.push(date);
        }
        break;
    }
    return result;
  }, [type, targetDate, pastStartDate]);

  const nowSum = React.useMemo(() => {
    return nowData
      .filter((item) => nowSelectedDates.includes(item.date))
      .reduce((acc, item) => acc + item.sum, 0);
  }, [nowData, nowSelectedDates]);
  const pastSum = React.useMemo(() => {
    return pastData
      .filter((item) => pastSelectedDates.includes(item.date))
      .reduce((acc, item) => acc + item.sum, 0);
  }, [pastData, pastSelectedDates]);

  const maxSum = React.useMemo(() => {
    const nowMax = Math.max(...nowData.map((item) => item.sum));
    const pastMax = Math.max(...pastData.map((item) => item.sum));
    return Math.max(nowMax, pastMax);
  }, [nowData, pastData]);

  return (
    <VStack
      gap={600}
      style={[
        styles.padding.all[600],
        styles.radius.all[500],
        styles.$background(colors.gray[100]),
      ]}>
      <Text type="subheadline" weight="medium" color={colors.gray[400]}>
        공부량 비교
      </Text>
      <Text
        type="body"
        weight="medium"
        color={colors.gray[500]}
        align="center"
        line={2}>
        {title.compare}
        {"\n"}
        {nowSum === pastSum ? (
          <>공부량이 같아요.</>
        ) : (
          <>
            <Text type="body" weight="semiBold" color={colors.gray[700]}>
              {consume(Math.abs(nowSum - pastSum))}
            </Text>{" "}
            {nowSum > pastSum ? "더 많이 공부했어요." : "적게 공부했어요."}
          </>
        )}
      </Text>
      <StackBase direction={type === "monthly" ? "column" : "row"} gap={300}>
        <Item
          title={title.left}
          maxSum={maxSum}
          selectedDates={pastSelectedDates}
          direction={type === "monthly" ? "row" : "column"}
          data={pastData}
        />
        <Item
          title={title.right}
          maxSum={maxSum}
          selectedDates={nowSelectedDates}
          direction={type === "monthly" ? "row" : "column"}
          data={nowData}
        />
      </StackBase>
    </VStack>
  );
};

interface ItemProps extends GraphProps {
  title: string;
  direction: "row" | "column";
}
const Item: React.FC<ItemProps> = ({ title, direction, ...props }) => {
  const { colors } = useTheme();

  return (
    <StackBase
      direction={direction}
      align="center"
      justify="between"
      gap={300}
      fill>
      {direction === "row" && (
        <Text type="footnote" weight="medium" color={colors.gray[500]}>
          {title}
        </Text>
      )}
      <Graph {...props} />
      {direction === "column" && (
        <Text type="footnote" weight="medium" color={colors.gray[500]}>
          {title}
        </Text>
      )}
    </StackBase>
  );
};

interface GraphProps {
  maxSum: number;
  selectedDates: string[];
  data: {
    date: string;
    sum: number;
  }[];
}
const Graph: React.FC<GraphProps> = ({ selectedDates, maxSum, data }) => {
  const { styles, colors } = useTheme();

  return (
    <FlatList
      data={data}
      horizontal
      scrollEnabled={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{
        gap: 2,
        height: 44,
      }}
      renderItem={({ item }) => (
        <VStack
          self="end"
          style={[
            styles.$background(
              selectedDates.includes(item.date)
                ? colors.gray[500]
                : colors.gray[300],
            ),
            {
              width: 6,
              minHeight: 6,
              borderRadius: 3,
              height: `${(item.sum / maxSum) * 100}%`,
            },
          ]}
        />
      )}
    />
  );
};

export { Graph, Compare };

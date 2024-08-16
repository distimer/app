import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";
import { FlatList } from "react-native-gesture-handler";

import { useRoute } from "@react-navigation/native";
import moment from "moment";

import { useGetGroupMemberId } from "api/endpoints/group/group";
import { useGetStudylogGroupTermGroupIdMemberId } from "api/endpoints/study-log/study-log";

import { useTheme } from "contexts/theme";

import { DateBar, Empty, VStack } from "components/common";
import { Studylog } from "components/features/statistics";
import { Container, Wrapper } from "components/layout";

import { DatePicker } from "screens/sheets";

const OtherStudylogs = () => {
  const { params } =
    useRoute<RouteProp<PagesStackParamList, "OtherStudylogs">>();

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
  } = useGetStudylogGroupTermGroupIdMemberId(
    params.group,
    params.user,
    {
      start_date: targetDate,
      end_date: targetDate,
    },
    {
      query: {
        retry: false,
      },
    },
  );
  const {
    data: members,
    refetch: refetchMembers,
    isRefetching: isRefetchingMembers,
  } = useGetGroupMemberId(params.group);

  const nickname = React.useMemo(() => {
    if (!members) return undefined;
    const member = members.find((member) => member.user_id === params.user);
    return member?.nickname;
  }, [members, params.user]);

  const data = React.useMemo(() => {
    if (isLoadingError) return [];
    if (nickname === undefined || studylogs === undefined) return undefined;
    const result = [];
    for (const studylog of studylogs) {
      result.push({
        id: studylog.id,
        category: studylog.category_name,
        subject: studylog.subject.name,
        color: studylog.subject.color,
        content: studylog.content,
        start: studylog.start_at,
        end: studylog.end_at,
      });
    }

    result.sort((a, b) => {
      return moment(a.start).diff(moment(b.start));
    });

    return result;
  }, [isLoadingError, nickname, studylogs]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetchingMembers || isStudylogsRefetching) return;
    setRefreshing(false);
  }, [isRefetchingMembers, isStudylogsRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMembers();
    await refetchStudylogs();
  };

  return (
    <Container
      title={`${nickname} 학습기록`}
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

export { OtherStudylogs };

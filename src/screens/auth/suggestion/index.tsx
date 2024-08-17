import type { RouteProp } from "@react-navigation/native";
import type { AuthStackParamList } from "navigations/auth";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useRoute } from "@react-navigation/native";

import { postCategoryBatch } from "api/endpoints/category/category";
import { postSubjectBatch } from "api/endpoints/subject/subject";
import { putUser } from "api/endpoints/user/user";

import { useAuth } from "contexts/auth";
import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { HStack, Icon, Text, VStack } from "components/common";
import { Container } from "components/layout";

const items = [
  {
    name: "국어",
    subjects: [
      {
        name: "독서",
        color: "#50BD35",
      },
      {
        name: "문학",
        color: "#00AF84",
      },
      {
        name: "화법과 작문",
        color: "#05B5BB",
      },
      {
        name: "언어와 매체",
        color: "#05B5BB",
      },
    ],
  },
  {
    name: "수학",
    subjects: [
      {
        name: "수학 I",
        color: "#C641D2",
      },
      {
        name: "수학 II",
        color: "#F5379A",
      },
      {
        name: "확률과 통계",
        color: "#FF4242",
      },
      {
        name: "미적분",
        color: "#FF4242",
      },
      {
        name: "기하",
        color: "#FF4242",
      },
    ],
  },
  {
    name: "영어",
    subjects: [
      {
        name: "영어",
        color: "#00A1F2",
      },
      {
        name: "영어듣기",
        color: "#3974F3",
      },
    ],
  },
  {
    name: "한국사",
    subjects: [
      {
        name: "한국사",
        color: "#7E47FF",
      },
    ],
  },
  {
    name: "사회탐구",
    subjects: [
      {
        name: "생활과 윤리",
        color: "#2843C6",
      },
      {
        name: "윤리와 사상",
        color: "#2843C6",
      },
      {
        name: "한국지리",
        color: "#2843C6",
      },
      {
        name: "세계지리",
        color: "#2843C6",
      },
      {
        name: "동아시아사",
        color: "#2843C6",
      },
      {
        name: "세계사",
        color: "#2843C6",
      },
      {
        name: "경제",
        color: "#2843C6",
      },
      {
        name: "정치와 법",
        color: "#2843C6",
      },
      {
        name: "사회·문화",
        color: "#2843C6",
      },
    ],
  },
  {
    name: "과학탐구",
    subjects: [
      {
        name: "물리학Ⅰ",
        color: "#2843C6",
      },
      {
        name: "화학Ⅰ",
        color: "#2843C6",
      },
      {
        name: "생명과학Ⅰ",
        color: "#2843C6",
      },
      {
        name: "지구과학Ⅰ",
        color: "#2843C6",
      },
      {
        name: "물리학Ⅱ",
        color: "#2843C6",
      },
      {
        name: "화학Ⅱ",
        color: "#2843C6",
      },
      {
        name: "생명과학Ⅱ",
        color: "#2843C6",
      },
      {
        name: "지구과학Ⅱ",
        color: "#2843C6",
      },
    ],
  },
  {
    name: "직업탐구",
    subjects: [
      {
        name: "성공적인 직업 생활",
        color: "#2843C6",
      },
      {
        name: "농업 기초 기술",
        color: "#2843C6",
      },
      {
        name: "공업 일반",
        color: "#2843C6",
      },
      {
        name: "상업 경제",
        color: "#2843C6",
      },
      {
        name: "수산·해운 산업 기초",
        color: "#2843C6",
      },
      {
        name: "인간 발달",
        color: "#2843C6",
      },
    ],
  },
  {
    name: "제2외국어",
    subjects: [
      {
        name: "한문",
        color: "#EE7F00",
      },
      {
        name: "일본어",
        color: "#EE7F00",
      },
      {
        name: "중국어",
        color: "#EE7F00",
      },
      {
        name: "러시아어",
        color: "#EE7F00",
      },
      {
        name: "독일어",
        color: "#EE7F00",
      },
      {
        name: "프랑스어",
        color: "#EE7F00",
      },
      {
        name: "스페인어",
        color: "#EE7F00",
      },
      {
        name: "베트남어",
        color: "#EE7F00",
      },
      {
        name: "아랍어",
        color: "#EE7F00",
      },
    ],
  },
];

const Suggestion = () => {
  const { params } =
    useRoute<RouteProp<AuthStackParamList, "AuthSuggestion">>();

  const { styles, colors, values } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const [selected, setSelected] = React.useState<string[]>([]);

  const { refresh } = useAuth();

  const submit = async () => {
    const mixed: {
      [key: string]: {
        name: string;
        color: string;
      }[];
    } = {};
    for (const item of selected) {
      const category = items.find((v) =>
        v.subjects.some((s) => s.name === item),
      );
      if (!category) continue;
      const target = category.subjects.find((v) => v.name === item);
      if (!target) continue;
      if (!mixed[category.name]) {
        mixed[category.name] = [];
      }
      mixed[category.name].push(target);
    }

    startLoading();
    try {
      await putUser({
        name: params.name,
        terms_agreed: true,
      });

      const categories = await postCategoryBatch({
        category_list: Object.keys(mixed),
      });
      const subjects = [];
      for (const category of categories) {
        for (const subject of mixed[category.name]) {
          subjects.push({
            category_id: category.id,
            name: subject.name,
            color: subject.color,
          });
        }
      }
      await postSubjectBatch({
        subject_list: subjects,
      });

      await refresh();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="과목 최적화"
      dim
      backable
      scrollable
      fixedComponent={
        <Text type="body" weight="medium" color={colors.gray[500]} line={2}>
          수능을 준비하고 있으시다면{"\n"}
          최적화된 맞춤 카테고리를 사용할 수 있어요.
        </Text>
      }
      button={{
        title:
          selected.length > 0
            ? `${selected.length}개 과목 선택하기`
            : "건너뛰기",
        onPress: submit,
      }}>
      <FlatList
        data={items}
        scrollEnabled={false}
        contentContainerStyle={[styles.gap.all[500]]}
        renderItem={({ item }) => (
          <VStack gap={300}>
            <Text type="subheadline" weight="medium" color={colors.gray[400]}>
              {item.name}
            </Text>
            <FlatList
              data={item.subjects}
              scrollEnabled={false}
              contentContainerStyle={[
                styles.padding.vertical[500],
                styles.padding.horizontal[600],
                styles.gap.all[400],
                styles.radius.all[500],
                styles.$background(colors.gray[0]),
              ]}
              renderItem={({ item }) => {
                const checked = selected.includes(item.name);

                return (
                  <TouchableOpacity
                    hitSlop={values[200]}
                    onPress={() => {
                      if (checked) {
                        setSelected(selected.filter((v) => v !== item.name));
                      } else {
                        setSelected([...selected, item.name]);
                      }
                    }}>
                    <HStack align="center" gap={300}>
                      <Icon
                        name={
                          checked
                            ? "CheckBoxSmallOnIcon"
                            : "CheckBoxSmallOffIcon"
                        }
                        fill={checked ? item.color : colors.gray[700]}
                      />
                      <Text
                        type="body"
                        weight="medium"
                        color={colors.gray[700]}>
                        {item.name}
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                );
              }}
            />
          </VStack>
        )}
      />
    </Container>
  );
};

export { Suggestion };

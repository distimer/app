import type { CategoryctrlCategoryDTO } from "api/schemas";

export const filterUnclassifiedCategories = (
  categories: CategoryctrlCategoryDTO[],
) => {
  return categories.filter((category) => category.name !== "미분류");
};
export const unclassifiedCategory = (categories: CategoryctrlCategoryDTO[]) => {
  return categories.find(
    (category) => category.name === "미분류",
  ) as CategoryctrlCategoryDTO;
};

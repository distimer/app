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

export const compareArray = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  else {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        console.log(a[i], b[i]);
        return false;
      }
    }
    return true;
  }
};

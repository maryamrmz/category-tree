import { CategoryProps } from "./CategoryProps";

export type SetCategoriesType = (
    categories:
        | CategoryProps[]
        | ((prevState: CategoryProps[]) => CategoryProps[])
) => void;

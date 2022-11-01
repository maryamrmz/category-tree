import { CategoryProps } from "../../shared/CategoryProps";

export type SetCategoriesType = (
    categories:
        | CategoryProps[]
        | ((prevState: CategoryProps[]) => CategoryProps[])
) => void;

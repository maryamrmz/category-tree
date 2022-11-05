import { FC, useEffect, useRef, useState } from "react";
import { CategoryProps } from "types/CategoryProps";
import AddCategoryForm from "./components/AddCategoryForm";
import CategoriesList from "./components/CategoriesList";

import styles from "./Categories.module.scss";

const Categories: FC = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [highlightedCategory, setHighlightedCategory] = useState<
        null | number
    >(null);

    const ref = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = (event: Event) => {
        if (ref && !ref?.current?.contains(event.target as HTMLElement)) {
            setHighlightedCategory(null);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    useEffect(() => {
        !categories.length && setHighlightedCategory(null);
    }, [categories]);

    return (
        <div ref={ref} className={styles.categoriesContainer}>
            <AddCategoryForm
                setCategories={setCategories}
                highlightedCategory={highlightedCategory}
            />
            <CategoriesList
                categories={categories}
                setCategories={setCategories}
                highlightedCategory={highlightedCategory}
                setHighlightedCategory={setHighlightedCategory}
            />
        </div>
    );
};

export default Categories;

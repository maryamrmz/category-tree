import { FC, useEffect, useRef, useState } from "react";
import { CategoryProps } from "./shared/CategoryProps";
import AddCategoryForm from "./components/AddCategoryForm";

import styles from "./Categories.module.scss";
import RenderCategories from "./components/RenderCategories";

const Categories: FC = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [highlightedCategory, setHighlightedCategory] = useState<
        null | number
    >(null);

    const ref = useRef<HTMLDivElement | null>(null);

    // Define the handleOutsideClick and everything related to it to return to the default `highlightedCategory` state if the goal is to add a category to the root.
    const handleOutsideClick = (event: Event) => {
        if (ref && !ref?.current?.contains(event.target as HTMLElement)) {
            setHighlightedCategory(null);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
        // eslint-disable-next-line
    }, []);

    return (
        <div ref={ref} className={styles.categoriesContainer}>
            <AddCategoryForm
                setCategories={setCategories}
                highlightedCategory={highlightedCategory}
            />
            <RenderCategories
                categories={categories}
                setCategories={setCategories}
                highlightedCategory={highlightedCategory}
                setHighlightedCategory={setHighlightedCategory}
            />
        </div>
    );
};

export default Categories;

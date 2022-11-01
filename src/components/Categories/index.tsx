import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { CategoryProps } from "./shared/CategoryProps";
import AddCategoryForm from "./components/AddCategoryForm";
import RemoveIcon from "assets/icons/close.svg";
import Folder from "assets/icons/folder.svg";
import File from "assets/icons/file.svg";

import styles from "./Categories.module.scss";

const Categories: FC = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
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

    useEffect(() => {
        setExpanded(
            categories.reduce(
                (prevValue, curValue) => ({
                    ...prevValue,
                    [curValue.id]: false,
                }),
                {}
            )
        );
        // eslint-disable-next-line
    }, []);

    const removeCategory = (event: FormEvent, categoryId: number) => {
        event.stopPropagation();
        setCategories((prev) =>
            prev.filter((category) => category.id !== categoryId)
        );
    };

    const handleOnClickLi = (event: FormEvent, category: CategoryProps) => {
        event.stopPropagation();
        setExpanded((prev) => ({
            ...prev,
            [category.id]: !expanded[category.id],
        }));
        setHighlightedCategory(category.id);
    };

    const renderCategories = (parentId: number | null) => {
        return categories
            .filter((category) => category.parent_id === parentId)
            .map((category) => (
                <ul key={category.id} className={styles.categoryList}>
                    <img
                        src={category.type === "file" ? File : Folder}
                        alt='category icon'
                        className={styles.categoryIcon}
                    />
                    <li
                        onClick={(event) => handleOnClickLi(event, category)}
                        className={styles.categoryItem}
                    >
                        {category.name}
                        <button
                            type='button'
                            title='Remove'
                            onClick={(event) =>
                                removeCategory(event, category.id)
                            }
                            className={styles.removeButton}
                        >
                            <img
                                src={RemoveIcon}
                                alt='remove'
                                className={styles.icon}
                            />
                        </button>
                        {expanded[category.id] && renderCategories(category.id)}
                    </li>
                </ul>
            ));
    };

    return (
        <div ref={ref}>
            <AddCategoryForm
                setCategories={setCategories}
                highlightedCategory={highlightedCategory}
            />
            {renderCategories(null)}
        </div>
    );
};

export default Categories;

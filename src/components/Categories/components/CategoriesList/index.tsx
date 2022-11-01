import { FC, FormEvent, useState } from "react";
import { CategoryProps } from "types/CategoryProps";
import { SetCategoriesType } from "types/SetCategoriesType";
import RemoveIcon from "assets/icons/close.svg";

import styles from "./CategoriesList.module.scss";

interface CategoriesListProps {
    categories: CategoryProps[];
    setCategories: SetCategoriesType;
    highlightedCategory: number | null;
    setHighlightedCategory: (highlightedCategory: number | null) => void;
}

const CategoriesList: FC<CategoriesListProps> = ({
    categories,
    setCategories,
    highlightedCategory,
    setHighlightedCategory,
}) => {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>(
        categories.reduce(
            (prevValue, curValue) => ({
                ...prevValue,
                [curValue.id]: false,
            }),
            {}
        )
    );

    const removeChildCategory = (
        filteredCategories: CategoryProps[],
        currentCategory: CategoryProps
    ) => {
        let filteredItems: CategoryProps[] = [];
        let removedItems: CategoryProps[] = [];
        filteredCategories.map((category) =>
            category.parent_id !== currentCategory.id
                ? filteredItems.push(category)
                : removedItems.push(category)
        );

        if (removedItems.length > 0) {
            removedItems.map(
                (item) =>
                    (filteredItems = removeChildCategory(filteredItems, item))
            );
        }

        return filteredItems;
    };

    const removeCategory = (event: FormEvent, category: CategoryProps) => {
        event.stopPropagation();
        let filteredItems = [...categories].filter(
            (item) => item.id !== category.id
        );
        filteredItems = removeChildCategory(filteredItems, category);
        setCategories(filteredItems);
    };

    const handleOnClickCategory = (
        event: FormEvent,
        category: CategoryProps
    ) => {
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
                    <li
                        onClick={(event) =>
                            handleOnClickCategory(event, category)
                        }
                        className={`${
                            category.type === "folder"
                                ? styles.categoryFolderItem
                                : styles.categoryFileItem
                        } ${
                            category.id === highlightedCategory &&
                            styles.highlighted
                        }`}
                    >
                        {category.name}
                        <button
                            type='button'
                            title='Remove'
                            onClick={(event) => removeCategory(event, category)}
                            className={styles.removeButton}
                        >
                            <img
                                src={RemoveIcon}
                                alt='remove'
                                loading='lazy'
                                className={styles.icon}
                            />
                        </button>
                        {expanded[category.id] && renderCategories(category.id)}
                    </li>
                </ul>
            ));
    };

    return <>{renderCategories(null)}</>;
};

export default CategoriesList;

import { FC, FormEvent, useEffect, useState } from "react";
import { CategoryProps } from "../../shared/CategoryProps";
import { SetCategoriesType } from "../shared/SetCategoriesType";
import RemoveIcon from "assets/icons/close.svg";
import Folder from "assets/icons/folder.svg";
import File from "assets/icons/file.svg";

import styles from "./RenderCategories.module.scss";

interface RenderCategoriesProps {
    categories: CategoryProps[];
    setCategories: SetCategoriesType;
    highlightedCategory: number | null;
    setHighlightedCategory: (highlightedCategory: number | null) => void;
}

const RenderCategories: FC<RenderCategoriesProps> = ({
    categories,
    setCategories,
    highlightedCategory,
    setHighlightedCategory,
}) => {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

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

    const removeChildCategories = (
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
                    (filteredItems = removeChildCategories(filteredItems, item))
            );
        }

        return filteredItems;
    };

    const removeCategory = (event: FormEvent, category: CategoryProps) => {
        event.stopPropagation();
        let filteredItems = [...categories].filter(
            (item) => item.id !== category.id
        );
        filteredItems = removeChildCategories(filteredItems, category);
        setCategories(filteredItems);
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
                        loading='lazy'
                        className={styles.categoryIcon}
                    />
                    <li
                        onClick={(event) => handleOnClickLi(event, category)}
                        className={`${styles.categoryItem} ${
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

export default RenderCategories;

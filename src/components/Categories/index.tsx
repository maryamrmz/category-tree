import { FC, FormEvent, useEffect, useRef, useState } from "react";
import isItemIntoArray from "utils/isItemIntoArray";

interface CategoryProps {
    id: number;
    parent_id: null | number;
    name: string;
    type: "folder" | "file";
}

const Categories: FC = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [folder, setFolder] = useState("");
    const [file, setFile] = useState("");
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
                <ul>
                    <li onClick={(event) => handleOnClickLi(event, category)}>
                        {category.name}
                        <button
                            onClick={(event) =>
                                removeCategory(event, category.id)
                            }
                        >
                            Remove
                        </button>
                        {expanded[category.id] && renderCategories(category.id)}
                    </li>
                </ul>
            ));
    };

    const handleSubmitFolder = (e: FormEvent) => {
        e.preventDefault();
        setCategories((prev) => [
            ...prev,
            {
                id: prev.length,
                name: folder,
                parent_id: isItemIntoArray(prev, highlightedCategory)
                    ? highlightedCategory
                    : null,
                type: "folder",
            },
        ]);
        setFolder("");
    };

    const handleSubmitFile = (e: FormEvent) => {
        e.preventDefault();
        setCategories((prev) => [
            ...prev,
            {
                id: prev.length,
                name: file,
                parent_id: isItemIntoArray(prev, highlightedCategory)
                    ? highlightedCategory
                    : null,
                type: "file",
            },
        ]);
        setFile("");
    };

    return (
        <div ref={ref}>
            <form onSubmit={handleSubmitFolder}>
                <input
                    type='text'
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)}
                />
            </form>
            <form onSubmit={handleSubmitFile}>
                <input
                    type='text'
                    value={file}
                    onChange={(e) => setFile(e.target.value)}
                />
            </form>
            {renderCategories(null)}
        </div>
    );
};

export default Categories;

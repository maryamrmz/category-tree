import { FC, FormEvent, useState } from "react";
import isItemIntoArray from "utils/isItemIntoArray";
import AddFolderIcon from "assets/icons/add-folder.svg";
import AddFileIcon from "assets/icons/add-file.svg";
import { CategoryProps } from "components/shared/CategoryProps";

import styles from "./AddCategoryForm.module.scss";

interface AddCategoryFormProps {
    setCategories: (
        categories:
            | CategoryProps[]
            | ((prevState: CategoryProps[]) => CategoryProps[])
    ) => void;
    highlightedCategory: number | null;
}

const AddCategoryForm: FC<AddCategoryFormProps> = ({
    setCategories,
    highlightedCategory,
}) => {
    const [folder, setFolder] = useState("");
    const [file, setFile] = useState("");

    const handleSubmitFolder = (e: FormEvent) => {
        e.preventDefault();
        setCategories((prev: CategoryProps[]) => [
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
        <>
            <form onSubmit={handleSubmitFolder}>
                <img
                    src={AddFolderIcon}
                    alt='add folder'
                    title='New Folder'
                    className={styles.addIcon}
                />
                <input
                    type='text'
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)}
                />
            </form>
            <form onSubmit={handleSubmitFile}>
                <img
                    src={AddFileIcon}
                    alt='add file'
                    title='New File'
                    className={styles.addIcon}
                />
                <input
                    type='text'
                    value={file}
                    onChange={(e) => setFile(e.target.value)}
                />
            </form>
        </>
    );
};

export default AddCategoryForm;

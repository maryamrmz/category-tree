import { FC, FormEvent, useState } from "react";
import isItemIntoArray from "utils/isItemIntoArray";
import { CategoryProps } from "types/CategoryProps";
import { SetCategoriesType } from "types/SetCategoriesType";
import AddFolderIcon from "assets/icons/add-folder.svg";
import AddFileIcon from "assets/icons/add-file.svg";

import styles from "./AddCategoryForm.module.scss";

interface AddCategoryFormProps {
    setCategories: SetCategoriesType;
    highlightedCategory: number | null;
}

const AddCategoryForm: FC<AddCategoryFormProps> = ({
    setCategories,
    highlightedCategory,
}) => {
    const [folder, setFolder] = useState("");
    const [file, setFile] = useState("");
    const [visibleAddFolderInput, setVisibleAddFolderInput] = useState(false);
    const [visibleAddFileInput, setVisibleAddFileInput] = useState(false);

    const isItemFolder = (categories: CategoryProps[]) => {
        return (
            isItemIntoArray(categories, highlightedCategory) &&
            categories.find((item) => item.id === highlightedCategory)?.type ===
                "folder"
        );
    };

    const handleSubmitFolder = (e: FormEvent) => {
        e.preventDefault();
        if (folder === "") return;

        setCategories((prev: CategoryProps[]) => [
            ...prev,
            {
                id: prev.length,
                name: folder,
                parent_id: isItemFolder(prev) ? highlightedCategory : null,
                type: "folder",
            },
        ]);
        setFolder("");
        setVisibleAddFolderInput(false);
    };

    const handleSubmitFile = (e: FormEvent) => {
        e.preventDefault();
        if (file === "") return;

        setCategories((prev) => [
            ...prev,
            {
                id: prev.length,
                name: file,
                parent_id: isItemFolder(prev) ? highlightedCategory : null,
                type: "file",
            },
        ]);
        setFile("");
        setVisibleAddFileInput(false);
    };

    return (
        <div className={styles.addCategoryFormContainer}>
            <form
                onSubmit={handleSubmitFile}
                className={styles.addFileContainer}
            >
                <button
                    type='button'
                    onClick={() => setVisibleAddFileInput(!visibleAddFileInput)}
                    className={styles.addButton}
                >
                    <img
                        data-testid='add-file'
                        src={AddFileIcon}
                        alt='add file'
                        title='New File'
                        loading='lazy'
                        className={styles.addIcon}
                    />
                </button>
                {visibleAddFileInput && (
                    <input
                        placeholder='File name...'
                        type='text'
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                    />
                )}
            </form>
            <form onSubmit={handleSubmitFolder}>
                <button
                    type='button'
                    onClick={() =>
                        setVisibleAddFolderInput(!visibleAddFolderInput)
                    }
                    className={styles.addButton}
                >
                    <img
                        data-testid='add-folder'
                        src={AddFolderIcon}
                        alt='add folder'
                        title='New Folder'
                        loading='lazy'
                        className={styles.addIcon}
                    />
                </button>
                {visibleAddFolderInput && (
                    <input
                        placeholder='Folder name...'
                        type='text'
                        value={folder}
                        onChange={(e) => setFolder(e.target.value)}
                    />
                )}
            </form>
        </div>
    );
};

export default AddCategoryForm;

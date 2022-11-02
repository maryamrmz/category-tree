import { FC, FormEvent, useState } from "react";
import isItemIntoArray from "utils/isItemIntoArray";
import { CategoryProps } from "types/CategoryProps";
import { SetCategoriesType } from "types/SetCategoriesType";
import AddCategoryFormContent from "./components/AddCategoryFormContent";
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

    const handleSubmitFolder = (e: FormEvent) => {
        e.preventDefault();
        if (folder === "") return;

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
                parent_id: isItemIntoArray(prev, highlightedCategory)
                    ? highlightedCategory
                    : null,
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
                <AddCategoryFormContent
                    imgDataTestId='add-file'
                    imgSrc={AddFileIcon}
                    ImgTitle='New File'
                    imgAlt='add file'
                    inputValue={file}
                    onChangeInputValue={setFile}
                    onClickVisibleInput={setVisibleAddFileInput}
                    visibleAddCategoryFile={visibleAddFileInput}
                />
            </form>
            <form onSubmit={handleSubmitFolder}>
                <AddCategoryFormContent
                    imgDataTestId='add-folder'
                    imgSrc={AddFolderIcon}
                    ImgTitle='New Folder'
                    imgAlt='add folder'
                    inputValue={folder}
                    onChangeInputValue={setFolder}
                    onClickVisibleInput={setVisibleAddFolderInput}
                    visibleAddCategoryFile={visibleAddFolderInput}
                />
            </form>
        </div>
    );
};

export default AddCategoryForm;

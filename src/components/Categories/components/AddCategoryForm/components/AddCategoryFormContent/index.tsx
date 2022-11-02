import { FC } from "react";

import styles from "./AddCategoryFormContent.module.scss";

interface AddCategoryFormContentProps {
    visibleAddCategoryFile: boolean;
    imgSrc: string;
    imgDataTestId: string;
    ImgTitle: string;
    imgAlt: string;
    onClickVisibleInput: (visibleAddCategoryFile: boolean) => void;
    inputValue: string;
    onChangeInputValue: (inputValue: string) => void;
}

const AddCategoryFormContent: FC<AddCategoryFormContentProps> = ({
    imgDataTestId,
    imgSrc,
    ImgTitle,
    imgAlt,
    inputValue,
    onChangeInputValue,
    onClickVisibleInput,
    visibleAddCategoryFile,
}) => {
    return (
        <>
            <button
                type='button'
                onClick={() => onClickVisibleInput(!visibleAddCategoryFile)}
                className={styles.addButton}
            >
                <img
                    data-testid={imgDataTestId}
                    src={imgSrc}
                    alt={imgAlt}
                    title={ImgTitle}
                    loading='lazy'
                    className={styles.addIcon}
                />
            </button>
            {visibleAddCategoryFile && (
                <input
                    placeholder={ImgTitle}
                    type='text'
                    value={inputValue}
                    onChange={(e) => onChangeInputValue(e.target.value)}
                />
            )}
        </>
    );
};

export default AddCategoryFormContent;

function isItemIntoArray(source: any[], targetId: number | null) {
    return source.some((item) => item.id === targetId);
}

export default isItemIntoArray;

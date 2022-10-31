function isItemIntoArray(source: any[], targetId: number | null) {
    return !!source.find((item) => item.id === targetId);
}

export default isItemIntoArray;

import isItemIntoArray from "../isItemIntoArray";

const dummy_array = [{ id: 1 }];
const invalid_dummy_array = [1];

describe("isItemIntoArray", function () {
    it("should return `true` for valid inputs", function () {
        expect(isItemIntoArray(dummy_array, 1)).toBeTruthy();
    });

    it("should return `false` for invalid inputs", function () {
        expect(isItemIntoArray(dummy_array, 2)).toBeFalsy();
        expect(isItemIntoArray(invalid_dummy_array, 2)).toBeFalsy();
    });
});

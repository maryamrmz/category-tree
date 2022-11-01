import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders img tags", () => {
    render(<App />);
    const addFolderImg = screen.getByTestId("add-folder"),
        addFileImg = screen.getByTestId("add-file");

    expect(addFolderImg).toBeInTheDocument();
    expect(addFileImg).toBeInTheDocument();
});

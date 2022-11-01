import { render } from "@testing-library/react";
import App from "./App";

test("renders img tag", () => {
    render(<App />);
    const testImage = document.querySelector("img");
    expect(testImage).toBeInTheDocument();
});

import { render, fireEvent, screen } from "@testing-library/react";
import ProcessBar from "../views/process_bar";

describe("ProcessBar", () => {
  it("should render progress bars with initial values", () => {
    render(<ProcessBar />);

    const progressBars = screen.getAllByTestId(/progress-bar-/);
    const progressValues = screen.getAllByTestId(/progress-value-/);

    expect(progressBars.length).toBe(3);
    expect(progressValues.length).toBe(3);

    progressBars.forEach((progressBar, index) => {
      expect(progressBar).toHaveStyle({ width: "0%" });
      expect(progressValues[index]).toHaveTextContent("0%");
    });
  });

  it("should increase the progress bar value when clicking the +10 button", () => {
    render(<ProcessBar />);

    const selectLine = screen.getByTestId("select-line");
    const addButton = screen.getByText("+10");

    fireEvent.change(selectLine, { target: { value: "1" } });
    fireEvent.click(addButton);

    const secondProgressBar = screen.getByTestId("progress-bar-1");

    expect(secondProgressBar).toHaveStyle({ width: "10%" });
    expect(screen.getByTestId("progress-value-1")).toHaveTextContent("10%");
  });

  it("should not exceed 100% when clicking the +10 button repeatedly but the value shown can exceed 100%", () => {
    render(<ProcessBar />);

    const selectLine = screen.getByTestId("select-line");
    const addButton = screen.getByText("+10");

    fireEvent.change(selectLine, { target: { value: "2" } });

    const thirdProgressBar = screen.getByTestId("progress-bar-2");

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(thirdProgressBar).toHaveStyle({ width: "20%" });
    expect(screen.getByTestId("progress-value-2")).toHaveTextContent("20%");

    for (let i = 0; i < 10; i++) {
      fireEvent.click(addButton);
    }

    expect(thirdProgressBar).toHaveStyle({ width: "100%" });
    expect(screen.getByTestId("progress-value-2")).toHaveTextContent("120%");
  });

  it("should not go below 0% when decreasing the progress bar value", () => {
    render(<ProcessBar />);
    const selectLine = screen.getByTestId("select-line");
    const addButton = screen.getByText("+10");
    const minusButton = screen.getByText("-25");
    fireEvent.change(selectLine, { target: { value: "2" } });
    const thirdProgressBar = screen.getByTestId("progress-bar-2");

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(thirdProgressBar).toHaveStyle({ width: "20%" });
    expect(screen.getByTestId("progress-value-2")).toHaveTextContent("20%");

    fireEvent.click(minusButton);
    fireEvent.click(minusButton);

    expect(thirdProgressBar).toHaveStyle({ width: "0%" });
    expect(screen.getByTestId("progress-value-2")).toHaveTextContent("0%");
  });

  it("should change the selected line when selecting an option from the dropdown", () => {
    render(<ProcessBar />);

    const selectLine = screen.getByTestId("select-line") as HTMLSelectElement;

    fireEvent.change(selectLine, { target: { value: "2" } });

    expect(selectLine.value).toBe("2");
  });

  it("should match the snapshot", () => {
    const { container } = render(<ProcessBar />);
    expect(container).toMatchSnapshot();
  });
});

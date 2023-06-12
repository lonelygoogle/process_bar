import React, { useState } from "react";
import "./index.scss";
import { buttonsValue, optionsValue } from "./schema";

const ProcessBar: React.FC = () => {
  const [progressBars, setProgressBars] = useState<number[]>([0, 0, 0]);
  const [selectedLine, setSelectedLine] = useState<number>(0);

  const handleProgressBarChange = (index: number, amount: number) => {
    setProgressBars((prevProgressBars) => {
      const updatedProgressBars = [...prevProgressBars];
      updatedProgressBars[index] += amount;
      updatedProgressBars[index] = Math.max(0, updatedProgressBars[index]);
      return updatedProgressBars;
    });
  };

  const handleLineSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLine(parseInt(event.target.value));
  };

  const handleButtonClick = (amount: number) => {
    handleProgressBarChange(selectedLine, amount);
  };

  return (
    <div className="App" data-testid="process-bar">
      <div className="App-container">
        <h1>Process Bar Demo</h1>
        {progressBars.map((value, index) => (
          <div key={index} className="progress-container">
            <p
              className="progress-value"
              data-testid={`progress-value-${index}`}
            >
              {`${value}%`}
            </p>
            <div
              className={value > 100 ? "progress-bar red" : "progress-bar"}
              style={{ width: `${Math.min(100, value)}%` }}
              data-testid={`progress-bar-${index}`}
            ></div>
          </div>
        ))}

        <div className="control">
          <select
            className="selectLine"
            value={selectedLine}
            onChange={handleLineSelection}
            data-testid="select-line"
          >
            {optionsValue.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
          <div className="buttons">
            {buttonsValue.map((button) => (
              <button
                key={button.key}
                onClick={() => handleButtonClick(Number(button.value))}
              >
                {button.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessBar;

import { useState } from "react";
import "./index.scss";

const buttonValue = ["-25", "-10", "+10", "+25"];
const ProcessBar = () => {
  const [width, setWidth] = useState(0);

  const increaseWidth = () => {
    setWidth((prevWidth) => prevWidth + 10);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${width}%` }}></div>
          <button onClick={increaseWidth}>+10</button>
        </div>
      </header>
    </div>
  );
};

export default ProcessBar;

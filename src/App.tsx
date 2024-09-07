import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { parseExpression, processOperations } from "./scripts";

const symArr: string[] = [
  "C",
  "√",
  "%",
  "/",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "00",
  "0",
  ".",
  "=",
];

export const App: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const calculateExpression = useCallback(() => {
    try {
      const tokens = parseExpression(expression);
      const processedTokens = processOperations(tokens);
      if (
        processedTokens.length === 1 &&
        typeof processedTokens[0] === "number"
      ) {
        setResult(String(processedTokens[0]));
      } else {
        setResult("Error");
      }
    } catch (error) {
      console.log("Ошибка вычесления выражения");
    }
  }, [expression]);

  useEffect(() => {
    const handleKeyPress = (key: string) => {
      const actions: { [key: string]: () => void } = {
        Enter: calculateExpression,
        "=": calculateExpression,
        Escape: resetCalculator,
        "%": () => setExpression((prev) => prev + "%"),
      };

      if (actions[key]) {
        actions[key]();
      } else if (["+", "-", "*", "/", "."].includes(key) || /\d/.test(key)) {
        setExpression((prev) => prev + key);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      const { key } = event;
      if (
        /^\d+$/.test(key) ||
        ["+", "-", "*", "/", ".", "=", "Enter", "Escape", "%"].includes(key)
      ) {
        event.preventDefault();
        handleKeyPress(key);
      }
      return;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expression, calculateExpression]);

  const handleClick = (value: string) => {
    switch (value) {
      case "C":
        resetCalculator();
        break;
      case "=":
        calculateExpression();
        break;
      default:
        setExpression((prev) => prev + value);
    }
  };

  const resetCalculator = () => {
    setExpression("");
    setResult(null);
  };

  return (
    <div>
      <div className="background">
        <div className="wrapper">
          <div className="display">
            <div className="display_actions">{result ? expression : "0"}</div>
            <div className="display_answer">
              {Number.isNaN(result)
                ? "Error"
                : result
                ? result
                : expression || "0"}
            </div>
          </div>
          <div className="panel">
            {symArr.map((button) =>
              button !== "=" ? (
                <span key={button} className="panel_el">
                  <button
                    onClick={() => {
                      handleClick(button);
                    }}
                  >
                    {button}
                  </button>
                </span>
              ) : (
                <span key={button} className="panel_el equals">
                  <button
                    onClick={() => {
                      handleClick("=");
                    }}
                  >
                    =
                  </button>
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

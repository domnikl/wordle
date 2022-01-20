import "./Keyboard.css";
import { CorrectPosition, keyClass } from "./CssPositionClasses";

interface KeyboardProps {
  usedCorrectPosition: CorrectPosition[];
  usedIncorrectPosition: string[];
  notUsed: string[];

  onKeyDown: (key: string) => void;
}

function Keyboard(props: KeyboardProps) {
  const keys = [
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
    ["Y", "X", "C", "V", "B", "N", "M", "Enter", "⌫"],
  ];

  function handleOnClick(key: string) {
    if (key === "⌫") {
      props.onKeyDown(KEY_DELETE);
    } else if (key === "Enter") {
      props.onKeyDown(KEY_ENTER);
    } else {
      props.onKeyDown(key);
    }
  }

  function keyClass2(key: string): string {
    return (
      "Keyboard-key " +
      keyClass(
        key,
        null,
        props.usedCorrectPosition,
        props.usedIncorrectPosition,
        props.notUsed
      )
    );
  }

  return (
    <div>
      {keys.map((row) => (
        <div className="Keyboard-row" key={"row-" + row}>
          {row.map((key) => (
            <div
              className={keyClass2(key)}
              key={key}
              onClick={() => handleOnClick(key)}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
export const KEY_ENTER = "enter";
export const KEY_DELETE = "delete";

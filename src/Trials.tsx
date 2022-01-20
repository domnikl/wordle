import { CorrectPosition, keyClass } from "./CssPositionClasses";
import "./Trials.css";

interface TrialsProps {
  usedCorrectPosition: CorrectPosition[];
  usedIncorrectPosition: string[];
  notUsed: string[];
  trials: string[];
}

function Trials(props: TrialsProps) {
  const trials = props.trials.map((x) => x.slice(0, 5).padEnd(5, " "));

  return (
    <div className="Trials-trials">
      {trials.map((trial, i) => (
        <div className="Trials-row" key={i + trial} data-foo={i + trial}>
          {trial.split("").map((char, x) => (
            <div
              key={i + trial + x + char}
              className={
                "Trials-char " +
                keyClass(
                  char,
                  x,
                  props.usedCorrectPosition,
                  props.usedIncorrectPosition,
                  props.notUsed
                )
              }
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Trials;

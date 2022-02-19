import { useState } from "react";
import Trials from "./Trials";
import Keyboard, { KEY_DELETE, KEY_ENTER } from "./Keyboard";
import { CorrectPosition, evaluate } from "./CssPositionClasses";
import "./Game.css";
import Words from "./Words";

function randomWord() {
  return Words[Math.floor(Math.random() * Words.length)].toUpperCase();
}

function Game() {
  const maxRounds = 6;
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);

  const [word, setWord] = useState<string>(randomWord());
  const [round, setRound] = useState<number>(0);
  const [trials, setTrials] = useState<string[]>(["", "", "", "", "", ""]);

  const [notUsed, setNotUsed] = useState<string[]>([]);
  const [correctPosition, setCorrectPosition] = useState<CorrectPosition[]>([]);
  const [incorrectPosition, setIncorrectPosition] = useState<string[]>([]);

  function newRound() {
    setWord(randomWord());
    setTrials(["", "", "", "", "", ""]);
    setNotUsed([]);
    setCorrectPosition([]);
    setIncorrectPosition([]);
    setRound(0);
    setGameLost(false);
    setGameWon(false);
  }

  function handleKeyDown(key: string) {
    if (gameLost || gameWon) return;

    if (key === KEY_DELETE) {
      trials[round] = trials[round].slice(0, 5).slice(0, -1);
      setTrials([...trials]);
    } else if (key === KEY_ENTER) {
      if (trials[round].length < 5) return;

      if (!Words.includes(trials[round])) {
        // Word not allowed!
        console.log("Not in word list!");
        return;
      }

      const results = evaluate(word, trials[round]);

      setNotUsed([...notUsed, ...results.notUsed]);
      setCorrectPosition([...correctPosition, ...results.correctPosition]);
      setIncorrectPosition([
        ...incorrectPosition,
        ...results.incorrectPosition,
      ]);

      if (trials[round] === word) {
        setGameWon(true);
        return;
      }

      if (round === maxRounds - 1) {
        setGameLost(true);
        return;
      }

      setRound(round + 1);
    } else {
      trials[round] = trials[round].slice(0, 4).trim() + key;
      setTrials([...trials]);
    }
  }

  var flash = <></>;

  if (gameLost) {
    flash = (
      <>
        <div className="Game-lost">You lost after {round + 1} rounds!</div>
        <div>
          Want to play another <button onClick={newRound}>round</button>?
        </div>
      </>
    );
  } else if (gameWon) {
    flash = (
      <>
        <div className="Game-won">You won after {round + 1} rounds!</div>
        <div>
          Want to play another <button onClick={newRound}>round</button>?
        </div>
      </>
    );
  }

  return (
    <div>
      {flash}

      <Trials
        usedCorrectPosition={correctPosition}
        usedIncorrectPosition={incorrectPosition}
        notUsed={notUsed}
        trials={trials}
      />

      <Keyboard
        usedCorrectPosition={correctPosition}
        usedIncorrectPosition={incorrectPosition}
        notUsed={notUsed}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Game;

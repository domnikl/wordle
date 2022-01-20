export function keyClass(
  key: string,
  index: null | number,
  correctPosition: CorrectPosition[],
  incorrectPosition: string[],
  notUsed: string[]
): string {
  if (index === null) {
    if (correctPosition.map((x) => x.char).includes(key)) {
      return "correct-position";
    }
  } else {
    if (
      correctPosition.filter((x) => x.position === index && x.char === key)
        .length !== 0
    ) {
      return "correct-position";
    }
  }

  if (notUsed.includes(key)) {
    return "not-used";
  } else if (incorrectPosition.includes(key)) {
    return "incorrect-position";
  }

  return "";
}

export interface CorrectPosition {
  position: number;
  char: string;
}

export interface EvaluationResults {
  correctPosition: CorrectPosition[];
  incorrectPosition: string[];
  notUsed: string[];
}

export function evaluate(word: string, trial: string): EvaluationResults {
  const wordChars = word.toUpperCase().split("");
  const trialChars = trial.toUpperCase().split("");

  let correctPositions: CorrectPosition[] = [];
  let incorrectPosition: string[] = [];
  let notUsed: string[] = [];

  trialChars.forEach((c, i) => {
    if (wordChars[i] === c) {
      correctPositions.push({
        char: c,
        position: i,
      });
    } else if (wordChars.includes(c)) {
      incorrectPosition.push(c);
    } else {
      notUsed.push(c);
    }
  });

  return {
    correctPosition: correctPositions,
    incorrectPosition: incorrectPosition,
    notUsed: notUsed,
  };
}

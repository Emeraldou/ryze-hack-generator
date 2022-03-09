const WORD_POOL = [
  "L9", "TURBO", "WEED", "HACK", "UNDETECTED"
];

const WORD_COMBINAISONS = {
  "UNDETECTED": [
    ["IN"],
    ["SOUTH", "NORTH"],
    ["TAIWAN", "SRI LANKA"]
  ]
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

const getRandomWord = () => {
  return WORD_POOL[getRandomInt(WORD_POOL.length - 1)];
}

const buildPhraseFromCombinaisons = (combinaisons: Array<Array<string>>) => {
  const result: Array<string> = [];

  combinaisons.forEach((comb: Array<string>) => {
    const rand = getRandomInt(comb.length - 1);
    result.push(comb[rand]);
  });

  return result.join(" ");
}

export const generate = () => {
  let result = "";
  
  for (let i = 0; i < 4; i++) {
    const word = getRandomWord();

    result += word;

    if (Object.keys(WORD_COMBINAISONS).includes(word)) {
      const combinaisons: Array<Array<string>> = WORD_COMBINAISONS[word];
      result += buildPhraseFromCombinaisons(combinaisons);
    }
  }
  
  return result;
}
const CHINESE_POOL = [
  "英", "雄", "联", "盟", "大", "厦", "及", "发", "暨", "在", "地", "毯", "上",
  "骇", "客"
];

const WORD_POOL = [
  "L9", "TURBO", "WEED", "HACK", "UNDETECTED", "WTF", "PERMA BAN", "DOINB",
  "XPLOIT", "KILLING SPREE", "SEX", "2022", "MCDONALDS", "BURGER KING", "HENTAI"
];

const WORD_COMBINAISONS = {
  "UNDETECTED": [
    ["IN"],
    ["SOUTH", "NORTH", "EAST", "WEST"],
    ["TAIWAN", "SRI LANKA", "CAMBODIA", "VIETNAM", "CHINA", "TANZANIA"]
  ],
  "WTF": [
    ["(wtf ?)", "WAS THAT ???", "BRO"]
  ],
  "MCDONALDS": [
    ["EMPLOYEE", "MANAGER", "CEO"]
  ],
  "BURGER KING": [
    ["EMPLOYEE", "MANAGER", "CEO"]
  ],
  "*": [
    ["?", "??", "???", "!", "!!"]
  ]
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomChineseChar = () => {
  return CHINESE_POOL[getRandomInt(0, CHINESE_POOL.length)];
}

const getRandomWord = () => {
  return WORD_POOL[getRandomInt(0, WORD_POOL.length)];
}

const buildPhraseFromCombinaisons = (combinaisons: Array<Array<string>>) => {
  const result: Array<string> = [];

  combinaisons.forEach((comb: Array<string>) => {
    const rand = getRandomInt(0, comb.length);
    result.push(comb[rand]);
  });

  return result.join(" ");
}

export const generate = () => {
  const result: Array<string> = [];
  let currentSequence = 0;

  while (result.length < 200) {
    const countAtBeginning = result.length;

    if (currentSequence < 40) {
      const word = getRandomWord();

      result.push(word);

      if (Object.keys(WORD_COMBINAISONS).includes(word)) {
        const combinaisons: Array<Array<string>> = WORD_COMBINAISONS[word];
        result.push(buildPhraseFromCombinaisons(combinaisons));
      }
    }
    else {
      currentSequence = 0;

      const nbChar = getRandomInt(3, 7);
      let chinesePhrase = "";

      for (let i = 0; i < nbChar; i++) {
        chinesePhrase += getRandomChineseChar();
      }

      result.push(chinesePhrase);
    }

    const countAtEnding = result.length;
    currentSequence += countAtEnding - countAtBeginning;
  }
  
  return result.join(" ");
}
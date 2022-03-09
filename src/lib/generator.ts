const CHINESE_POOL = [
  "英", "雄", "联", "盟", "大", "厦", "及", "发", "暨", "在", "地", "毯", "上",
  "骇", "客"
];

const WORD_POOL = [
  "L9", "TURBO", "WEED", "HACK", "UNDETECTED", "WTF", "PERMA BAN", "DOINB",
  "XPLOIT", "KILLING SPREE", "SEX", "2022", "MCDONALDS", "BURGER KING", "HENTAI",
  "FATIMA", "YASSIN", "DEPE", "BELGE", "NO SCOPE", "360", "FFS", "BRAINSTORMING",
  "PROCESS", "REKT", "SKYYART", "NB3", "SMURF", "1200", "300K CRIT"
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
  "360": [
    ["NO SCOPE", "TRIX", "HACK"]
  ],
  "1200": [
    ["MOVEMENT SPEED", "ABILITY POWER", "ATTACK DAMAGE"]
  ],
  "YASSIN": [
    ["INSTALOCK", ""]
  ],
  "FATIMA": [
    ["INSTALOCK", ""]
  ],
  "*": [
    ["?", "??", "???", "!", "!!"]
  ]
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomChineseChar = () => {
  return CHINESE_POOL[getRandomInt(0, CHINESE_POOL.length - 1)];
}

const getRandomWord = () => {
  return WORD_POOL[getRandomInt(0, WORD_POOL.length - 1)];
}

const getRandomPunctuation = () => {
  return WORD_COMBINAISONS["*"][0][getRandomInt(0, WORD_COMBINAISONS["*"][0].length - 1)];
}

const buildPhraseFromCombinaisons = (combinaisons: Array<Array<string>>) => {
  const result: Array<string> = [];

  combinaisons.forEach((comb: Array<string>) => {
    const rand = getRandomInt(0, comb.length);
    result.push(comb[rand]);
  });

  return result;
}

export const generate = () => {
  const result: Array<string> = [];
  let currentSequence = [];

  while (result.length < 200) {
    // Generating words
    if (currentSequence.length < 40) {
      let word;

      while (!word || currentSequence.includes(word)) {
        word = getRandomWord();
      }

      currentSequence.push(word);

      if (Object.keys(WORD_COMBINAISONS).includes(word)) {
        const combinaisons: Array<Array<string>> = WORD_COMBINAISONS[word];

        let phrase;

        while (!phrase || currentSequence.includes(phrase)) {
          phrase = buildPhraseFromCombinaisons(combinaisons);
        }

        currentSequence.push(...phrase);
      }

      // 15% chance to display punctuation
      if (getRandomInt(0, 100) < 15) {
        currentSequence.push(getRandomPunctuation());
      }

      result.push(...currentSequence);
    }
    // Generating chinese characters
    // Resets current sequence word count
    else {
      currentSequence = [];

      const nbChar = getRandomInt(3, 7);
      let chinesePhrase = "";

      for (let i = 0; i < nbChar; i++) {
        chinesePhrase += getRandomChineseChar();
      }

      result.push(chinesePhrase);
    }
  }
  
  return result.join(" ");
}
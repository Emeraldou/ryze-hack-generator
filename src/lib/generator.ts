import { Config } from '../interfaces/config';

let CHINESE_POOL = [
  "英", "雄", "联", "盟", "大", "厦", "及", "发", "暨", "在", "地", "毯", "上",
  "骇", "客"
];

let WORD_POOL = [
  "L9", "TURBO", "WEED", "HACK", "UNDETECTED", "WTF", "PERMA BAN", "DOINB",
  "XPLOIT", "KILLING SPREE", "SEX", "2022", "MCDONALDS", "BURGER KING", "HENTAI",
  "FATIMA", "YASSIN", "DEPE", "BELGE", "NO SCOPE", "360", "FFS", "BRAINSTORMING",
  "PROCESS", "REKT", "SKYYART", "NB3", "SMURF", "1200", "300K CRIT", "ORNITHORYNQUE",
  "CHEVRE", "TOP 1", "9K ELO", "LMAO", "ROFL", "WORLD RECORD", "BAN", "DOPA", "OPGG",
  "XD", "CHICKEN", "NUGGETS", "CHINESE", "FAKER", "RIOT", "TRICK2G", "3K ELO",
  "200K CRIT", "CHEDDAR", "DAB", "MCFLY", "CHOVY", "JAPENESE", "FUCK", "DUMBFUCK",
  "BRAIN", "FAST", "SWAG", "ARAM", "SLAY", "FIGHT", "SASUKE", "KOREAN", "BUG",
  "ONLYFANS", "COFFEE", "MACRO", "GOD", "GULAG", "TELEPORTATION", "COOLDOWN",
  "KEBAB", "LAG"
];

const WORD_COMBINAISONS = {
  "UNDETECTED": [
    ["IN"],
    [
      "SOUTH", "NORTH", "EAST", "WEST", "NORTH-WESTERN", "NORTH-EASTERN",
      "SOUTH-WESTERN", "SOUTH-EASTERN", "NORTHERN", "SOUTHERN", "WESTERN",
      "EASTERN", "MIDDLE"
    ],
    [
      "TAIWAN", "SRI LANKA", "CAMBODIA", "VIETNAM", "CHINA", "TANZANIA",
      "TIMBUKTU", "PERU", "BRUNEI", "ZANZIBAR", "BOMBAY", "AZERBAIJAN",
      "BANGKOK", "SYRIA", "TAJIKISTAN", "TOKYO", "ABIDJAN", "NAIROBI"
    ]
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
    ["NO SCOPE", "TRIX", "HACK", "LP UNTIL CHALLENGER"]
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
  "FAKER": [
    ["RETARDED", "WHAT WAS THAT ???", "WTF ?"]
  ],
  "MCFLY": [
    ["AND"],
    ["CARLITO", "YOUR MOTHER", "AMOURANTH"],
    ["WTF ?"]
  ],
  "FAST": [
    ["REKT", "SEX", "SLAY", "SLAYING", "FUCK", ""]
  ],
  "*": [
    ["?", "??", "???", "!", "!!", "!!!", "¿", "¿¿", "¿¿¿", "?¿"]
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
    const rand = getRandomInt(0, comb.length - 1);
    result.push(comb[rand]);
  });

  return result;
}

export const generate = (config: Config) => {
  const result: Array<string> = [];
  let currentSequence = [];
  let lastRequiredSequenceLength = getRandomInt(config.minWordSequenceLength, config.maxWordSequenceLength);

  if (config.wordPool) {
    WORD_POOL = config.wordPool(WORD_POOL);
  }

  if (config.chinesePool) {
    CHINESE_POOL = config.chinesePool(CHINESE_POOL);
  }

  while (result.length < config.length) {
    // Generating words
    if (currentSequence.length < lastRequiredSequenceLength) {
      let word: string;

      do {
        word = getRandomWord();
      } while (currentSequence.includes(word));

      if (Object.keys(WORD_COMBINAISONS).includes(word)) {
        const combinaisons: Array<Array<string>> = WORD_COMBINAISONS[word];

        let phrase: Array<string>;

        do {
          phrase = buildPhraseFromCombinaisons(combinaisons);
        } while (currentSequence.join(" ").includes([word, ...phrase].join(" ")));

        const totalPhrase: Array<string> = [word, ...phrase];
        let lowercasePhrase = [];

        // Chances to reduce words to lowercase
        if (getRandomInt(0, 100) < config.lowercaseProbability + 1) {
          for (let i = 0; i < totalPhrase.length; i++) {
            lowercasePhrase.push(totalPhrase[i].toLowerCase());
          }
        }
        else {
          lowercasePhrase = totalPhrase;
        }

        currentSequence.push(...lowercasePhrase);
      }
      else {
        // Chances to reduce words to lowercase
        if (getRandomInt(0, 100) < config.lowercaseProbability + 1) {
          word = word.toLowerCase();
        }

        currentSequence.push(word);
      }

      // Chances to display punctuation
      if (getRandomInt(0, 100) < config.punctuationProbability + 1) {
        currentSequence.push(getRandomPunctuation());
      }
    }
    // Generating chinese characters
    // Resets current sequence word count
    else {
      lastRequiredSequenceLength = getRandomInt(config.minWordSequenceLength, config.maxWordSequenceLength);
      result.push(...currentSequence);
      currentSequence = [];

      const nbChar = getRandomInt(config.minChineseSequenceLength, config.maxChineseSequenceLength);
      let chinesePhrase = "";

      for (let i = 0; i < nbChar; i++) {
        chinesePhrase += getRandomChineseChar();
      }

      result.push(chinesePhrase);
    }
  }
  
  return result.join(" ");
}
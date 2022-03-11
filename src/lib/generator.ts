import Operators from '../enums/operators';
import { Config } from '../interfaces/config';

let CHINESE_POOL = [
  "英", "雄", "联", "盟", "大", "厦", "及", "发", "暨", "在", "地", "毯", "上",
  "骇", "客"
];

let PEOPLE_POOL = [
  "SNOOP DOG", "JACQUES CHIRAC", "DOINB", "SKYYART", "FAKER", "TRICK2G", "DOPA",
  "NB3", "MCFLY", "CHOVY", "ELON MUSK"
];

let WORD_POOL = [
  "L9", "TURBO", "WEED", "HACK", "UNDETECTED", "WTF", "PERMA BAN", "XPLOIT", 
  "KILLING SPREE", "SEX", "2022", "MCDONALDS", "BURGER KING", "HENTAI", "FATIMA", 
  "YASSIN", "DEPE", "BELGE", "NO SCOPE", "360", "FFS", "BRAINSTORMING", "PROCESS", 
  "REKT", "SMURF", "1200", "300K CRIT", "ORNITHORYNQUE", "CHEVRE", "TOP 1", 
  "9K ELO", "LMAO", "ROFL", "WORLD RECORD", "BAN", "OPGG", "XD", "CHICKEN", 
  "NUGGETS", "CHINESE", "RIOT", "3K ELO", "200K CRIT", "CHEDDAR", "DAB", 
  "JAPENESE", "FUCK", "DUMBFUCK", "BRAIN", "FAST", "SWAG", "ARAM", "SLAY", 
  "FIGHT", "SASUKE", "KOREAN", "BUG", "ONLYFANS", "COFFEE", "MACRO", "GOD", 
  "GULAG", "TELEPORTATION", "COOLDOWN", "KEBAB", "LAG", "SPEEDRUN",
  "COMBO", "PERMA IN FOG"
];

const WORD_COMBINAISONS = {
  [Operators.ANY_PEOPLE]: [
    ["FEAT", Operators.NOTHING],
    [Operators.ANY_WORD]
  ],
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
    ["(wtf ?)", "WAS THAT ???", "BRO", "(quoi la baise ?)"]
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
    ["INSTALOCK", Operators.NOTHING]
  ],
  "FATIMA": [
    ["INSTALOCK", Operators.NOTHING]
  ],
  "FAKER": [
    ["RETARDED", "WHAT WAS THAT ???", "WTF ?"]
  ],
  "FAST": [
    ["REKT", "SEX", "SLAY", "SLAYING", "FUCK", Operators.NOTHING]
  ],
  "SPEEDRUN": [
    [Operators.ANY_WORD],
    ["ANY%"]
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

const getRandomPerson = () => {
  return PEOPLE_POOL[getRandomInt(0, PEOPLE_POOL.length - 1)];
}

const getRandomPunctuation = () => {
  return WORD_COMBINAISONS["*"][0][getRandomInt(0, WORD_COMBINAISONS["*"][0].length - 1)];
}

const getChinesePhrase = (config: Config) => {
  const nbChar = getRandomInt(config.minChineseSequenceLength, config.maxChineseSequenceLength);
  let chinesePhrase = "";

  for (let i = 0; i < nbChar; i++) {
    chinesePhrase += getRandomChineseChar();
  }

  return chinesePhrase;
}

const prob = (target: number) => getRandomInt(0, 100) < target + 1

export const generate = (config: Config) => {
  const result: Array<string> = [];
  let requiredSequenceLength = getRandomInt(config.minWordSequenceLength, config.maxWordSequenceLength);

  // Currently generated word sequence in order to know easily when to generate chinese characters
  let currentWordSequence: Array<string> = [];

  // Configuring pools
  if (config.wordPool) {
    WORD_POOL = config.wordPool(WORD_POOL);
  }
  if (config.chinesePool) {
    CHINESE_POOL = config.chinesePool(CHINESE_POOL);
  }
  if (config.peoplePool) {
    PEOPLE_POOL = config.peoplePool(PEOPLE_POOL);
  }

  while (result.length < config.length) {
    // Can generate a word
    if (currentWordSequence.length < requiredSequenceLength) {
      let word: string;

      // Generates a word that's not in current sequence
      do {
        // Tries to generate a person word
        if (prob(config.peopleProbability)) {
          let hasFoundPerson = false;

          // Prevents another person to appear if any has already been generated lastly
          for (let i = 1; i <= config.minPeopleSpacing; i++) {
            const currentWord = result[result.length - i];

            if (currentWord && PEOPLE_POOL.includes(currentWord.toUpperCase())) {
              hasFoundPerson = true;
              break;
            }
          }

          // If has found a person lastly, generates a word instead of a person
          word = hasFoundPerson ? getRandomWord() : getRandomPerson();
        }
        else {
          word = getRandomWord();
        }
      } while (currentWordSequence.includes(word));

      // Saves word in current sequence
      currentWordSequence.push(word);

      // Tries to lowercase the word
      if (prob(config.lowercaseProbability)) {
        word = word.toLowerCase();
      }

      // Saves word to final result
      result.push(word);

      // If the current word is a person, appends generic combinaisons of people
      if (PEOPLE_POOL.includes(word.toUpperCase())) {
        const peopleCombinaisons: Array<Array<string>> = WORD_COMBINAISONS[Operators.ANY_PEOPLE];

        for (const comb of peopleCombinaisons) {
          let randomComb = comb[getRandomInt(0, comb.length - 1)];
          let continues = true;

          // Prevents FEAT generation if another FEAT has already been generated lastly
          if (randomComb === "FEAT") {
            for (let i = 1; i <= config.minFeaturingSpacing; i++) {
              const currentWord = result[result.length - i];

              if (currentWord && currentWord.toUpperCase() === "FEAT") {
                continues = false;
                break;
              }
            }
          }
          // Stops right now if Nothing is chosen
          else if (randomComb === Operators.NOTHING) {
            break;
          }
          // Gets any word
          else if (randomComb === Operators.ANY_WORD) {
            randomComb = getRandomWord();
          }
          // Gets any person
          else if (randomComb === Operators.ANY_PEOPLE) {
            randomComb = getRandomPerson();
          }

          if (continues) {
            if (prob(config.lowercaseProbability)) {
              randomComb = randomComb.toLowerCase();
            }

            result.push(randomComb);
          }
          else {
            break;
          }
        }
      }

      // Checks for other combinaisons
      if (Object.keys(WORD_COMBINAISONS).includes(word.toUpperCase())) {
        const combinaisons: Array<Array<string>> = WORD_COMBINAISONS[word.toUpperCase()];

        for (const comb of combinaisons) {
          let randomComb = comb[getRandomInt(0, comb.length - 1)];

          // Stops right now if Nothing is chosen
          if (randomComb === Operators.NOTHING) {
            break;
          }
          else if (randomComb === Operators.ANY_WORD) {
            randomComb = getRandomWord();
          }
          // Gets any person
          else if (randomComb === Operators.ANY_PEOPLE) {
            randomComb = getRandomPerson();
          }

          if (prob(config.lowercaseProbability)) {
            randomComb = randomComb.toLowerCase();
          }

          result.push(randomComb);
        }
      }

      // Tries to generate some punctuation at the end of the sequence
      if (prob(config.punctuationProbability)) {
        result.push(getRandomPunctuation());
      }
    }
    // Generates a Chinese phrase and resets
    else {
      // Pushes Chinese phrase
      result.push(getChinesePhrase(config));

      // Rests current word sequence and re-defines required sequence length
      requiredSequenceLength = getRandomInt(config.minWordSequenceLength, config.maxWordSequenceLength);
      currentWordSequence = [];
    }
  }

  return result.join(" ");
}
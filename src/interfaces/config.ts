export interface Config {
  /**
   * Maximum length in sequences of words.
   * By default is 75
   */
  length?: number

  /**
   * Probability of generating some punctuations after a sequence of word.
   * By default is 25%
   */
  punctuationProbability?: number

  /**
   * Probability of switching a sequence of words into lowercase.
   * By default is 30%
   */
  lowercaseProbability?: number

  /**
   * Probability of picking a random person instead of a word. 2 people must
   * be separated by at least {minPeopleSpacing} words.
   * By default is 20%
   */
  peopleProbability?: number

  /**
   * Minimum amount of words between two people
   * By default is 2
   */
  minPeopleSpacing?: number

  /**
   * Minimum amount of words between two featuring
   * By default is 10
   */
  minFeaturingSpacing?: number

  /**
   * Minimum length of a sequence of chinese characters.
   * By default is 3
   */
  minChineseSequenceLength?: number

  /**
   * Maximum length of a sequence of chinese characters.
   * By default is 7
   */
  maxChineseSequenceLength?: number

  /**
   * Minimum length of a sequence of words.
   * By default is 7.
   */
  minWordSequenceLength?: number

  /**
   * Maximum length of a sequence of words.
   * By default is 15.
   */
  maxWordSequenceLength?: number

  /**
   * Defines a callable configuration which is going to configure the array of available words.
   *
   * If used, MUST return an array of strings.
   *
   * @param pool {Array<string>}
   */
  wordPool?: (pool: Array<string>) => Array<string>

  /**
   * Defines a callable configuration which is going to configure the array of available chinese characters inserted
   * by the end of sequences of words.
   *
   * If used, MUST return an array of strings.
   *
   * @param pool {Array<string>}
   */
  chinesePool?: (pool: Array<string>) => Array<string>

  /**
   * Defines a callable configuration which is going to configure the array of available people names.
   *
   * If used, MUST return an array of strings.
   *
   * @param pool {Array<string>}
   */
  peoplePool?: (pool: Array<string>) => Array<string>
}
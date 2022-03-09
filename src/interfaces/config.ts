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
   * By default is 35%
   */
  lowercaseProbability?: number

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
   * By default is 10.
   */
  minWordSequenceLength?: number

  /**
   * Maximum length of a sequence of words.
   * By default is 20.
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
}
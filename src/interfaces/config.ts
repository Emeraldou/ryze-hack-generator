export interface Config {
  /**
   * Maximum length in characters of the generated text, without whitespaces.
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
}
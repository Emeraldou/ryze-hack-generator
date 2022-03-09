import { Config } from '../interfaces/config';

const defaultConfig: Config = {
  length: 75,
  punctuationProbability: 25,
  lowercaseProbability: 35,
  minChineseSequenceLength: 3,
  maxChineseSequenceLength: 7
}

export default defaultConfig;
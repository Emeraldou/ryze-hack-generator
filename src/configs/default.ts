import { Config } from '../interfaces/config';

const defaultConfig: Config = {
  length: 75,
  punctuationProbability: 25,
  lowercaseProbability: 30,
  peopleProbability: 20,
  minPeopleSpacing: 2,
  minFeaturingSpacing: 10,
  minChineseSequenceLength: 3,
  maxChineseSequenceLength: 7,
  minWordSequenceLength: 7,
  maxWordSequenceLength: 15
}

export default defaultConfig;
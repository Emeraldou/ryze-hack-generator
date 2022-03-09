import defaultConfig from './configs/default';
import { Config } from './interfaces/config';
import { generate } from './lib/generator';

class RyzeHackGenerator
{
  public static generate(config?: Config): string
  {
    return generate(Object.assign(defaultConfig, config));
  }
}

export default RyzeHackGenerator;
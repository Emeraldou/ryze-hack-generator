# Doinb's Ryze Hack text generator

A simple and flexible tool in order to easily generate Doinb's Ryze Hack text-like strings.

## Getting Started

If you're using **ES6 + Typescript**, simply import the component like that :

```typescript
import RyzeHackGenerator from "@emeraldou/ryze";
```

Once you've imported the component, you will now be able to use its only static method :
```generate``` :

```typescript
import RyzeHackGenerator from '@emeraldou/ryze';

const text = RyzeHackGenerator.generate();
```

## Configurations

In order to set some configuration, pass an object to the ```generate``` method :

```ts
import RyzeHackGenerator from '@emeraldou/ryze';

const text = RyzeHackGenerator.generate({ /* config */ });
```

### length

```number``` ```default: 75```

The maximum length of the generated text. The length corresponds to the amount of characters
**without whitespaces**.

---

### punctuationProbability

```number``` ```default: 25```

The probability as percentage to add some punctuation at the end of a sequence of text. A
punctuation is defined as "?", "!" and "¿". Each of these can be repeated **three times**.

---

### lowercaseProbability

```number``` ```default: 35```

The probability as percentage to transform the generated sequence into lowercase. By default,
everything is in uppercase.

---

### minChineseSequenceLength

```number``` ```default: 3```

Minimum length of a sequence of Chinese characters generated by the end of a sequence of
sequences of texts.

---

### maxChineseSequenceLength

```number``` ```default: 7```

Same as ```minChineseSequenceLength``` but for the maximum length. Must obviously be higher.
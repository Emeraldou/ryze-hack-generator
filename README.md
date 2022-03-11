# Doinb's Ryze Hack text generator

A simple and flexible tool in order to easily generate Doinb's Ryze Hack text-like strings.

## Getting Started

```npm i @emeraldou/ryze```

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

The maximum length corresponding to the amount of sequences of words added to the result.

---

### punctuationProbability

```number``` ```default: 25```

The probability as percentage to add some punctuation at the end of a sequence of text. A
punctuation is defined as "?", "!" and "¿". Each of these can be repeated **three times**.

---

### lowercaseProbability

```number``` ```default: 30```

The probability as percentage to transform the generated sequence into lowercase. By default,
everything is in uppercase.

---

### peopleProbability

```number``` ```default: 20```

The probability to roll a person instead of a word. Then, there is 50% chance that the
person's name will be followed by "FEAT any word"

---

### minPeopleSpacing

```number``` ```default: 2```

Minimum amount of random words between two people names.

---

### minFeaturingSpacing

```number``` ```default: 10```

Minimum amount of random words that must separate two "FEAT" strings.

---

### minChineseSequenceLength

```number``` ```default: 3```

Minimum length of a sequence of Chinese characters generated by the end of a sequence of
sequences of texts.

---

### maxChineseSequenceLength

```number``` ```default: 7```

Same as ```minChineseSequenceLength``` but for the maximum length. Must obviously be higher.

---

### minWordSequenceLength

```number``` ```default: 7```

Minimum length of a sequence of words.

---

### maxWordSequenceLength

```number``` ```default: 15```

Maximum length of a sequence of words.

---

### wordPool

```Function``` ```default: undefined```

Defines a callable configuration which is going to configure the array of available words.

If used, **MUST** return an array of strings.

```ts
import RyzeHackGenerator from '@emeraldou/ryze';

RyzeHackGenerator.generate({
    wordPool: (pool: Array<string>) => {
      pool.push("TEST");
      return pool;
    }
});
```

---

### chinesePool

```Function``` ```default: undefined```

Defines a callable configuration which is going to configure the array of available 
chinese characters inserted by the end of sequences of words.

If used, **MUST** return an array of strings.

```ts
import RyzeHackGenerator from '@emeraldou/ryze';

RyzeHackGenerator.generate({
    chinesePool: (pool: Array<string>) => {
      pool.push("厦");
      return pool;
    }
});
```

---

### peoplePool

```Function``` ```default: undefined```

Defines a callable configuration which is going to configure the array of available
people names to insert instead of words.

If used, **MUST** return an array of strings.

```ts
import RyzeHackGenerator from '@emeraldou/ryze';

RyzeHackGenerator.generate({
    peoplePool: (pool: Array<string>) => {
      pool.push("SKYYART");
      return pool;
    }
});
```
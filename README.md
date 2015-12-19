#### Engine deps

[![Build Status](https://travis-ci.org/samccone/engine-deps.svg?branch=master)](https://travis-ci.org/samccone/engine-deps)

Install dependencies depending on the version of node.

#### Using

In package.json add a new `engine-deps` section:

```json
{
  "engine-deps": {
    "0.12.x": {
      "backbone@1.0.x"
    },
    "0.10.x": {
      "backbone@1.1.x"
    },
    "^4": {
      "backbone@1.2.x"
    }
  }
}
```

Then add a new postinstall hook

```json
{
  "scripts": {
    "postinstall": "engine-deps"
  }
}
```

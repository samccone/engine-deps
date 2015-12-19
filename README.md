<p align="center">
<h3 align="center">Engine Deps</h3>
</p>
<hr/>
<p align="center">
<img src="https://raw.githubusercontent.com/samccone/engine-deps/gh-pages/engine.png" width="600px">
<a href="https://travis-ci.org/samccone/engine-deps"></br></br><img src="https://travis-ci.org/samccone/engine-deps.svg?branch=master"></a>
</p>

<h4 align="center">
<pre>
npm i --save-dev engine-deps
</pre>
</h4>

#### What:

Manage Engine Specific dependencies with ease.

#### How:

In package.json add a new `engine-deps` section:

```json
{
  "engine-deps": {
    "0.12.x": {
      "backbone": "1.0.x"
    },
    "0.10.x": {
      "backbone": "1.1.x"
    },
    "^4": {
      "backbone": "1.2.x"
    }
  }
}
```

Then add a new install hook

```json
{
  "scripts": {
    "install": "engine-deps"
  }
}
```

##### IRL Examples

* [https://github.com/mounirlamouri/manifest-validator](https://github.com/samccone/manifest-validator/commit/e32bcfa26cd057d442534c28c1499a84af1ffa7d)

var fs = require('fs');
var semver = require('semver');
var npm = require('npm');

/**
 * Reads json from a file path and returns the
 * engine-deps key from the json or if not present an empty object
 * @param {string} filePath
 * @returns {!object} engine-deps object
 */
function getEngineDeps(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))['engine-deps'] || {};
}

/**
 *
 * @param {string} tipVersion -- eg v0.1.1
 * @param {Array<string>} allRanges
 * @return {Array<string>} all valid ranges inside allRanges given tip
 */
function getValidEngineRanges(tipVersion, allRanges) {
  return allRanges.reduce(function(prev, curr) {
    if (semver.satisfies(tipVersion, curr)) {
      prev.push(curr);
    }

    return prev;
  }, []);
}

/**
 * @param {Array<string>}} packages
 * @return {Promise} when the install is done or rejected
 */
function installPackages(packages) {
  npm.load({}, function (er) {
    if (er) {
      throw err;
    }

    npm.commands.install(packages, function (er, data) {
      if (er) {
        throw err;
      }
    });
  });
}

/**
 * Converts node style deps into a list of dependencies with versions
 * eg:
 *
 *    {'lodash': '0.1.x', {'underscore': '0.2.x'} => ['lodash@0.1.x', 'underscore@0.2.x']
 *
 * @param {!Object} deps
 * @return {Array<String>}
 */
function convertDependencyHash(deps) {
  return Object.keys(deps).reduce(function(prev, curr) {
    prev.push(curr + '@' + deps[curr]);
    return prev;
  }, []);
}


/**
 * @param {string} jsonPath
 * @param {string} version
 */
function installFromJson(jsonPath, version) {
  var engineDeps = getEngineDeps(jsonPath);

  installPackages(getValidEngineRanges(process.version, Object.keys(engineDeps))
      .reduce(function(prev, curr) {
        return prev.concat(convertDependencyHash(engineDeps[curr]));
      }, []));
}

module.exports = {
  installFromJson: installFromJson,
  __convertDependencyHash: convertDependencyHash,
  __getValidEngineRanges: getValidEngineRanges,
  __getEngineDeps: getEngineDeps,
};

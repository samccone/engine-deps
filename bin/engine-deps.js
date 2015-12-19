#!/usr/bin/env node

var path = require('path');

require('../').installFromJson(path.join(process.cwd(), 'package.json'), process.version);

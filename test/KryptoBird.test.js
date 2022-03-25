const assert = require('chai');

const KryptoBird = artifacts.require('./Kryptobird.json');

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()
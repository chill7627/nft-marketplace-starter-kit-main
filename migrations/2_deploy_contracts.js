const KryptoBird = artifacts.require("Kryptobird");
// grabs json object KryptoBird and assigns it to Krypto bird const

// deploys contract deployer (KryptoBird in this instant)
module.exports = function(deployer) {
    deployer.deploy(KryptoBird);
};
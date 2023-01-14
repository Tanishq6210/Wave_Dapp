const wave = artifacts.require("wave");
module.exports = function(deployer) {
    deployer.deploy(wave);
};
const tap = require('tap');
const rocketh = require('rocketh');
const {getDeployedContract} = require('../../lib');

const {
    runLandSaleTests
} = require('./landSale_tests');

const {
    runLandSaleEthTests,
} = require('./landSale_eth_tests');

const {
    runLandSaleDaiTests,
} = require('./landSale_dai_tests');

function ContractStore() {
    this.contractName = 'LandSaleWithETHAndDAI';
}
ContractStore.prototype.resetContracts = async function () {
    await rocketh.runStages();
    return {
        LandSale: getDeployedContract('LandPreSale_1'),
        Sand: getDeployedContract('Sand'),
        Land: getDeployedContract('Land'),
        FakeDAI: getDeployedContract('DAI'),
    };
};

runLandSaleTests('LandPreSale_1', new ContractStore());
runLandSaleEthTests('LandPreSale_1', new ContractStore());
runLandSaleDaiTests('LandPreSale_1', new ContractStore());

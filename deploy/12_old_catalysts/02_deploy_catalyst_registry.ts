import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const catalyst = await deployments.get('OldCatalysts');

  await deploy('OldCatalystRegistry', {
    contract: 'CatalystRegistry',
    from: deployer,
    args: [
      catalyst.address,
      deployer, // is set to catalystRegistryAdmin later (see 810_set_catalystRegistry_admin.js)
    ],
    log: true,
  });
};
export default func;
func.tags = ['OldCatalystRegistry', 'OldCatalystRegistry_deploy'];
func.dependencies = ['OldCatalysts_deploy', 'Sand_deploy'];
func.skip = async (hre) => hre.network.name !== 'hardhat'; // not meant to be redeployed

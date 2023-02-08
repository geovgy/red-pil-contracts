const hre = require("hardhat");

async function main() {
const name = "PODFactory";
const address = "0xa70cBf70FA2E2E4D1B63d089a2d5A80f428132A5";
const constructorArgs = [];

if (hre.network.config.chainId !== 31337) {
    try {
      const code = await ethers.provider.getCode(address);
      if (code === "0x") {
        console.log(`${name} contract deployment has not completed. waiting to verify...`);
      }
      await hre.run("verify:verify", {
        address: address,
        contract: `contracts/${name}.sol:${name}`,
        constructorArguments: constructorArgs,
      });
    } catch ({ message }) {
      if ((message).includes("already verified")) {
        console.log("Reason: Already Verified");
      }
      console.error(message);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
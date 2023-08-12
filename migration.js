const migrationContractABI = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "oldSnifferTokenQty",
        "type": "uint256"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

const tokenABI = [ {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }];

document.getElementById('migrateButton').addEventListener('click', async () => {
    try {
        const tokenContractAddress = '0x68E47eeCFd76fd289fa0CF4B25009c7e00E10bA6'; // OLD TOKEN
        const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask first.');
            return;
        }

        // Fetch the token balance of the user's first account
        const userBalance = await tokenContract.methods.balanceOf(accounts[0]).call();

        const migrationContractAddress = '0x35D596F5f7807Ed88c5bE1cBa16C462aB9e8ACC8'; // MIGRATION ADDRESS
        const migrationContract = new web3.eth.Contract(migrationContractABI, migrationContractAddress);

        const oldSnifferTokenQty = userBalance;

        const result = await migrationContract.methods.claim(oldSnifferTokenQty).send({ from: accounts[0] });
        console.log('Migration Successful:', result);
        alert('Migration successful!');
        const button = document.getElementById('migrateButton');
        button.innerHTML = '<span class="icon-vallet"></span>$SNIFF migrated!';
    } catch (error) {
        console.error("Migration Error:", error);
    }
});


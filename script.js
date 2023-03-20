// Web3 객체를 초기화
const web3 = new Web3(window.ethereum);

// Metamask를 사용하여 Arbitrum 네트워크에 연결
async function connectMetamask() {
    try {
        // Metamask 계정 연결 요청
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // 연결된 네트워크 체인 ID 확인
        const chainId = await web3.eth.getChainId();

        // 연결된 네트워크가 Arbitrum 네트워크가 아닌 경우
        if (chainId !== 42161) {
            throw new Error("아비트럼 네트워크로 변경하셈");
        }

        // 연결된 Metamask 계정 주소 확인
        const accounts = await web3.eth.getAccounts();
        const accountAddress = accounts[0];

        return accountAddress;
    } catch (error) {
        alert(error.message);
        return false;
    }
}

// claim 함수를 호출
async function claim() {
    const accountAddress = await connectMetamask();
    if (accountAddress) {
        const contractAddress = '0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9';
        const contractAbi = [
            {
                "inputs":[{"internalType":"contract IERC20VotesUpgradeable","name":"_token","type":"address"},{"internalType":"address payable","name":"_sweepReceiver","type":"address"},{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_claimPeriodStart","type":"uint256"},{"internalType":"uint256","name":"_claimPeriodEnd","type":"uint256"},{"internalType":"address","name":"delegateTo","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CanClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HasClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newSweepReceiver","type":"address"}],"name":"SweepReceiverSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Swept","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"claimAndDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPeriodEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimPeriodStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimableTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_claimableAmount","type":"uint256[]"}],"name":"setRecipients","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_sweepReceiver","type":"address"}],"name":"setSweepReciever","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sweepReceiver","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20VotesUpgradeable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"
            }
        ];
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const accounts = await web3.eth.getAccounts();
        await contract.methods.claim().send({
            from: accounts[0],
            gas: 500000,
            gasPrice: '10000000'
          });          
    }
}

// Metamask 계정 변경 이벤트를 처리
window.ethereum.on('accountsChanged', async (accounts) => {
    const metamaskStatusElement = document.getElementById("metamask-status");
    if (accounts.length > 0) {
        metamaskStatusElement.innerHTML = `지갑 주소: ${accounts[0]}`;
    } else {
        metamaskStatusElement.innerHTML = '연결 해제';
    }
});

// 페이지 로드 시 Metamask 연결 상태를 확인
window.addEventListener('load', async () => {
    const accountAddress = await connectMetamask();
    if (accountAddress) {
        const metamaskStatusElement = document.getElementById("metamask-status");
        metamaskStatusElement.innerHTML = `지갑 주소: ${accountAddress}`;
    }
});

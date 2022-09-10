
//获取当前网络eth的余额
async function getEthBalance(address){
	let web3 = new Web3(Web3.givenProvider);
	let res = await web3.eth.getBalance(address);
	return parseInt(res)/(10**18);
}

//获取代币的余额
async function getTokenBalance(token,address){
	let contract = _loadContract("ERC20",token)
	let res = await contract.methods.balanceOf(address).call();
	let decimals = await contract.methods.decimals().call();
	console.log(res,decimals)
	let r = parseInt(res)/(10**parseInt(decimals));
	return r ;
}

async function approve(token,spender,amount,owner){
	let contract = _loadContract("ERC20",token) ;
	let res = contract.methods.approve(spender,amount).send({from:owner});
	console.log(res)
	return res ;
}

async function decimals(token){
	let contract = _loadContract("ERC20",token)
	let decimals = await contract.methods.decimals().call();
	return decimals ;
}

async function symbol(token){
	let contract = _loadContract("ERC20",token)
	let symbol = await contract.methods.symbol().call();
	return symbol ;
}

async function allowance(owner,spender,token){
	let contract = _loadContract("ERC20",token)
	let res = await contract.methods.allowance(owner,spender).call();
	return res ;
}

//加载合约数据  abi,合约地址
function _loadContract(abiName,address){
	let abi = getABI(abiName);
	let web3 = new Web3(Web3.givenProvider);
	let contract = new web3.eth.Contract(abi,address);
	return contract ;
}



//切换网络
function swithNetwork(name){
	let chainId = _nameToChain(name) ;   //需要切换的网络
	let nowChain = _nowChain() ;
	if(chainId != nowChain){   //当前的网络跟所需要的网络不同时，进行切换
		_swithChain(chainId)
	}
}

//通过名称查找链的ID
function _nameToChain(name){
	if(name == "BSC-TEST") return "0x61";
	if(name == "BSC-MAIN") return "0x38";
	if(name == "FTM-MAIN") return "0xfa";
}


//显示当前网络的ID
function _nowChain(){
	return window.ethereum.chainId   ;  //web3.js  里自带的一个全局变量
}


//直接切换网络
function _swithChain(chainId){
	if(chainId == '0x38'){  //BSC MAIN
		window.web3.currentProvider && window.web3.currentProvider .request({
			method: 'wallet_addEthereumChain',
			params: [
			{
			  chainId: '0x38',
			  chainName: 'BSC Main',
			  nativeCurrency: {
			      name: 'BNB',
			      symbol: 'BNB',
			      decimals: 18,
			  },
			  rpcUrls: ['https://bsc-dataseed.binance.org/'],
			  blockExplorerUrls: ['https://bscscan.com/'],
			},
			],
		})
	}

	if(chainId == '0x61'){  //BSC Testnet
		window.web3.currentProvider && window.web3.currentProvider .request({
			method: 'wallet_addEthereumChain',
			params: [
			{
			  chainId: '0x61',
			  chainName: 'Binance Smart Chain Testnet',
			  nativeCurrency: {
			      name: 'tBNB',
			      symbol: 'tBNB',
			      decimals: 18,
			  },
			  rpcUrls: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
			  blockExplorerUrls: ['https://testnet.bscscan.com/'],
			},
			],
		})
	}

	if(chainId == "0xfa"){
		window.web3.currentProvider && window.web3.currentProvider .request({
			method: 'wallet_addEthereumChain',
			params: [
				{
				  chainId: "0xfa",
				  chainName: "Fantom Opera Mainnet",
				  rpcUrls: ["https://rpc.ftm.tools/"],  //https://rpcapi.fantom.network
				  nativeCurrency: {
				    name: "ftm",
				    symbol: "ftm",
				    decimals: 18
				  },
				  blockExplorerUrls: ["https://ftmscan.com"]
				}
			],
	    })
	}
}


//获取当前用户的地址
async function _getAccount(){
	accounts = await window.ethereum.enable();
	window.address = accounts[0];
	return accounts[0] ;
}


//监听当前网络变化
window.ethereum.on('networkChanged', function (networkIDstring) {
   window.location.reload();
})


window.ethereum.on('accountsChanged', function (accounts) {
  window.location.reload();
})
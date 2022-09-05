async function mulitTranfer(type,token,addrs,myaddress,amount){
	let contract = await _loadContract("mulitTransfer",TranserContract);
	let web3 = new Web3(Web3.givenProvider);
	if(type == "TOKEN"){
		contract.methods.mulitTransferToken(_str16(amount),addrs,token).send({from:window.address})
	}
	if(type =="ETHER"){
		console.log(amount,addrs,window.address)
		let needAmount = addrs.length * amount
		contract.methods.mulitTransferETH(_str16(amount),addrs).send({
			from:window.address,
			value:_str16(needAmount)
		})
	}
}
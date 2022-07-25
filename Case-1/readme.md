# Solidity 开发案例 一

##功能一
- 铸造合约立即通缩（销毁） 50% 的代币

```
function burnToken()public onlyAdmin{
        require(block.timestamp >= burnTime + 30 days,"need 30 dyas to burn again after last burn");
        require(totalBurn >= burnNumber,"No Token Can burn.");
        totalBurn = totalBurn - burnNumber ;
        burnTime = block.timestamp ;
        _burn(burnNumber);
    }
```

- 将40%代币打入安全钱包

```
 function _toSafeWallet()  internal {
        uint amount = _totalSupply.div(100).mul(40);
        transferFrom(address(this),safeWallet,amount);
}
	
function setSafeWallet(address _addr) public onlyAdmin {
        safeWallet = _addr ;
}
```

- 10% 代币分配给所有投资者
> *投资者总共占据10%的token,投资者们可以根据管理员配置的数量进行每个月1次的提币操作。首次提币可提取投资者总量的10%；
如A投资者可提币总量为500万枚，首次提币50万枚；

```
function releaseInvest() public  {
        require(investDetail[msg.sender].status,"you are not investor!");
        require(block.timestamp >= investDetail[msg.sender].claimTime + 30 days,"haven't reach time to take the investment of token");
        require(investDetail[msg.sender].total >= investDetail[msg.sender].claimToken ,"it's empty,all investment of token have been released.");
        uint transferAmount;
        if(investDetail[msg.sender].claimTime == uint(0)){
            transferAmount =  (investDetail[msg.sender].total).div(10);
        }else{
            transferAmount =  investDetail[msg.sender].claimToken ;
        }

        _balances[address(this)] -= transferAmount ;
        _balances[msg.sender] += transferAmount ;
        investDetail[msg.sender].total -= transferAmount;
        investDetail[msg.sender].claimTime = block.timestamp ;
}
```

- 50%代币分批次打入黑洞
> （锁仓 3500天，每月释放打入黑洞）

```
function burnToken()public onlyAdmin{
        require(block.timestamp >= burnTime + 30 days,"need 30 dyas to burn again after last burn");
        require(totalBurn >= burnNumber,"No Token Can burn.");
        totalBurn = totalBurn - burnNumber ;
        burnTime = block.timestamp ;
        _burn(burnNumber);
    }

    function _burn( uint256 amount) internal onlyAdmin  {
        require(msg.sender != address(0), "ERC20: burn from the zero address");
        _beforeTokenTransfer(msg.sender, address(0), amount);
        uint256 accountBalance = _balances[address(this)];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _balances[address(this)] = accountBalance - amount;
        _totalSupply -= amount;
        emit Transfer(address(this), address(0), amount);
    }
```

![合作交流](https://futureworld.app/web/assets/fw/wechat.png "合作交流")


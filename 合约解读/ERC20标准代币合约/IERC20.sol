// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;


interface IERC20 {
    //event 事件 ，是告诉用户、开发者在合约交互中产生的日志
    event Transfer(address indexed from, address indexed to, uint256 value); //转账

 
    event Approval(address indexed owner, address indexed spender, uint256 value); //授权或取消授权


    function totalSupply() external view returns (uint256); //总代币发行量


    function balanceOf(address account) external view returns (uint256);  //用户的余额函数


    function transfer(address to, uint256 amount) external returns (bool);  //用户的转账函数


    function allowance(address owner, address spender) external view returns (uint256);  //授权金额

    function approve(address spender, uint256 amount) external returns (bool); 


    //授权转账的函数
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
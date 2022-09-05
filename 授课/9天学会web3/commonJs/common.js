/**
 * 通用的js函数库方便任何项目使用
**/

//多行地址地址分割数组&识别真假
function _getAddressFormat(str){
	let arr = str.split("\n")
	let res = [] ;
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] != "" && _verifyAddress(arr[i])){  //错误地址
			res.push(arr[i])
		}
	}
	return res ;
}


//验证以太坊地址格式
function _verifyAddress(address){
	if(address.length == 42){
		return true ;
	}else{
		return false ;
	}
}


function _str16(intnumber){
	return '0x0'+intnumber.toString(16);
}

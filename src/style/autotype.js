
//通过传入一个对象，将其内的值自动打印; time是自动打印间隔时间
var doAutoType = function(obj,time){
	var str = obj.html();
	obj.css("opacity","0");
	autoType(obj,str,time);
}


// 自动打字，传入一个对象，以及需要显示的值
var autoType = function(ele,str,t){
	ele.html(str.substring(0,1));
	ele.css("opacity","1");
	//console.log(str);
	var stopType = false;
	var tempWords = "";
	var time = t;

	var startType = setInterval(function(){
		if(tempWords.length == str.length){
			//打字打完了，就可以停止了
			stopType = true;
		}
		if(stopType){
			clearInterval(startType);
		}
		tempWords = str.substring(0,tempWords.length+1);
		ele.html(tempWords);

	},time);
};
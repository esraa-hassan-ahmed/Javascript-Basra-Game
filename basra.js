
$(document).ready(function(){
/********************************************** Get Elements *************************************************/	
var startBtn = document.getElementById("myBtn");
var playAgain = document.getElementById("playAgainBtn");
var BG = document.getElementsByClassName("BG");
var finalPage = document.getElementsByClassName("interface");
var myStatus = document.getElementsByClassName("myStatus");
var playerDiv = document.getElementsByClassName("player");
var computerDiv = document.getElementsByClassName("computer");
var groundDiv = document.getElementsByClassName("ground");
var BackDiv = document.getElementsByClassName("insertBack");
var myImages = document.getElementsByClassName("myImg");
var facedownImg = document.getElementsByClassName("facedown");
var count=0;
var count2=0;
var count3=0;
var timerCount=0;
finalPage[0].style.display="none";
BG[0].style.display="inline-grid";
/********************************************** Create Images *************************************************/
startBtn.addEventListener("click", function(){	
	count3=count3+1;
	$(".round_turn #roundNum").html(count3);
	$(".round_turn #playerNum").html(1);
	playerDiv[0].innerHTML="";
	computerDiv[0].innerHTML="";
    startBtn.style.display="none";
	for(var i=0;i<4;i++){
		/************************************ Facedown Images *****************************/
		var BackImg = document.createElement("img");
		BackImg.src = facedownImg[i].src;
		BackDiv[0].appendChild(BackImg);
		/************************************ Player Images *****************************/
        var randomNum = Math.round(Math.random()*(myImages.length-1));
		var playerImg = document.createElement("img");
		playerImg.src = myImages[randomNum].src;
		playerImg.id = myImages[randomNum].id;
		playerImg.alt = myImages[randomNum].alt;
		playerDiv[0].appendChild(playerImg);
		myImages[randomNum].remove();
		/************************************ Computer Images *****************************/
        var randomNum2 = Math.round(Math.random()*(myImages.length-1));
		var computerImg = document.createElement("img");
		computerImg.src = myImages[randomNum2].src;
		computerImg.id = myImages[randomNum2].id;
		computerImg.alt = myImages[randomNum2].alt;
		computerDiv[0].appendChild(computerImg);
		myImages[randomNum2].remove();
		/************************************ Player Images *****************************/
		var randomNum3 = Math.round(Math.random()*(myImages.length-1));
		while(myImages[randomNum3].getAttribute("src") == "cards/jack_of_clubs.png"||myImages[randomNum3].getAttribute("src") == "cards/jack_of_diamonds.png"||myImages[randomNum3].getAttribute("src") == "cards/jack_of_hearts.png"||myImages[randomNum3].getAttribute("src") == "cards/jack_of_spades.png"){
			   var randomNum3 = Math.round(Math.random()*(myImages.length-1));
		   }
		   var groundImg = document.createElement("img");
		   groundImg.src = myImages[randomNum3].src;
		   groundImg.id = myImages[randomNum3].id;
		   groundImg.alt = myImages[randomNum3].alt;
		   groundDiv[0].appendChild(groundImg);
		   myImages[randomNum3].remove();
	}
    player();	
});

/********************************************** Player Function *************************************************/
function player(){
	$(".player img").on("click",function(){
	var flag=false;
	var that=this;
	if(this.getAttribute("id")=="11" || this.getAttribute("alt")=="komy"){
		flag=true;
		if($(".ground img").length==0){
			flag=false
		}
		else{
			count=count+$(".ground img").length;
			$(".ground").append(this);
			$(".ground img").css("border","4px solid red");
			this.style.border="4px solid red";
			setTimeout(function(){
					$(".ground img").remove();
					$(that).remove();
					mySetTime();
			},1000);
		}
	}
	else{
		if(this.getAttribute("id")=="12" || this.getAttribute("id")=="13"){
			//debugger;
			for(var i=$(".ground img").length-1;i>=0;i--){	
				if(this.getAttribute("id")==$(".ground img")[i].getAttribute("id")){
					flag=true;
					count=count+1;
					$(".ground").append(this);
					$(".ground img")[i].style.border="4px solid yellow";
					this.style.border="4px solid yellow";
					setDelay(i);
				}
			}
		}
		else{
			//debugger;
			var groundNumbersPlayer=[];
			var myTargetPlayer = parseInt(this.getAttribute("id"));
			for(var i=0;i<$(".ground img").length;i++){
				if($(".ground img")[i].getAttribute("id")!="12" && $(".ground img")[i].getAttribute("id")!="13"){
					groundNumbersPlayer.push(parseInt($(".ground img")[i].getAttribute("id")));
				}
			}
			outPlayer = findSum(groundNumbersPlayer,myTargetPlayer);
			//console.log(outPlayer);
			for(var k=$(".ground img").length-1;k>=0;k--){
			loop2:for(var i=0;i<outPlayer.length;i++){
				//debugger;
				for(var j=0;j<outPlayer[i].length;j++){
					if($(".ground img")[k].getAttribute("id")==outPlayer[i][j].toString()){
						flag=true;
						count=count+1;
						outPlayer[i].splice(j,1);
						$(".ground").append(this);					
						$(".ground img")[k].style.border="4px solid yellow";
						this.style.border="4px solid yellow";
						setDelay(k);
						if(outPlayer[i].length==0){
							outPlayer.splice(i,1);
							break loop2
						}
						break loop2;
						//break;
					}	
				}
			}}
		}
	}
	function setDelay(i){
		setTimeout(function(){
			$(".ground img").eq(i).remove();
			$(that).remove();
			if($(".ground img").length == 0){
			   count=count+9;
			}
			mySetTime();	
		},1000);
	}
	if(flag==false){
		$(".ground").append(this);
		mySetTime()
	}
	
	if(flag==true){
		count=count+1;
	}

	function mySetTime(){
		$(".player_score #score").html(count);
		$(".round_turn #playerNum").html(2);
		$(".player img").css("pointer-events","none");
	}
	var myTimer = setInterval(function(){
		timerCount=timerCount+1;
		$(".comTimer #timerSec").html(timerCount);
	},1000);
	setTimeout(function(){
		//debugger;
		clearInterval(myTimer);
		var randomNumCom= Math.round(Math.random()*($(".computer img").length-1));
		$(".insertBack img").eq(randomNumCom).fadeOut(1000,function(){
			$(".insertBack img").eq(randomNumCom).remove();
			computer(randomNumCom);
		}); 		
	},3000);
});	
}
/********************************************** Sum Function *************************************************/
/*********************** Find Sum **********************************/
function findSum(groundNumbers, myTarget){
	//debugger;
	var sumSets = [];
	var numberSets = combinationSets(groundNumbers);
	for(var i=0; i < numberSets.length; i++){
		var result = [];
		var numberSet = numberSets[i]; 
		if(sum(numberSet) == myTarget){
			for( var j=0; j<numberSet.length;j++){
				result.push(inArray(numberSet[j],groundNumbers))
			}
			function inArray(num,arr){
				return (arr.indexOf(num)!=-1)
			}
			checkTrue = result.every(function(item, index, array){
				return item;
			});
			if(checkTrue==true){
				for( var j=0; j<numberSet.length;j++){
					groundNumbers.splice(groundNumbers.indexOf(numberSet[j]),1);
				}
				sumSets.push(numberSet);
			}
		}
	}
	return sumSets;
}
/*********************** Combination Sets **********************************/
function combinationSets(arr) {
	//debugger;
	var cS = [[]];
	for (var i=0; i < arr.length; i++) {
		for (var j = 0, len = cS.length; j < len; j++) {
			cS.push(cS[j].concat(arr[i]));
		}
	}
	return cS;
}
/*********************** Sum **********************************/
function sum(arr) {
	var total = 0;
	for (var i = 0; i < arr.length; i++)
		total += arr[i];
	return total
}

/********************************************** Computer Function *************************************************/
function computer(randomNumComputer){
	timerCount=0;
	$(".comTimer #timerSec").html(timerCount);
	//debugger;
	var flag=false;
	//var randomNumComputer= Math.round(Math.random()*($(".computer img").length-1));
	$(".ground").append($(".computer img").eq(randomNumComputer));
	//console.log($(".computer img").eq(randomNumComputer));
	var len=$(".ground img").length;
	if($(".ground img").eq($(".ground img").length-1).attr("id")=="11" || $(".ground img").eq($(".ground img").length-1).attr("alt")=="komy"){	
		if($(".ground img").length > 1){
			flag=true;
			count2=count2+$(".ground img").length-1;
			$(".ground img").css("border","4px solid red");
			$(".ground img").eq($(".ground img").length-1).css("border","4px solid red");
			setTimeout(function(){
					$(".ground img").remove();
					myTime();	
			},1000);
		}
		else{
			flag=false;
		}
	}
	else{
		if($(".ground img").eq($(".ground img").length-1).attr("id")=="12" || $(".ground img").eq($(".ground img").length-1).attr("id")=="13"){
			for(var i=$(".ground img").length-2;i>=0;i--){	
			//debugger;
				if($(".ground img").eq($(".ground img").length-1).attr("id")==$(".ground img").eq(i).attr("id")){
					debugger;
					flag=true;
					count2=count2+1;
					$(".ground img").eq(i).css("border","4px solid yellow");
					$(".ground img").eq($(".ground img").length-1).css("border","4px solid yellow");
					setDelay2(i);
				}
			}
	    }
		else{
			debugger;
			//var len=$(".ground img").length;
			var groundNumbersComputer=[];
			var myTargetComputer = parseInt($(".ground img").eq($(".ground img").length-1).attr("id"));
			for(var i=0;i<=$(".ground img").length-2;i++){
				//console.log($(".ground img").eq(i).attr("id")!="12" && $(".ground img").eq(i).attr("id")!="13");
				if($(".ground img").eq(i).attr("id")!="12" && $(".ground img").eq(i).attr("id")!="13"){
					groundNumbersComputer.push(parseInt($(".ground img").eq(i).attr("id")));
				}	
			}
			//console.log(groundNumbersComputer);
			outComputer = findSum(groundNumbersComputer,myTargetComputer);
			//console.log(outComputer);
			for(var k=$(".ground img").length-2;k>=0;k--){
				loop2:for(var i=0;i<outComputer.length;i++){
					for(var j=0;j<outComputer[i].length;j++){
						if($(".ground img").eq(k).attr("id")==outComputer[i][j].toString()){
							flag=true;
							count2=count2+1;
							outComputer[i].splice(j,1);
							$(".ground img").eq(k).css("border","4px solid yellow");
							$(".ground img").eq($(".ground img").length-1).css("border","4px solid yellow");
							setDelay2(k);
							if(outComputer[i].length==0){
								outComputer.splice(i,1);
								break loop2
							}
							break loop2;
						}
					}
			}}
		}
	}
	function setDelay2(i){
		setTimeout(function(){
			if($(".ground img").length==len){
				$(".ground img").eq($(".ground img").length-1).remove();
			}
			$(".ground img").eq(i).remove();
			if($(".ground img").length==0){
				count2=count2+9;
			}
			myTime();		
		},1000);
	}
	
	if(flag==false){
		 myTime();
	}
	
	if(flag==true){
	   count2=count2+1;
	}
	
	function myTime(){
		$(".computer_score #score").html(count2);
		$(".round_turn #playerNum").html(1);
		$(".player img").css("pointer-events","auto");
	}
	
	if($(".computer img").length==0){
		setTimeout(function(){
				newRound();
		},3000);
	}
}
/******************************************************** Round Function *********************************/
function newRound(){
	if(myImages.length != 0){
		count3=count3+1;
		$(".round_turn #roundNum").html(count3);
		for(var i=0;i<4;i++){
			/************************************ Facedown Images *****************************/
			var BackImg = document.createElement("img");
			BackImg.src = facedownImg[i].src;
			BackDiv[0].appendChild(BackImg);
			/************************************ Player Images *****************************/
			var randomNum = Math.round(Math.random()*(myImages.length-1));
			var playerImg = document.createElement("img");
			playerImg.src = myImages[randomNum].src;
			playerImg.id = myImages[randomNum].id;
			playerImg.alt = myImages[randomNum].alt;
			playerDiv[0].appendChild(playerImg);
			myImages[randomNum].remove();
			/************************************ Computer Images *****************************/
			var randomNum2 = Math.round(Math.random()*(myImages.length-1));
			var computerImg = document.createElement("img");
			computerImg.src = myImages[randomNum2].src;
			computerImg.id = myImages[randomNum2].id;
			computerImg.alt = myImages[randomNum2].alt;
			computerDiv[0].appendChild(computerImg);
			myImages[randomNum2].remove();
		}
		 player();
	}
	else{
        if(count>count2){
		   finalPage[0].style.display="inline-flex";
	       BG[0].style.display="none";
		}		
		else if(count2>count){
		   finalPage[0].style.display="inline-flex";
	       BG[0].style.display="none";
		   myStatus[0].innerHTML="You Are Loser"
		}
		else if(count2==count){
		   finalPage[0].style.display="inline-flex";
	       BG[0].style.display="none";
		   myStatus[0].innerHTML="You Are Equal"
		}
		playAgain.addEventListener("click", function(){
			location.reload()
		});
	}
}
});




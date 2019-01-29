/**
  * APP configuration information
  */
var appConfig = {
	version: "3.1.0",
	buildId: "1.0.0",
	appUrl:"",
};

window.onload = function(){
    //Click function
    clickFunc();
    //Mobile slide function, history
    //swiperHistory();
};

function clickFunc(){
	var container = document.getElementById("container");
    var calc = document.getElementById("calc"),
        spans = document.getElementById("win-tool").getElementsByTagName("span"),
        equals = document.getElementById("equals"),     //Equal sign
        remove = document.getElementById("remove");     //Delete symbol

    /*** Three small buttons ***/
    var close = document.getElementById("close"),       //Close button
        max = document.getElementById("max"),           //Maximize button
        resize = document.getElementById("resize");         //Minimize button

    var resultDiv = document.getElementById("result");  //Result area

    var saveDiv = document.getElementById('saveBtn'); // Save Button


    function saveNumbers(){

        //Mybry.wdb.removeAllArray();

        var storeArray = Mybry.wdb.getValueArray();
        console.log(storeArray);

        let y = res.innerHTML;

        var jsonStr = JSON.stringify(storeArray);
        console.log(jsonStr);

        var xhttp = new XMLHttpRequest();
            /*xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                }
            };*/
            xhttp.open("POST", "save.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("expression='"+jsonStr+"'&value="+y);
    }

    /*** history record ***/
    var historyBox = document.getElementById("historyBox"),
        delBtn = historyBox.querySelector(".remove a");
    var historyUl = historyBox.querySelector("ul");

    /***********Mouse over three small buttons to display function icons***********/
    max.onmouseover = close.onmouseover = function(){
    	this.innerHTML = this.dataset.ico;
    };
    max.onmouseout = close.onmouseout = function(){
    	this.innerHTML = "&nbsp;";
    };

    /***********Close button***********/
    close.onclick = function(e){
        var h = calc.offsetHeight + 15;
        calc.style.webkitTransform = "translateY("+ h+"px)";
        calc.style.transform = "translateY("+ h+"px)";
        e.stopPropagation();
    };
    /***********Switch size***********/
    resize.onclick = function(e){
    	e = e || window.event;
    	movePosition("left");
        e.stopPropagation();
    };
    
    /***********Maximize button***********/
    max.onclick = function(){
        maxCalc();
    };
    function maxCalc(){
    	var that = this;
    	var spans = document.querySelectorAll("#bottom .row");
        if(container.classList.contains("flexbox")){        //Zoom out
            container.classList.remove("flexbox");
            calc.classList.remove("maxCalc");
            for(var i=0; i<spans.length; i++){
            	spans[i].classList.remove("mb");
            }
            document.getElementsByTagName("html")[0].classList.remove("maxhtml");
            that.dataset["ico"] = "口";
            that.title = "maximize";
        }else{          //amplification
            container.classList.add("flexbox");
            calc.classList.add("maxCalc");
            for(var i=0; i<spans.length; i++){
            	spans[i].classList.add("mb");
            }
            document.getElementsByTagName("html")[0].classList.add("maxhtml");
            that.dataset["ico"] = "※";
            that.title = "Restore size";
        }
        isResOverflow("max");
    }

    /***********Click on the keyboard***********/
    var keyBorders = document.querySelectorAll("#bottom span"),
        express = document.getElementById("express"),//Calculation expression
        res =  document.getElementById("res"),  //Output result
        keyBorde = null;        //keyboard
    var preKey = "",            //Last pressed keyboard
        isFromHistory = false;  //Whether it comes from history
    //symbol
    var symbol = {"+":"+","-":"-","×":"*","÷":"/","%":"%","=":"="};

    /***********Keyboard button***********/
    for(var j=0; j <keyBorders.length; j++){
        keyBorde = keyBorders[j];

        keyBorde.onclick = function() {
            var number = this.dataset["number"];
            clickNumber(number);
        };
    }
    
    /**
     * Click on the keyboard to enter
     * @param {string} number entered content
     * */
    function clickNumber(number){

        if (number === "save") {
            saveNumbers();
            return false;
        }

    	var resVal = res.innerHTML;		//result
        var exp = express.innerHTML;	//expression
        //The last digit of the expression
        var expressEndSymbol = exp.substring(exp.length-1,exp.length);
        //Input can only be made when the click and delete buttons are not clicked
        if(number !== "←" || number !== "C"){
        	//Is there already a point, if it exists then can't enter the dot, and the previous character is not a symbol character
        	var hasPoint = (resVal.indexOf('.') !== -1)?true:false;
        	if(hasPoint && number === '.'){
        		//If the previous character is a symbol, it becomes a 0.xxx form.
        		if(symbol[preKey]){
        			res.innerHTML = "0";
        		}else{
        			return false;
        		}
        	}
            //Convert display symbol
            if(isNaN(number)){
                number = number.replace(/\*/g,"×").replace(/\//g,"÷");
            }
            //If the input is a number, then the input cannot be entered again when it reaches a fixed length.
            if(!symbol[number] && isResOverflow(resVal.length+1)){
                return false;
            }
            //Clicked on the symbol
            //Calculate the last result
            if(symbol[number]){
            	//Is the last click of the symbol key?
                if(preKey !== "=" && symbol[preKey]){
                    express.innerHTML = exp.slice(0,-1) + number;
                }else{
                    if(exp == ""){
                        express.innerHTML = resVal + number;
                    }else{
                        express.innerHTML += resVal + number;
                    }
                    if(symbol[expressEndSymbol]){
                        exp = express.innerHTML.replace(/×/g,"*").replace(/÷/,"/");
                        res.innerHTML = eval(exp.slice(0,-1));
                    }
                }                  
            }else{
                //If the first digit is a symbol, 0
                if((symbol[number] || symbol[preKey] || resVal=="0") && number !== '.'){
                    res.innerHTML = "";
                }
                res.innerHTML += number;
            }
            preKey = number;
        }
    }

    /***********Equal, calculation result***********/
    equals.onclick = function(){
        calcEques();
    };
    
    function calcEques(){
    	var expVal = express.innerHTML, val = "";
        var resVal = res.innerHTML;
        //The last digit of the expression
        if(expVal){
            var expressEndSymbol = expVal.substring(expVal.length-1,expVal.length);
            try{
                if(!isFromHistory){
                    var temp = "";
                    if(symbol[expressEndSymbol] && resVal){
                        temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                        temp = eval(temp.slice(0,-1)) + symbol[expressEndSymbol] + resVal;
                    }else{
                        temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                    }
                    val = eval(temp);
                }else{
                    val = resVal;
                }
            }catch(error){
                val = "<span style='font-size:1em;color:red'>Erro：Calculation error！</span>";
            }finally{
                express.innerHTML = "";
                res.innerHTML = val;
                preKey = "=";
                saveCalcHistory(expVal+resVal+"="+val);
                isResOverflow(resVal.length);
                isFromHistory = false;
            }
        }
    }
	
	
    /***********Mobile dialing function***********/
    //Mobile long press event
    $(equals).on("longTap",function(){
    	//console.log("sdsdsd");
    	var num = res.innerHTML;
        if(num && num !== "0"){
			var regx = /^1[0-9]{2}[0-9]{8}$/;
			if(regx.test(num)){
				//console.log("Is the mobile number");
				var telPhone = document.getElementById("telPhone");
	            telPhone.href = "tel:"+num;
	            telPhone.target = "_blank";
	            telPhone.click();
			}
        }
    });
    


    /***********Reset operation***********/
   	var resetBtn = document.getElementById("reset");       //reset button
    resetBtn.onclick = function(){
        res.innerHTML = "0";
        express.innerHTML = "";
    };

    /***********Subtraction operation***********/
    remove.onclick = function(){
        var tempRes = res.innerHTML;
        if(tempRes.length>1){
            tempRes = tempRes.slice(0,-1);
            res.innerHTML = tempRes;
        }else{
            res.innerHTML = 0;
        }
    };

    /***********Historical function***********/
    var history = document.getElementById("history"),
        historyBox = document.getElementById("historyBox");
    var about = document.getElementById("about");
    about.onclick = history.onclick = function(e){
        e = e || window.event;
        var target = e.target.id || window.event.srcElement.id;

        historyBox.style.webkitTransform = "none";
        historyBox.style.transform = "none";
        e.stopPropagation();
        //Clicked on history
        if(target == "h"){
        	//Restore display delete button
        	delBtn.style.display = "inline-block";
        	
            var keyArray = Mybry.wdb.getKeyArray();
            var separate = Mybry.wdb.constant.SEPARATE;
            keyArray.sort(function(a,b){
                var n = a.split(separate)[1];
                var m = b.split(separate)[1];
                return m - n;
            });
            var html = [],val = "";
            for(var i=0; i<keyArray.length; i++){
                val = Mybry.wdb.getItem(keyArray[i]);
                html.push("<li>"+val+"</li>");
            }
            if(html.length>0){
                historyUl.innerHTML = html.join("");
            }else{
                historyUl.innerHTML = "No history yet";
            }

            //Add history data to the calculator
            var hLis = historyUl.querySelectorAll("li");
            for(var i=0; i<hLis.length; i++){
                hLis[i].onclick = function(){
                    var express = this.innerHTML;
                    var exp = express.split("=")[0],
                        res = express.split("=")[1];
                    resultDiv.querySelector("#express").innerHTML = exp;
                    resultDiv.querySelector("#res").innerHTML = res;
                    isFromHistory = true;
                };
            }
        }
        //Click is about
        if(target == "au"){
        	// Undelete button display
        	delBtn.style.display = "none";
            historyBox.children[0].children[0].innerHTML = "<div style='padding:5px;color:#000;'>"
            	+ "<p><i class='iconfont'>&#xe608;</i> pure HTML, CSS, JS, PHP writing</p>"
                + "<p><i class='iconfont'>&#xe608;</i> The calculator layout uses CSS3 FlexBox layout</p>"
                + "<p><i class='iconfont'>&#xe608;</i> Mobile App is built using HBuild</p>"
                + "<p><i class='iconfont'>&#xe608;</i> On the app, press the equal sign to enter the phone number when entering the phone number</p>"
                + "<p><i class='iconfont'>&#xe608;</i> On the app, swipe left and right to switch to one-hand mode</p>"
                + "<p><i class='iconfont'>&#xe601;</i> </p>"
                + "<p><i class='iconfont'>&#xe605;</i> </p>"
                + "</div>";
            
            //Check the new version
            updateApp();    
        }
    };

    window.onclick = function(e){
        var e = e || window.event;
        var target = e.target.className || e.target.nodeName;
        //If you click on the history DIV and delete button DIV, it will not be hidden.
        var notTarget =  {"con":"con","remove":"remove","UL":"UL","P":"P"};
        if(!notTarget[target]){
            //If set minimized
            var ts = historyBox.style.transform || historyBox.style.webkitTransform;
            if(ts && ts == "none"){
                historyBox.style.webkitTransform = "translateY(102%)";
                historyBox.style.transform = "translateY(102%)";
            }
        }
        //Restore display delete button
        //historyBox.children[1].children[0].className = "icon_del";
    };

    /***********Clear history***********/
    delBtn.onclick = function(e){
        var e = e || window.event;
        e.stopPropagation();
        if(Mybry.wdb.deleteItem("*")){
            historyUl.innerHTML = "No history yet";
        }
    };

    /**
     * Save calculation history
     * @param val expression to be recorded
     */
    function saveCalcHistory(val){
        var key = Mybry.wdb.constant.TABLE_NAME + Mybry.wdb.constant.SEPARATE + Mybry.wdb.getId();
        window.localStorage.setItem(key,val);
    }

    /**********Automatically set the text size************/
    function isResOverflow(leng){
        var calc = document.getElementById("calc");
        var w = calc.style.width || getComputedStyle(calc).width || calc.currentStyle.width;
            w = parseInt(w);

        //Determine whether it is a mobile terminal
        if((Mybry.browser.versions.android || Mybry.browser.versions.iPhone || Mybry.browser.versions.iPad) && !symbol[preKey]) {
            if(leng > 15){
                return true;
            }
        }else{
            if(leng > 10){
                if(w == 300) {
                    maxCalc();
                }else{
                    if(leng > 16){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    //One-hand mode
    singleModel();
}

function updateApp(){
	//Check the new version
    var updateApp = document.getElementById("updateApp");
    updateApp.onclick = function(){
    	var _this = this;
    	$.ajax({
			type:'get',
			url:'',
			dataType:'jsonp',
			beforeSend : function(){
				_this.innerHTML = "<i class='iconfont updateAppIcon updateAppIconRotate'>&#xe604;</i> Checking new version...";
			},
			success:function(data){
				var newVer = data[0].version;
				if(newVer > appConfig.version){
					var log = data[0].log;
					var downloadUrl = data[0].downloadUrl;
					if(confirm("Check to the new version【"+newVer+"】，Download now？\n Update log：\n " + log)){
						var a = document.getElementById("telPhone");
						a.href = downloadUrl;
						a.target = "_blank";
						a.click();
					}
				}else{
					alert("It is the latest version.！");
				}
				_this.innerHTML = "<i class='iconfont updateAppIcon'>&#xe604;</i> Check the new version";
			},
			error:function(msg){
				_this.innerHTML = "<i class='iconfont updateAppIcon'>&#xe604;</i> Check the new version";
				alert("检查失败："+msg.message);
			}
		});
    }
}

/** One-hand mode */
function singleModel(){
	var calc = document.getElementById("calc");
	var startX = 0,moveX = 0,distanceX = 0;
    var distance = 100;   
    var width = calc.offsetWidth;
    //Sliding event
    calc.addEventListener("touchstart",function(e){
        startX = e.touches[0].clientX;
    });
    calc.addEventListener("touchmove",function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    });
    window.addEventListener("touchend",function(e){
        if(Math.abs(distanceX) > width/3 && isMove){
        	if( distanceX > 0 ){
        		positionFun("right");
        	}else{
        		positionFun("left");
        	}
        }
        startY = moveY = 0;
        isMove = false;
    });    
}

/**
 * Switch one-hand mode
 * @param {String} postion Left or right slide, value：left,right
 */
function movePosition( posi ){
	var telPhone = document.getElementById("telPhone");
	var flag = telPhone.dataset.flag;
	var styles = calc.getAttribute("style");
	
	if(flag){
		if(styles){
			var w = styles.split(";")[0].split(":")[1];
			if(w == "80%"){
				calc.setAttribute("style","width: 100%; height: 100%; position: absolute;left: 0px; bottom: 0px;");
			}
		}
		if(posi === "left"){
			calc.setAttribute("style","width: 100%; height: 100%; position: absolute;left: 0px; bottom: 0px;");
		}else{
			calc.setAttribute("style","width: 80%; height: 70%; position: absolute;right: 0px; bottom: 0px;");
		}
		//Calculate the height of the expression area
    	document.getElementById("result").style.minHeight = "90px";
    	//Calculate expression font size
    	document.getElementById("res").style.fontSize = "4.5rem";
        telPhone.dataset.flag = "";
	}else{
		positionFun(posi);
	}
}

function positionFun(postion){
	if(postion === "left"){
		calc.setAttribute("style","width: 80%; height: 70%; position: absolute;left: 0px; bottom: 0px;");
	}else{
		calc.setAttribute("style","width: 80%; height: 70%; position: absolute;right: 0px; bottom: 0px;");
	}
	//Calculate the height of the expression area
	document.getElementById("result").style.minHeight = "0";
	//Calculate expression font size
	document.getElementById("res").style.fontSize = "3.5rem";
	telPhone.dataset.flag = "yes";
}

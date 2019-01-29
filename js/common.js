window.Mybry = {};

Mybry.transitionEnd  = function(dom,callback){
    /*
     * 1. Who will add the transition end event?
     * 2. What do we need to do after the transition?
     * */

    //Basic judgment
    if(!dom || typeof dom != 'object' ) return false;

    dom.addEventListener('transitionEnd',function(){
        //Processing
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd',function(){
        //Processing
        callback && callback();
    });
};
//Mobile click event
Mybry.tap = function(dom,callback){
    //Basic judgment
    if(!dom || typeof dom != 'object' ) return false;
    var startTime = 0,isMove = false;
    dom.addEventListener('touchstart',function(e){
        startTime = Date.now();
    });
    dom.addEventListener('touchmove',function(e){
        isMove = true;
    });
    dom.addEventListener('touchend',function(e){
        if((Date.now()-startTime) < 150 && !isMove){
            //Processing
            callback && callback(e);
        }
        //Reset parameter
        startTime = 0,isMove = false;
    });
};

Mybry.wdb = {
    //Custom key identifier
    constant : {
        TABLE_NAME:"calc",     //Table name
        SEPARATE:"-"            //Separator
    },
    //Get the latest ID of the database, increment
    getId : function(){
        var id = 0;  //Key index
        var appDataKey = this.getKeyArray();
        var spearate = this.constant.SEPARATE;
        if(appDataKey.length>0){
            var indexArray = [];    //All index values
            for(var i=0; i<appDataKey.length; i++){
                indexArray.push(parseInt(appDataKey[i].split(spearate)[1]));
            }
            id = this._maxId(indexArray) + 1;
        }
        return id;
    },
    //Get the name of a single data, index or key
    getItem : function(value){
        if(!value) return false;
        if(isNaN(value)){
            return localStorage.getItem(value);
        }else{
            var key = localStorage.key(parseInt(value));
            return localStorage.getItem(key);
        }
    },
    deleteItem : function(value){
        if(!value) return false;
        if(isNaN(value)){
            //If you enter *, delete all data
            if(value === "*"){
                var appDataKey = this.getKeyArray();
                for(var i=0; i<appDataKey.length; i++){
                    localStorage.removeItem(appDataKey[i]);
                }
            }else{
                localStorage.removeItem(value);
            }
        }else{
            var key = localStorage.key(parseInt(value));
            localStorage.removeItem(key);
        }
        return true;
    },
    _maxId : function(array){
        if(!array) return false;
        if(!Array.isArray(array)) return false;
        array.sort(function(a,b){
            return a - b;
        });
        return array[array.length-1];
    },
    getValueArray: function(){
        var localStorage = window.localStorage;
        return localStorage;
    },
    removeAllArray: function(){
        window.localStorage.clear();
    },
    getKeyArray : function(){
        var localStorage = window.localStorage;
        var storageLen = localStorage.length;
        var spearate = this.constant.SEPARATE,
            tableName = this.constant.TABLE_NAME;
        //Calculator all the data
        var appDataKey = [];
        if(storageLen>0){
            var itemKey = "";
            for(var i=0; i<storageLen; i++){
                //calc-0
                itemKey = localStorage.key(i);
                //Determine if it is the data of the app
                var flagIndex = itemKey.indexOf(spearate);
                if(flagIndex != -1 ){
                    var startWord = itemKey.split(spearate)[0];
                    if(startWord == tableName){
                        appDataKey.push(itemKey);
                    }
                }
            }
        }
        return appDataKey;
    }
};

Mybry.browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //Mobile terminal browser version information
            trident: u.indexOf('Trident') > -1, //IE kernel
            presto: u.indexOf('Presto') > -1, //Opera kernel
            webKit: u.indexOf('AppleWebKit') > -1, //Apple, Google kernel
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //Firefox kernel
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //Whether it is a mobile terminal
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //iOS terminal
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android terminal or uc browser
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //Whether it is an iPhone or QQHD browser
            iPad: u.indexOf('iPad') > -1, //Whether iPad
            webApp: u.indexOf('Safari') == -1 //Whether the web should be a program, no head and bottom
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

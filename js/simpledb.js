function simpleDB(type) {
    this.type = type;
    if(!localStorage.getItem('simpleDB')) localStorage.setItem('simpleDB', JSON.stringify({}));
    this.db = JSON.parse(localStorage.getItem('simpleDB'));
    if(!this.db.hasOwnProperty(this.type)) {
        this.db[this.type] = {}
        localStorage.setItem('simpleDB', JSON.stringify(this.db));
    }
    this.db = JSON.parse(localStorage.getItem('simpleDB'));
   
    this.arrayShift = function(inputArr) {
        var props = false,
        shift = undefined,
        pr = '',
        allDigits = /^\d$/,
        int_ct = -1,
        _checkToUpIndices = function (arr, ct, key) {
            if (arr[ct] !== undefined) {
                var tmp = ct;
                ct += 1;
                if (ct === key) {
                    ct += 1;
                }
                ct = _checkToUpIndices(arr, ct, key);
                arr[ct] = arr[tmp];
                delete arr[tmp];
            }
            return ct;
        };
       
        if (inputArr.length === 0) {
            return null;
        }
        if (inputArr.length > 0) {
            return inputArr.shift();
        }
    }

   
    this.check = function(key) {
        if(!this.db[this.type].hasOwnProperty(key)) {
            return key;
        } else {
            return this.check(this.uniqid());
        }
    }
   
    this.count = function(mixed_var, mode) {
        var key, cnt = 0;
        if (mixed_var === null || typeof mixed_var === 'undefined') {
            return 0;
        } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
            return 1;
        }
        if (mode === 'COUNT_RECURSIVE') {
            mode = 1;
        }
        if (mode != 1) {
            mode = 0;
        }
       
        for (key in mixed_var) {
            if (mixed_var.hasOwnProperty(key)) {
                cnt++;
                if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
                    cnt += this.count(mixed_var[key], 1);
                }
            }
        }
        return cnt;
    }
   
    this.delete = function(key) {
        this.getDB();
        try {
            var type = this.db[this.type];
        } catch(err) {
            var type = this.db[this.type];
        }
        delete type[key];
        this.db[this.type] = type;
        localStorage.setItem('simpleDB', JSON.stringify(this.db));
    }
   
    this.get = function(key) {
        this.getDB();
        if(typeof key == 'undefined') {
            var output = []
            for(var key in this.db[this.type]) {
                try {
                    output[key] = JSON.parse(this.db[this.type][key]);
                } catch(err) {
                    output[key] = this.db[this.type][key];
                }
            }
            return this.toObject(output);
        } else {           
            try {
                return this.db[this.type][key];
            } catch(err) {
                return false;
            }
        }
        return false;
    }

    this.getDB = function() {
        this.db = JSON.parse(localStorage.getItem('simpleDB'));
    }
       
    this.getJSON = function(key) {
        this.getDB();
        return JSON.stringfy(this.db[this.type][key]);
    }

    this.objectToQueryString = function(obj) {
        var output = '';
        var count  = 0;
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                output += key+'='+obj[key]+'&';
            }
        }
        return output.slice(0, -1);
    }
       
    this.post = function(content) {
        this.getDB();
        var key = this.check(this.uniqid());
        this.db[this.type][key] = content;
        localStorage.setItem('simpleDB', JSON.stringify(this.db));
        return key;
    }
   
    this.parseStr = function(q) {
        var arr = {};
        var query = String(q).split('&');
        for(var key in query) {
            if(query.hasOwnProperty(key)) {
                var str = String(query[key]).split('=');
                var va = str[1];
                arr[str[0]] = str[1];
            }
        }
        return arr;
    }
   
    this.put = function(id, content) {
        this.getDB();
        var key = id;
        this.db[this.type][key] = content;
        localStorage.setItem('simpleDB', JSON.stringify(this.db));
        return key;   
    }
   
    this.query = function(q) {
        var arr = this.parseStr(q);
        var get = this.get();
        var out = {};
        var empty = true;
        if(get) {
            for(var key in get) {
                if(get.hasOwnProperty(key)) {
                    var objectString = this.objectToQueryString(get[key]);
                    if(this.testQueryArray(arr, objectString)) {
                        var empty = false;
                        out[key] = get[key];
                    }
                }
            }
        }
        if(empty) {
            return false;
        } else {
            return out;
        }       
    }
   
    this.returnSingleId = function(a) {
        if(a) {
            for(var key in a) {
                if(a.hasOwnProperty(key)) {
                    return key;
                }
            }
        } else {
            return false;
        }
    },
   
    this.shiftArray = function(arr) {
        if(this.count(arr) == 1) {
            return this.shiftArray(arr);
        } else {
            return arr;
        }
    }
   
    this.testQueryArray = function(array, objectString) {
        var testArray = [];
        for(var key in array) {
            if(array.hasOwnProperty(key)) {
                testArray.push(key+'='+array[key]);
            }
        }
       
        var count = this.count(testArray);
        var testCount = 0;

        for(var key in testArray) {
            if(testArray.hasOwnProperty(key)) {
                if(objectString.indexOf(testArray[key]) !== -1) {
                    testCount++;
                }
            }
        }
       
        if(count == testCount) {
            return true;
        } else {
            return false;
        }
    }
   
    this.timestamp = function(id) {
        var str = String(id).replace('id');
        return parseInt(str);
    }
   
    this.toObject = function(arr) {
        var rv = {};
        for(var key in arr) {
            if(arr.hasOwnProperty(key)) {               
                rv[key] = arr[key];
            }
        }
        return rv;
    }
   
    this.uniqid = function(){
        var d = new Date();
        return 'id'+d.getTime();
    }
}
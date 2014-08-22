var library = {
	apiUrl: function(){
		var h = String(window.location).split('apps');
		return h[0]+'api/';
	},
	
	fromCamelCase: function(x){
		return library.ucwords(x.split(/(?=[A-Z])/).join(' '));
	},	
	
	getQueryVariable: function(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	},
	
	loadFile: function (filename, filetype){
		if (filetype == "js") {
			var fileref = document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
		} else if (filetype == "css") {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref);
	},
					
	processResponse: function(response) {
		var error = '';
		if(response.hasOwnProperty('error')) {
			$.each(response.error, function(key, value) {
				error += value+"\n";
			});
		}
		if(error != '') {
			alert(error);
			return false;
		} else {
			return true;
		}
	},
	
	ucwords: function(str) {
		return (str + '')
			.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
				return $1.toUpperCase();
			});
	}
}
var api = {
	url: 'https://my.guidelinecentral.com/api/',
	token: '26f00b05722ee23b4506931116191867c699fa60',
	call: function(data, callback){		
	    $.getJSON(api.url+'?jsoncallback=?'+'&'+data, function(response) {
			if(library.processResponse(response)) {
				if(typeof callback !== 'undefined') callback(response);
			}
	    });
	}	
}
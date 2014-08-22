var db = new simpleDB('user');
var user = db.get('user');
if(user) {
	if(user.token) {
		$('#nav').html(ui.buttons);
	} else {
		alert('Session token missing. Please log in.');
		db.delete('user');
		location.reload();
	}
} else {
	$('#ajaxDisplay').html(ui.loginForm);
	$('#loginForm').button();
}

$(document).on('submit', '#loginForm', function(){
	$(this).find('button').button('loading');
	var data = $(this).serialize()+'&token='+api.token;
	api.call(data, function(response){
		db.put('user', response.output.user);
		location.reload();
	});
	return false;
});

$(document).on('click', '#nav button', function(){
	$('#nav button').removeClass('active');
	$(this).addClass('active');
	$('#ajaxDisplay').html(ui.loadingBar);
	var action = $(this).attr('data-action');
	var type = String(action).replace('get', '').toLowerCase();
	if(type == 'organizations') type = 'authoringOrganizations';
	var data = 'action='+action+'&t='+user.token;
	var html = '<div class="list-group">';
	api.call(data, function(response){
		$.each(response.output[type], function(k, v){
			html += '<a data-toggle="modal" data-target=".bs-example-modal-lg" href="#" class="list-group-item">'+v+'</a>';
		});
		html += '</div>';
		$('#ajaxDisplay').html(html);
	});	
});

$(document).on('click', '#ajaxDisplay .list-group-item', function(){
	$('#myModal .modal-body').html(ui.loadingBar);
	$('#ajaxDisplay .list-group-item').removeClass('active');
	$(this).addClass('active');
	var term = $(this).html();
	var type = $('#nav button.active').html();
	var data = 'action=getSummariesFor'+type+'&'+String(type).toLowerCase()+'='+term+'&t='+user.token;
	var html = '<div class="list-group">';
	api.call(data, function(response){
		$.each(response.output.summaries, function(k, v){
			html += '<a target="_blank" href="'+response.output.baseUrl+v.link+'" class="list-group-item">'+
			'<h4 class="list-group-item-heading">'+v.title+'</h4>'+
			'<p class="list-group-item-text">'+v.description+'</p>'+
			'</a>';
		});
		html += '</div>';
		$('#myModal .modal-body').html(html);
	});
	return false;
});

$(document).on('click', '#logOut', function(){
	db.delete('user');
	location.reload();
	return false;
});
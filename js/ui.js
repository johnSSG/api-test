var ui = {
	buttons: '<h1>Browse Summaries | <a id="logOut" href="#">Log Out</a></h1><div id="summaryButtons" class="btn-group">'+
	'<button data-action="getCategories" class="btn btn-default">Category</button>'+
	'<button data-action="getOrganizations" class="btn btn-default">Organization</button>'+
	'<button data-action="getProfessions" class="btn btn-default">Profession</button>'+
	'<button data-action="getSpecialties" class="btn btn-default">Specialty</button>'+
	'</div>',
	
	loadingBar: '<div class="loadingBar progress">'+
	'<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>'+
	'</div>',
	
	loginForm: '<form id="loginForm">'+
	'<h1>Please Log In</h1>'+
	'<label>Email<br /><input class="form-control" name="email" type="email" placeholder="email" /></label><br />'+
	'<label>Password<br /><input class="form-control" name="password" type="password" /></label><br />'+
	'<input name="action" value="login" type="hidden" />'+
	'<button data-loading-text="Please Wait..." class="btn btn-primary">Submit</button>'+
	'</form>',
	
	list: '<div class="list-group">'+
	'<a href="#" class="list-group-item">'+
	'<h4 class="list-group-item-heading">List group item heading</h4>'+
	'<p class="list-group-item-text">...</p>'+
	'</a>'+
	'</div>'
}
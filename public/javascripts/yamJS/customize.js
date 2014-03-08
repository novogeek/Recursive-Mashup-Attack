$(document).ready(function(){
	$('#btnCustomize').click(function(){
		var address=$('#address').val();
		gMapCodeAddress(address);
		showpics(address);
	});
});
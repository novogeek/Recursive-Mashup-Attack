/*
 * Library functions
 */
exports.notFound=function(req, res){
	res.status(404);
	var msg="Sorry! No such page :-) ";
	_renderPage(res, '404!', msg);
}

function _renderPage(responseObj, title, msg){
	responseObj.render('404', { customTitle: title, customMsg: msg});
}

exports.customErrorPage=_renderPage;

exports.index = function(req, res){
	res.render('index');
};

exports.partner = function(req, res){
	res.render('partner-gadget');
};

exports.attackerGadget = function(req, res){
	res.render('attacker-gadget');
};

exports.attackerParent = function(req, res){
	res.render('attacker-parent');
};

/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.HTMLtoolbox) === 'undefined') extensions.HTMLtoolbox = { version : '2.5.0' };

(function() {
	var self = this,
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService).getBranch("extensions.HTMLtoolbox.");
		
	if (!('HTMLtoolbox' in ko)) ko.extensions = {}; 
	var myExt = "HTMLtoolbox@babobski.com" ; 
	if (!(myExt in ko.extensions)) ko.extensions[myExt] = {};
	if (!('myapp' in ko.extensions[myExt])) ko.extensions[myExt].myapp = {};
	var HTMLtData = ko.extensions[myExt].myapp;
	
	html_entity_insert = function(v_string, v_integer){
		var is_number = prefs.getBoolPref('useNumber') || false;
	
		if (is_number == false) {
			entity = '&' + v_string + ';';
		} else {
			entity = '&#' + v_integer + ';';
		}
		
	 try {
		var scimoz = ko.views.manager.currentView.scimoz;
		 scimoz.insertText(scimoz.currentPos ,entity);
		 scimoz.gotoPos(scimoz.currentPos + entity.length);
	 } catch(ex) {
		 alert(ex);
	 }
	
	}
	
	NumberOrName = function(){
		var checked = document.getElementById('html_entity-number-button').checked;
		
		if (checked) {
			prefs.setBoolPref('useNumber', true);
		} else {
			prefs.setBoolPref('useNumber', false);
		}
	}
	
}).apply(extensions.HTMLtoolbox);

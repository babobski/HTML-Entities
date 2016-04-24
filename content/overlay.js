/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.HTMLtoolbox) === 'undefined') extensions.HTMLtoolbox = { version : '1.5' };

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
		if (ko.views.manager.currentView == undefined) {
			return;
		}
		var scimoz = ko.views.manager.currentView.scimoz;
		 scimoz.insertText(scimoz.currentPos ,entity);
		 scimoz.gotoPos(scimoz.currentPos + entity.length);
		 ko.views.manager.currentView.setFocus();
	 } catch(ex) {
		 alert(ex); 
	 }
	
	}
	
	this.replaceEnteties = function(){
		if (ko.views.manager.currentView == undefined) {
			return;
		}
		var scimoz = ko.views.manager.currentView.scimoz;
		var selection = scimoz.selText;
		var output = '';
		
		if (selection.length == 0) {
			return false;
		}
		
		output = decodeHTMLEntities(selection);
		
		scimoz.replaceSel(output);
		ko.views.manager.currentView.setFocus();
	}
	
	NumberOrName = function(){
		var checked = document.getElementById('html_entity-number-button').checked;
		
		if (checked) {
			prefs.setBoolPref('useNumber', true);
		} else {
			prefs.setBoolPref('useNumber', false);
		}
	}
	
	saveImagePath = function(){
		var input = document.getElementById('image_path').value;
		
		if (input.length > 0) {
			prefs.setCharPref('imagePath', input);
		}
	}
	
	insertImagePath = function(){
		var imagePath = prefs.getCharPref('imagePath');
		var scimoz = ko.views.manager.currentView.scimoz;
		 scimoz.insertText(scimoz.currentPos ,imagePath);
		 scimoz.gotoPos(scimoz.currentPos + imagePath.length);
	}
	
	decodeHTMLEntities = function(text) {
		var entities = [
			['&', '&amp;'],
			['‘', '&lsquo;'],
			['’', '&rsquo;'],
			['‚', '&sbquo;'],
			['“', '&ldquo;'],
			['”', '&rdquo;'],
			['„', '&bdquo;'],
			['‹', '&lsaquo;'],
			['›', '&rsaquo;'],
			['«', '&laquo;'],
			['»', '&raquo;'],
			['–', '&ndash;'],
			['—', '&mdash;'],
			['′', '&prime;'],
			['″', '&Prime;'],
			['<', '&lt;'],
			['>', '&gt;'],
			['"', '&quot;'],
			['á', '&aacute;'],
			['Á', '&Aacute;'],
			['à', '&agrave;'],
			['À', '&Agrave;'],
			['â', '&acirc;'],
			['Â', '&Acirc;'],
			['å', '&aring;'],
			['Å', '&Aring;'],
			['ã', '&atilde;'],
			['Ã', '&Atilde;'],
			['ä', '&auml;'],
			['Ä', '&Auml;'],
			['æ', '&aelig;'],
			['Æ', '&AElig;'],
			['ç', '&ccedil;'],
			['Ç', '&Ccedil;'],
			['é', '&eacute;'],
			['É', '&Eacute;'],
			['è', '&egrave;'],
			['È', '&Egrave;'],
			['ê', '&ecirc;'],
			['Ê', '&Ecirc;'],
			['ë', '&euml;'],
			['Ë', '&Euml;'],
			['í', '&iacute;'],
			['Í', '&Iacute;'],
			['ì', '&igrave;'],
			['Ì', '&Igrave;'],
			['î', '&icirc;'],
			['Î', '&Icirc;'],
			['ï', '&iuml;'],
			['Ï', '&Iuml;'],
			['ñ', '&ntilde;'],
			['Ñ', '&Ntilde;'],
			['ó', '&oacute;'],
			['Ó', '&Oacute;'],
			['ò', '&ograve;'],
			['Ò', '&Ograve;'],
			['ô', '&ocirc;'],
			['Ô', '&Ocirc;'],
			['ø', '&oslash;'],
			['Ø', '&Oslash;'],
			['õ', '&otilde;'],
			['Õ', '&Otilde;'],
			['ö', '&ouml;'],
			['Ö', '&Ouml;'],
			['ß', '&szlig;'],
			['ú', '&uacute;'],
			['Ú', '&Uacute;'],
			['ù', '&ugrave;'],
			['Ù', '&Ugrave;'],
			['û', '&ucirc;'],
			['Û', '&Ucirc;'],
			['ü', '&uuml;'],
			['Ü', '&Uuml;'],
			['ÿ', '&yuml;'],
			['¢', '&cent;'],
			['£', '&pound;'],
			['¥', '&yen;'],
			['€', '&euro;'],
			['©', '&copy;'],
			['®', '&reg;'],
			['@', '&commat;'],
			['™', '&trade;'],
			['§', '&sect;'],
			['¦', '&brvbar;'],
			['¡', '&iexcl;'],
			['¿', '&iquest;'],
			['¤', '&curren;'],
			['¨', '&uml;'],
			['ª', '&ordf;'],
			['¬', '&not;'],
			['¯', '&macr;'],
			['°', '&deg;'],
			['±', '&plusmn;'],
			['º', '&ordm;'],
			['¶', '&para;'],
			['·', '&middot;'],
			['•', '&bull;'],
			['´', '&acute;'],
			['µ', '&micro;'],
			['¸', '&cedil;'],
			['¹', '&sup1;'],
			['²', '&sup2;'],
			['³', '&sup3;'],
			['¼', '&frac14;'],
			['½', '&frac12;'],
			['¾', '&frac34;'],
			['⅙', '&frac16;'],
			['⅕', '&frac15;'],
			['⅓', '&frac13;'],
			['⅔', '&frac23;'],
			['×', '&times;'],
			['☎', '&phone;'],
			['♀', '&female;'],
			['♂', '&male;'],
			['★', '&bigstar;'],
			['☆', '&star;'],
			['⌖', '&target;'],
			['⌕', '&telrec;'],
			['÷', '&divide;'],
			['ƒ', '&fnof;'],
			['ˆ', '&circ;'],
			['˜', '&tilde;'],
			['⁄', '&frasl;'],
			['†', '&dagger;'],
			['‡', '&Dagger;'],
			['‰', '&permil;'],
			['…', '&hellip;'],
			['‾', '&oline;'],
			['←', '&larr;'],
			['↑', '&uarr;'],
			['→', '&rarr;'],
			['↓', '&darr;'],
			['↔', '&harr;'],
			['↕', '&varr;'],
			['↺', '&olarr;'],
			['↻', '&orarr;'],
			['∂', '&part;'],
			['∏', '&prod;'],
			['∑', '&sum;'],
			['−', '&minus;'],
			['√', '&radic;'],
			['∞', '&infin;'],
			['∩', '&cap;'],
			['♪', '&sung;'],
			['♯', '&sharp;'],
			['✓', '&check;'],
			['✗', '&cross;'],
			['∫', '&int;'],
			['≈', '&asymp;'],
			['≠', '&ne;'],
			['≡', '&equiv;'],
			['◊', '&loz;'],
			['≤', '&le;'],
			['≥', '&ge;'],
			['¨', '&uml;'],
			['♥', '&hearts;'],
			['♠', '&spades;'],
			['♦', '&diams;'],
			['♣', '&clubs;'],
			['Α', '&Alpha;'],
			['Β', '&Beta;'],
			['Γ', '&Gamma;'],
			['Δ', '&Delta;'],
			['Ε', '&Epsilon;'],
			['Ζ', '&Zeta;'],
			['Η', '&Eta;'],
			['Θ', '&Theta;'],
			['Ι', '&Iota;'],
			['Κ', '&Kappa;'],
			['Λ', '&Lambda;'],
			['Μ', '&Mu;'],
			['Ν', '&Nu;'],
			['Ξ', '&Xi;'],
			['Ο', '&Omicron;'],
			['Π', '&Pi;'],
			['Ρ', '&Rho;'],
			['Σ', '&Sigma;'],
			['Τ', '&Tau;'],
			['Υ', '&Upsilon;'],
			['Φ', '&Phi;'],
			['Χ', '&Chi;'],
			['Ψ', '&Psi;'],
			['Ω', '&Omega;'],
			['α', '&alpha;'],
			['β', '&beta;'],
			['γ', '&gamma;'],
			['δ', '&delta;'],
			['ε', '&epsilon;'],
			['ζ', '&zeta;'],
			['η', '&eta;'],
			['θ', '&theta;'],
			['ι', '&iota;'],
			['κ', '&kappa;'],
			['λ', '&lambda;'],
			['μ', '&mu;'],
			['ν', '&nu;'],
			['ξ', '&xi;'],
			['ο', '&omicron;'],
			['π', '&pi;'],
			['ρ', '&rho;'],
			['ς', '&sigmaf;'],
			['σ', '&sigma;'],
			['τ', '&tau;'],
			['υ', '&upsilon;'],
			['φ', '&phi;'],
			['χ', '&chi;'],
			['ψ', '&psi;'],
			['ω', '&omega;'],
		];
	
		for (var i = 0, max = entities.length; i < max; ++i) 
			text = text.replace(new RegExp(entities[i][0], 'g'), entities[i][1]);
	
		return text;
	}
	
	
	
}).apply(extensions.HTMLtoolbox);

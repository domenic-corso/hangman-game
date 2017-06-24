/*
    JSAK = Javascript Swiss Army Knife.

    Javascript library containing some essential things that I always find
    myself using.

    Written by Domenic Corso.
*/

let JSAK = {};

/* Returns the width CSS property of an element as a Number. */
JSAK.getStyle = function(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
};

/* Returns the width CSS property of an element as a Number. */
JSAK.getWidthAsInt = function(element) {
    if (!element) return;

    return parseInt(this.getStyle(element, "height"));
};

/* Returns the height CSS property of an element as a Number. */
JSAK.getHeightAsInt = function(element) {
    if (!element) return;

    return parseInt(this.getStyle(element, "height"));
};

/* Returns the padding-top CSS property of an element as a Number. */
JSAK.getPaddingTopAsInt = function(element) {
    if (!element) return;

    return parseInt(this.getStyle(element, "padding-top"));
};

/* Returns the padding-bottom CSS property of an element as a Number. */
JSAK.getPaddingBottomAsInt = function(element) {
    if (!element) return;

    return parseInt(this.getStyle(element, "padding-bottom"));
};

JSAK.removeAllChildren = function(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

JSAK.AJAX = {};

/* Performs a standard HTTP GET Request, supports query string. */
JSAK.AJAX.httpGET = function(addr, params, callback) {
    let url;
	let queryString = "?";
	let xhrObj = new XMLHttpRequest();
    
    /* Loop through each given parameter and add it to query string. */
	for (p in params) {
		if (params.hasOwnProperty(p)) {
			queryString += p + "=" + params[p] + "&";
		}
	}

	url = addr + queryString;

	xhrObj.onreadystatechange = () => {
		if (xhrObj.readyState == 4 && xhrObj.status == 200) {
			if (callback) {
				callback(xhrObj.responseText);
			}
		}
	}

	xhrObj.timeout = 250;
	xhrObj.open("GET", url, true);
	xhrObj.send(); 
};
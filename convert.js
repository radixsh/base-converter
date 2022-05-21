function asciiToHex(ascii, hex_output_element) {
	var hex_values = [];
	for (var n = 0, l = ascii.length; n < l; n ++) {
		var hex = Number(ascii.charCodeAt(n)).toString(16);
		hex_values.push(hex);
	}
	hex_output_element.innerHTML += hex_values.join('');
}
function asciiToBin(ascii, bin_output_element) {
	// https://www.sitepoint.com/community/t/how-to-convert-ascii-values-to-8-bit-binary-in-javascript/363447/3
	bin_output_element.innerHTML += ascii.toString(2).padStart(8, '0');
}

function hexToAscii(hex, ascii_output_element) {
	// http://stackoverflow.com/questions/3745666/ddg#3745677
	hex = hex.toString();  // force conversion
	var str = '';
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	ascii_output_element.innerHTML += str;
}
function hexToBin(hex, bin_output_element) {
	var bin = parseInt(hex, 16).toString(2))
	bin_output_element.innerHTML += bin.padStart(8, '0');
}

function binToAscii(bin, ascii_output_element) {
	ascii_output_element.innerHTML += parseInt(bin, 2).toString(10);
}
function binToHex(bin, hex_output_element) {
	// https://stackoverflow.com/questions/36562953/converting-binary-to-hexadecimal
	hex_output_element.innerHTML += parseInt(bin, 2).toString(16);
}


function updateBase(selection) {
	var base = selection.value;
	var input = document.getElementById("input");

	if (base == "ascii") {
		var hex_output_element = document.getElementById("hex");
		asciiToHex(input, hex_output_element);
		var bin_output_element = document.getElementById("bin");
		asciiToBin(input, bin_output_element);
	} else if (base == "hex") {
		var ascii_output_element = document.getElementById("ascii");
		hexToAscii(input, ascii_output_element);
		var bin_output_element = document.getElementById("bin");
		hexToBin(input, bin_output_element);
	} else if (base == "bin") {
		var ascii_output_element = document.getElementById("ascii");
		binToAscii(input, ascii_output_element);
		var hex_output_element = document.getElementById("hex");
		binToHex(input, hex_output_element);
	} else {
		console.log("how did we get here...")
	}
}

// https://stackoverflow.com/questions/3842614/how-do-i-call-a-javascript-function-on-page-load
document.addEventListener("DOMContentLoaded", function() {

});

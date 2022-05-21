function asciiToHex(ascii, hex_output_element) {
    var hex_values = [];
    for (var n = 0, l = ascii.length; n < l; n ++) {
        var hex = Number(ascii.charCodeAt(n)).toString(16);
        hex_values.push(hex);
    }
    hex_output_element.innerHTML = hex_values.join('');
}
function asciiToBin(ascii, bin_output_element) {
	bin_output_element.innerHTML = ascii.toString(2).padStart(8, '0');
}

function hexToAscii(hex, ascii_output_element) {
	hex = hex.toString();  // force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    ascii_output_element.innerHTML = str;
}
function hexToBin(hex, bin_output_element) {
    bin_output_element.innerHTML = parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function binToAscii(bin, ascii_output_element) {
	// https://stackoverflow.com/questions/38958373/ascii-to-binary-function
	bin_output_element.innerHTML = bin.reverse()
		.join('')
		.match(/.{8}/g)
		.map(x => String.fromCharCode(parseInt(x, 2)))
		.join('');
}
function binToHex(bin, hex_output_element) {

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
    // var input = document.getElementById("input");

    // var ascii_output = document.getElementById("ascii");
    // https://www.encodedna.com/javascript/append-or-add-text-to-div-using-javascript.htm
    // to_ascii.innerText = "test";

    // to_hex.innerHTML = "input to hex";

    // var to_bin = document.getElementById("bin");
    // to_bin.innerHTML = "input to bin";
});

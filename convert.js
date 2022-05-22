document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("base").onchange = function () {
        var base = document.getElementById("base");
        var input = document.getElementById("input");
        text = input.value;
        if (base.value == "ascii") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = "[Irrelevant]"
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = asciiToHex(text);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = convert(asciiToHex(text), 16, 2);
        } else if (base.value == "hex") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = hexToAscii(text);
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = "[Irrelevant]"
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = convert(text, 16, 2);
        } else if (base.value == "bin") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = hexToAscii(parseInt(text, 2));
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = convert(text, 2, 16);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = "[Irrelevant]"
        }
    }
});

function convert(number, original_base, new_base) {
    return parseInt(number, original_base).toString(new_base);
}

function hexToAscii(hex_string) {
    // split hex string into pairs: https://stackoverflow.com/questions/55549405/split-string-every-2-character-into-array
    var pairs = hex_string.match(/.{1,2}/g); 
    return hex_string.fromCharCode(pairs);
}

function asciiToHex(ascii) {
    var hex_values = [];
    for (var n = 0, l = ascii.length; n < l; n++) {
        var hex = Number(ascii.charCodeAt(n)).toString(16);
        hex_values.push(hex);
    }
    return hex_values.join('');
}

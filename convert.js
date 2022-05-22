document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("input").value;
    document.getElementById("base").onchange = function () {
        var base = document.getElementById("base").value;
        if (base == "ascii") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = "[Irrelevant]" 
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = asciiToHex(input);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = convert(asciiToHex(input), 16, 2);
        } else if (base == "hex") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = convert(asciiToHex(input), 16, 2);
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = "[Irrelevant]" 
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = convert(input, 16, 2);
        } else if (base == "bin") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = convert(asciiToHex(input), 16, 2);
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = convert(input, 2, 16);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = "[Irrelevant]" 
        }
    }
});

function convert(number, original_base, new_base) {
    return parseInt(number, original_base).toString(new_base);
}

function asciiToHex(ascii, hex_output_element) {
    var hex_values = [];
    for (var n = 0, l = ascii.length; n < l; n++) {
        var hex = Number(ascii.charCodeAt(n)).toString(16);
        hex_values.push(hex);
    }
    return hex_values.join('');
}

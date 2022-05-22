var encoding;

document.addEventListener("DOMContentLoaded", function() {
    var base = document.getElementById("base");
    // listener that calls updateEncoding() when base changes
    document.getElementById("base").onchange = function () {
        // change the encoding global var
        var tmp_encoding = encoding;
        encoding = base.value;
        // then ensure that the output in the bottom half of the page is right
        update();
        /*
        var input = document.getElementById("input");
        text = input.value;
        if (base.value == "ascii") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = "[Irrelevant]"
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = asciiToHex(text);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = pad(convert(asciiToHex(text), 16, 2));
        } else if (base.value == "hex") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = codesToChars(text);
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = "[Irrelevant]"
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = convert(text, 16, 2);
        } else if (base.value == "bin") {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = codesToChars(parseInt(text, 2));
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = convert(text, 2, 16);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = "[Irrelevant]"
        }
        */
    }
});

function convert(number, original_base, new_base) {
    return parseInt(number, original_base).toString(new_base);
}

function codesToChars(hex_string) {
    // split hex string into pairs: https://stackoverflow.com/questions/55549405/split-string-every-2-character-into-array
    console.log("codesToChars: " + hex_string);
    var pairs = hex_string.toString().match(/.{1,2}/g); 
    return String.fromCharCode(pairs);
}

function asciiToHex(ascii) {
    var hex_values = [];
    for (var n = 0, l = ascii.length; n < l; n++) {
        var hex = Number(ascii.charCodeAt(n)).toString(16);
        hex_values.push(hex);
    }
    return hex_values.join('');
}

function pad(binary_string) {
    while (binary_string.length < 8) {
        binary_string = "0" + binary_string;
    }
    return binary_string;
}

function update() {
    var input = document.getElementById("input");
    text = input.value;
    if (encoding == "ascii") {
        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML = "[Irrelevant]"
        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = asciiToHex(text);
        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = pad(convert(asciiToHex(text), 16, 2));
    } else if (encoding == "hex") {
        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML = codesToChars(text);
        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = "[Irrelevant]"
        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = convert(text, 16, 2);
    } else if (encoding == "bin") {
        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML = codesToChars(parseInt(text, 2));
        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = convert(text, 2, 16);
        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = "[Irrelevant]"
    }
}

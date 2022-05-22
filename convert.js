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
    }
});

function convert(number, original_base, new_base) {
    console.log("convert(): " + number + " from " + original_base + " to " + new_base);
    var to_return = parseInt(number, original_base).toString(new_base);
    console.log("becomes " + to_return);
}

function codesToChars(hex_string) {
    // split hex string into pairs: https://stackoverflow.com/questions/55549405/split-string-every-2-character-into-array
    console.log("hex string passed to codesToChars(): " + hex_string);
    var pairs = hex_string.toString().match(/.{1,2}/g); 
    return String.fromCharCode(pairs);
}

function asciiToHex(ascii) {
    console.log("asciiToHex(): " + ascii);
    var hex_values = [];
    for (var n = 0, l = ascii.length; n < l; n++) {
        var hex = Number(ascii.charCodeAt(n)).toString(16);
        hex_values.push(hex);
    }
    console.log("eventually asciiToHex returns" + hex_values.join(''));
    return hex_values.join('');
}

function pad(binary_string) {
    console.log("pad(): " + binary_string);
    // https://stackoverflow.com/questions/27641812/way-to-add-leading-zeroes-to-binary-string-in-javascript
    while (binary_string.length < 8) {
        binary_string = "0" + binary_string;
    }
    console.log("eventually pad becomes " + binary_string);
    return binary_string;
}

function update() {
    // https://stackoverflow.com/questions/24644345/how-to-detect-focus-changed-event-in-js
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
        if (text.matches("-?[0-9a-fA-F]+")) {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = codesToChars(text);
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = "[Irrelevant]"
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = convert(text, 16, 2);
        } else {
            alert("Invalid hex string");
        }
    } else if (encoding == "bin") {
        if (text.matches("-?[01]+")) {
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = codesToChars(parseInt(text, 2));
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = convert(text, 2, 16);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = "[Irrelevant]"
        } else {
            alert("Invalid binary string");
        }
    }
}

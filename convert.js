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

function convert(number_array, original_base, new_base) {
    if (original_base == new_base)
        return number_array;
    console.log("convert(): " + number_array + " from " + original_base + " to " + new_base);
    // if converting from binary, then ensure we're converting each byte and not
    // just the last one
    if (original_base == 2) {
        console.log("Converting from binary...");
        // split binary up into bytes, delimiting by spaces
        // var nums = number.split(' '); // [];
        // for (var i = 0; i < number.length - 1; i += 9)
        //     nums.push(number.substring(i, i + 8));
        // populate arr with bytes
        // iterate through arr and translate each one into the new base 
        // console.log("Bytes: " + nums);
        var to_return = [];
        for (let i = 0; i < number_array.length; i++) {
            var tmp = number_array[i];
            to_return.push(parseInt(tmp, 2).toString(new_base));
        }
        console.log("Bytes as hex: " + to_return);
        return to_return; //.join('');
    } else if (original_base == 16) {
        console.log("Converting from hex...");
        // split hex into pairs 
        // var pairs = [];
        // for (var i = 0; i < number.length - 1; i += 3)
        //     pairs.push(number.substring(i, i + 2));
        // populate arr with bytes
        // iterate through arr and translate each one into the new base 
        // console.log("Bytes: " + pairs);
        var to_return = [];
        for (let i = 0; i < number_array.length; i++) {
            var tmp = number_array[i];
            to_return.push(parseInt(tmp, 16).toString(new_base));
        }
        console.log("Bytes as hex: " + to_return);
        return to_return; //.join('');

    }
    var to_return = parseInt(number, original_base).toString(new_base);
    console.log("becomes " + to_return);
    return to_return;
}

function codesToChars(hex_array) {
    // https://stackoverflow.com/questions/55549405/split-string-every-2-character-into-array#55549473
    // https://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
    console.log("hex string passed to codesToChars(): " + hex_array);
    // hex_string = hex_string.toString();
    var arr = []; // str = '';
    for (let i = 0; i < hex_array.length; i += 2) {
        var current = hex_array[i].substr(i, i + 2);
        console.log(current);
        arr.push(String.fromCharCode(parseInt(current, 16)));
    }
    console.log("hex-->ascii array: " + arr);
    return arr;
}

function asciiToHex(ascii) {  // one of the few functions that takes in a string
    // it still returns an array tghough
    console.log("asciiToHex(): " + ascii);
    var hex_values = [];
    for (var n = 0, l = ascii.length; n < l; n++) {
        var hex = Number(ascii.charCodeAt(n)).toString(16);
        hex_values.push(hex);
    }
    console.log("eventually asciiToHex returns " + hex_values);
    return hex_values;
}

function isValidHex(text) {
    // https://www.tutorialspoint.com/finding-the-validity-of-a-hex-code-in-javascript
    const legend = '0123456789abcdef';
    for (let i = 0; i < text.length; i++)
        if (!legend.includes(text[i]))
            return false;
    return true;
}

function toBytes(binary_string) {
    binary_string = binary_string.toString();
    while (binary_string.length % 8)
        binary_string = "0" + binary_string;
    var bytes = [];
    for (var i = 0; i < binary_string.length - 1; i += 8)
        bytes.push(binary_string.substring(i, i + 8));
    console.log("resulting bytes: " + bytes);
    return bytes;
}

function toPairs(hex_string) {
    hex_string = hex_string.toString();
    while (hex_string.length % 2)
        hex_string = "0" + hex_string;
    var pairs = [];
    for (var i = 0; i < hex_string.length - 1; i += 2)
        pairs.push(hex_string.substring(i, i + 2));
    console.log("resulting pairs: " + pairs);
    return pairs;
}

function update() {
    // https://stackoverflow.com/questions/24644345/how-to-detect-focus-changed-event-in-js
    var input = document.getElementById("input");
    text = input.value;
    if (!text) {
        document.getElementById("ascii").innerHTML = "";
        document.getElementById("hex").innerHTML = "";
        document.getElementById("bin").innerHTML = "";
        return;
    }
    if (encoding == "ascii") {
        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML = "[Irrelevant]"
        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = asciiToHex(text);
        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = toBytes(convert(asciiToHex(text), 16, 2));
    } else if (encoding == "hex") {
        if (isValidHex(text)) { //String(text).match("?[0-9a-fA-F]+")) {
            text = toPairs(text); // also pads it with zeroes at start if necessary
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = codesToChars(text);
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = "[Irrelevant]"
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = toBytes(convert(text, 16, 2));
        } else {
            alert("Invalid hex string");
        }
    } else if (encoding == "bin") {
        if (String(text).match("-?[01]+")) {
            // text = pad(text.toString());
            text = toBytes(text);  // already pads it
            var ascii_output_element = document.getElementById("ascii");
            ascii_output_element.innerHTML = codesToChars(convert(text, 2, 16));
            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = convert(text, 2, 16);
            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = "[Irrelevant]"
        } else {
            alert("Invalid binary string");
        }
    }
}

function pad(binary_string) {
    while (binary_string.length % 8)
        binary_string = "0" + binary_string;
    var bytes = [];
    for (var i = 0; i < binary_string.length - 1; i += 8)
        bytes.push(binary_string.substring(i, i + 8));
    // console.log("resulting pairs: " + bytes);
    return bytes.join(' ');

}

function copy(thing) {
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    var text = document.getElementById(thing).innerHTML;
    window.prompt("Copy to clipboard: Ctrl+C", text);
} 

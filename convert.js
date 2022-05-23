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

function convert(number_array, original_base, new_base) { // array-->array? 
    if (original_base == new_base)
        return number_array;
    console.log("convert(): " + number_array + " from " + original_base + " to " + new_base);
    var to_return = [];
    for (let i = 0; i < number_array.length; i++) {
        var tmp = number_array[i];
        to_return.push(parseInt(tmp, original_base).toString(new_base));
    }
    console.log("becomes " + to_return);
    return to_return;
}

function codesToChars(hex_array) {  // array-->array
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

function asciiToHex(ascii_string) {  // array-->array
    console.log("asciiToHex(): " + ascii);
    var hex_values = [];
    for (var n = 0, l = ascii_string.length; n < l; n++) {
        var hex = Number(ascii_string.charCodeAt(n)).toString(16);
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

function toBytes(binary_string) { // (string or array) to array, like when starting from bin
    binary_string = binary_string.toString();
    // remove all commas if necessary (i.e., if we got passed an array and then
    // we had to change it to a set of comma-separated values
    binary_string = binary_string.replace(/,/g, '');
    while (binary_string.length % 8)
        binary_string = "0" + binary_string;
    var bytes = [];
    for (var i = 0; i < binary_string.length - 1; i += 8)
        bytes.push(binary_string.substring(i, i + 8));
    console.log("resulting bytes: " + bytes);
    return bytes;
}

function toPairs(hex_string) { // (string or array) to array
    hex_string = hex_string.toString();
    hex_string = hex_string.replace(/,/g, '');
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
        // split(): string to array
        text = text.split(''); // string-->array just to make it consistent

        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML = "[Irrelevant]"

        var hex_output_element = document.getElementById("hex");
        // asciiToHex(): array to array
        hex_output_element.innerHTML = asciiToHex(text);

        var bin_output_element = document.getElementById("bin");
        // asciiToHex(): array to array
        // convert(): array to array
        // toBytes(): (array or string) to array
        bin_output_element.innerHTML = toBytes(convert(asciiToHex(text), 16, 2));
    } else if (encoding == "hex") {
        if (isValidHex(text)) {
            // toPairs(): string to array
            text = toPairs(text);

            var ascii_output_element = document.getElementById("ascii");
            // codesToChars(): array to array
            ascii_output_element.innerHTML = codesToChars(text);

            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = "[Irrelevant]"

            var bin_output_element = document.getElementById("bin");
            // convert(): array to array
            // toBytes(): (array or string) to array
            bin_output_element.innerHTML = toBytes(convert(text, 16, 2));
        } else {
            alert("Invalid hex string");
        }
    } else if (encoding == "bin") {
        if (String(text).match("-?[01]+")) {
            // toBytes(): (array or string) to array
            text = toBytes(text);

            var ascii_output_element = document.getElementById("ascii");
            // convert(): array to array
            ascii_output_element.innerHTML = codesToChars(convert(text, 2, 16));

            var hex_output_element = document.getElementById("hex");
            // convert(): array to array
            hex_output_element.innerHTML = convert(text, 2, 16);

            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = "[Irrelevant]"
        } else {
            alert("Invalid binary string");
        }
    }
}

function copy(thing) {
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    var text = document.getElementById(thing).innerHTML;
    window.prompt("Copy to clipboard: Ctrl+C", text);
} 

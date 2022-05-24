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
        var hex = number_array[i];
        to_return.push(parseInt(hex, original_base).toString(new_base));
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
    for (let i = 0; i < hex_array.length; i++) {
        var current = hex_array[i];
        console.log("Current: " + current);
        arr.push(String.fromCharCode(parseInt(current, 16)));
    }
    console.log("hex-->ascii array: " + arr);
    return arr;
}

function asciiToHex(ascii_array) {  // array-->array
    // console.log("asciiToHex() was given: " + ascii_array);
    var ascii_string = ascii_array.join(''); // array to string, with no delimiters
    // var ascii_string = ascii_string.replace(/(,|\s)/g, '');
    // console.log("then asciiToHex() makes it into: " + ascii_string);
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
    const legend = '0123456789abcdef ';
    for (let i = 0; i < text.length; i++)
        if (!legend.includes(text[i]))
            return false;
    return true;
}

function isValidBin(text) {
    // https://stackoverflow.com/questions/49743318/fast-way-to-check-if-a-javascript-array-is-binary-contains-only-0-and-1
    for (let i = 0; i < text.length; i++)
        if (text[i] != 0 && text[i] != 1 && text[i] != " ")
            return false;
    return true;
}

function toBytes(binary) { // (string or array) to array, like when starting from bin
    if (Array.isArray(binary)) {
        // make sure each individual byte is padded correctly
        for (var i = 0; i < binary.length; i++) {
            while (binary[i].length % 8)
                binary[i] = "0" + binary[i];
        }
        return binary;
    } else {  // if given a single long binary string, like in case 3
        if (binary.indexOf(/\s/) < 0) {  // if no spaces in it
            var bytes = [];
            for (var i = 0; i < binary.length; i += 9) {
                bytes.push(binary.substring(i, i + 8));
            }
            return bytes;
        } else {  // else, if it is a single long binary string with space-delimiters
            return binary.split(' ');
        }
    }
}

function toPairs(hex_string) { // (string or array) to array
    hex_string = hex_string.toString();
    hex_string = hex_string.replace(/(,|\s)/g, '');
    while (hex_string.length % 2)
        hex_string = "0" + hex_string;
    var pairs = [];
    for (var i = 0; i < hex_string.length - 1; i += 2)
        pairs.push(hex_string.substring(i, i + 2));
    console.log("resulting pairs: " + pairs);
    return pairs;
}

function clear(document) {
    document.getElementById("ascii").innerHTML = "";
    document.getElementById("hex").innerHTML = "";
    document.getElementById("bin").innerHTML = "";
}

function update() {
    // https://stackoverflow.com/questions/24644345/how-to-detect-focus-changed-event-in-js
    var input = document.getElementById("input");
    text = input.value;

    if (!text) {
        clear(document);
        return;
    }
    var alert_element = document.getElementById("alert_element");
    if (encoding == "ascii") {
        alert_element.innerHTML = "";
        // split(): string to array
        text = text.split(''); // string-->array just to make it consistent
        console.log("given: " + text);
        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element = "[Irrelevant]";

        var hex_output_element = document.getElementById("hex");
        // asciiToHex(): array to array
        var hex_output = asciiToHex(text);
        hex_output_element.innerHTML = hex_output.join(" ");

        var bin_output_element = document.getElementById("bin");
        // asciiToHex(): array to array
        // convert(): array to array
        // toBytes(): (array or string) to array
        var bin_output = convert(hex_output, 16, 2);
        bin_output_element.innerHTML = toBytes(bin_output).join(" ");
    } else if (encoding == "hex") {
        if (isValidHex(text)) {
            alert_element.innerHTML = "";
            text = text.replace(/(,|\s)/g, '');
            // toPairs(): string to array
            text = toPairs(text);

            var ascii_output_element = document.getElementById("ascii");
            // codesToChars(): array to array
            ascii_output_element.innerHTML = codesToChars(text).join("");

            var hex_output_element = document.getElementById("hex");
            hex_output_element.innerHTML = "[Irrelevant]"

            var bin_output_element = document.getElementById("bin");
            // convert(): array to array
            // toBytes(): (array or string) to array
            bin_output_element.innerHTML = toBytes(convert(text, 16, 2)).join(" ");
        } else {
            alert_element.innerHTML = "Invalid hex string";
            clear(document);
        }
    } else if (encoding == "bin") {
        var tmp = text.toString();
        console.log(tmp);
        var tmp2 = text.toString(2);
        console.log(tmp2);
        if (isValidBin(text)) { // text.match("[01 +]")) {
            alert_element.innerHTML = "";
            // 00110011 01010101 --> 0011001101010101
            // To turn it into a continuous binary string, we cannot just regex
            // out the commas and spaces because there's no guarantee each
            // provided byte is properly zero-padded. Therefore, pass to
            // toBytes()
            // text = text.replace(/(,|\s)/g, '');
            // toBytes(): (array or string) to array
            text = toBytes(text);

            var ascii_output_element = document.getElementById("ascii");
            // convert(): array to array
            ascii_output_element.innerHTML = codesToChars(convert(text, 2, 16)).join("");

            var hex_output_element = document.getElementById("hex");
            // convert(): array to array
            hex_output_element.innerHTML = convert(text, 2, 16).join(" ");

            var bin_output_element = document.getElementById("bin");
            bin_output_element.innerHTML = "[Irrelevant]"
        } else {
            alert_element.innerHTML = "Invalid binary string";
            clear(document);
        }
    }
}

function copy(thing) {
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    var text = document.getElementById(thing).innerHTML;
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

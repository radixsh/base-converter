var encoding;
var available_encodings = ["ascii", "hex", "bin", "dec"];

document.addEventListener("DOMContentLoaded", function() {
    var base = document.getElementById("base");
    // listener that calls updateEncoding() when base changes
    document.getElementById("base").onchange = function () {
        // change the encoding global var
        encoding = base.value;
        // then ensure that the output in the bottom half of the page is right
        update();
    }
});

function convert(arg, original_base, new_base) {
    // https://stackoverflow.com/questions/4775722/how-can-i-check-if-an-object-is-an-array
    if (original_base == new_base)
        return arg;
    if (Array.isArray(arg)) {
        var to_return = [];
        for (let i = 0; i < arg.length; i++) {
            var item = arg[i];
            to_return.push(parseInt(item, original_base).toString(new_base));
        }
    } else {
        var to_return = parseInt(arg, original_base).toString(new_base);
    }
    return to_return;
}

function hexToAscii(hex_array) {
    // https://stackoverflow.com/questions/55549405/split-string-every-2-character-into-array#55549473
    // https://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
    var arr = [];
    for (let i = 0; i < hex_array.length; i++) {
        var current = hex_array[i];
        arr.push(String.fromCharCode(parseInt(current, 16)));
    }
    return arr;
}

function asciiToHex(ascii_array) {
    var ascii_string = ascii_array.join('');
    var hex_values = [];
    for (var n = 0, l = ascii_string.length; n < l; n++) {
        var hex = Number(ascii_string.charCodeAt(n)).toString(16);
        hex_values.push(hex);
    }
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

function isValidDec(text) {
    // https://www.tutorialspoint.com/finding-the-validity-of-a-hex-code-in-javascript
    const legend = '0123456789 ';
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

function toBytes(binary) {
    if (Array.isArray(binary)) {
        // make sure each individual byte is padded correctly
        for (var i = 0; i < binary.length; i++)
            while (binary[i].length % 8)
                binary[i] = "0" + binary[i];
        return binary;
    } else {  // if given a single long binary string
        if (binary.indexOf(/\s/) != -1) {  
            return binary.split(' ');
        } else {
            var bytes = [];
            for (var i = 0; i < binary.length; i += 9) {
                var tmp = binary.substring(i, i + 8);
                bytes.push(tmp);
            }
            return bytes;
        }
    }
}

function toPairs(hex_string) {
    hex_string = hex_string.toString();
    hex_string = hex_string.replace(/(,|\s)/g, '');
    while (hex_string.length % 2)
        hex_string = "0" + hex_string;
    var pairs = [];
    for (var i = 0; i < hex_string.length - 1; i += 2)
        pairs.push(hex_string.substring(i, i + 2));
    return pairs;
}

function clear(document) {
    for (let i = 0; i < available_encodings.length; i++)
        document.getElementById(available_encodings[i]).innerHTML = "";
}

function ascii(document) {
    var ascii_output_element = document.getElementById("ascii");
    ascii_output_element.innerHTML = text;

    text = text.split('');
    var hex_array = asciiToHex(text);

    var hex_array_element = document.getElementById("hex");
    hex_array_element.innerHTML = hex_array.join(" ");

    var bin_output_element = document.getElementById("bin");
    var bin_output = convert(hex_array, 16, 2);
    bin_output_element.innerHTML = toBytes(bin_output).join(" ");

    var dec_output_element = document.getElementById("dec");
    dec_output_element.innerHTML = convert(hex_array, 16, 10).join(" ");
}

function hex(document) {
    if (!isValidHex(text)) {
        alert_element.innerHTML = "Invalid hex string";
        clear(document);
    } else {
        alert_element.innerHTML = "";
        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = text;

        text = text.replace(/(,|\s)/g, '');
        text = toPairs(text);

        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML = hexToAscii(text).join("");

        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = toBytes(convert(text, 16, 2)).join(" ");

        var dec_output_element = document.getElementById("dec");
        dec_output_element.innerHTML = convert(text, 16, 10).join(" ");
    }
}

function bin(document) {
    if (!isValidBin(text)) { 
        alert_element.innerHTML = "Invalid binary string";
        clear(document);
    } else {  // text.match("[01 +]")) {
        alert_element.innerHTML = "";
        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = text;

        // 00110011 01010101 --> 0011001101010101
        // To turn it into a continuous binary string, we cannot just regex
        // out the commas and spaces because there's no guarantee each
        // provided byte is properly zero-padded. Therefore, pass to
        // toBytes()
        text = toBytes(text);
        var hex_array = convert(text, 2, 16);

        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = hex_array.join(" ");

        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML= hexToAscii(hex_array).join("");

        var dec_output_element = document.getElementById("dec");
        dec_output_element.innerHTML = convert(hex_array, 16, 10).join(" ");
    }
}

function dec(document) {
    if (!isValidDec(text)) { 
        alert_element.innerHTML = "Invalid binary string";
        clear(document);
    } else {
        var dec_output_element = document.getElementById("dec");
        dec_output_element.innerHTML = text;

        text = text.split(' ');
        var hex_array = convert(text, 10, 16);

        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = hex_array.join(" ");

        var ascii_output_element = document.getElementById("ascii");
        ascii_output_element.innerHTML = hexToAscii(hex_array).join("");

        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = toBytes(convert(hex_array, 16, 2)).join(" ");
    }
}

// https://stackoverflow.com/questions/1144297/ways-to-call-a-javascript-function-using-the-value-of-a-string-variable
function runFn(name, args) {
    var fn = window[name];
    if (typeof fn !== 'function') {
        return;
    }
    fn.apply(window, args);
}

function update() {
    // https://stackoverflow.com/questions/24644345/how-to-detect-focus-changed-event-in-js
    var input = document.getElementById("input");
    text = input.value;

    if (!text)
        return clear(document);

    var alert_element = document.getElementById("alert_element");
    alert_element.innerHTML = "";

    runFn(encoding, [document]);
}

function copy(thing) {
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    var text = document.getElementById(thing).innerHTML;
    window.prompt("Copy to clipboard: Ctrl+C, Enter/Esc", text);
}

var encoding;
var available_encodings = ["ascii", "hex", "bin", "dec"];

document.addEventListener("DOMContentLoaded", function() {
    var base = document.getElementById("base");
    // listener that calls updateEncoding() when base changes
    document.getElementById("base").onchange = function () {
        // change the encoding global var
        // var tmp_encoding = encoding;
        encoding = base.value;
        // then ensure that the output in the bottom half of the page is right
        update();
    }
});

function convert(arg, original_base, new_base) { // array-->array
    // https://stackoverflow.com/questions/4775722/how-can-i-check-if-an-object-is-an-array
    if (original_base == new_base)
        return arg;
    if (Array.isArray(arg)) {
        console.log("convert(): " + arg + " from " + original_base + " to " + new_base);
        var to_return = [];
        for (let i = 0; i < arg.length; i++) {
            var item = arg[i];
            to_return.push(parseInt(item, original_base).toString(new_base));
        }
    } else {
        console.log("convert(): " + arg + " from " + original_base + " to " + new_base);
        var to_return = parseInt(arg, original_base).toString(new_base);
    }
    console.log("becomes " + to_return);
    return to_return;
}

function hexToAscii(hex_array) {  // array-->array
    // https://stackoverflow.com/questions/55549405/split-string-every-2-character-into-array#55549473
    // https://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
    console.log("hex string passed to hexToAscii(): " + hex_array);
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
            while (binary[i].length % 8) {
                // console.log("Need to pad this: " + binary[i]);
                binary[i] = "0" + binary[i];
            }
        }
        return binary;
    } else {  // if given a single long binary string, like in case 3
        if (binary.indexOf(/\s/) == -1) {  // if no spaces in it
            console.log("No spaces in the given binary string");
            var bytes = [];
            for (var i = 0; i < binary.length; i += 9) {
                var tmp = binary.substring(i, i + 8);
                console.log("tmp: " + tmp);
                bytes.push(tmp);
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
    for (let i = 0; i < available_encodings.length; i++) {
        document.getElementById(available_encodings[i]).innerHTML = "";
    }
}

function ascii(document) {
    alert_element.innerHTML = "";
    var ascii_output_element = document.getElementById("ascii");
    ascii_output_element.innerHTML = text;

    // split(): string to array
    text = text.split(''); // string-->array just to make it consistent
    console.log("given: " + text);

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
}

function hex(document) {
    if (isValidHex(text)) {
        alert_element.innerHTML = "";
        var hex_output_element = document.getElementById("hex");
        hex_output_element.innerHTML = text;

        text = text.replace(/(,|\s)/g, '');
        // toPairs(): string to array
        text = toPairs(text);

        var ascii_output_element = document.getElementById("ascii");
        // hexToAscii(): array to array
        ascii_output_element.innerHTML = hexToAscii(text).join("");

        var bin_output_element = document.getElementById("bin");
        // convert(): array to array
        // toBytes(): (array or string) to array
        bin_output_element.innerHTML = toBytes(convert(text, 16, 2)).join(" ");
    } else {
        alert_element.innerHTML = "Invalid hex string";
        clear(document);
    }
}

function bin(document) {
    if (!isValidBin(text)) { 
        alert_element.innerHTML = "Invalid binary string";
        clear(document);
    } else {  // text.match("[01 +]")) {
        alert_element.innerHTML = "";
        // 00110011 01010101 --> 0011001101010101
        // To turn it into a continuous binary string, we cannot just regex
        // out the commas and spaces because there's no guarantee each
        // provided byte is properly zero-padded. Therefore, pass to
        // toBytes()
        var bin_output_element = document.getElementById("bin");
        bin_output_element.innerHTML = text;

        text = toBytes(text);

        var ascii_output_element = document.getElementById("ascii");
        // convert(): array to array
        ascii_output_element.innerHTML= hexToAscii(convert(text, 2, 16)).join("");
        
        var hex_output_element = document.getElementById("hex");
        // convert(): array to array
        var hex_array = convert(text, 2, 16);
        hex_output_element.innerHTML = hex_array.join(" ");

        var dec_output_element = document.getElementById("dec");
        dec_output_element.innerHTML = convert(hex_array, 16, 10).join("");
    }
}

function dec(document) {
    var dec_output_element = document.getElementById("dec");
    dec_output_element.innerHTML = text;

    // split(): string to array
    text = text.split(' '); // string-->array just to make it consistent
    console.log("given: " + text);
    
    var hex_output_element = document.getElementById("hex");
    // decToHex(): array to array
    var hex_array = convert(text, 10, 16); // decToHex(text);
    // console.log("hex_array: " + hex_array);
    hex_output_element.innerHTML = hex_array.join(" ");
    // console.log("hex_output_element.innerHTML: " + hex_output.join(" "));

    var ascii_output_element = document.getElementById("ascii");
    ascii_output_element.innerHTML = hexToAscii(hex_array).join("");

    var bin_output_element = document.getElementById("bin");
    bin_output_element.innerHTML = toBytes(convert(hex_array, 16, 2)).join(" ");
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
    alert_element.innerHTML = "";
    
    if (encoding == "ascii") {
        ascii(document);
    } else if (encoding == "hex") {
        hex(document);
    } else if (encoding == "bin") {
        bin(document);
    } else if (encoding == "dec") {
        dec(document);
    }
}

function copy(thing) {
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    var text = document.getElementById(thing).innerHTML;
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

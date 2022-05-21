function hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("input");
    
    var to_ascii = document.getElementById("ascii");
    to_ascii.innerText = "test";
   
    var to_hex = document.getElementById("hex");
    to_hex.innerHTML = "input to hex";
   
    var to_bin = document.getElementById("bin");
    to_bin.innerHTML = "input to bin";
   
    var to_base64 = document.getElementById("base64");
    to_base64.innerHTML = "input to base64";
});

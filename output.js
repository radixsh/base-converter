var encodings = ["ascii", "hex", "bin", "dec"];

for (let i = 0; i < encodings.length; i++) {
    var element = document.createElement('div');
    element.innerHTML = `
        <div class="row">
            <div class="description">
                <button onclick="copy('${encodings[i]}')">
                    Copy ${encodings[i]}
                </button> 
            </div>
            <textarea id="${encodings[i]}" rows="4" cols="50"></textarea>
        </div>
    `
    document.getElementById("output").appendChild(element);
}

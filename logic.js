function id(name) { return document.getElementById(name); }

let openTextInput = id('openText');
let encryptedTextInput = id('encryptedText');

document.getElementById('encryptButton').onclick = function () {

    let message = openTextInput.value;
    alert("encrypting: " + message );

};

document.getElementById('decryptButton').onclick = function () {

    let message = encryptedTextInput.value;
    alert("decrypting: " + message);

};
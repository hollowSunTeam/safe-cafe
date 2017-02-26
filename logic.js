function id(name) { return document.getElementById(name); }

let openTextInput = id('openText');
let encryptedTextInput = id('encryptedText');
let keyInput = id('key');

let alphabetTool = {
    alphabet : 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя!?@#$%^&*()_-+.,:;>< abcdefghijklmnopqrstuvwxyz0987654321',
    OFFSET : 3,
    getCharWithId : function (id) {
        if(id < 0){
            return this.alphabet.charAt((this.alphabet.length + id) % this.alphabet.length);
        }
        return this.alphabet.charAt(id % this.alphabet.length);
    },
    getCharId : function (char) {
        return this.alphabet.indexOf(char.toLowerCase());
    },
};

//ON KEY CHANGED
document.getElementById('key').onchange = function () {
    alphabetTool.OFFSET = Number(keyInput.value);
}

//ON ENCRYPT CLICK
document.getElementById('encryptButton').onclick = function () {

    let message = openTextInput.value;
    let encryptedMessage = "";

    for(charNum in message){
        encryptedMessage += encryptLetter(message[charNum]);
    }

    encryptedTextInput.value = encryptedMessage;
};

//ON DECRYPT CLICK
document.getElementById('decryptButton').onclick = function () {

    let message = encryptedTextInput.value;
    let decryptedMessage = "";

    for(charNum in message){
        decryptedMessage += decryptLetter(message[charNum]);
    }

    openTextInput.value = decryptedMessage;
};

function encryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) + alphabetTool.OFFSET);
}

function decryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) - alphabetTool.OFFSET);
}
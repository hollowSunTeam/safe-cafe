function id(name) { return document.getElementById(name); }

let openTextInput = id('openText');
let encryptedTextInput = id('encryptedText');

let OFFSET = 3;

let alphabetTool = {
    alphabet : 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя!@#$%^&*()_+.,:;>< abcdefghigklmnopqrstuvwxyz0987654321',
    getCharWithId : function (id) {
        if(id < 0){
            return this.alphabet.charAt(this.alphabet.length + id);
        }
        return this.alphabet.charAt(id % this.alphabet.length);
    },
    getCharId : function (char) {
        return this.alphabet.indexOf(char.toLowerCase());
    },
};

document.getElementById('encryptButton').onclick = function () {

    let message = openTextInput.value;
    let encryptedMessage = "";

    for(charNum in message){
        encryptedMessage += encryptLetter(message[charNum]);
    }

    encryptedTextInput.value = encryptedMessage;
};

document.getElementById('decryptButton').onclick = function () {

    let message = encryptedTextInput.value;
    let decryptedMessage = "";

    for(charNum in message){
        decryptedMessage += decryptLetter(message[charNum]);
    }

    openTextInput.value = decryptedMessage;
};

function encryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) + OFFSET);
}

function decryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) - OFFSET);
}
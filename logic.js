function id(name) { return document.getElementById(name); }

let keyInput = id('key');
let textInput = id('Text');

let encryptButton = id('encryptButton');
let decryptButton = id('decryptButton');
let clearButton = id('clearButton');

let alphabetTool = {
    alphabet : 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя!?@#$%^&*()_-+.,:;>< abcdefghijklmnopqrstuvwxyz0987654321',
    OFFSET : 3,
    getCharWithId : function (id) {
        if(id < 0){
            let charId = id % this.alphabet.length;

            if(charId === -0)
                return this.alphabet.charAt(0);

            return this.alphabet.charAt((this.alphabet.length + charId));
        }
        let charId = id % this.alphabet.length;
        return this.alphabet.charAt(charId);
    },
    getCharId : function (char) {
        return this.alphabet.indexOf(char.toLowerCase());
    },
};

//ON KEY CHANGED
keyInput.onchange = function () {
    alphabetTool.OFFSET = convertKey(keyInput.value);
};

//ON ENCRYPT CLICK
encryptButton.onclick = function () {

    let message = textInput.value;
    let encryptedMessage = "";

    for(var char of message){
        encryptedMessage += encryptLetter(char);
    }

    textInput.value = encryptedMessage;
};

//ON DECRYPT CLICK
decryptButton.onclick = function () {

    let message = textInput.value;
    let decryptedMessage = "";

    for(var char of message){
        decryptedMessage += decryptLetter(char);
    }

    textInput.value = decryptedMessage;
};

// ON CLEAR ClICK
clearButton.onclick = function () {
    textInput.value = "";
    keyInput.value = "";
};

//Key its a sum of charId from Alphabet
function convertKey(keyStr) {

    let key = 0;

    for(var char of keyStr){
        key += alphabetTool.getCharId(char);
    }

    return key;
}

function encryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) + alphabetTool.OFFSET);
}

function decryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) - alphabetTool.OFFSET);
}

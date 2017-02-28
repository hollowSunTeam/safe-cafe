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

    for(var charNum in message){
        encryptedMessage += encryptLetter(message[charNum]);
    }

    textInput.value = encryptedMessage;
};

//ON DECRYPT CLICK
decryptButton.onclick = function () {

    let message = textInput.value;
    let decryptedMessage = "";

    for(var charNum in message){
        decryptedMessage += decryptLetter(message[charNum]);
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

    for(var char in keyStr){
        key += alphabetTool.getCharId(keyStr[char]);
    }

    return key;
}

function encryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) + alphabetTool.OFFSET);
}

function decryptLetter(char) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) - alphabetTool.OFFSET);
}

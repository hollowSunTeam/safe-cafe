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

    let offsetMassive = generateOffsetMassive(alphabetTool.OFFSET);

    for(var charNum in message){
        encryptedMessage += encryptLetter(message[charNum], offsetMassive[charNum]);
    }

    textInput.value = encryptedMessage;
};

//ON DECRYPT CLICK
decryptButton.onclick = function () {

    let message = textInput.value;
    let decryptedMessage = "";

    let offsetMassive = generateOffsetMassive(alphabetTool.OFFSET);

    for(var charNum in message){
        decryptedMessage += decryptLetter(message[charNum], offsetMassive[charNum]);
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

//GENERATE OFFSET MASSIVE
function generateOffsetMassive(sid) {

    //Params of generator
    let A = 11;
    let C = 17;
    let K = 5;

    let offset = [];

    //Pseudo generator
    for(var i = 0; i < alphabetTool.alphabet.length; i++){

        let curOffset;

        if(i < 1){
            curOffset = (A * K + sid) % C;
            offset.push(curOffset);
        } else {
            curOffset =  (A * offset[i-1] + sid) % C;
            offset.push(curOffset);
        }
    }

    return offset;
}

//ENCRYPT WITH MANUAL OFFSET
function encryptLetter(char, offset) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) + offset);
}

function decryptLetter(char, offset) {
    return alphabetTool.getCharWithId(alphabetTool.getCharId(char) - offset);
}

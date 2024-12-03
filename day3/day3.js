"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function sumValidMultiplications(filePath) {
    var corruptedMemory = fs.readFileSync(filePath, 'utf-8');
    var regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    var sum = 0;
    var match;
    while ((match = regex.exec(corruptedMemory)) !== null) {
        var x = parseInt(match[1], 10);
        var y = parseInt(match[2], 10);
        sum += x * y;
    }
    return sum;
}
var filePath = 'input.txt';
var totalSum = sumValidMultiplications(filePath);
console.log("The sum of valid multiplications is: ".concat(totalSum));

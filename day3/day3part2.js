"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function sumEnabledMultiplications(filePath) {
    // Read the file content
    var corruptedMemory = fs.readFileSync(filePath, 'utf-8');
    // Regular expressions to match instructions
    var instructionRegex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
    var sum = 0;
    var match;
    var mulEnabled = true; // mul instructions are enabled at the start
    // Array to hold all instructions with their positions
    var instructions = [];
    // Find all instructions and their positions
    while ((match = instructionRegex.exec(corruptedMemory)) !== null) {
        var index = match.index;
        if (match[0].includes("do()")) {
            instructions.push({ type: 'do', position: index });
        }
        else if (match[0].includes("don't()")) {
            instructions.push({ type: "don't", position: index });
        }
        else if (match[0].startsWith('mul(')) {
            // It's a mul(X,Y) instruction
            var x = parseInt(match[1], 10);
            var y = parseInt(match[2], 10);
            instructions.push({ type: 'mul', position: index, x: x, y: y });
        }
    }
    // Sort instructions by their position in the string
    instructions.sort(function (a, b) { return a.position - b.position; });
    // Process instructions in order
    for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
        var instr = instructions_1[_i];
        if (instr.type === 'do') {
            mulEnabled = true;
        }
        else if (instr.type === "don't") {
            mulEnabled = false;
        }
        else if (instr.type === 'mul') {
            if (mulEnabled && instr.x !== undefined && instr.y !== undefined) {
                sum += instr.x * instr.y;
            }
        }
    }
    return sum;
}
// Specify the path to your input file
var filePath = 'input.txt';
// Calculate the sum of enabled multiplications
var totalSum = sumEnabledMultiplications(filePath);
// Output the result
console.log("The sum of enabled multiplications is: ".concat(totalSum));

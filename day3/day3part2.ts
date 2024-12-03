import * as fs from 'fs';

function sumEnabledMultiplications(filePath: string): number {
   
    const corruptedMemory = fs.readFileSync(filePath, 'utf-8');

    const instructionRegex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;

    let sum = 0;
    let match;
    let mulEnabled = true; 

 
    const instructions: { type: string; position: number; x?: number; y?: number }[] = [];

    
    while ((match = instructionRegex.exec(corruptedMemory)) !== null) {
        const { index } = match;
        if (match[0].includes("do()")) {
            instructions.push({ type: 'do', position: index });
        } else if (match[0].includes("don't()")) {
            instructions.push({ type: "don't", position: index });
        } else if (match[0].startsWith('mul(')) {
           
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            instructions.push({ type: 'mul', position: index, x, y });
        }
    }

    
    instructions.sort((a, b) => a.position - b.position);

    
    for (const instr of instructions) {
        if (instr.type === 'do') {
            mulEnabled = true;
        } else if (instr.type === "don't") {
            mulEnabled = false;
        } else if (instr.type === 'mul') {
            if (mulEnabled && instr.x !== undefined && instr.y !== undefined) {
                sum += instr.x * instr.y;
            }
        }
    }

    return sum;
}


const filePath = 'input.txt';

const totalSum = sumEnabledMultiplications(filePath);

console.log(`The sum of enabled multiplications is: ${totalSum}`);

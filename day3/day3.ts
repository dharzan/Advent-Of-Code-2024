import * as fs from 'fs';

function sumValidMultiplications(filePath: string): number {

    const corruptedMemory = fs.readFileSync(filePath, 'utf-8');

    
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    let sum = 0;
    let match;


    while ((match = regex.exec(corruptedMemory)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}


const filePath = 'input.txt';

const totalSum = sumValidMultiplications(filePath);

console.log(`The sum of valid multiplications is: ${totalSum}`);

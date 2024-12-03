import * as fs from 'fs';
import * as readline from 'readline';

async function computeTotalDistance(filePath: string): Promise<number> {
    const leftList: number[] = [];
    const rightList: number[] = [];

    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        
        if (line.trim() === '') continue;

       
        const [leftStr, rightStr] = line.trim().split(/\s+/);
        if (leftStr === undefined || rightStr === undefined) {
            console.error(`Invalid line: ${line}`);
            continue;
        }

        const leftNum = parseInt(leftStr, 10);
        const rightNum = parseInt(rightStr, 10);

        if (isNaN(leftNum) || isNaN(rightNum)) {
            console.error(`Invalid numbers in line: ${line}`);
            continue;
        }

        leftList.push(leftNum);
        rightList.push(rightNum);
    }

    
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    
    let totalDistance = 0;
    const n = Math.min(leftList.length, rightList.length);

    for (let i = 0; i < n; i++) {
        const distance = Math.abs(leftList[i] - rightList[i]);
        totalDistance += distance;
    }

    return totalDistance;
}


async function main() {
    const filePath = 'input.txt'; 

    try {
        const totalDistance = await computeTotalDistance(filePath);
        console.log(`The total distance between the lists is: ${totalDistance}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

main();

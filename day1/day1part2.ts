import * as fs from 'fs';
import * as readline from 'readline';

async function computeSimilarityScore(filePath: string): Promise<number> {
    const leftList: number[] = [];
    const rightList: number[] = [];

    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        // Skip empty lines
        if (line.trim() === '') continue;

        // Split the line into two numbers
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

    // Build a frequency map for numbers in the right list
    const rightFreqMap = new Map<number, number>();
    for (const num of rightList) {
        rightFreqMap.set(num, (rightFreqMap.get(num) || 0) + 1);
    }

    // Compute the similarity score
    let similarityScore = 0;

    for (const num of leftList) {
        const countInRight = rightFreqMap.get(num) || 0;
        similarityScore += num * countInRight;
    }

    return similarityScore;
}

// Main function
async function main() {
    const filePath = 'input.txt'; // Replace with your input file path

    try {
        const similarityScore = await computeSimilarityScore(filePath);
        console.log(`The similarity score between the lists is: ${similarityScore}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

main();

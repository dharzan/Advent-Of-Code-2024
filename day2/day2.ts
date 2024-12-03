import * as fs from 'fs';


class Report {
    levels: number[];

    constructor(levels: number[]) {
        this.levels = levels;
    }

    isSafe(): boolean {
        if (this.levels.length < 2) {
           
            return false;
        }

      
        const firstDiff = this.levels[1] - this.levels[0];

        if (firstDiff === 0) {
           
            return false;
        }

        const isIncreasing = firstDiff > 0;
        const isDecreasing = firstDiff < 0;

        for (let i = 1; i < this.levels.length; i++) {
            const diff = this.levels[i] - this.levels[i - 1];

            if (diff === 0) {
                return false;
            }

            const absDiff = Math.abs(diff);
            if (absDiff < 1 || absDiff > 3) {
                return false;
            }

            if (isIncreasing && diff <= 0) {
                return false;
            }

            if (isDecreasing && diff >= 0) {
                return false;
            }
        }

        return true;
    }
}

class Analyzer {
    reports: Report[];

    constructor(reports: Report[]) {
        this.reports = reports;
    }

    countSafeReports(): number {
        let safeCount = 0;

        for (const report of this.reports) {
            if (report.isSafe()) {
                safeCount++;
            }
        }

        return safeCount;
    }
}

function main() {
    const filePath = 'input.txt'; 
    const input = fs.readFileSync(filePath, 'utf-8');
    const lines = input.trim().split('\n');

   
    const reports: Report[] = lines.map(line => {
        const levels = line.trim().split(/\s+/).map(Number);
        return new Report(levels);
    });


    const analyzer = new Analyzer(reports);
    const safeReportsCount = analyzer.countSafeReports();

    console.log(`Number of safe reports: ${safeReportsCount}`);
}

main();

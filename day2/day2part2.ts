import * as fs from 'fs';


class Report {
    levels: number[];

    constructor(levels: number[]) {
        this.levels = levels;
    }

    isSafe(levelsToCheck?: number[]): boolean {
        const levels = levelsToCheck || this.levels;

        if (levels.length < 2) {
         
            return false;
        }

        const firstDiff = levels[1] - levels[0];

        if (firstDiff === 0) {
          
            return false;
        }

        const isIncreasing = firstDiff > 0;
        const isDecreasing = firstDiff < 0;

        for (let i = 1; i < levels.length; i++) {
            const diff = levels[i] - levels[i - 1];

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

    isSafeWithProblemDampener(): boolean {
        if (this.isSafe()) {
            return true;
        }
        for (let i = 0; i < this.levels.length; i++) {
            const levelsWithoutI = this.levels.slice(0, i).concat(this.levels.slice(i + 1));
            const modifiedReport = new Report(levelsWithoutI);

            if (modifiedReport.isSafe()) {
                return true;
            }
        }

        return false;
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
            if (report.isSafeWithProblemDampener()) {
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Report = /** @class */ (function () {
    function Report(levels) {
        this.levels = levels;
    }
    Report.prototype.isSafe = function (levelsToCheck) {
        var levels = levelsToCheck || this.levels;
        if (levels.length < 2) {
            return false;
        }
        var firstDiff = levels[1] - levels[0];
        if (firstDiff === 0) {
            return false;
        }
        var isIncreasing = firstDiff > 0;
        var isDecreasing = firstDiff < 0;
        for (var i = 1; i < levels.length; i++) {
            var diff = levels[i] - levels[i - 1];
            if (diff === 0) {
                return false;
            }
            var absDiff = Math.abs(diff);
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
    };
    Report.prototype.isSafeWithProblemDampener = function () {
        if (this.isSafe()) {
            // The report is already safe without removing any level
            return true;
        }
        // Try removing each level one at a time and check if the remaining levels are safe
        for (var i = 0; i < this.levels.length; i++) {
            // Create a copy of levels without the i-th element
            var levelsWithoutI = this.levels.slice(0, i).concat(this.levels.slice(i + 1));
            var modifiedReport = new Report(levelsWithoutI);
            if (modifiedReport.isSafe()) {
                return true;
            }
        }
        return false;
    };
    return Report;
}());
var Analyzer = /** @class */ (function () {
    function Analyzer(reports) {
        this.reports = reports;
    }
    Analyzer.prototype.countSafeReports = function () {
        var safeCount = 0;
        for (var _i = 0, _a = this.reports; _i < _a.length; _i++) {
            var report = _a[_i];
            if (report.isSafeWithProblemDampener()) {
                safeCount++;
            }
        }
        return safeCount;
    };
    return Analyzer;
}());
function main() {
    var filePath = 'input.txt';
    var input = fs.readFileSync(filePath, 'utf-8');
    var lines = input.trim().split('\n');
    var reports = lines.map(function (line) {
        var levels = line.trim().split(/\s+/).map(Number);
        return new Report(levels);
    });
    var analyzer = new Analyzer(reports);
    var safeReportsCount = analyzer.countSafeReports();
    console.log("Number of safe reports: ".concat(safeReportsCount));
}
main();

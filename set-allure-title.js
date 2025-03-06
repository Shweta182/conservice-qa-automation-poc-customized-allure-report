const allure = require('allure-commandline');
const fs = require('fs');

const reportTitle = process.env.REPORT_TITLE || 'Conservice Allure Report';
const allureResultsDir = 'allure-results';
const allureReportDir = 'allure-report';

// Update the title in the Allure results JSON files
fs.readdirSync(allureResultsDir).forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = `${allureResultsDir}/${file}`;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.name = reportTitle;
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
});

// Generate the Allure report
allure(['generate', allureResultsDir, '-o', allureReportDir, '--clean']);
console.log(`Allure report title updated to: ${reportTitle}`);
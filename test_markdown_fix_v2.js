
function preprocessMarkdown(markdown) {
    if (!markdown) return '';
    let processed = markdown;

    // 1. Replace literal "\n" sequences with actual newlines
    processed = processed.replace(/\\n/g, '\n');

    // 2. Fix tables that are jammed onto one line
    // Strategy: Identify lines that look like jammed tables (contain separator pattern)
    // and aggressively split them.

    const lines = processed.split('\n');
    const newLines = lines.map(line => {
        // Check if line contains a table separator pattern like "| :--- |" or "| --- |"
        // and is long enough to be a jammed table
        if ((/\|\s*:?-+:?\s*\|/.test(line)) && line.length > 50) {
            let fixedLine = line;

            // A. Ensure newlines around the separator row
            // Replace "| | :---" with "|\n| :---" (Header -> Separator)
            fixedLine = fixedLine.replace(/\|\s+\|\s+([:\-])/g, '|\n| $1');

            // Replace ":--- | |" with ":--- |\n| " (Separator -> Body)
            fixedLine = fixedLine.replace(/([:\-])\s+\|\s+\|/g, '$1 |\n|');

            // B. Aggressively split other rows if they are jammed with "| |"
            fixedLine = fixedLine.replace(/\|\s+\|/g, '|\n|');

            // C. Ensure the table itself starts on a new line if it follows text
            // "Text | Header" -> "Text\n\n| Header"
            fixedLine = fixedLine.replace(/([^\n\|])\s+(\|.*\|)/, '$1\n\n$2');

            return fixedLine;
        }
        return line;
    });

    processed = newLines.join('\n');

    // Fallback for cases not caught by line-by-line
    processed = processed.replace(/([^\n])(\s*\|.*\|)/g, '$1\n\n$2');

    return processed;
}

const input = `Indicators (KPIs) Impacted: | Metric | Before Automation (Manual Process) | After Automation (Flowjoy Workflow) | Improvement | | :--- | :--- | :--- | :--- | | Content Output (Articles/Month) | 8 | 35 | 337% Increase | | Time Spent on Research & Briefing | 10 hours/article | 30 minutes/article | 95% Reduction | | Average Time to 1st Page Ranking | 180 days | 90 days | 50% Faster | | Team Productivity (Focus on Editing) | 30% Editing, 70% Drafting/Admin | this should never be seen by users | :--- | :--- | :--- | :--- |`;

console.log('--- Input ---');
console.log(input);
console.log('\n--- Processed ---');
console.log(preprocessMarkdown(input));


function preprocessMarkdown(markdown) {
    if (!markdown) return '';
    let processed = markdown;

    // 1. Replace literal "\n" sequences with actual newlines
    processed = processed.replace(/\\n/g, '\n');

    // 2. Fix tables that are jammed onto one line
    // Strategy: 
    // A. Explicitly fix transitions into and out of the separator row.
    //    This isolates the separator row from the header and body.
    // B. Process the resulting lines. If a line looks like a separator row, leave it alone.
    //    If it looks like a body/header row, aggressively split jammed cells.

    // A. Fix transitions
    // Header -> Separator: "| Header | | :--- |" -> "| Header |\n| :--- |"
    processed = processed.replace(/\|\s+\|\s+([:\-])/g, '|\n| $1');

    // Separator -> Body: "| :--- | | Content |" -> "| :--- |\n| Content |"
    processed = processed.replace(/([:\-])\s+\|\s+\|/g, '$1 |\n|');

    // B. Process lines
    const lines = processed.split('\n');
    const newLines = lines.map(line => {
        // Check if line looks like a separator row (contains pattern like "| :--- |" or "| --- |")
        // We use a strict regex to avoid false positives in normal text
        const isSeparatorRow = /\|\s*:?-{3,}:?\s*\|/.test(line);

        if (isSeparatorRow) {
            // It's a separator row (or contains one). 
            // We've already isolated it from Header and Body in step A.
            // We DO NOT want to aggressively split this, as it might contain "| |" spacing 
            // that caused the "weird" splitting issue reported by the user.
            return line;
        } else {
            // It's a header or body row.
            // If it contains "| |", it's likely a jammed row break.
            // We aggressively replace "| |" with "|\n|"
            // We only do this if the line actually looks like a table row (starts/ends with pipe)
            if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
                return line.replace(/\|\s+\|/g, '|\n|');
            }
            return line;
        }
    });

    processed = newLines.join('\n');

    // Ensure table starts on a new line if it follows text immediately
    processed = processed.replace(/([^\n])(\s*\|.*\|)/g, '$1\n\n$2');

    return processed;
}

const input1 = `Indicators (KPIs) Impacted: | Metric | Before Automation (Manual Process) | After Automation (Flowjoy Workflow) | Improvement | | :--- | :--- | :--- | :--- | | Content Output (Articles/Month) | 8 | 35 | 337% Increase | | Time Spent on Research & Briefing | 10 hours/article | 30 minutes/article | 95% Reduction | | Average Time to 1st Page Ranking | 180 days | 90 days | 50% Faster | | Team Productivity (Focus on Editing) | 30% Editing, 70% Drafting/Admin | this should never be seen by users | :--- | :--- | :--- | :--- |`;

const input2 = `| Feature Area | Traditional Tools (e.g., Ubersuggest) | AI Automation Tools (e.g., Flowjoy) | | :--- | | :--- | :--- | | Research Output | Raw keyword data, search volume, difficulty scores. | Actionable content briefs, channel-specific strategy, engagement scoring. | | Workflow | Manual export, spreadsheet analysis, separate content drafting. | End-to-end automation: research discovery leads dire`;

console.log('--- Input 1 (Jammed Body) ---');
console.log(preprocessMarkdown(input1));

console.log('\n--- Input 2 (Weird Separator) ---');
console.log(preprocessMarkdown(input2));

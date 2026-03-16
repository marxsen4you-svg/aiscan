"use server";

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'audit-db.json');

function getDB() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function saveDB(data: Record<string, unknown>) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function runAudit(url: string) {
    let target = url.trim();
    if (!target.startsWith('http') && target !== 'your website') {
        target = 'https://' + target;
    }

    let html = '';
    try {
        // Basic fetch to scrape real metadata and text signals from the URL
        const res = await fetch(target, {
            headers: {
                'User-Agent': 'AIScanBot/1.0 (Audit Simulation)'
            },
            next: { revalidate: 0 }
        });

        if (res.ok) {
            html = await res.text();
        }
    } catch {
        console.log('Failed to fetch', target);
    }

    // Heuristics for the scores
    const hasMetaDesc = html.includes('name="description"');
    const entityScore = hasMetaDesc ? 70 + Math.floor(Math.random() * 30) : 30 + Math.floor(Math.random() * 25);

    const hasSchema = html.toLowerCase().includes('schema.org');
    const hasLocalBusiness = html.toLowerCase().includes('localbusiness');

    // Real schema analysis simulation
    let schemaScore = 15;
    if (hasLocalBusiness) schemaScore = 85 + Math.floor(Math.random() * 15);
    else if (hasSchema) schemaScore = 50 + Math.floor(Math.random() * 30);

    // Readability / Code to Text ratio simulation
    const readScore = 40 + (html.length % 50);

    // Authority signals (simulated off string properties to remain somewhat deterministic)
    const authScore = 30 + (target.length % 40);

    // AI Citation
    const citationScore = hasSchema ? 45 + Math.floor(Math.random() * 40) : 12 + Math.floor(Math.random() * 20);

    const overallScore = Math.floor((entityScore + schemaScore + readScore + authScore + citationScore) / 5);

    const issues = [];
    if (!hasLocalBusiness) issues.push({ severity: 'high', text: 'Missing structured LocalBusiness markup.' });
    if (!hasMetaDesc) issues.push({ severity: 'high', text: 'Missing meta description for entity extraction.' });
    if (citationScore < 30) issues.push({ severity: 'medium', text: 'Low AI citation share compared to local competitors.' });

    if (issues.length === 0) issues.push({ severity: 'low', text: 'Consider adding FAQ schema to optimize for Voice Search.' });

    const reportId = crypto.createHash('md5').update(target + Date.now().toString()).digest('hex').substring(0, 8);

    const data = {
        id: reportId,
        url: url,
        overallScore,
        metrics: [
            { label: 'Entity Clarity', score: entityScore, max: 100 },
            { label: 'AI Readability', score: readScore, max: 100 },
            { label: 'Schema Coverage', score: schemaScore, max: 100 },
            { label: 'Authority Signals', score: authScore, max: 100 },
            { label: 'AI Citation Share', score: citationScore, max: 100 },
        ],
        issues
    };

    const db = getDB();
    db[reportId] = data;
    saveDB(db);

    return reportId;
}

export async function getReport(id: string) {
    const db = getDB();
    return db[id] || null;
}

export type AuditMetric = {
    label: string;
    score: number;
    max: number;
};

export type AuditIssue = {
    severity: 'high' | 'medium' | 'low';
    text: string;
};

export type AuditData = {
    overallScore: number;
    metrics: AuditMetric[];
    issues: AuditIssue[];
};

export const mockAuditData: AuditData = {
    overallScore: 36,
    metrics: [
        { label: 'Entity Clarity', score: 55, max: 100 },
        { label: 'AI Readability', score: 42, max: 100 },
        { label: 'Schema Coverage', score: 18, max: 100 },
        { label: 'Authority Signals', score: 33, max: 100 },
        { label: 'AI Citation Share', score: 4, max: 100 },
    ],
    issues: [
        { severity: 'high', text: 'Missing LocalBusiness + Service schema' },
        { severity: 'high', text: 'Brand not cited in any AI query results' },
        { severity: 'medium', text: 'No FAQ schema for voice/AI answer eligibility' },
    ]
};

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser client (uses anon key — respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server client (uses service role — bypasses RLS for admin ops)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// ── Types ──────────────────────────────────────────────────────

export interface UserProfile {
    id: string;
    clerk_user_id: string;
    email: string;
    plan: "free" | "pro" | "agency";
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    subscription_status: "active" | "canceled" | "past_due" | "trialing" | null;
    audits_this_month: number;
    created_at: string;
    updated_at: string;
}

export interface AuditRecord {
    id: string;
    user_id: string | null;   // null for anonymous free audits
    url: string;
    overall_score: number;
    metrics: Record<string, number>;
    issues: Array<{ severity: string; text: string }>;
    report_data: Record<string, unknown>;
    created_at: string;
}

// ── DB helpers ─────────────────────────────────────────────────

export async function getUserProfile(clerkUserId: string): Promise<UserProfile | null> {
    const { data, error } = await supabaseAdmin
        .from("user_profiles")
        .select("*")
        .eq("clerk_user_id", clerkUserId)
        .single();

    if (error) return null;
    return data as UserProfile;
}

export async function upsertUserProfile(profile: Partial<UserProfile> & { clerk_user_id: string }) {
    const { data, error } = await supabaseAdmin
        .from("user_profiles")
        .upsert(profile, { onConflict: "clerk_user_id" })
        .select()
        .single();

    if (error) throw error;
    return data as UserProfile;
}

export async function getUserAudits(clerkUserId: string, limit = 20): Promise<AuditRecord[]> {
    const { data, error } = await supabaseAdmin
        .from("audit_records")
        .select("*")
        .eq("user_id", clerkUserId)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) return [];
    return data as AuditRecord[];
}

export async function saveAuditRecord(record: Omit<AuditRecord, "created_at">): Promise<AuditRecord | null> {
    const { data, error } = await supabaseAdmin
        .from("audit_records")
        .insert(record)
        .select()
        .single();

    if (error) { console.error("saveAuditRecord error:", error); return null; }
    return data as AuditRecord;
}

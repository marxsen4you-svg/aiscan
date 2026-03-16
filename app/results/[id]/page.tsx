import { getReport } from "@/lib/actions";
import { notFound } from "next/navigation";
import { ResultsClient } from "@/components/ui/ResultsClient";

export default async function ResultsPage({ params }: { params: { id: string } }) {
    const reportData = await getReport(params.id);
    if (!reportData) notFound();
    return <ResultsClient reportData={reportData} reportId={params.id} />;
}

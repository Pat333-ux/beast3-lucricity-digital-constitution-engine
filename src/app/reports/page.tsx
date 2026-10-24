import BenefitsDashboard from "@/components/BenefitsDashboard";

export const metadata = {
  title: "Reports & Analytics | BEAST 3.0 LUCRICITY",
  description: "View aggregate benefits deployment, resource allocation reporting, and system-wide outcomes.",
};

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          System Reports & Outcome Analytics
        </h1>
        <p className="text-slate-400">
          Review benefit distribution records, compliance metrics, and aggregate ecosystem outcome data.
        </p>
      </header>
      <BenefitsDashboard />
    </div>
  );
}

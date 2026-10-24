import OrganizationMetrics from "@/components/OrganizationMetrics";

export const metadata = {
  title: "Administration | BEAST 3.0 LUCRICITY",
  description: "Ecosystem administrative controls, system health monitoring, and governance compliance metrics.",
};

export default function AdministrationPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          System Administration & Governance
        </h1>
        <p className="text-slate-400">
          Manage system configurations, monitor organizational metrics, and review compliance logs.
        </p>
      </header>
      <OrganizationMetrics />
    </div>
  );
}

import ConstitutionViewer from "@/components/ConstitutionViewer";

export const metadata = {
  title: "Digital Constitution | BEAST 3.0 LUCRICITY",
  description: "View and review active constitutional articles, member rights, and governance protocols.",
};

export default function ConstitutionPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Digital Constitution Engine
        </h1>
        <p className="text-slate-400">
          Core governing principles, member rights, and systemic frameworks for the LUCRICITY ecosystem.
        </p>
      </header>
      <ConstitutionViewer />
    </div>
  );
}

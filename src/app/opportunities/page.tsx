import OpportunityCard from "@/components/OpportunityCard";

export const metadata = {
  title: "Opportunities Directory | BEAST 3.0 LUCRICITY",
  description: "Browse federal, state, local, and nonprofit assistance programs and grant opportunities.",
};

export default function OpportunitiesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Opportunities & Resource Directory
        </h1>
        <p className="text-slate-400">
          Explore structured funding programs, assistance initiatives, and ecosystem grants configured within the system.
        </p>
      </header>
      <OpportunityCard />
    </div>
  );
}

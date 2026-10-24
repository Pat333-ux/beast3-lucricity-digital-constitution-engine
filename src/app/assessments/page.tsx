import ProgramMatcher from "@/components/ProgramMatcher";

export const metadata = {
  title: "Member Assessments | BEAST 3.0 LUCRICITY",
  description: "Evaluate household needs, determine program eligibility, and match members with active resources.",
};

export default function AssessmentsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Resource Eligibility & Needs Assessment
        </h1>
        <p className="text-slate-400">
          Complete intake assessments to analyze household requirements against federal, state, local, and community benefit frameworks.
        </p>
      </header>
      <ProgramMatcher />
    </div>
  );
}

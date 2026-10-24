import WellbeingScore from "@/components/WellbeingScore";

export const metadata = {
  title: "Wellbeing Index | BEAST 3.0 LUCRICITY",
  description: "Monitor member and community wellbeing metrics across economic, health, and stability dimensions.",
};

export default function WellbeingPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Wellbeing Index & Analytics
        </h1>
        <p className="text-slate-400">
          Track multidimensional health, housing, and economic sustainability indicators across the ecosystem.
        </p>
      </header>
      <WellbeingScore />
    </div>
  );
}

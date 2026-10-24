import MemberProfile from "@/components/MemberProfile";

export const metadata = {
  title: "Member Portal | BEAST 3.0 LUCRICITY",
  description: "Manage member profiles, demographic records, and individual entitlement parameters.",
};

export default function MembersPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Member Directory & Management
        </h1>
        <p className="text-slate-400">
          Access individual ecosystem records, household specifications, and system tier memberships.
        </p>
      </header>
      <MemberProfile />
    </div>
  );
}

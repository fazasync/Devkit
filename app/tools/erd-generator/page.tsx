import { ErdGenerator } from "@/features/erd-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "ERD Generator — DevKit",
  description: "Generate entity relationship diagrams.",
};

export default function ErdGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="erd-generator" />
      <ErdGenerator />
    </>
  );
}
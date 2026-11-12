import { NanoIdGenerator } from "@/features/nano-id-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Nano ID Generator — DevKit",
  description: "Generate Nano IDs.",
};

export default function NanoIdGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="nano-id-generator" />
      <NanoIdGenerator />
    </>
  );
}
import { HashGenerator } from "@/features/hash-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Hash Generator — DevKit",
  description: "Generate cryptographic hashes.",
};

export default function HashGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="hash-generator" />
      <HashGenerator />
    </>
  );
}
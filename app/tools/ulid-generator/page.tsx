import { UlidGenerator } from "@/features/ulid-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "ULID Generator — DevKit",
  description: "Generate ULIDs.",
};

export default function UlidGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="ulid-generator" />
      <UlidGenerator />
    </>
  );
}
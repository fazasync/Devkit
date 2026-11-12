import { UuidGenerator } from "@/features/uuid-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "UUID Generator — DevKit",
  description: "Generate version 4 UUIDs.",
};

export default function UuidGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="uuid-generator" />
      <UuidGenerator />
    </>
  );
}
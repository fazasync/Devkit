import { TextDiff } from "@/features/text-diff";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JSON Diff — DevKit",
  description: "Compare two JSON documents.",
};

export default function JsonDiffPage() {
  return (
    <>
      <RecentlyUsedTracker id="json-diff" />
      <TextDiff />
    </>
  );
}
import { TextDiff } from "@/features/text-diff";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Text Diff — DevKit",
  description: "Compare two texts.",
};

export default function TextDiffPage() {
  return (
    <>
      <RecentlyUsedTracker id="text-diff" />
      <TextDiff />
    </>
  );
}
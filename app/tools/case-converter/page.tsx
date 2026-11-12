import { CaseConverter } from "@/features/case-converter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Case Converter — DevKit",
  description: "Convert text between cases.",
};

export default function CaseConverterPage() {
  return (
    <>
      <RecentlyUsedTracker id="case-converter" />
      <CaseConverter />
    </>
  );
}
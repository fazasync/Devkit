import { RegexTester } from "@/features/regex-tester";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Regex Tester — DevKit",
  description: "Test regular expressions against text.",
};

export default function RegexTesterPage() {
  return (
    <>
      <RecentlyUsedTracker id="regex-tester" />
      <RegexTester />
    </>
  );
}
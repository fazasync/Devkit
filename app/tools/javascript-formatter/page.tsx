import { JavaScriptFormatter } from "@/features/javascript-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JavaScript Formatter — DevKit",
  description: "Format and minify JavaScript.",
};

export default function JavaScriptFormatterPage() {
  return (
    <>
      <RecentlyUsedTracker id="javascript-formatter" />
      <JavaScriptFormatter />
    </>
  );
}
import { HtmlFormatter } from "@/features/html-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "HTML Formatter — DevKit",
  description: "Format and minify HTML.",
};

export default function HtmlFormatterPage() {
  return (
    <>
      <RecentlyUsedTracker id="html-formatter" />
      <HtmlFormatter />
    </>
  );
}
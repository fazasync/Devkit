import { CssFormatter } from "@/features/css-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "CSS Formatter — DevKit",
  description: "Format and minify CSS.",
};

export default function CssFormatterPage() {
  return (
    <>
      <RecentlyUsedTracker id="css-formatter" />
      <CssFormatter />
    </>
  );
}
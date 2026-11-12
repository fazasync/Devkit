import { CssFormatter } from "@/features/css-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "CSS Minifier — DevKit",
  description: "Minify CSS.",
};

export default function CssMinifierPage() {
  return (
    <>
      <RecentlyUsedTracker id="css-minifier" />
      <CssFormatter />
    </>
  );
}
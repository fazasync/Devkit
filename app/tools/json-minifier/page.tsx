import { JsonFormatter } from "@/features/json-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JSON Minifier — DevKit",
  description: "Minify JSON.",
};

export default function JsonMinifierPage() {
  return (
    <>
      <RecentlyUsedTracker id="json-minifier" />
      <JsonFormatter />
    </>
  );
}
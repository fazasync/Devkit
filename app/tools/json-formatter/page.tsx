import { JsonFormatter } from "@/features/json-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JSON Formatter — DevKit",
  description: "Format, minify, and validate JSON.",
};

export default function JsonFormatterPage() {
  return (
    <>
      <RecentlyUsedTracker id="json-formatter" />
      <JsonFormatter />
    </>
  );
}
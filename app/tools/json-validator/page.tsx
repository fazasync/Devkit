import { JsonFormatter } from "@/features/json-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JSON Validator — DevKit",
  description: "Validate JSON.",
};

export default function JsonValidatorPage() {
  return (
    <>
      <RecentlyUsedTracker id="json-validator" />
      <JsonFormatter />
    </>
  );
}
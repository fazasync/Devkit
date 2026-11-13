import { JsonToCsv } from "@/features/json-to-csv";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JSON to CSV — DevKit",
  description: "Convert JSON arrays to CSV.",
};

export default function JsonToCsvPage() {
  return (
    <>
      <RecentlyUsedTracker id="json-to-csv" />
      <JsonToCsv />
    </>
  );
}
import { SqlFormatter } from "@/features/sql-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "SQL Formatter — DevKit",
  description: "Format and minify SQL.",
};

export default function SqlFormatterPage() {
  return (
    <>
      <RecentlyUsedTracker id="sql-formatter" />
      <SqlFormatter />
    </>
  );
}
import { SqlFormatter } from "@/features/sql-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "SQL Minifier — DevKit",
  description: "Minify SQL.",
};

export default function SqlMinifierPage() {
  return (
    <>
      <RecentlyUsedTracker id="sql-minifier" />
      <SqlFormatter />
    </>
  );
}
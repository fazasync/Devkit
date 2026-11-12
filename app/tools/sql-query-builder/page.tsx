import { SqlQueryBuilder } from "@/features/sql-query-builder";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "SQL Query Builder — DevKit",
  description: "Build SQL queries visually.",
};

export default function SqlQueryBuilderPage() {
  return (
    <>
      <RecentlyUsedTracker id="sql-query-builder" />
      <SqlQueryBuilder />
    </>
  );
}
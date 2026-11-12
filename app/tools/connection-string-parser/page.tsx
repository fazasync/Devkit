import { ConnectionStringParser } from "@/features/connection-string-parser";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Connection String Parser — DevKit",
  description: "Parse database connection strings.",
};

export default function ConnectionStringParserPage() {
  return (
    <>
      <RecentlyUsedTracker id="connection-string-parser" />
      <ConnectionStringParser />
    </>
  );
}
import { TimestampConverter } from "@/features/timestamp-converter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Unix Timestamp Converter — DevKit",
  description: "Convert between Unix timestamps and dates.",
};

export default function TimestampConverterPage() {
  return (
    <>
      <RecentlyUsedTracker id="timestamp-converter" />
      <TimestampConverter />
    </>
  );
}
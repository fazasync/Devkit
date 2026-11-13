import { HmacGenerator } from "@/features/hmac-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "HMAC Generator — DevKit",
  description: "Generate HMAC signatures.",
};

export default function HmacGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="hmac-generator" />
      <HmacGenerator />
    </>
  );
}
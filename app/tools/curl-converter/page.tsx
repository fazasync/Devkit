import { CurlConverter } from "@/features/curl-converter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "cURL Converter — DevKit",
  description: "Convert cURL commands to code.",
};

export default function CurlConverterPage() {
  return (
    <>
      <RecentlyUsedTracker id="curl-converter" />
      <CurlConverter />
    </>
  );
}
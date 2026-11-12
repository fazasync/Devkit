import { UrlParser } from "@/features/url-parser";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "URL Parser — DevKit",
  description: "Parse URLs into components.",
};

export default function UrlParserPage() {
  return (
    <>
      <RecentlyUsedTracker id="url-parser" />
      <UrlParser />
    </>
  );
}
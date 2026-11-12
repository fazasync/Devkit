import { XmlFormatter } from "@/features/xml-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "XML Formatter — DevKit",
  description: "Format and minify XML.",
};

export default function XmlFormatterPage() {
  return (
    <>
      <RecentlyUsedTracker id="xml-formatter" />
      <XmlFormatter />
    </>
  );
}
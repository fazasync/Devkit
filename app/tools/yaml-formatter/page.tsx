import { YamlFormatter } from "@/features/yaml-formatter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "YAML Formatter — DevKit",
  description: "Format and minify YAML.",
};

export default function YamlFormatterPage() {
  return (
    <>
      <RecentlyUsedTracker id="yaml-formatter" />
      <YamlFormatter />
    </>
  );
}
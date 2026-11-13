import { JsonToYaml } from "@/features/json-to-yaml";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JSON to YAML — DevKit",
  description: "Convert JSON to YAML.",
};

export default function JsonToYamlPage() {
  return (
    <>
      <RecentlyUsedTracker id="json-to-yaml" />
      <JsonToYaml />
    </>
  );
}
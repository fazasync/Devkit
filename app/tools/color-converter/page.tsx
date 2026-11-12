import { ColorConverter } from "@/features/color-converter";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Color Converter — DevKit",
  description: "Convert colors between formats.",
};

export default function ColorConverterPage() {
  return (
    <>
      <RecentlyUsedTracker id="color-converter" />
      <ColorConverter />
    </>
  );
}
import { LoremIpsum } from "@/features/lorem-ipsum";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Lorem Ipsum Generator — DevKit",
  description: "Generate placeholder text.",
};

export default function LoremIpsumPage() {
  return (
    <>
      <RecentlyUsedTracker id="lorem-ipsum-generator" />
      <LoremIpsum />
    </>
  );
}
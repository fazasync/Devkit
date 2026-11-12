import { UrlTool } from "@/features/url-encoder";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "URL Encoder/Decoder — DevKit",
  description: "Encode and decode URL components.",
};

export default function UrlEncoderPage() {
  return (
    <>
      <RecentlyUsedTracker id="url-encoder" />
      <UrlTool />
    </>
  );
}
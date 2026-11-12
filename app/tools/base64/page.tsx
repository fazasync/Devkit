import { Base64Tool } from "@/features/base64";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Base64 Encoder/Decoder — DevKit",
  description: "Encode and decode Base64 strings.",
};

export default function Base64Page() {
  return (
    <>
      <RecentlyUsedTracker id="base64" />
      <Base64Tool />
    </>
  );
}
import { JwtDecoder } from "@/features/jwt-decoder";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "JWT Decoder — DevKit",
  description: "Decode and inspect JSON Web Tokens.",
};

export default function JwtDecoderPage() {
  return (
    <>
      <RecentlyUsedTracker id="jwt-decoder" />
      <JwtDecoder />
    </>
  );
}
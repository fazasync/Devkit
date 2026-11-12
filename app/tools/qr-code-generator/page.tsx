import { QrCodeGenerator } from "@/features/qr-code-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "QR Code Generator — DevKit",
  description: "Generate QR codes.",
};

export default function QrCodeGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="qr-code-generator" />
      <QrCodeGenerator />
    </>
  );
}
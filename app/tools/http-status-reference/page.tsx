import { HttpStatusReference } from "@/features/http-status-reference";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "HTTP Status Reference — DevKit",
  description: "Reference for HTTP status codes.",
};

export default function HttpStatusReferencePage() {
  return (
    <>
      <RecentlyUsedTracker id="http-status-reference" />
      <HttpStatusReference />
    </>
  );
}
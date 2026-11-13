import { ApiRequestBuilder } from "@/features/api-request-builder";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "HTTP Request Builder — DevKit",
  description: "Build and send HTTP requests.",
};

export default function HttpRequestBuilderPage() {
  return (
    <>
      <RecentlyUsedTracker id="http-request-builder" />
      <ApiRequestBuilder />
    </>
  );
}
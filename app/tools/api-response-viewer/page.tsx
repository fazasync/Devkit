import { ApiResponseViewer } from "@/features/api-response-viewer";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "API Response Viewer — DevKit",
  description: "View and format API responses.",
};

export default function ApiResponseViewerPage() {
  return (
    <>
      <RecentlyUsedTracker id="api-response-viewer" />
      <ApiResponseViewer />
    </>
  );
}
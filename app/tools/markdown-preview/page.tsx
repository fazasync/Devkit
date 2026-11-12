import { MarkdownPreview } from "@/features/markdown-preview";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Markdown Preview — DevKit",
  description: "Preview Markdown.",
};

export default function MarkdownPreviewPage() {
  return (
    <>
      <RecentlyUsedTracker id="markdown-preview" />
      <MarkdownPreview />
    </>
  );
}
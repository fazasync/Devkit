import { DatabaseSchemaVisualizer } from "@/features/database-schema-visualizer";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Database Schema Visualizer — DevKit",
  description: "Visualize database schemas.",
};

export default function DatabaseSchemaVisualizerPage() {
  return (
    <>
      <RecentlyUsedTracker id="database-schema-visualizer" />
      <DatabaseSchemaVisualizer />
    </>
  );
}
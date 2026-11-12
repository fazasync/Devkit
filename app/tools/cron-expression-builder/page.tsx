import { CronExpressionBuilder } from "@/features/cron-expression-builder";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Cron Expression Builder — DevKit",
  description: "Build and explain cron expressions.",
};

export default function CronExpressionBuilderPage() {
  return (
    <>
      <RecentlyUsedTracker id="cron-expression-builder" />
      <CronExpressionBuilder />
    </>
  );
}
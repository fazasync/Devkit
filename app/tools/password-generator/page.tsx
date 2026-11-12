import { PasswordGenerator } from "@/features/password-generator";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "Password Generator — DevKit",
  description: "Generate secure passwords.",
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <RecentlyUsedTracker id="password-generator" />
      <PasswordGenerator />
    </>
  );
}
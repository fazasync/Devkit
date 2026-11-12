import { UserAgentParser } from "@/features/user-agent-parser";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "User-Agent Parser — DevKit",
  description: "Parse user-agent strings.",
};

export default function UserAgentParserPage() {
  return (
    <>
      <RecentlyUsedTracker id="user-agent-parser" />
      <UserAgentParser />
    </>
  );
}
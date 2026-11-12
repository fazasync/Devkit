import { IpAddressInfo } from "@/features/ip-address-info";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";

export const metadata = {
  title: "IP Address Information — DevKit",
  description: "Inspect IP addresses.",
};

export default function IpAddressInfoPage() {
  return (
    <>
      <RecentlyUsedTracker id="ip-address-info" />
      <IpAddressInfo />
    </>
  );
}
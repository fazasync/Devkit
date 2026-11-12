import { Settings } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Application preferences.
        </p>
      </section>
      <EmptyState
        icon={Settings}
        title="Settings coming soon"
        description="Theme preferences and additional options will be added in a later phase."
      />
    </div>
  );
}
"use client";

import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        {children}
      </div>
    </div>
  );
}

interface SettingItemProps {
  label: string;
  description?: string;
  children: ReactNode;
}

export function SettingItem({ label, description, children }: SettingItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
      <div>
        <p className="font-medium">{label}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="sm:min-w-[200px]">{children}</div>
    </div>
  );
}

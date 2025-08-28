import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPrivacy() {
  const [prefs, setPrefs] = useState({
    parentMonitoring: true,
    shareWithCounselor: true,
    researchAnalytics: false,
    crisisOverride: true,
    dailyReminder: true,
    weeklyReport: true,
  });
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Settings & Privacy</h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Privacy controls</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Toggle label="Allow parent monitoring" checked={prefs.parentMonitoring} onChange={(v) => setPrefs({ ...prefs, parentMonitoring: v })} />
            <Toggle label="Share mood data with counselor" checked={prefs.shareWithCounselor} onChange={(v) => setPrefs({ ...prefs, shareWithCounselor: v })} />
            <Toggle label="Anonymous analytics for research" checked={prefs.researchAnalytics} onChange={(v) => setPrefs({ ...prefs, researchAnalytics: v })} />
            <Toggle label="Crisis intervention override" checked={prefs.crisisOverride} onChange={(v) => setPrefs({ ...prefs, crisisOverride: v })} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Data transparency</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <div><b>What parents can see:</b> Sleep patterns, mood trends, general activity</div>
            <div><b>What they CANNOT see:</b> Message content, friend names, browsing history</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Notification preferences</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Toggle label="Daily check-in reminder" checked={prefs.dailyReminder} onChange={(v) => setPrefs({ ...prefs, dailyReminder: v })} />
            <Toggle label="Weekly report" checked={prefs.weeklyReport} onChange={(v) => setPrefs({ ...prefs, weeklyReport: v })} />
            <div className="text-sm text-muted-foreground">Crisis alerts are always on.</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Account management</CardTitle></CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-2">
            <Button variant="outline">Change password</Button>
            <Button variant="outline">Export my data</Button>
            <Button variant="outline">Pause monitoring</Button>
            <Button variant="outline">Delete account</Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader><CardTitle className="text-base">Help</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>FAQs</div>
            <div>Contact support</div>
            <div>Privacy policy</div>
            <div>Terms of service</div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm">{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

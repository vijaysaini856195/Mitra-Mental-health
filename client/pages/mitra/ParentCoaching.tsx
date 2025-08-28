import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const scenarios = [
  "Child seems withdrawn",
  "Academic stress",
  "Mood swings",
  "Sleep issues",
];

export default function ParentCoaching() {
  const [sel, setSel] = useState(scenarios[0]);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Parent Coaching
        </h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">What's happening?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {scenarios.map((s) => (
              <button
                key={s}
                onClick={() => setSel(s)}
                className={`w-full text-left px-3 py-2 rounded-md border ${sel === s ? "bg-muted" : "bg-background"}`}
              >
                {s}
              </button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <b>Current situation:</b> Arjun showing signs of depression
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="font-medium">Do's</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Listen without judgment</li>
                  <li>Validate feelings</li>
                  <li>Suggest activities together</li>
                </ul>
              </div>
              <div>
                <div className="font-medium">Don'ts</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Force conversations</li>
                  <li>Say 'snap out of it'</li>
                  <li>Compare to others</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="font-medium">Conversation starters</div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>"Want to grab ice cream and chat?"</li>
                <li>"I noticed you seem stressed. I'm here."</li>
                <li>"Let's go for a drive, just you and me."</li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Action plan</div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Today: Casual check-in</li>
                <li>This week: Plan fun activity</li>
                <li>This month: Consider counseling</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Video tutorials</Button>
              <Button variant="outline">Expert articles</Button>
              <Button variant="outline">Success stories</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

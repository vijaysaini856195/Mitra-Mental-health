import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalyticsReports() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Arjun's Mental Health Report - November 2024
        </h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Overall score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray="78,100"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div className="text-3xl font-bold">3.2 → 7.8</div>
                <div className="text-xs text-muted-foreground">Improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Detailed metrics</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2">Metric</th>
                  <th>Start</th>
                  <th>Current</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2">Sleep</td>
                  <td>4.5hrs</td>
                  <td>7.2hrs</td>
                  <td className="text-green-600 font-medium">+60% ✅</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Social</td>
                  <td>Low</td>
                  <td>Moderate</td>
                  <td className="text-green-600 font-medium">+40% ✅</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Mood</td>
                  <td>3.2</td>
                  <td>7.8</td>
                  <td className="text-green-600 font-medium">+143% ✅</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Intervention timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>Nov 1: Alert sent to parent</li>
              <li>Nov 3: First counseling session</li>
              <li>Nov 7: Medication started</li>
              <li>Nov 15: Significant improvement</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Predictive forecast</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Based on current trend, full recovery expected in 3 weeks.
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Export options</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline">Download PDF</Button>
            <Button variant="outline">Share with doctor</Button>
            <Button variant="outline">Email summary</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

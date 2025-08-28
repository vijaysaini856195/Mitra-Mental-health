import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          3 Lives Saved, 10,000+ Helped
        </h1>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StoryCard
          name="Arjun's Journey"
          before="2.8"
          after="8.9"
          quote="MITRA understood when nobody else did"
          weeks="8"
        />
        <StoryCard
          name="Sara's Journey"
          before="3.5"
          after="7.6"
          quote="Felt seen and safe"
          weeks="6"
        />
        <StoryCard
          name="Kabir's Journey"
          before="4.1"
          after="8.2"
          quote="Got my life back on track"
          weeks="7"
        />
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Improvement rate" value="92%" />
        <StatCard title="Early detection" value="6.3 weeks" />
        <StatCard title="Therapy sessions" value="50,000" />
        <StatCard title="User rating" value="4.8/5" />
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recovery timeline</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Visualizing journey from detection to recovery with steady
            improvement from 3.2 to 8.9 over 8 weeks.
          </CardContent>
        </Card>
      </section>
      <section>
        <Card>
          <CardContent className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-lg font-semibold">
              Start Your Recovery Journey Today
            </div>
            <a
              href="/"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
            >
              Free 7-Day Trial
            </a>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StoryCard({
  name,
  before,
  after,
  quote,
  weeks,
}: {
  name: string;
  before: string;
  after: string;
  quote: string;
  weeks: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          Before: {before} • After: {after}
        </div>
        <div className="mt-2 text-muted-foreground">“{quote}”</div>
        <div className="text-xs text-muted-foreground mt-1">
          {weeks} weeks to recovery
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

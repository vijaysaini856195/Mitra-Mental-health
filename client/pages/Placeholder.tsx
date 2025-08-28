import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {description || "This page will be generated next. Keep prompting to fill in the details you want here."}
        </CardContent>
      </Card>
    </div>
  );
}

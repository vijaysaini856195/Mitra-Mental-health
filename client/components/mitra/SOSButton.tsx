import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SOSButton() {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Button
        onClick={() => (window.location.href = "/app/crisis")}
        className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg"
        size="lg"
      >
        <AlertTriangle className="mr-2" /> SOS
      </Button>
    </div>
  );
}

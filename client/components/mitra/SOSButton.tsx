import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SOSButton() {
  return (
    <div className="fixed bottom-5 right-5 z-40 group" data-cursor="crisis">
      <div className="absolute -inset-6 rounded-full bg-red-500/20 blur-xl opacity-60 group-hover:animate-pulse" />
      <Button
        onClick={() => (window.location.href = "/app/crisis")}
        className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg relative overflow-hidden"
        size="lg"
      >
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center text-xs">Need help now?</span>
        <span className="group-hover:opacity-0 transition-opacity flex items-center"><AlertTriangle className="mr-2" /> SOS</span>
      </Button>
    </div>
  );
}

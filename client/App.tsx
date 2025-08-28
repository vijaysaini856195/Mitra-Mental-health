import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import NotFound from "./pages/NotFound";
import Landing from "./pages/mitra/Landing";
import ParentDashboard from "./pages/mitra/ParentDashboard";
import RiskAnalysis from "./pages/mitra/RiskAnalysis";
import StudentChat from "./pages/mitra/StudentChat";
import StudentMoodTracker from "./pages/mitra/StudentMoodTracker";
import CrisisSupport from "./pages/mitra/CrisisSupport";
import ParentCoaching from "./pages/mitra/ParentCoaching";
import AnalyticsReports from "./pages/mitra/AnalyticsReports";
import SettingsPrivacy from "./pages/mitra/SettingsPrivacy";
import Testimonials from "./pages/mitra/Testimonials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route path="parent" element={<ParentDashboard />} />
            <Route path="parent/risk" element={<RiskAnalysis />} />
            <Route path="student/chat" element={<StudentChat />} />
            <Route path="student/mood" element={<StudentMoodTracker />} />
            <Route path="crisis" element={<CrisisSupport />} />
            <Route path="coaching" element={<ParentCoaching />} />
            <Route path="reports" element={<AnalyticsReports />} />
            <Route path="settings" element={<SettingsPrivacy />} />
            <Route path="testimonials" element={<Testimonials />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

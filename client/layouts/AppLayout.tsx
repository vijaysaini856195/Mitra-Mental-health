import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Bell,
  Brain,
  LayoutDashboard,
  LineChart,
  LogOut,
  NotebookPen,
  Search,
  Settings,
} from "lucide-react";
import { useMemo } from "react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/journals", label: "Journals", icon: NotebookPen },
  { to: "/trends", label: "Mood Trends", icon: LineChart },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <Link
            to="/"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
          >
            <div className="size-8 grid place-items-center rounded-md bg-gradient-to-br from-brand-purple/90 via-brand-blue/80 to-brand-green/80 shadow-sm">
              <Brain className="size-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold">MoodMap AI</span>
              <span className="text-[10px] text-muted-foreground">Journaling</span>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ to, label, icon: Icon }) => (
                  <SidebarMenuItem key={to}>
                    <NavLink to={to} className="block">
                      {({ isActive }) => (
                        <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
                          <span className="flex items-center gap-2">
                            <Icon className="size-4" />
                            <span>{label}</span>
                          </span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <Button variant="outline" className="w-full justify-start" onClick={() => alert("Logged out")}> 
            <LogOut className="mr-2 size-4" /> Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center gap-2 p-3">
            <SidebarTrigger className="md:hidden" />
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="pl-9 h-10 rounded-full bg-muted/40 border-transparent focus-visible:ring-brand-blue placeholder:text-muted-foreground"
                placeholder="Search journal entries..."
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full">
                  <Avatar className="size-8">
                    <AvatarFallback>VS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Signed in as vijay</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert("Logged out")}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className={cn("flex-1 p-4 md:p-6", "bg-gradient-to-b from-background to-muted/40")}> 
          <Outlet />
        </main>
        <AIAssistantWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}

function AIAssistantWidget() {
  return (
    <div className="fixed bottom-4 right-4 z-30">
      <details className="group">
        <summary className="list-none">
          <Button className="rounded-full shadow-md bg-gradient-to-br from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90">
            <span className="relative grid place-items-center size-9">
              <span className="absolute inset-0 rounded-full bg-white/20 blur motion-safe:animate-pulse" />
              <Brain className="relative size-5 text-primary-foreground" />
            </span>
            Journal with AI
          </Button>
        </summary>
        <div className="mt-3 w-[22rem] md:w-[26rem] rounded-xl border bg-background shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b bg-muted/40 text-sm font-medium">AI Assistant</div>
          <div className="p-4 space-y-3">
            <div className="text-xs text-muted-foreground">Talk or type your mood. The assistant suggests reflections and tags emotions.</div>
            <textarea
              className="w-full h-28 resize-none rounded-md border bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              placeholder="How are you feeling right now?"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-brand-green" />
                Live
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Record</Button>
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

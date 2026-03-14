import React from 'react';
import { LayoutDashboard, History, Settings, Info, Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active?: boolean }) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 my-1",
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [selectedSensor, setSelectedSensor] = React.useState<{ id: string, location: string, status: string, battery: string, lastSync: string } | null>(null);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary tracking-tight flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Forest Watch
            </h1>
          </div>

          <div className="flex-1 py-6 px-4 overflow-y-auto">
            <nav className="space-y-1">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" active={location.pathname === '/'} />
              <SidebarItem icon={History} label="History" href="/history" active={location.pathname === '/history'} />
              <SidebarItem icon={Settings} label="Settings" href="/settings" />
              <SidebarItem icon={Info} label="About" href="/about" />
            </nav>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                System
              </h3>
              <div className="px-4 py-3 bg-card/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last sync: Just now
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                JS
              </div>
              <div>
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">Ranger Stations Leader</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Header */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
            <div className="hidden md:flex relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sensors..."
                className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary"
              />

              {/* Search Results Dropdown */}
              <div className="absolute top-full left-0 w-full mt-2 bg-card border border-border rounded-lg shadow-lg hidden group-focus-within:block p-2 z-50">
                <p className="text-xs text-muted-foreground px-2 py-1">Recent</p>
                <div
                  className="text-sm px-2 py-1.5 hover:bg-muted rounded cursor-pointer transition-colors"
                  onClick={() => setSelectedSensor({ id: 'ALPHA-1', location: 'Sector 4 (North)', status: 'Active', battery: '94%', lastSync: '2 mins ago' })}
                >
                  Sensor Alpha-1
                </div>
                <div
                  className="text-sm px-2 py-1.5 hover:bg-muted rounded cursor-pointer transition-colors"
                  onClick={() => setSelectedSensor({ id: 'RELAY-7', location: 'Sector 4 (East)', status: 'Warning', battery: '45%', lastSync: '5 mins ago' })}
                >
                  Sector 4 Relay
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium leading-none">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        </header>

        {/* Sensor Details Modal */}
        <Dialog open={!!selectedSensor} onOpenChange={(open) => !open && setSelectedSensor(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                {selectedSensor?.id}
              </DialogTitle>
              <DialogDescription>
                Detailed status information for this unit.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/50 rounded-lg space-y-1">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedSensor?.location}</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg space-y-1">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className={`font-medium ${selectedSensor?.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{selectedSensor?.status}</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg space-y-1">
                  <p className="text-xs text-muted-foreground">Battery</p>
                  <p className="font-medium">{selectedSensor?.battery}</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg space-y-1">
                  <p className="text-xs text-muted-foreground">Last Sync</p>
                  <p className="font-medium">{selectedSensor?.lastSync}</p>
                </div>
              </div>

              <div className="h-32 bg-secondary/30 rounded-lg flex items-center justify-center border border-border/50">
                <p className="text-xs text-muted-foreground">Detailed telemetry chart not available in preview</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

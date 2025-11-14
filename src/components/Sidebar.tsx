import { Home, TrendingUp, PlusCircle, Wallet, CheckCircle, Settings } from "lucide-react";
import { NavLink } from "./NavLink";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Active Markets", url: "/markets", icon: TrendingUp },
  { title: "Create Market", url: "/create", icon: PlusCircle },
  { title: "My Bets", url: "/bets", icon: Wallet },
  { title: "Resolved Markets", url: "/resolved", icon: CheckCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const { open } = useSidebar();

  return (
    <SidebarContainer className="border-r border-border bg-card/30 backdrop-blur-sm">
      <SidebarContent>
        <div className="px-6 py-4 border-b border-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            StreamCast
          </h1>
          {open && (
            <p className="text-xs text-muted-foreground mt-1">
              Predict the Future in Real-Time
            </p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium glow-cyan"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
};

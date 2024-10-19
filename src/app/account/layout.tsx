import Navbar from "@/components/Navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar/AppSidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <Navbar />

      <SidebarProvider className="bg-[#eeeeee]">
        <AppSidebar>{children}</AppSidebar>
      </SidebarProvider>
    </>
  );
}

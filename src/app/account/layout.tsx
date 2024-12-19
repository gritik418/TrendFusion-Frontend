import Navbar from "@/components/Navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar/AppSidebar";
import UserProvider from "@/components/UserProvider/UserProvider";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <UserProvider>
        <Navbar />

        <SidebarProvider className="bg-[#eeeeee]">
          <AppSidebar>{children}</AppSidebar>
        </SidebarProvider>
      </UserProvider>
    </>
  );
}

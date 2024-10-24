import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { GoSidebarCollapse } from "react-icons/go";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>

      <div className="flex w-full max-w-full md:max-w-[calc(100vw_-_20rem)]">
        {children}
      </div>
    </div>
  );
}

const CustomSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div onClick={toggleSidebar} className="flex items-center justify-center">
      <GoSidebarCollapse className="text-2xl" />
    </div>
  );
};

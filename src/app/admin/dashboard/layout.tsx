import Navbar from "@/components/Navbar/Navbar";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full">
      <AdminSidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}

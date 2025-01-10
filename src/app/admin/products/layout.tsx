import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

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

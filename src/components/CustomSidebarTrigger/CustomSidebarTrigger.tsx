import { FaFilter } from "react-icons/fa";
import { useSidebar } from "../ui/sidebar";

const CustomSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return <FaFilter className="cursor-pointer" onClick={toggleSidebar} />;
};

export default CustomSidebarTrigger;

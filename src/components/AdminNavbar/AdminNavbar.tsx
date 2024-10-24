import AdminSearchBar from "../AdminSearchBar/AdminSearchBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { UserNav } from "../ui/user-nav";
import { IoIosNotifications } from "react-icons/io";

const AdminNavbar = () => {
  return (
    <div className="shadow-lg justify-between py-2 px-6 flex items-center w-full sticky top-0 bg-white z-50">
      <AdminSearchBar />
      <div className="flex items-center gap-4">
        <div className="flex transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer h-10 w-10 rounded-full items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <IoIosNotifications className="text-2xl" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <UserNav />
      </div>
    </div>
  );
};

export default AdminNavbar;

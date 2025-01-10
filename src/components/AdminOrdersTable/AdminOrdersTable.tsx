import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function createData(
  orderId: string,
  orderDate: string,
  customer: string,
  payment: string,
  total: number,
  deliveryDate: string,
  items: number,
  status: string
) {
  return {
    orderId,
    orderDate,
    customer,
    payment,
    total,
    deliveryDate,
    items,
    status,
  };
}

const rows = [
  createData(
    "101",
    "20 November 2024",
    "Ritik Gupta",
    "Pending",
    2499,
    "24 December 2024",
    4,
    "Pending"
  ),
  createData(
    "102",
    "20 November 2024",
    "Ritik Gupta",
    "Pending",
    2499,
    "24 December 2024",
    4,
    "Pending"
  ),
  createData(
    "103",
    "20 November 2024",
    "Ritik Gupta",
    "Paid",
    2499,
    "24 December 2024",
    4,
    "Shipped"
  ),
  createData(
    "104",
    "20 November 2024",
    "Ritik Gupta",
    "Pending",
    2499,
    "24 December 2024",
    4,
    "Delivered"
  ),
];

const AdminOrdersTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Delivery Date</TableCell>
            <TableCell align="right">Items</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.orderId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="right">{row.orderDate}</TableCell>
              <TableCell align="right">{row.customer}</TableCell>
              <TableCell
                align="right"
                className={`${
                  row.payment === "Paid"
                    ? "text-green-600 font-semibold"
                    : "text-red-500"
                }`}
              >
                {row.payment}
              </TableCell>
              <TableCell align="right">${row.total}</TableCell>
              <TableCell align="right">{row.deliveryDate}</TableCell>
              <TableCell align="right">{row.items}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <div className="flex justify-end w-full items-center gap-2">
                  <FiEdit2 className="cursor-pointer text-sm" />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <BsThreeDotsVertical className="cursor-pointer text-lg" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="pr-2" align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>View Order</DropdownMenuItem>
                        <DropdownMenuItem>Update Order</DropdownMenuItem>
                        <DropdownMenuItem>Update Payment</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminOrdersTable;


// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Edit, Trash2, Eye } from 'lucide-react';
// import { Order, deleteOrder } from '@/store/slices/orderSlice';
// import { useIsMobile } from '@/hooks/use-mobile';
// import { toast } from 'sonner';

// interface OrderTableProps {
//   orders: Order[];
//   onEdit: (order: Order) => void;
//   onView: (order: Order) => void;
// }

// const OrderTable: React.FC<OrderTableProps> = ({ orders, onEdit, onView }) => {
//   const dispatch = useDispatch();
//   const isMobile = useIsMobile();

//   const handleDelete = (id: string) => {
//     if (confirm('Are you sure you want to delete this order?')) {
//       dispatch(deleteOrder(id));
//       toast.success('Order deleted successfully');
//     }
//   };

//   const getStatusClass = (status: string): string => {
//     switch (status) {
//       case 'pending':
//         return 'status-badge status-pending';
//       case 'shipped':
//         return 'status-badge status-shipped';
//       case 'delivered':
//         return 'status-badge status-delivered';
//       case 'cancelled':
//         return 'status-badge status-cancelled';
//       default:
//         return 'status-badge status-pending';
//     }
//   };

//   // Card view for mobile
//   if (isMobile) {
//     return (
//       <div className="px-4 py-3">
//         {orders.length > 0 ? (
//           <div className="grid grid-cols-1 gap-4">
//             {orders.map((order) => (
//               <div key={order.id} className="modern-card p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h3 className="font-medium text-gray-100">{order.id}</h3>
//                     <p className="text-sm text-gray-300">{order.customerName}</p>
//                   </div>
//                   <span className={getStatusClass(order.status)}>
//                     {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
//                     <p className="font-medium text-gray-100">${order.total.toFixed(2)}</p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => onView(order)}
//                       className="p-1.5 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => onEdit(order)}
//                       className="p-1.5 bg-amber-500/20 text-amber-400 rounded-full hover:bg-amber-500/30 transition-colors"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(order.id)}
//                       className="p-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6">
//             <p className="text-gray-400">No orders found</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Table view for larger screens
//   return (
//     <div className="overflow-x-auto">
//       <table className="oms-table">
//         <thead>
//           <tr>
//             <th className="hidden sm:table-cell">Order ID</th>
//             <th>Customer</th>
//             <th className="hidden md:table-cell">Date</th>
//             <th>Status</th>
//             <th>Total</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td className="hidden sm:table-cell font-medium">{order.id}</td>
//                 <td className="truncate max-w-[120px] md:max-w-none">{order.customerName}</td>
//                 <td className="hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <span className={getStatusClass(order.status)}>
//                     {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                   </span>
//                 </td>
//                 <td>${order.total.toFixed(2)}</td>
//                 <td className="flex items-center space-x-2 md:space-x-3">
//                   <button
//                     onClick={() => onView(order)}
//                     className="p-1.5 text-blue-400 hover:text-blue-300 transition-colors"
//                     aria-label="View order details"
//                   >
//                     <Eye className="w-4 h-4 md:w-5 md:h-5" />
//                   </button>
//                   <button
//                     onClick={() => onEdit(order)}
//                     className="p-1.5 text-amber-400 hover:text-amber-300 transition-colors"
//                     aria-label="Edit order"
//                   >
//                     <Edit className="w-4 h-4 md:w-5 md:h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(order.id)}
//                     className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
//                     aria-label="Delete order"
//                   >
//                     <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={6} className="text-center py-6 text-gray-400">
//                 No orders found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderTable;


import React from 'react';
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Order } from "@/store/slices/orderSlice"; 
import { Loader } from '@/components/common/Loader';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  onView: (orders: Order) => void;
  onEdit: (orders: Order) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onView, onEdit, onDelete, isLoading }) => {
  return (
    <>
      {/* Desktop View */}
      <div  className="overflow-x-auto">
        <table className="oms-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Products</th>
              <th>Total</th>
              <th className="hidden md:table-cell">Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <Loader />
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No orders found
                </td>
              </tr>
            ) :(
            orders.map((order, index) => (
              <tr key={order.id}>
                <td className="font-medium">{index + 1}</td>
                <td className="truncate max-w-[120px] md:max-w-none">{order.customerName}</td>
                <td>{order.items?.length}</td>
                <td>₹{order.total}</td>
                <td className="hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="flex items-center space-x-2 md:space-x-3">
                  <button
                    onClick={() => onView(order)}
                    className="p-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                    title="View order details"
                  >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    {/* <FaEye /> */}
                  </button>
                  <button
                    onClick={() => onEdit(order)}
                    className="p-1.5 text-amber-400 hover:text-amber-300 transition-colors"
                    title="Edit order"
                  >
                    <Edit className="w-4 h-4 md:w-5 md:h-5" />
                    {/* <FaPen /> */}
                  </button>
                  <button
                    onClick={() => onDelete(order.id)}
                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete order"
                  >
                    {/* <FaTrash /> */}
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="border border-gray-300 p-4 rounded-md shadow-sm bg-white"
          >
            <div className="mb-2 font-semibold text-lg">
              Order #{index + 1}
            </div>
            <div><strong>Client:</strong> {order.customerName}</div>
            <div><strong>Products:</strong> {order.items?.length}</div>
            <div><strong>Total:</strong> ₹{order.total}</div>
            <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
            <div className="flex justify-start gap-4 mt-3">
              <button
                onClick={() => onView(order)}
                className="text-blue-600 hover:text-blue-800"
                title="View"
              >
                <FaEye />
              </button>
              <button
                onClick={() => onEdit(order)}
                className="text-green-600 hover:text-green-800"
                title="Edit"
              >
                <FaPen />
              </button>
              <button
                onClick={() => onDelete(order.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderTable;

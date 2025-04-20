
import React from 'react';
import { useDispatch } from 'react-redux';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Order, deleteOrder } from '@/store/slices/orderSlice';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

interface OrderTableProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onView: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onEdit, onView }) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id));
      toast.success('Order deleted successfully');
    }
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'status-badge status-pending';
      case 'shipped':
        return 'status-badge status-shipped';
      case 'delivered':
        return 'status-badge status-delivered';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge status-pending';
    }
  };

  // Card view for mobile
  if (isMobile) {
    return (
      <div className="px-4 py-3">
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <div key={order.id} className="modern-card p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-100">{order.id}</h3>
                    <p className="text-sm text-gray-300">{order.customerName}</p>
                  </div>
                  <span className={getStatusClass(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="font-medium text-gray-100">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(order)}
                      className="p-1.5 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(order)}
                      className="p-1.5 bg-amber-500/20 text-amber-400 rounded-full hover:bg-amber-500/30 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400">No orders found</p>
          </div>
        )}
      </div>
    );
  }

  // Table view for larger screens
  return (
    <div className="overflow-x-auto">
      <table className="oms-table">
        <thead>
          <tr>
            <th className="hidden sm:table-cell">Order ID</th>
            <th>Customer</th>
            <th className="hidden md:table-cell">Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="hidden sm:table-cell font-medium">{order.id}</td>
                <td className="truncate max-w-[120px] md:max-w-none">{order.customerName}</td>
                <td className="hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={getStatusClass(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td className="flex items-center space-x-2 md:space-x-3">
                  <button
                    onClick={() => onView(order)}
                    className="p-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                    aria-label="View order details"
                  >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => onEdit(order)}
                    className="p-1.5 text-amber-400 hover:text-amber-300 transition-colors"
                    aria-label="Edit order"
                  >
                    <Edit className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                    aria-label="Delete order"
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

import React from 'react';
import { Order } from '@/store/slices/orderSlice';
import { Pencil, Trash2, Eye } from 'lucide-react';

interface Props {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
  onView: (order: Order) => void;
  isLoading: boolean;
}

const OrderTable: React.FC<Props> = ({ orders, onEdit, onDelete, onView, isLoading }) => {
  if (isLoading) {
    return <p className="text-blue-300 text-sm px-4 py-2">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-blue-300 text-sm px-4 py-2">No orders available.</p>;
  }

  return (
    <table className="oms-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-900/30">
        {orders.map((order) => (
          <tr key={order.order_id} className="hover:bg-blue-900/10">
            <td className="text-sm text-blue-100">{order.order_id}</td>
            <td className="text-sm text-blue-100">{order.client_name}</td>
            <td className="text-sm text-blue-100">{order.shipping_status}</td>
            <td className="text-sm text-blue-100">₹{Number(order.total_amount)}</td>
            <td className="text-sm text-blue-100 space-x-2">
              <button onClick={() => onView(order)} className="hover:text-blue-400" title="View">
                <Eye className="w-4 h-4" />
              </button>
              <button onClick={() => onEdit(order)} className="hover:text-green-400" title="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(order.order_id)} className="hover:text-red-400" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;

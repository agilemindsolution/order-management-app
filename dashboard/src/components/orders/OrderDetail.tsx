import React from 'react';
import { Order } from '@/store/slices/orderSlice';
import { X } from 'lucide-react';
import { formatDate  } from '@/lib/utils';

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
  onEdit: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose, onEdit }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-blue-700">
        <div className="flex justify-between items-center p-4 border-b border-blue-700 bg-gradient-to-r from-blue-900 to-gray-900 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-blue-300">Order Details</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-medium text-blue-300 mb-2">Basic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><strong>ID:</strong> {order.order_id}</p>
              <p><strong>Customer:</strong> {order.client_name}</p>
              <p><strong>Status:</strong> {order.shipping_status}</p>
              <p><strong>Total:</strong> ₹{Number(order.total_amount)}</p>
              <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
              <p><strong>Payment Type:</strong> {order.paymentType}</p>
              <p><strong>Created:</strong> {formatDate(order.created_at)}</p>
              <p><strong>Updated:</strong> {formatDate(order.updated_at)}</p>
            </div>
          </div>

          {/* Shipping Details */}
          <div>
            <h3 className="text-lg font-medium text-blue-300 mb-2">Shipping Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><strong>Mobile:</strong> {order.mobileNumber}</p>
              {order.email && <p><strong>Email:</strong> {order.email}</p>}
              <p><strong>Address:</strong> {order.addressLine1}</p>
              {order.addressLine2 && <p><strong>Landmark:</strong> {order.addressLine2}</p>}
              {order.addressLine3 && <p><strong>Area:</strong> {order.addressLine3}</p>}
              <p><strong>City:</strong> {order.city}</p>
              <p><strong>State:</strong> {order.state}</p>
              <p><strong>Postal Code:</strong> {order.postalCode}</p>
            </div>
          </div>

          {/* Item Details */}
          <div>
            <h3 className="text-lg font-medium text-blue-300 mb-2">Ordered Items</h3>
            <table className="w-full text-sm text-left border border-blue-800 rounded-md overflow-hidden">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="p-2">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Discount</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">{item.productName}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">₹{item.price}</td>
                    <td className="p-2">{item.discount}%</td>
                    <td className="p-2">₹{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-blue-700">
            <button
              onClick={onEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Edit Order
            </button>
            <button
              onClick={onClose}
              className="border border-blue-600 text-blue-400 hover:bg-blue-800 px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

import React from 'react';
import { X, Package, Calendar, CreditCard, User, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Order } from '@/store/slices/orderSlice';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose }) => {
  const isMobile = useIsMobile();

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-amber-600 text-amber-50 border border-amber-700';
      case 'shipped':
        return 'bg-blue-600 text-blue-50 border border-blue-700';
      case 'delivered':
        return 'bg-green-600 text-green-50 border border-green-700';
      case 'cancelled':
        return 'bg-red-600 text-red-50 border border-red-700';
      default:
        return 'bg-gray-600 text-gray-50 border border-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50 p-3 md:p-6 backdrop-blur-md">
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-blue-600 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100 animate-fadeIn">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-blue-700 bg-gradient-to-r from-blue-900 to-gray-800">
          <div className="flex items-center">
            <Package className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mr-2" />
            <h2 className="text-lg md:text-2xl font-bold text-blue-300 truncate">
              Order: <span className="text-blue-100">{order.id}</span>
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-blue-400 hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-blue-900"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-wrap -mx-2 md:-mx-3">
            <div className="w-full md:w-1/2 px-2 md:px-3 mb-4 md:mb-0">
              <div className="bg-gray-800 p-4 md:p-5 rounded-lg h-full border-l-4 border-blue-500 shadow-md hover:shadow-blue-900/20 transition-shadow">
                <h3 className="text-base md:text-lg font-medium text-blue-300 mb-3 md:mb-4 flex items-center">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-400" />
                  Order Information
                </h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-400 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    Status:
                  </div>
                  <div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-gray-400 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    Order Date:
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 text-blue-400 mr-1" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="text-gray-400 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    Updated:
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 text-blue-400 mr-1" />
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </div>
                  
                  <div className="text-gray-400 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    Payment Mode:
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-3 h-3 text-blue-400 mr-1" />
                    {order.paymentMode}
                  </div>
                  
                  <div className="text-gray-400 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    Payment Type:
                  </div>
                  <div>{order.paymentType}</div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 px-2 md:px-3">
              <div className="bg-gray-800 p-4 md:p-5 rounded-lg h-full border-l-4 border-blue-500 shadow-md hover:shadow-blue-900/20 transition-shadow">
                <h3 className="text-base md:text-lg font-medium text-blue-300 mb-3 md:mb-4 flex items-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-400" />
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400 mb-1 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Name:
                    </div>
                    <div className="font-medium text-blue-100 pl-4">{order.customerName}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Contact:
                    </div>
                    <div className="pl-4">
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 text-blue-400 mr-2" />
                        <span>{order.mobileNumber}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Mail className="w-3 h-3 text-blue-400 mr-2" />
                        <span className="truncate">{order.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Shipping Address:
                    </div>
                    <div className="pl-4 flex">
                      <MapPin className="w-3 h-3 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <div>{order.addressLine1}</div>
                        {order.addressLine2 && <div>{order.addressLine2}</div>}
                        {order.addressLine3 && <div>{order.addressLine3}</div>}
                        <div>{order.city}, {order.state} {order.postalCode}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-base md:text-lg font-medium text-blue-300 mb-3 md:mb-4 flex items-center">
              <Package className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-400" />
              Order Items
            </h3>
            <div className="overflow-x-auto rounded-lg border border-blue-800 shadow-md">
              <table className="min-w-full divide-y divide-blue-900 text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-900 to-gray-800">
                    <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-3 md:px-4 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-3 md:px-4 py-3 text-right text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-blue-900">
                  {order.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition-colors">
                      <td className="px-3 md:px-4 py-3 text-gray-200 font-medium">
                        {item.productName}
                      </td>
                      <td className="px-3 md:px-4 py-3 text-gray-300">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-3 md:px-4 py-3 text-center text-gray-300">
                        <span className="inline-flex items-center justify-center min-w-8 h-6 bg-blue-900/40 rounded-full px-2 border border-blue-800">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-3 font-medium text-blue-200 text-right">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-blue-900 to-gray-800">
                    <td colSpan={3} className="px-3 md:px-4 py-3 text-right font-medium text-gray-300">
                      Order Total:
                    </td>
                    <td className="px-3 md:px-4 py-3 text-right">
                      <span className="text-lg font-bold text-blue-300">${order.total.toFixed(2)}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
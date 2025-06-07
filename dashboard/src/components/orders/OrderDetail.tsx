// import React from 'react';
// import { X, Package, Calendar, CreditCard, User, Phone, Mail, MapPin, Clock } from 'lucide-react';
// import { Order } from '@/store/slices/orderSlice';
// import { useIsMobile } from '@/hooks/use-mobile';

// interface OrderDetailProps {
//   order: Order;
//   onClose: () => void;
// }

// const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose }) => {
//   const isMobile = useIsMobile();

//   const getStatusClass = (status: string): string => {
//     switch (status) {
//       case 'pending':
//         return 'bg-amber-600 text-amber-50 border border-amber-700';
//       case 'shipped':
//         return 'bg-blue-600 text-blue-50 border border-blue-700';
//       case 'delivered':
//         return 'bg-green-600 text-green-50 border border-green-700';
//       case 'cancelled':
//         return 'bg-red-600 text-red-50 border border-red-700';
//       default:
//         return 'bg-gray-600 text-gray-50 border border-gray-700';
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50 p-3 md:p-6 backdrop-blur-md">
//       <div className="bg-gray-900 rounded-lg shadow-2xl border border-blue-600 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100 animate-fadeIn">
//         <div className="flex items-center justify-between p-4 md:p-6 border-b border-blue-700 bg-gradient-to-r from-blue-900 to-gray-800">
//           <div className="flex items-center">
//             <Package className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mr-2" />
//             <h2 className="text-lg md:text-2xl font-bold text-blue-300 truncate">
//               Order: <span className="text-blue-100">{order.id}</span>
//             </h2>
//           </div>
//           <button 
//             onClick={onClose} 
//             className="text-blue-400 hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-blue-900"
//             aria-label="Close"
//           >
//             <X className="w-5 h-5 md:w-6 md:h-6" />
//           </button>
//         </div>
        
//         <div className="p-4 md:p-6 space-y-6">
//           <div className="flex flex-wrap -mx-2 md:-mx-3">
//             <div className="w-full md:w-1/2 px-2 md:px-3 mb-4 md:mb-0">
//               <div className="bg-gray-800 p-4 md:p-5 rounded-lg h-full border-l-4 border-blue-500 shadow-md hover:shadow-blue-900/20 transition-shadow">
//                 <h3 className="text-base md:text-lg font-medium text-blue-300 mb-3 md:mb-4 flex items-center">
//                   <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-400" />
//                   Order Information
//                 </h3>
//                 <div className="grid grid-cols-2 gap-y-3 text-sm">
//                   <div className="text-gray-400 flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                     Status:
//                   </div>
//                   <div>
//                     <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </span>
//                   </div>
                  
//                   <div className="text-gray-400 flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                     Order Date:
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="w-3 h-3 text-blue-400 mr-1" />
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </div>
                  
//                   <div className="text-gray-400 flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                     Updated:
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="w-3 h-3 text-blue-400 mr-1" />
//                     {new Date(order.updatedAt).toLocaleDateString()}
//                   </div>
                  
//                   <div className="text-gray-400 flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                     Payment Mode:
//                   </div>
//                   <div className="flex items-center">
//                     <CreditCard className="w-3 h-3 text-blue-400 mr-1" />
//                     {order.paymentMode}
//                   </div>
                  
//                   <div className="text-gray-400 flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                     Payment Type:
//                   </div>
//                   <div>{order.paymentType}</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="w-full md:w-1/2 px-2 md:px-3">
//               <div className="bg-gray-800 p-4 md:p-5 rounded-lg h-full border-l-4 border-blue-500 shadow-md hover:shadow-blue-900/20 transition-shadow">
//                 <h3 className="text-base md:text-lg font-medium text-blue-300 mb-3 md:mb-4 flex items-center">
//                   <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-400" />
//                   Customer Information
//                 </h3>
//                 <div className="space-y-3">
//                   <div>
//                     <div className="text-sm text-gray-400 mb-1 flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                       Name:
//                     </div>
//                     <div className="font-medium text-blue-100 pl-4">{order.customerName}</div>
//                   </div>
                  
//                   <div>
//                     <div className="text-sm text-gray-400 mb-1 flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                       Contact:
//                     </div>
//                     <div className="pl-4">
//                       <div className="flex items-center">
//                         <Phone className="w-3 h-3 text-blue-400 mr-2" />
//                         <span>{order.mobileNumber}</span>
//                       </div>
//                       <div className="flex items-center mt-1">
//                         <Mail className="w-3 h-3 text-blue-400 mr-2" />
//                         <span className="truncate">{order.email}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div className="text-sm text-gray-400 mb-1 flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                       Shipping Address:
//                     </div>
//                     <div className="pl-4 flex">
//                       <MapPin className="w-3 h-3 text-blue-400 mr-2 mt-1 flex-shrink-0" />
//                       <div>
//                         <div>{order.addressLine1}</div>
//                         {order.addressLine2 && <div>{order.addressLine2}</div>}
//                         {order.addressLine3 && <div>{order.addressLine3}</div>}
//                         <div>{order.city}, {order.state} {order.postalCode}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-6">
//             <h3 className="text-base md:text-lg font-medium text-blue-300 mb-3 md:mb-4 flex items-center">
//               <Package className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-400" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto rounded-lg border border-blue-800 shadow-md">
//               <table className="min-w-full divide-y divide-blue-900 text-sm">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-blue-900 to-gray-800">
//                     <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-3 md:px-4 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
//                       Qty
//                     </th>
//                     <th className="px-3 md:px-4 py-3 text-right text-xs font-medium text-blue-300 uppercase tracking-wider">
//                       Total
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-gray-900 divide-y divide-blue-900">
//                   {order.items.map((item, index) => (
//                     <tr key={index} className="hover:bg-gray-800 transition-colors">
//                       <td className="px-3 md:px-4 py-3 text-gray-200 font-medium">
//                         {item.productName}
//                       </td>
//                       <td className="px-3 md:px-4 py-3 text-gray-300">
//                         ${item.price.toFixed(2)}
//                       </td>
//                       <td className="px-3 md:px-4 py-3 text-center text-gray-300">
//                         <span className="inline-flex items-center justify-center min-w-8 h-6 bg-blue-900/40 rounded-full px-2 border border-blue-800">
//                           {item.quantity}
//                         </span>
//                       </td>
//                       <td className="px-3 md:px-4 py-3 font-medium text-blue-200 text-right">
//                         ${item.total.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot>
//                   <tr className="bg-gradient-to-r from-blue-900 to-gray-800">
//                     <td colSpan={3} className="px-3 md:px-4 py-3 text-right font-medium text-gray-300">
//                       Order Total:
//                     </td>
//                     <td className="px-3 md:px-4 py-3 text-right">
//                       <span className="text-lg font-bold text-blue-300">${order.total.toFixed(2)}</span>
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;

import React from 'react';
import { X, Package, DollarSign, Calendar, ShoppingCart, User2, MapPin } from 'lucide-react';
import { Order } from '@/store/slices/orderSlice';
import { Button } from '@/components/ui/button';

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
  onEdit: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-blue-500">
        <div className="flex items-center justify-between p-6 border-b border-blue-600 bg-gradient-to-r from-blue-800 to-blue-900">
          <h2 className="text-2xl font-semibold text-white">Order Details</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 bg-gray-900 text-gray-100 space-y-5">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center border border-blue-600">
              <Package className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-white">Order #{order.id}</h3>
            <p className="text-sm text-blue-400">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="space-y-4">
            <DetailRow icon={<User2 />} label="Customer Name" value={order.customerName} />
            <DetailRow icon={<DollarSign />} label="Total Amount" value={`$${order.total.toFixed(2)}`} />
            <DetailRow icon={<Calendar />} label="Status" value={capitalize(order.status)} />
            <DetailRow icon={<ShoppingCart />} label="Items Count" value={`${order.items.length} item(s)`} />
            <DetailRow icon={<MapPin />} label="Shipping Address" value={`${order.addressLine1}, ${order.city}, ${order.state} ${order.postalCode}`} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-sm font-medium text-blue-300 mb-2">Order Items</p>
            <div className="divide-y divide-gray-700 space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-1 text-sm text-gray-300">
                  <span className="font-medium text-blue-200">{item.productName}</span> — {item.quantity} × ${item.price.toFixed(2)} = ${item.total.toFixed(2)}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-200">
              Close
            </Button>
            <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start">
    <div className="w-5 h-5 text-blue-400 mt-0.5 mr-3">{icon}</div>
    <div>
      <p className="text-sm font-medium text-blue-300">{label}</p>
      <p className="text-gray-200">{value}</p>
    </div>
  </div>
);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default OrderDetail;

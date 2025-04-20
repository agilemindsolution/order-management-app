import React from 'react';
import { X, Edit, User, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Important: Ensure you've defined the Customer type properly
interface CustomerDetailProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  onClose: () => void;
  onEdit: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  onClose,
  onEdit
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Card className="relative w-full max-w-md mx-4 overflow-hidden bg-gradient-to-br from-gray-900 to-blue-950 text-white border border-blue-500 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        {/* Header */}
        <div className="relative p-6 border-b border-blue-700">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-gray-300 hover:text-white hover:bg-blue-800" 
            onClick={onClose}
          >
            <X size={18} />
          </Button>
          <h2 className="text-2xl font-bold text-blue-300">Customer Details</h2>
        </div>
        
        {/* Customer ID and Name */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-800 rounded-full">
                <User className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{customer.name}</h3>
                <p className="text-sm text-gray-400">ID: {customer.id}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer Details */}
        <div className="p-6 space-y-4">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-900 rounded-lg mt-1">
              <Mail className="h-4 w-4 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-md">{customer.email}</p>
            </div>
          </div>
          
          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-900 rounded-lg mt-1">
              <Phone className="h-4 w-4 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone Number</p>
              <p className="text-md">{customer.phone}</p>
            </div>
          </div>
          
          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-900 rounded-lg mt-1">
              <MapPin className="h-4 w-4 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Address</p>
              <p className="text-md">{customer.address}</p>
            </div>
          </div>
        </div>
        
        {/* Footer with actions */}
        <div className="p-6 flex justify-between bg-gray-900">
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-300 hover:bg-blue-900 hover:text-white"
            onClick={onClose}
          >
            Close
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            onClick={onEdit}
          >
            <Edit size={16} />
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CustomerDetail;
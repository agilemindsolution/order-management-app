import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { Customer, addCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface CustomerFormProps {
  customer?: Customer | null;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onClose }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState<Partial<Customer>>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with customer data if editing
  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      // Generate new customer ID if creating
      const newCustomerId = `CUST-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setFormData(prev => ({ ...prev, id: newCustomerId }));
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required (format: 555-123-4567)';
    }
    
    if (!formData.address || formData.address.trim() === '') {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    const customerData = formData as Customer;
    
    if (customer) {
      // Update existing customer
      dispatch(updateCustomer(customerData));
      toast.success('Customer updated successfully');
    } else {
      // Add new customer
      dispatch(addCustomer(customerData));
      toast.success('Customer created successfully');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-blue-500">
        <div className="flex items-center justify-between p-6 border-b border-blue-600 bg-gradient-to-r from-blue-800 to-blue-900">
          <h2 className="text-2xl font-semibold text-white">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 bg-gray-900 text-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Customer ID
              </label>
              <Input
                value={formData.id || ''}
                readOnly
                className="bg-gray-800 border-gray-700 text-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Name *
              </label>
              <Input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Full name"
                className={`bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Email *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="email@example.com"
                className={`bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Phone Number *
              </label>
              <Input
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="555-123-4567"
                className={`bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                rows={3}
                placeholder="Full address"
                className={`w-full p-2 border rounded-md bg-gray-800 ${
                  errors.address ? 'border-red-500' : 'border-gray-700'
                } text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.address && (
                <p className="text-red-400 text-xs mt-1">{errors.address}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-200">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {customer ? 'Update Customer' : 'Create Customer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { Customer, fetchCustomers, addCustomer, updateCustomer } from '@/store/slices/customerSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Spinner } from '@/components/common/Loader';

interface CustomerFormProps {
  customer?: Customer | null;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Partial<Customer>>({
    id: customer?.id || '',
    name: customer?.name || '',
    contact_person: '',
    email: '',
    phone: '',
    alternate_phone: '',
    address: '',
    city: '',
    country: '',
    state: '',
    pin_code: '',
    gst_number: '',
    pan_number: '',
    website: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Initialize form with customer data if editing
  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      // Generate new customer ID if creating
      // const newCustomerId = `CUST-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setFormData(prev => ({ ...prev, id: '0' }));
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
    
    if (!formData.contact_person || formData.contact_person.trim() === '') {
      newErrors.contact_person = 'Contact Person is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      // !formData.email || 
      formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (formData.alternate_phone && !phoneRegex.test(formData.alternate_phone)) {
      newErrors.alternate_phone = 'Valid phone number is required';
    }
    
    if (!formData.address || formData.address.trim() === '') {
      newErrors.address = 'Address is required';
    }

    if (!formData.city || formData.city.trim() === '') {
      newErrors.city = 'City is required';
    }

    if (!formData.state || formData.state.trim() === '') {
      newErrors.state = 'State is required';
    }

    if (!formData.country || formData.country.trim() === '') {
      newErrors.country = 'Country is required';
    }

    if (!formData.pin_code || formData.pin_code.trim() === '') {
      newErrors.pin_code = 'Pin Code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    const customerData = formData as Customer;
    console.log("Customer data:", customerData);
    
    try {
      setLoading(true);
      setIsClosing(true);
      if (customer) {
        // Update existing customer
        await dispatch(updateCustomer(customerData)).unwrap(); // Unwrap to get actual value or error
        toast.success('Customer updated successfully');
      } else {
        // Add new customer
        await dispatch(addCustomer(customerData)).unwrap(); // Unwrap to get actual value or error
        toast.success('Customer created successfully');
      }
      dispatch(fetchCustomers());
      onClose();
      setIsClosing(false);
    } catch (error) {
      // Handle failure
      toast.error('Failed to update/create customer. Please try again.');
    }
    finally {
      setLoading(false); // stop loading
    }
  };

   

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-0 md:p-6">
      <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-5xl overflow-y-auto border border-blue-500">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 border-b border-blue-700 bg-gradient-to-r from-blue-900 to-gray-900">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-300">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 bg-gray-900 text-gray-100">
            <div className="mb-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Customer ID
              </label>
              <Input
                value={formData.id || ''}
                readOnly
                className="bg-gray-800 border-gray-700 text-gray-300"
              />
            </div> */}
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
                  Contact Person *
                </label>
                <Input
                  name="contact_person"
                  value={formData.contact_person || ''}
                  onChange={handleChange}
                  placeholder="Contact name"
                  className={`bg-gray-800 border ${errors.contact_person ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.contact_person && (
                  <p className="text-red-400 text-xs mt-1">{errors.contact_person}</p>
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
                placeholder=""
                className={`bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Alternate Number
              </label>
              <Input
                name="alternate_phone"
                value={formData.alternate_phone || ''}
                onChange={handleChange}
                placeholder=""
                className={`bg-gray-800 border ${errors.alternate_phone ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.alternate_phone && (
                <p className="text-red-400 text-xs mt-1">{errors.alternate_phone}</p>
              )}
            </div>
            </div>

          <div className='mb-2'>
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

            <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Email
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
                Website
                </label>
                <Input
                  name="website"
                  value={formData.website || ''}
                  onChange={handleChange}
                  placeholder="Website Name"
                  className={`bg-gray-800 border ${errors.website ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {/* {errors.website && (
                  <p className="text-red-400 text-xs mt-1">{errors.website}</p>
                )} */}
              </div>

            
            </div>
          
            <div className="mb-2 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  City *
                </label>
                <Input
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  placeholder=""
                  className={`bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.city && (
                  <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  State *
                </label>
                <Input
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  placeholder=""
                  className={`bg-gray-800 border ${errors.state ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.state && (
                  <p className="text-red-400 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Country *
                </label>
                <Input
                  name="country"
                  value={formData.country || ''}
                  onChange={handleChange}
                  placeholder=""
                  className={`bg-gray-800 border ${errors.country ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.country && (
                  <p className="text-red-400 text-xs mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Pin Code *
                </label>
                <Input
                  name="pin_code"
                  value={formData.pin_code || ''}
                  onChange={handleChange}
                  placeholder=""
                  className={`bg-gray-800 border ${errors.pin_code ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.pin_code && (
                  <p className="text-red-400 text-xs mt-1">{errors.pin_code}</p>
                )}
              </div>
            </div>

          <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
              GST Number
              </label>
              <Input
                name="gst_number"
                value={formData.gst_number || ''}
                onChange={handleChange}
                placeholder="GST Number"
                className={`bg-gray-800 border ${errors.gst_number ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {/* {errors.gst_number && (
                <p className="text-red-400 text-xs mt-1">{errors.gst_number}</p>
              )} */}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
              PAN Number
              </label>
              <Input
                name="pan_number"
                value={formData.pan_number || ''}
                onChange={handleChange}
                placeholder="PAN Number"
                className={`bg-gray-800 border ${errors.pan_number ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {/* {errors.pan_number && (
                <p className="text-red-400 text-xs mt-1">{errors.pan_number}</p>
              )} */}
            </div>
          </div>   
                
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-200">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {isClosing ? <Spinner /> : '' } {( customer ? 'Update Customer' : 'Create Customer' )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
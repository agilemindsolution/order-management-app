import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Plus, Trash2 } from 'lucide-react';
import { 
  Order, 
  OrderItem, 
  addOrder, 
  updateOrder 
} from '@/store/slices/orderSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface OrderFormProps {
  order?: Order | null;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.customers);
  const products = useSelector((state: RootState) => state.products.products);
  
  const [formData, setFormData] = useState<Partial<Order>>({
    id: '',
    customerId: '',
    customerName: '',
    items: [],
    status: 'pending',
    paymentMode: '',
    paymentType: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    postalCode: '',
    city: '',
    state: '',
    mobileNumber: '',
    email: '',
    total: 0
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with order data if editing
  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      // Generate new order ID if creating
      const newOrderId = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setFormData({
        ...formData,
        id: newOrderId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: []
      });
    }
  }, [order]);

  // Update customer name when customer is selected
  useEffect(() => {
    if (formData.customerId) {
      const selectedCustomer = customers.find(c => c.id === formData.customerId);
      if (selectedCustomer) {
        setFormData(prev => ({
          ...prev,
          customerName: selectedCustomer.name,
          email: selectedCustomer.email,
          mobileNumber: selectedCustomer.phone
        }));
      }
    }
  }, [formData.customerId, customers]);

  // Calculate total whenever items change
  useEffect(() => {
    if (formData.items && formData.items.length > 0) {
      const total = formData.items.reduce((sum, item) => sum + item.total, 0);
      setFormData(prev => ({ ...prev, total }));
    } else {
      setFormData(prev => ({ ...prev, total: 0 }));
    }
  }, [formData.items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = e.target.value;
    setFormData({ ...formData, customerId });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...(prev.items || []),
        {
          productId: '',
          productName: '',
          quantity: 1,
          price: 0,
          discount: 0,
          total: 0
        }
      ]
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = [...(formData.items || [])];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = [...(formData.items || [])];
    const item = { ...updatedItems[index], [field]: value };
    
    // Update product name and price if product is selected
    if (field === 'productId') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        item.productName = selectedProduct.name;
        item.price = selectedProduct.price;
      }
    }
    
    // Recalculate item total
    if (field === 'quantity' || field === 'price' || field === 'discount') {
      const quantity = field === 'quantity' ? Number(value) : item.quantity;
      const price = field === 'price' ? Number(value) : item.price;
      const discount = field === 'discount' ? Number(value) : item.discount;
      item.total = (quantity * price) - discount;
    }
    
    updatedItems[index] = item;
    setFormData({ ...formData, items: updatedItems });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerId) newErrors.customerId = 'Customer is required';
    if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
    if (!formData.paymentType) newErrors.paymentType = 'Payment type is required';
    if (!formData.addressLine1) newErrors.addressLine1 = 'Address line 1 is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;;
    if (!formData.mobileNumber || !phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Valid phone number is required (format: 9551234567)';
    }
    
    if (!formData.items || formData.items.length === 0) {
      newErrors.items = 'At least one item is required';
    } else {
      formData.items.forEach((item, index) => {
        if (!item.productId) {
          newErrors[`item-${index}-productId`] = 'Product is required';
        }
        if (item.quantity <= 0) {
          newErrors[`item-${index}-quantity`] = 'Quantity must be greater than 0';
        }
      });
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
    
    const orderData: Order = {
      ...formData as Order,
      updatedAt: new Date().toISOString()
    };
    
    if (order) {
      // Update existing order
      dispatch(updateOrder(orderData));
      toast.success('Order updated successfully');
    } else {
      // Add new order
      orderData.createdAt = new Date().toISOString();
      dispatch(addOrder(orderData));
      toast.success('Order created successfully');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-0 md:p-6">
      <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-5xl overflow-y-auto border border-blue-500">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 border-b border-blue-700 bg-gradient-to-r from-blue-900 to-gray-900">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-300">
            {order ? 'Edit Order' : 'Create New Order'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-blue-300 transition duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Order ID
              </label>
              <Input
                value={formData.id || ''}
                readOnly
                className="bg-gray-800/50 border-gray-700 text-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Client Name *
              </label>
              <select
                name="customerId"
                value={formData.customerId || ''}
                onChange={handleCustomerChange}
                className={`w-full p-2 rounded-md bg-gray-800/50 border ${
                  errors.customerId ? 'border-red-500' : 'border-gray-700'
                } text-gray-100 focus:ring-2 focus:ring-blue-500/50`}
              >
                <option value="">Select Client</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              {errors.customerId && (
                <p className="text-red-400 text-xs mt-1">{errors.customerId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status || 'pending'}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800/50 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg border border-blue-900/30 p-4">
            <h3 className="text-lg font-medium text-blue-300 mb-4">Order Items</h3>
            {errors.items && (
              <p className="text-red-400 text-xs mb-2">{errors.items}</p>
            )}
            
            <div className="space-y-4">
              {formData.items && formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 md:gap-3 items-start bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="col-span-12 md:col-span-4 mb-2 md:mb-0">
                    <select
                      value={item.productId || ''}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      className={`w-full p-2 rounded-md bg-gray-800 border ${
                        errors[`item-${index}-productId`] ? 'border-red-500' : 'border-gray-700'
                      } text-gray-100`}
                    >
                      <option value="">Select Product</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-4 md:col-span-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      placeholder="Qty"
                      min="1"
                      className="w-full bg-gray-800 border-gray-700"
                    />
                  </div>
                  
                  <div className="col-span-4 md:col-span-2">
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                      placeholder="Price"
                      className="w-full bg-gray-800 border-gray-700"
                    />
                  </div>
                  
                  <div className="col-span-3 md:col-span-2">
                    <Input
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleItemChange(index, 'discount', Number(e.target.value))}
                      placeholder="Discount"
                      className="w-full bg-gray-800 border-gray-700"
                    />
                  </div>
                  
                  <div className="col-span-8 md:col-span-1 text-right md:text-center">
                    <span className="text-blue-300">${item.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addItem}
                className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-blue-300 mb-3">Payment Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">
                    Payment Mode *
                  </label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border bg-gray-800 text-gray-100 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                      errors.paymentMode ? 'border-red-500' : 'border-gray-700'
                    }`}
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                  {errors.paymentMode && (
                    <p className="text-red-400 text-xs mt-1">{errors.paymentMode}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">
                    Payment Type *
                  </label>
                  <select
                    name="paymentType"
                    value={formData.paymentType || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border bg-gray-800 text-gray-100 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                      errors.paymentType ? 'border-red-500' : 'border-gray-700'
                    }`}
                  >
                    <option value="">Select Payment Type</option>
                    <option value="Full Payment">Full Payment</option>
                    <option value="Installment">Installment</option>
                    <option value="Partial Payment">Partial Payment</option>
                  </select>
                  {errors.paymentType && (
                    <p className="text-red-400 text-xs mt-1">{errors.paymentType}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-blue-300 mb-3">Client Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">
                    Mobile Number *
                  </label>
                  <Input
                    name="mobileNumber"
                    value={formData.mobileNumber || ''}
                    onChange={handleChange}
                    placeholder="9512384567"
                    className={`bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.mobileNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-400 text-xs mt-1">{errors.mobileNumber}</p>
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
                    placeholder="client@example.com"
                    className={`bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-300 mb-3">Shipping Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Address Line 1 *
                </label>
                <Input
                  name="addressLine1"
                  value={formData.addressLine1 || ''}
                  onChange={handleChange}
                  placeholder="Street address"
                  className={`bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.addressLine1 ? 'border-red-500' : ''}`}
                />
                {errors.addressLine1 && (
                  <p className="text-red-400 text-xs mt-1">{errors.addressLine1}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Address Line 2
                </label>
                <Input
                  name="addressLine2"
                  value={formData.addressLine2 || ''}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                  className="bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Address Line 3
                </label>
                <Input
                  name="addressLine3"
                  value={formData.addressLine3 || ''}
                  onChange={handleChange}
                  placeholder="Additional address info"
                  className="bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Postal Code *
                </label>
                <Input
                  name="postalCode"
                  value={formData.postalCode || ''}
                  onChange={handleChange}
                  placeholder="Postal code"
                  className={`bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.postalCode ? 'border-red-500' : ''}`}
                />
                {errors.postalCode && (
                  <p className="text-red-400 text-xs mt-1">{errors.postalCode}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  City *
                </label>
                <Input
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  placeholder="City"
                  className={`bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.city ? 'border-red-500' : ''}`}
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
                  placeholder="State"
                  className={`bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.state ? 'border-red-500' : ''}`}
                />
                {errors.state && (
                  <p className="text-red-400 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-gray-900 border-t border-blue-800 pt-4 mt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-lg font-semibold text-blue-300">
                Total: ${formData.total?.toFixed(2) || '0.00'}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="border-blue-700 text-blue-300 hover:bg-blue-900/50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-700 text-white hover:bg-blue-600"
                >
                  {order ? 'Update Order' : 'Create Order'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
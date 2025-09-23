import React, { useEffect, useState } from 'react';
import { X, Trash2, PlusCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers } from '@/store/slices/customerSlice';
import { fetchProducts } from '@/store/slices/productSlice';
import { Order, addOrder, updateOrder, fetchOrders } from '@/store/slices/orderSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/common/Loader';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

interface OrderFormProps {
  order?: Order | null;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onClose }) => {
  const dispatch = useAppDispatch();

  const { customers } = useAppSelector(state => state.customers);
  const { products } = useAppSelector(state => state.products);

  const [formData, setFormData] = useState<any>({
    client_id: order?.client_id || '',
    order_date: order?.order_date || new Date().toISOString(),
    expected_delivery_date: order?.expected_delivery_date || '',
    shipping_status: order?.shipping_status || 'pending',
    payment_status: order?.payment_status || 'pending',
    courier_name: order?.courier_name || '',
    tracking_number: order?.tracking_number || '',
    items: order?.items || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'quantity' || field === 'price' || field === 'discount' ? +value : value;
    newItems[index].total = ((newItems[index].quantity || 0) * (newItems[index].price || 0)) - (newItems[index].discount || 0);
    setFormData((prev: any) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev: any) => ({
      ...prev,
      items: [
        ...prev.items,
        { product_id: '', product_name: '', quantity: 1, price: 0, discount: 0, total: 0 },
      ],
    }));
  };

  const removeItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, items: newItems }));
  };

  const handleProductSelect = (index: number, productId: string) => {
    const selected = products.find(p => p.product_id === productId);
    if (!selected) return;
    handleItemChange(index, 'product_id', selected.product_id);
    handleItemChange(index, 'product_name', selected.product_name);
    handleItemChange(index, 'price', selected.price_per_unit);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.client_id) newErrors.client_id = 'Client is required';
    if (!formData.order_date) newErrors.order_date = 'Order date is required';
    if (!formData.items || formData.items.length === 0) newErrors.items = 'At least one product is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error('Fix form errors before submitting.');

    const payload: any = {
      ...formData,
      total_amount: formData.items.reduce((acc: number, item: any) => acc + item.total, 0),
    };

    try {
      setIsSaving(true);
      if (order) {
        await dispatch(updateOrder({ id: order.order_id, data: payload })).unwrap();
        toast.success('Order updated');
      } else {
        await dispatch(addOrder(payload)).unwrap();
        toast.success('Order created');
      }
      dispatch(fetchOrders());
      onClose();
    } catch (error) {
      toast.error('Failed to save order');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-0 md:p-6">
      <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-6xl overflow-y-auto border border-blue-500">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 border-b border-blue-700 bg-gradient-to-r from-blue-900 to-gray-900">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-300">
            {order ? 'Edit Order' : 'Add New Order'}
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Select Client *</label>
              <Select onValueChange={val => handleSelectChange('client_id', val)} value={formData.client_id}>
                <SelectTrigger className="w-full bg-gray-800 text-white">
                  <SelectValue placeholder="Choose client" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  {customers.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.client_id && <p className="text-red-400 text-xs mt-1">{errors.client_id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Order Date *</label>
              <Input
                type="date"
                name="order_date"
                value={formData.order_date?.slice(0, 10)}
                onChange={handleChange}
                className="bg-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">Expected Delivery</label>
              <Input
                type="date"
                name="expected_delivery_date"
                value={formData.expected_delivery_date?.slice(0, 10) || ''}
                onChange={handleChange}
                className="bg-gray-800 text-white"
              />
            </div>
          </div>

          <div className="border-t border-blue-800 pt-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-blue-300">Products</h3>
              <Button type="button" variant="ghost" onClick={addItem} className="text-blue-400 hover:text-blue-200">
                <PlusCircle className="w-4 h-4 mr-1" /> Add Product
              </Button>
            </div>
            {formData.items.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end mb-3">
                <div className="col-span-2">
                  <label className="block text-sm text-blue-300 mb-1">Product</label>
                  <Select
                    onValueChange={val => handleProductSelect(index, val)}
                    value={item.product_id}
                  >
                    <SelectTrigger className="bg-gray-800 text-white">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                      {products.map(p => (
                        <SelectItem key={p.product_id} value={p.product_id}>{p.product_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                  placeholder="Qty"
                  className="bg-gray-800 text-white"
                />
                <Input
                  type="number"
                  value={item.price}
                  onChange={e => handleItemChange(index, 'price', e.target.value)}
                  placeholder="Price"
                  className="bg-gray-800 text-white"
                />
                <Input
                  type="number"
                  value={item.discount}
                  onChange={e => handleItemChange(index, 'discount', e.target.value)}
                  placeholder="Discount"
                  className="bg-gray-800 text-white"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white font-medium">
                    ₹{item.total.toFixed(2)}
                  </span>
                  <button type="button" onClick={() => removeItem(index)}>
                    <Trash2 className="text-red-400 hover:text-red-200 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {errors.items && <p className="text-red-400 text-xs mt-1">{errors.items}</p>}
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-200">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSaving ? <Spinner /> : ''} {order ? 'Update Order' : 'Create Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;

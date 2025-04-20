import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { Product, addProduct, updateProduct } from '@/store/slices/productSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState<Partial<Product>>({
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
       
      const newProductId = `PROD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setFormData(prev => ({ ...prev, id: newProductId }));
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'stock') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
 
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category || formData.category.trim() === '') {
      newErrors.category = 'Category is required';
    }
    
    if (formData.price === undefined || formData.price < 0) {
      newErrors.price = 'Price must be a valid number greater than or equal to 0';
    }
    
    if (formData.stock === undefined || formData.stock < 0 || !Number.isInteger(formData.stock)) {
      newErrors.stock = 'Stock must be a valid integer greater than or equal to 0';
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
    
    const productData = formData as Product;
    
    if (product) {
      // Update existing product
      dispatch(updateProduct(productData));
      toast.success('Product updated successfully');
    } else {
      // Add new product
      dispatch(addProduct(productData));
      toast.success('Product created successfully');
    }
    
    onClose();
  };

  // List of common product categories
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Toys & Games',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Health & Wellness',
    'Food & Beverage',
    'Office Supplies',
    'Automotive',
    'Pet Supplies',
    'Other'
  ];

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-blue-500">
        <div className="flex items-center justify-between p-6 border-b border-blue-600 bg-gradient-to-r from-blue-800 to-blue-900">
          <h2 className="text-2xl font-semibold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 bg-gray-900 text-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Product ID
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
                placeholder="Product name"
                className={`bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
                placeholder="Product description"
                className={`w-full p-2 border rounded-md bg-gray-800 ${
                  errors.description ? 'border-red-500' : 'border-gray-700'
                } text-white focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">{errors.description}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md bg-gray-800 ${
                  errors.category ? 'border-red-500' : 'border-gray-700'
                } text-white focus:border-blue-500 focus:ring-blue-500`}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Price * ($)
                </label>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price || ''}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`bg-gray-800 border ${errors.price ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.price && (
                  <p className="text-red-400 text-xs mt-1">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-1">
                  Stock *
                </label>
                <Input
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock || ''}
                  onChange={handleChange}
                  placeholder="0"
                  className={`bg-gray-800 border ${errors.stock ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.stock && (
                  <p className="text-red-400 text-xs mt-1">{errors.stock}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-200">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
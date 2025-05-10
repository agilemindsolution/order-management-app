import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { X, Trash2, Star, StarOff } from 'lucide-react';
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
    product_id: product?.product_id || '',
    product_name: '',
    product_code: '',
    category: '',
    sub_category: '',
    brand: '',
    packaging_size: '',
    quality: '',
    unit_of_measurement: '',
    available_quantity: 0,
    min_order_quantity: 1,
    price_per_unit: 0,
    description: '',
    images: []
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set default form data on mount/edit
  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      const newProductId = `PROD-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')}`;
      setFormData(prev => ({ ...prev, product_id: newProductId }));
    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: ['available_quantity', 'min_order_quantity', 'price_per_unit'].includes(name)
        ? Number(value)
        : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const togglePrimary = (index: number) => {
    setImageFiles(prev =>
      prev.map((file, i) => {
        const customFile: any = file;
        customFile.isPrimary = i === index;
        return customFile;
      })
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.product_name?.trim()) newErrors.product_name = 'Product name is required';
    if (!formData.category?.trim()) newErrors.category = 'Category is required';
    if (formData.price_per_unit === undefined || formData.price_per_unit < 0)
      newErrors.price_per_unit = 'Valid price required';
    if (formData.available_quantity === undefined || formData.available_quantity < 0)
      newErrors.available_quantity = 'Quantity required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the errors');
      return;
    }

    const isUpdate = !!product;
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'images') {
        form.append(key, String(value));
      }
    });

    imageFiles.forEach((file, idx) => {
      form.append(`images`, file);
      form.append(`is_primary`, idx === 0 ? 'true' : 'false');
    });

    try {
      if (isUpdate) {
        await dispatch(updateProduct({ id: product?.product_id!, data: form }) as any);
        toast.success('Product updated successfully');
      } else {
        await dispatch(addProduct(form) as any);
        toast.success('Product created successfully');
      }
      onClose();
    } catch (error: any) {
      console.error("Error in ProductForm:", error);
      const errorMessage = error?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-blue-500">
        <div className="flex items-center justify-between p-6 border-b border-blue-600 bg-gradient-to-r from-blue-800 to-blue-900">
          <h2 className="text-2xl font-semibold text-white">{product ? 'Edit' : 'Add'} Product</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-white bg-gray-900">
          <div className="grid grid-cols-2 gap-4">
            <InputField name="product_name" label="Product Name *" value={formData.product_name || ''} onChange={handleChange} error={errors.product_name} />
            <InputField name="product_code" label="Product Code" value={formData.product_code || ''} onChange={handleChange} />
            <InputField name="category" label="Category *" value={formData.category || ''} onChange={handleChange} error={errors.category} />
            <InputField name="sub_category" label="Sub Category" value={formData.sub_category || ''} onChange={handleChange} />
            <InputField name="brand" label="Brand" value={formData.brand || ''} onChange={handleChange} />
            <InputField name="packaging_size" label="Packaging Size" value={formData.packaging_size || ''} onChange={handleChange} />
            <InputField name="quality" label="Quality" value={formData.quality || ''} onChange={handleChange} />
            <InputField name="unit_of_measurement" label="Unit of Measurement" value={formData.unit_of_measurement || ''} onChange={handleChange} />
            <InputField name="available_quantity" label="Available Quantity *" type="number" value={formData.available_quantity?.toString() || ''} onChange={handleChange} error={errors.available_quantity} />
            <InputField name="min_order_quantity" label="Min Order Quantity" type="number" value={formData.min_order_quantity?.toString() || ''} onChange={handleChange} />
            <InputField name="price_per_unit" label="Price per Unit *" type="number" value={formData.price_per_unit?.toString() || ''} onChange={handleChange} error={errors.price_per_unit} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-blue-300">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
              placeholder="Product description"
            />
          </div>

          {/* Image Uploads */}
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Product Images</label>
            <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
            <div className="mt-2 grid grid-cols-3 gap-3">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="w-full h-24 object-cover rounded" />
                  <div className="absolute top-1 right-1 flex gap-1">
                    <button type="button" onClick={() => togglePrimary(index)} title="Set as Primary">
                      {(file as any).isPrimary ? <Star className="text-yellow-400" /> : <StarOff className="text-gray-400" />}
                    </button>
                    <button type="button" onClick={() => removeImage(index)} title="Remove">
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-200">Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">{product ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ name, label, type = 'text', value, onChange, error }: any) => (
  <div>
    <label className="block text-sm font-medium text-blue-300 mb-1">{label}</label>
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'} text-white focus:border-blue-500 focus:ring-blue-500`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default ProductForm;

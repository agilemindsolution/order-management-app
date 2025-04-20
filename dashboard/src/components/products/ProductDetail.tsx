import React from 'react';
import { Product } from '@/store/slices/productSlice';
import { X, Edit, Package, Tag, ShoppingBag, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onClose,
  onEdit
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-blue-500">
        <div className="flex items-center justify-between p-6 border-b border-blue-600 bg-gradient-to-r from-blue-800 to-blue-900">
          <h2 className="text-2xl font-semibold text-white">
            Product Details
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 bg-gray-900 text-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center border border-blue-600">
              <Package className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <p className="text-sm text-blue-400">{product.id}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Tag className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-300">Category</p>
                <p className="text-gray-200">{product.category}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-300">Price</p>
                <p className="text-gray-200">${product.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <ShoppingBag className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-300">Stock</p>
                <p className="text-gray-200">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-900 text-green-200 border border-green-600' 
                      : product.stock > 0 
                        ? 'bg-amber-900 text-amber-200 border border-amber-600' 
                        : 'bg-red-900 text-red-200 border border-red-600'
                  }`}>
                    {product.stock} units
                  </span>
                </p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-sm font-medium text-blue-300 mb-2">Description</p>
              <p className="text-gray-300 text-sm">{product.description}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-200">
              Close
            </Button>
            <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
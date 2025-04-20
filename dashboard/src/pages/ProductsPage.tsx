
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Product, deleteProduct } from '@/store/slices/productSlice';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Sparkles } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';
import ProductTable from '@/components/products/ProductTable';
import ProductDetail from '@/components/products/ProductDetail';
import { toast } from 'sonner';
import { GridBackground } from '@/components/ui/grid-background';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
    toast.success('Product deleted successfully');
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCloseDetail = () => {
    setViewingProduct(null);
  };

  return (
    <div className="relative animate-fade-in">
      <GridBackground className="absolute inset-0 z-0 opacity-10" />
      
      <div className="relative z-10 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2 flex items-center">
              Products
              <Sparkles className="w-5 h-5 text-blue-400 ml-2" />
            </h1>
            <p className="text-sm sm:text-base text-blue-300/80">Manage your product inventory</p>
          </div>
          <Button 
            onClick={handleAddProduct} 
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-950/30"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="modern-card animate-slide-in">
          <div className="p-3 md:p-4 border-b border-blue-900/30">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-blue-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, description or category..."
                className="pl-10 p-2 text-sm w-full md:max-w-md rounded-lg border border-blue-900/30 bg-gray-800/50 focus:ring-blue-500 focus:border-blue-500 text-gray-200 transition-all duration-300 focus:bg-gray-800/80"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <ProductTable 
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onView={handleViewProduct}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <ProductForm 
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}

      {viewingProduct && (
        <ProductDetail 
          product={viewingProduct}
          onClose={handleCloseDetail}
          onEdit={() => {
            handleCloseDetail();
            handleEditProduct(viewingProduct);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;

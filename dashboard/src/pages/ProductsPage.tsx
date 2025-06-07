
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store';
// import { Product, fetchProducts, deleteProduct } from '@/store/slices/productSlice';
// import { Button } from '@/components/ui/button';
// import { PlusCircle, Search, Sparkles } from 'lucide-react';
// import ProductForm from '@/components/products/ProductForm';
// import ProductTable from '@/components/products/ProductTable';
// import ProductDetail from '@/components/products/ProductDetail';
// import { toast } from 'sonner';
// import { GridBackground } from '@/components/ui/grid-background';

// const ProductsPage = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state: RootState) => state.products);
  
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Filter products based on search term
//   const filteredProducts = products.filter(product => 
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddProduct = () => {
//     setEditingProduct(null);
//     setShowForm(true);
//   };

//   const handleEditProduct = (product: Product) => {
//     setEditingProduct(product);
//     setShowForm(true);
//   };

//   const handleDeleteProduct = (id: string) => {
//     dispatch(deleteProduct(id));
//     toast.success('Product deleted successfully');
//   };

//   const handleViewProduct = (product: Product) => {
//     setViewingProduct(product);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setEditingProduct(null);
//   };

//   const handleCloseDetail = () => {
//     setViewingProduct(null);
//   };

//   return (
//     <div className="relative animate-fade-in">
//       <GridBackground className="absolute inset-0 z-0 opacity-10" />
      
//       <div className="relative z-10 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2 flex items-center">
//               Products
//               <Sparkles className="w-5 h-5 text-blue-400 ml-2" />
//             </h1>
//             <p className="text-sm sm:text-base text-blue-300/80">Manage your product inventory</p>
//           </div>
//           <Button 
//             onClick={handleAddProduct} 
//             className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-950/30"
//           >
//             <PlusCircle className="w-4 h-4 mr-2" />
//             Add Product
//           </Button>
//         </div>

//         <div className="modern-card animate-slide-in">
//           <div className="p-3 md:p-4 border-b border-blue-900/30">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Search className="w-4 h-4 text-blue-400" />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search by name, description or category..."
//                 className="pl-10 p-2 text-sm w-full md:max-w-md rounded-lg border border-blue-900/30 bg-gray-800/50 focus:ring-blue-500 focus:border-blue-500 text-gray-200 transition-all duration-300 focus:bg-gray-800/80"
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <ProductTable 
//               products={filteredProducts}
//               onEdit={handleEditProduct}
//               onDelete={handleDeleteProduct}
//               onView={handleViewProduct}
//             />
//           </div>
//         </div>
//       </div>

//       {showForm && (
//         <ProductForm 
//           product={editingProduct}
//           onClose={handleCloseForm}
//         />
//       )}

//       {viewingProduct && (
//         <ProductDetail 
//           product={viewingProduct}
//           onClose={handleCloseDetail}
//           onEdit={() => {
//             handleCloseDetail();
//             handleEditProduct(viewingProduct);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductsPage;


import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RootState } from '@/store';
import { Product, fetchProducts, deleteProduct } from '@/store/slices/productSlice';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';
import ProductTable from '@/components/products/ProductTable';
import ProductDetail from '@/components/products/ProductDetail';
import { toast } from 'sonner';
import { GridBackground } from '@/components/ui/grid-background';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { safeIncludes } from '@/lib/utils';
import { PRODUCT_CONFIG } from '@/config/ProductConfig';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const { products, isLoading } = useAppSelector((state: RootState) => state.products);
  const [showForm, setShowForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = products.filter((product: any) =>
    PRODUCT_CONFIG.searchFields.some((field: any) => 
      safeIncludes(product[field] as string, searchTerm)
    )
  );

  // Reusable loadProducts function
  const loadProducts = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await Promise.all([
        dispatch(fetchProducts()).unwrap(),
        new Promise((resolve) => setTimeout(resolve, 400)) // minimum spinner time
      ]);
      toast.success('Products loaded successfully');
    } catch (error) {
      toast.error('Failed to load products. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched.current) {
      loadProducts();
      hasFetched.current = true;
    }
  }, [loadProducts]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (id) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product. Please try again.');
      }
    }
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
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button 
              onClick={handleAddProduct} 
              className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-950/30"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button
              onClick={loadProducts}
              disabled={isLoading || isRefreshing}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:text-white hover:bg-blue-700 shadow-md shadow-blue-950/30"
            >
              {isRefreshing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
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
              isLoading={isLoading}
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

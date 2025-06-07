
import React from 'react';
import { Product } from '@/store/slices/productSlice';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Loader } from '@/components/common/Loader';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
  isLoading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  products,
  onEdit,
  onDelete,
  onView,
  isLoading
}) => {
  return (
    <>
      {/* Desktop table */}
      <table className="oms-table hidden md:table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Price</th>
            {/* <th>Stock</th> */}
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center py-10">
                <Loader />
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.product_id}>
                <td className="font-medium">{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.category}</td>
                <td>{product.sub_category}</td>
                <td>${Number(product.price_per_unit || 0).toFixed(2)}</td>
                {/* <td>{product.stock}</td> */}
                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-blue-900/20 transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-blue-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-effect border border-blue-900/30">
                      <DropdownMenuItem onClick={() => onView(product)} className="text-blue-400 hover:text-blue-300 focus:text-blue-300 hover:bg-blue-900/20 focus:bg-blue-900/20">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(product)} className="text-amber-400 hover:text-amber-300 focus:text-amber-300 hover:bg-amber-900/20 focus:bg-amber-900/20">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(product.product_id)} className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="modern-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-gray-100">{product.product_name}</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-blue-900/20 transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-blue-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-effect border border-blue-900/30">
                    <DropdownMenuItem onClick={() => onView(product)} className="text-blue-400 hover:text-blue-300 focus:text-blue-300 hover:bg-blue-900/20 focus:bg-blue-900/20">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(product)} className="text-amber-400 hover:text-amber-300 focus:text-amber-300 hover:bg-amber-900/20 focus:bg-amber-900/20">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(product.product_id)} className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm"><span className="font-medium text-gray-400">Category:</span> <span className="text-gray-300">{product.category}</span></p>
                <p className="text-sm"><span className="font-medium text-gray-400">Sub Category:</span> <span className="text-gray-300">{product.sub_category}</span></p>
                <p className="text-sm"><span className="font-medium text-gray-400">Price:</span> <span className="text-gray-300">${Number(product.price_per_unit || 0).toFixed(2)}</span></p>
                {/* <p className="text-sm"><span className="font-medium text-gray-400">Stock:</span> <span className="text-gray-300">{product.stock}</span></p> */}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No products found
          </div>
        )}
      </div>
    </>
  );
};

export default ProductTable;


import React from 'react';
import { Product } from '@/store/slices/productSlice';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  products,
  onEdit,
  onDelete,
  onView
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
            <th>Price</th>
            <th>Stock</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td className="font-medium">{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : product.stock > 0 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {product.stock}
                  </span>
                </td>
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
                      <DropdownMenuItem 
                        onClick={() => onDelete(product.id)}
                        className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="modern-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-gray-100">{product.name}</h3>
                  <p className="text-sm text-blue-400 mt-1">{product.id}</p>
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
                    <DropdownMenuItem 
                      onClick={() => onDelete(product.id)}
                      className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-400">Category:</span>
                  <span className="text-sm text-gray-300">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-400">Price:</span>
                  <span className="text-sm text-gray-300">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-400">Stock:</span>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : product.stock > 0 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {product.stock}
                  </span>
                </div>
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

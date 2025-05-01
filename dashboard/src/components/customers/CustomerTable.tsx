
import React from 'react';
import { Customer } from '@/store/slices/customerSlice';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Loader } from '@/components/common/Loader';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onView: (customer: Customer) => void;
  isLoading: boolean;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ 
  customers,
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
            <th>#</th>
            <th>Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
          <tr>
            <td colSpan={8} className="text-center py-10">
              <Loader />
            </td>
          </tr>
        ) :  customers.length === 0 ? (
          <tr>
            <td colSpan={8} className="text-center py-6 text-gray-400">
              No customers found
            </td>
          </tr>
        ) : (
            customers.map((customer, index) => (
              <tr key={customer.id}>
                <td className="font-medium">{index+1}</td>
                <td>{customer.name}</td>
                <td>{customer.contact_person}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td className="max-w-xs truncate">{customer.address}</td>
                <td>{customer.city}</td>
                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-blue-900/20 transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-blue-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-effect border border-blue-900/30">
                      <DropdownMenuItem onClick={() => onView(customer)} className="text-blue-400 hover:text-blue-300 focus:text-blue-300 hover:bg-blue-900/20 focus:bg-blue-900/20">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(customer)} className="text-amber-400 hover:text-amber-300 focus:text-amber-300 hover:bg-amber-900/20 focus:bg-amber-900/20">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(customer.id)}
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
          )}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div key={customer.id} className="modern-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-gray-100">{customer.name}</h3>
                  {/* <p className="text-sm text-blue-400 mt-1">{customer.id}</p> */}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-blue-900/20 transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-blue-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-effect border border-blue-900/30">
                    <DropdownMenuItem onClick={() => onView(customer)} className="text-blue-400 hover:text-blue-300 focus:text-blue-300 hover:bg-blue-900/20 focus:bg-blue-900/20">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(customer)} className="text-amber-400 hover:text-amber-300 focus:text-amber-300 hover:bg-amber-900/20 focus:bg-amber-900/20">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(customer.id)}
                      className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm"><span className="font-medium text-gray-400">Contact Person:</span> <span className="text-gray-300">{customer.contact_person}</span></p>
                <p className="text-sm"><span className="font-medium text-gray-400">Email is this:</span> <span className="text-gray-300">{customer.email}</span></p>
                <p className="text-sm"><span className="font-medium text-gray-400">Phone:</span> <span className="text-gray-300">{customer.phone}</span></p>
                <p className="text-sm"><span className="font-medium text-gray-400">Address:</span> <span className="text-gray-300">{customer.address}</span></p>
                <p className="text-sm"><span className="font-medium text-gray-400">City:</span> <span className="text-gray-300">{customer.city}</span></p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No customers found
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerTable;

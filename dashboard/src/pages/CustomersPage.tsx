
import React, {useRef, useState, useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Customer, deleteCustomer, fetchCustomers } from '@/store/slices/customerSlice';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import CustomerForm from '@/components/customers/CustomerForm';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetail from '@/components/customers/CustomerDetail';
import { toast } from 'sonner';
import { GridBackground } from '@/components/ui/grid-background';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { safeIncludes } from '@/lib/utils';
import { CUSTOMER_CONFIG } from '@/config/CustomerConfig';

const CustomersPage = () => {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false); // 🔥 Create a ref to track if already fetched

  const { customers, isLoading } = useAppSelector((state: RootState) => state.customers);
  const [showForm, setShowForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer: any) =>
    CUSTOMER_CONFIG.searchFields.some((field: any) => safeIncludes(customer?.[field], searchTerm))
  );
  // 🔥 make loadCustomers reusable
  const loadCustomers = useCallback(async () => {
    try {
      setIsRefreshing(true); 
      await Promise.all([
        dispatch(fetchCustomers()).unwrap(),
        new Promise((resolve) => setTimeout(resolve, 400)) // minimum spinner time
      ]);
      toast.success('Customers loaded successfully');
    } catch (error) {
      toast.error('Failed to load customers. Please try again.');
    }
    finally {
      setIsRefreshing(false); // 🔥 stop spinner
    }
  }, [dispatch]);
   
  useEffect(() => {
    if (!hasFetched.current) {
      loadCustomers();
      hasFetched.current = true;
    }
  }, [loadCustomers]);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  // const handleFetchCustomers = () => {
  //   dispatch(fetchCustomers());
  // };
  // const filteredCustomers = () => {
  //   dispatch(fetchCustomers());
  //   toast.success('Customer loaded successfully');
  // };


  // const handleDeleteCustomer = (id: string) => {
  //   // Check if customer is referenced in any orders
  //   dispatch(deleteCustomer(id));
  //   toast.success('Customer deleted successfully');
  // };

  // Handle delete (if updating an existing customer)
     const handleDeleteCustomer = async (id: any) => {
      if (id) {
        try {
          await dispatch(deleteCustomer(id)).unwrap(); // Unwrap to get actual value or error
          toast.success('Customer deleted successfully');
          // onClose();
        } catch (error) {
          toast.error('Failed to delete customer. Please try again.');
        }
      }
    };

  const handleViewCustomer = (customer: Customer) => {
    setViewingCustomer(customer);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleCloseDetail = () => {
    setViewingCustomer(null);
  };

  return (
    <div className="relative animate-fade-in">
    <GridBackground className="absolute inset-0 z-0 opacity-10" />
      
      <div className="relative z-10 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2 flex items-center">
              Customers
              <Sparkles className="w-5 h-5 text-blue-400 ml-2" />
            </h1>
            <p className="text-sm sm:text-base text-blue-300/80">Manage your customer database</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button 
              onClick={handleAddCustomer} 
              className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-950/30"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
            <Button
              onClick={loadCustomers}
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
                placeholder="Search by name, email or phone..."
                className="pl-10 p-2 text-sm w-full md:max-w-md rounded-lg border border-blue-900/30 bg-gray-800/50 focus:ring-blue-500 focus:border-blue-500 text-gray-200 transition-all duration-300 focus:bg-gray-800/80"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <CustomerTable 
              customers={filteredCustomers}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
              onView={handleViewCustomer}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <CustomerForm 
          customer={editingCustomer}
          onClose={handleCloseForm}
        />
      )}

      {viewingCustomer && (
        <CustomerDetail 
          customer={viewingCustomer}
          onClose={handleCloseDetail}
          onEdit={() => {
            handleCloseDetail();
            handleEditCustomer(viewingCustomer);
          }}
        />
      )}
    </div>
  );
};

export default CustomersPage;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { Order, fetchOrders, deleteOrder } from '@/store/slices/orderSlice';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import OrderForm from '@/components/orders/OrderForm';
import OrderTable from '@/components/orders/OrderTable';
import OrderDetail from '@/components/orders/OrderDetail';
import { GridBackground } from '@/components/ui/grid-background';
import { toast } from 'sonner';
import { safeIncludes } from '@/lib/utils';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const { orders, isLoading } = useAppSelector((state: RootState) => state.orders);
  const [showForm, setShowForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((order: Order) =>
    ['id', 'customerName', 'status'].some((field) =>
      safeIncludes(order[field as keyof Order] as string, searchTerm)
    )
  );

  const loadOrders = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await Promise.all([
        dispatch(fetchOrders()).unwrap(),
        new Promise((resolve) => setTimeout(resolve, 400))
      ]);
      toast.success('Orders loaded successfully');
    } catch (error) {
      toast.error('Failed to load orders. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched.current) {
      loadOrders();
      hasFetched.current = true;
    }
  }, [loadOrders]);

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await dispatch(deleteOrder(id)).unwrap();
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error('Failed to delete order. Please try again.');
    }
  };

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleCloseDetail = () => {
    setViewingOrder(null);
  };

  return (
    <div className="relative animate-fade-in">
      <GridBackground className="absolute inset-0 z-0 opacity-10" />

      <div className="relative z-10 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2 flex items-center">
              Orders
              <Sparkles className="w-5 h-5 text-blue-400 ml-2" />
            </h1>
            <p className="text-sm sm:text-base text-blue-300/80">Manage and track all orders</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button onClick={handleAddOrder} className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-950/30">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Order
            </Button>
            <Button
              onClick={loadOrders}
              disabled={isLoading || isRefreshing}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:text-white hover:bg-blue-700 shadow-md shadow-blue-950/30"
            >
              {isRefreshing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
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
                placeholder="Search by ID, customer, or status..."
                className="pl-10 p-2 text-sm w-full md:max-w-md rounded-lg border border-blue-900/30 bg-gray-800/50 focus:ring-blue-500 focus:border-blue-500 text-gray-200 transition-all duration-300 focus:bg-gray-800/80"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <OrderTable
              orders={filteredOrders}
              onEdit={handleEditOrder}
              onDelete={handleDeleteOrder}
              onView={handleViewOrder}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <OrderForm
          order={editingOrder}
          onClose={handleCloseForm}
        />
      )}

      {viewingOrder && (
        <OrderDetail
          order={viewingOrder}
          onClose={handleCloseDetail}
          onEdit={() => {
            handleCloseDetail();
            handleEditOrder(viewingOrder);
          }}
        />
      )}
    </div>
  );
};

export default OrdersPage;
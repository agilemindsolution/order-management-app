
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import OrderTable from '@/components/orders/OrderTable';
import OrderForm from '@/components/orders/OrderForm';
import OrderDetail from '@/components/orders/OrderDetail';
import { Order } from '@/store/slices/orderSlice';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Sparkles } from 'lucide-react';
import { GridBackground } from '@/components/ui/grid-background';

const OrdersPage = () => {
  const { orders } = useSelector((state: RootState) => state.orders);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowAddForm(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setShowAddForm(true);
  };

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
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
          <Button 
            onClick={handleAddOrder} 
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-950/30"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Order
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
                placeholder="Search by order ID or customer name..."
                className="pl-10 p-2 text-sm w-full md:max-w-md rounded-lg border border-blue-900/30 bg-gray-800/50 focus:ring-blue-500 focus:border-blue-500 text-gray-200 transition-all duration-300 focus:bg-gray-800/80"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <OrderTable 
              orders={filteredOrders} 
              onEdit={handleEditOrder} 
              onView={handleViewOrder} 
            />
          </div>
        </div>
      </div>

      {(showAddForm || editingOrder) && (
        <OrderForm 
          order={editingOrder}
          onClose={handleCloseForm}
        />
      )}

      {viewingOrder && (
        <OrderDetail 
          order={viewingOrder}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default OrdersPage;

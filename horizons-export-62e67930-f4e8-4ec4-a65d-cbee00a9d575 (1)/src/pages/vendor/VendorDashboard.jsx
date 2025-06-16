import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, DollarSign, TrendingUp, Eye, PlusCircle, AlertTriangle, BarChart2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';


const VendorDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Listings',
      value: '24',
      change: '+3 this month',
      icon: Package,
      color: 'text-blue-600',
      link: '/vendor/products'
    },
    {
      title: 'Pending Orders',
      value: '12',
      change: '+5 new',
      icon: ShoppingBag,
      color: 'text-orange-600',
      link: '/vendor/orders?status=Processing'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,450',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-600',
      link: '/vendor/analytics'
    },
    {
      title: 'Store Profile Views',
      value: '2.3k',
      change: '+15% this week',
      icon: Eye,
      color: 'text-purple-600',
      link: '/vendor/analytics'
    },
  ];

  const recentOrders = [
    { id: 'ORD-VC001', customer: 'Alice Wonderland', productCount: 3, amount: 145.50, status: 'Processing', date: '2025-06-14' },
    { id: 'ORD-VC002', customer: 'Bob The Builder', productCount: 1, amount: 79.99, status: 'Shipped', date: '2025-06-13' },
    { id: 'ORD-VC003', customer: 'Carol Danvers', productCount: 5, amount: 320.00, status: 'Awaiting Payment', date: '2025-06-14' },
    { id: 'ORD-VC004', customer: 'David Copperfield', productCount: 2, amount: 99.00, status: 'Delivered', date: '2025-06-12' },
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones X2000', sales: 45, revenue: '$13,499.55', image: 'Sleek black wireless headphones', stock: 12, id: 'prod_1' },
    { name: 'Portable Bluetooth Speaker X-Bass', sales: 32, revenue: '$2,559.68', image: 'Compact bluetooth speaker', stock: 8, id: 'prod_2' },
    { name: 'Smart Fitness Watch Series 5', sales: 28, revenue: '$5,599.72', image: 'Modern fitness smartwatch', stock: 5, id: 'prod_3' },
    { name: 'Organic Cotton T-Shirt (Unisex)', sales: 22, revenue: '$659.78', image: 'Plain cotton t-shirt', stock: 25, id: 'prod_4' },
  ];
  
  const quickActions = [
    { label: 'Add New Product', icon: PlusCircle, link: '/vendor/products/add', color: 'text-green-500' },
    { label: 'View Pending Orders', icon: ShoppingBag, link: '/vendor/orders?status=Processing', color: 'text-blue-500' },
    { label: 'Manage Inventory', icon: Package, link: '/vendor/products?filter=inventory', color: 'text-orange-500' },
    { label: 'View Store Analytics', icon: TrendingUp, link: '/vendor/analytics', color: 'text-purple-500' },
  ];

  const alerts = [
    { message: 'Smart Fitness Watch Series 5 is low on stock (5 left).', type: 'low_stock', link: '/vendor/products/prod_3' },
    { message: 'New message from customer "Alice W." regarding ORD-VC001.', type: 'message', link: '/vendor/messages/ORD-VC001' },
    { message: 'Your store payout of $1,250 is scheduled for 2025-06-20.', type: 'payout', link: '/vendor/settings?tab=payouts' },
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Awaiting Payment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getAlertIcon = (type) => {
    switch(type) {
        case 'low_stock': return <Package className="w-5 h-5 text-orange-500" />;
        case 'message': return <Users className="w-5 h-5 text-blue-500" />;
        case 'payout': return <DollarSign className="w-5 h-5 text-green-500" />;
        default: return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };


  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Vendor'}! Here's what's happening with your store.</p>
        </div>
        <Link to="/vendor/products/add" className="mt-3 sm:mt-0">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-shadow">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
        </Link>
      </motion.div>

      {/* Stats Cards - Similar to Admin */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link to={stat.link} key={index}>
              <Card className="card-hover transform transition-all hover:shadow-xl hover:-translate-y-1 border-l-4 border-purple-500">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-full bg-opacity-20 ${stat.color.replace('text-', 'bg-')}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 mb-0.5">{stat.value}</p>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Orders - Similar to Admin */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                Recent Orders
                <Link to="/vendor/orders">
                  <Button variant="outline" size="sm">View All Orders</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-purple-700">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer} - {order.productCount} item(s)</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-md">${order.amount.toFixed(2)}</p>
                    <Badge className={`${getStatusColor(order.status)} px-2.5 py-0.5 text-xs`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              )) : (
                 <p className="text-gray-500 text-center py-4">No recent orders.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Alerts & Quick Actions - Similar to Admin's Pending Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="lg:col-span-1"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Alerts & Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start p-3 border border-gray-200 rounded-lg">
                  <div className="mr-3 flex-shrink-0">{getAlertIcon(alert.type)}</div>
                  <div>
                    <p className="font-medium text-sm">{alert.message}</p>
                    <Link to={alert.link} onClick={() => toast({title: "🚧 This link isn't fully implemented yet!"})}>
                        <Button variant="link" size="sm" className="p-0 h-auto text-purple-600">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
              <div className="pt-2 space-y-2">
                {quickActions.slice(0,2).map(action => {
                    const Icon = action.icon;
                    return (
                        <Link to={action.link} key={action.label}>
                            <Button variant="outline" className="w-full justify-start">
                                <Icon className={`w-4 h-4 mr-2 ${action.color}`} /> {action.label}
                            </Button>
                        </Link>
                    );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Selling Products - Similar to Admin's Top Vendors */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topProducts.map((product, index) => (
                <Link to={`/vendor/products/${product.id}`} key={index}>
                <div className="p-4 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-400 rounded-lg flex items-center justify-center mx-auto mb-2.5 overflow-hidden">
                    <img  className="w-full h-full object-cover" alt={`${product.image}`} src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100&h=100&fit=crop&product_name=${encodeURIComponent(product.image)}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1.5 truncate" title={product.name}>{product.name}</h3>
                    <div className="space-y-0.5 text-xs">
                      <p className="text-green-600 font-medium">{product.revenue}</p>
                      <p className="text-gray-500">{product.sales} sales</p>
                      <p className={`${product.stock < 10 ? 'text-red-500' : 'text-gray-500'}`}>Stock: {product.stock}</p>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Analytics Placeholder - Similar to Admin */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Store Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-center">
              <BarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Detailed store analytics charts will be displayed here.</p>
              <Link to="/vendor/analytics">
                <Button variant="outline" size="sm" className="mt-3">
                    View Detailed Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VendorDashboard;
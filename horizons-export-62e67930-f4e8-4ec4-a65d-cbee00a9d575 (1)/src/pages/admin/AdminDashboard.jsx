
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12% from last month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: '+8% from last month',
      icon: Package,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '5,678',
      change: '+15% from last month',
      icon: ShoppingBag,
      color: 'text-purple-600'
    },
    {
      title: 'Platform Revenue',
      value: '$89,450',
      change: '+22% from last month',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2025-06-11'
    },
    {
      id: 2,
      name: 'TechGear Pro',
      email: 'vendor@techgear.com',
      role: 'Vendor',
      status: 'Pending',
      joinDate: '2025-06-10'
    },
    {
      id: 3,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2025-06-09'
    },
    {
      id: 4,
      name: 'Fashion Hub',
      email: 'info@fashionhub.com',
      role: 'Vendor',
      status: 'Active',
      joinDate: '2025-06-08'
    }
  ];

  const pendingActions = [
    {
      type: 'vendor_approval',
      message: '3 vendors pending approval',
      priority: 'high',
      count: 3,
      link: '/admin/users?status=pending&role=vendor'
    },
    {
      type: 'product_review',
      message: '12 products awaiting review',
      priority: 'medium',
      count: 12,
      link: '/admin/products?status=pending'
    },
    {
      type: 'dispute_resolution',
      message: '2 order disputes to resolve',
      priority: 'high',
      count: 2,
      link: '/admin/orders?status=disputed'
    },
    {
      type: 'refund_requests',
      message: '5 refund requests pending',
      priority: 'medium',
      count: 5,
      link: '/admin/orders?status=refund-request'
    }
  ];

  const topVendors = [
    {
      name: 'TechGear Pro',
      revenue: '$15,450',
      orders: 89,
      rating: 4.8,
      avatarInitial: 'T'
    },
    {
      name: 'Fashion Hub',
      revenue: '$12,300',
      orders: 67,
      rating: 4.6,
      avatarInitial: 'F'
    },
    {
      name: 'Home Essentials',
      revenue: '$9,800',
      orders: 54,
      rating: 4.7,
      avatarInitial: 'H'
    },
    {
      name: 'Sports World',
      revenue: '$8,200',
      orders: 43,
      rating: 4.5,
      avatarInitial: 'S'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>
        <Link to="/admin/reports">
          <Button className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md hover:shadow-lg transition-shadow">
            View Reports
          </Button>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-hover transform transition-all hover:shadow-xl hover:-translate-y-1 border-l-4 border-red-500">
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
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${getPriorityColor(action.priority)}`}></div>
                    <div>
                      <p className="font-medium text-sm">{action.message}</p>
                      <p className="text-xs text-gray-500 capitalize">{action.priority} priority</p>
                    </div>
                  </div>
                  <Link to={action.link}>
                    <Button size="sm" variant="outline">Review</Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                Recent Users
                <Link to="/admin/users">
                    <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.joinDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(user.status)} px-2.5 py-0.5 text-xs`}>
                      {user.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Vendors */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Top Performing Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topVendors.map((vendor, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-2.5">
                    <span className="text-white font-bold text-lg">{vendor.avatarInitial}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{vendor.name}</h3>
                  <div className="space-y-0.5 text-xs">
                    <p className="text-green-600 font-medium">{vendor.revenue}</p>
                    <p className="text-gray-500">{vendor.orders} orders</p>
                    <p className="text-yellow-600">★ {vendor.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Analytics Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Platform Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-center">
              <BarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Detailed platform analytics charts will be displayed here.</p>
              <Link to="/admin/reports">
                <Button variant="outline" size="sm" className="mt-3">
                    View Detailed Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

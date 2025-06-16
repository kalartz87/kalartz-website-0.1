
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar /> {/* Sidebar is fixed width */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader /> {/* Header is fixed height */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8 pt-20"> {/* pt-20 for header height */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

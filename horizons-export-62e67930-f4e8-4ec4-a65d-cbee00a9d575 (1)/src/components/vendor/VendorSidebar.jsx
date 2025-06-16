import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings,
  Store,
  PlusCircle,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const VendorSidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/vendor' },
    { icon: Package, label: 'Products', path: '/vendor/products' },
    { icon: PlusCircle, label: 'Add Product', path: '/vendor/products/add' },
    { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
    { icon: BarChart3, label: 'Analytics', path: '/vendor/analytics' },
    { icon: MessageSquare, label: 'Messages', path: '/vendor/messages' }, // Placeholder
    { icon: Settings, label: 'Settings', path: '/vendor/settings' },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you soon!"
    });
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white shadow-sm border-r min-h-screen fixed left-0 top-0 flex flex-col z-40"> {/* Fixed width, full height, similar to AdminSidebar */}
      {/* Logo Area - Mimicking AdminSidebar style */}
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
        <Link to="/vendor" className="flex items-center space-x-2">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/62e67930-f4e8-4ec4-a65d-cbee00a9d575/2d4e61dba6bbe8e092f7a2fff0d23cfd.png" alt="Kalartz Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-purple-600">Kalartz Vendor</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                           (item.path !== '/vendor' && location.pathname.startsWith(item.path) && item.path !== '/vendor/products/add' && item.path !== '/vendor/messages') ||
                           (item.path === '/vendor/products/add' && location.pathname === '/vendor/products/add') ||
                           (item.path === '/vendor/messages' && location.pathname === '/vendor/messages');
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (item.path === '/vendor/messages') {
                  toast({ title: "🚧 Messages feature coming soon!" });
                }
              }}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-150 ease-in-out group",
                isActive 
                  ? "bg-purple-100 text-purple-700 border-r-2 border-purple-700 font-semibold" // Active style similar to Admin
                  : "text-gray-600 hover:bg-gray-100 hover:text-purple-600"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform duration-150", isActive ? "text-purple-700" : "text-gray-400 group-hover:text-purple-600")} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-gray-200">
          <Button variant="outline" className="w-full justify-start text-gray-600 hover:bg-red-500 hover:text-white" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
      </div>
    </aside>
  );
};

export default VendorSidebar;
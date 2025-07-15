import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'NGOs', href: '/ngos' },
    { name: 'Programs', href: '/programs' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Grants', href: '/grants', ngoOnly: true },
    { name: 'Emergency Help', href: '/emergency-help' },
    { name: 'Who We Are', href: '/who-we-are' },
  ];

  const userNavigation = user?.role === 'ngo'
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Enhanced Dashboard', href: '/enhanced-dashboard' },
        { name: 'Executive Dashboard', href: '/executive-dashboard' },
        { name: 'Programs', href: '/dashboard/programs' },
        { name: 'Volunteers', href: '/dashboard/volunteers' },
        { name: 'Grants', href: '/dashboard/grants' },
        { name: 'Settings', href: '/dashboard/settings' },
      ]
    : user?.role === 'citizen'
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'My Applications', href: '/dashboard/applications' },
        { name: 'Settings', href: '/dashboard/settings' },
      ]
    : user?.role === 'volunteer'
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'My Opportunities', href: '/dashboard/opportunities' },
        { name: 'Hours Log', href: '/dashboard/hours-log' },
        { name: 'Settings', href: '/dashboard/settings' },
      ]
    : user?.role === 'donor'
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Enhanced Dashboard', href: '/enhanced-dashboard' },
        { name: 'Executive Dashboard', href: '/executive-dashboard' },
        { name: 'My Donations', href: '/dashboard/donations' },
        { name: 'Certificates', href: '/dashboard/certificates' },
        { name: 'Settings', href: '/dashboard/settings' },
      ]
    : [];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">SD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                SevaDaan
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-2">
              {navigation.map((item) => {
                if (item.ngoOnly && user?.role !== 'ngo') return null;
                
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                      isActive 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            {/* Auth Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button 
                  className="relative p-2 text-gray-600 hover:text-gray-800"
                  aria-label="View notifications"
                  title="View notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-1 hover:bg-gray-50"
                    aria-label="Open user menu"
                    title="Open user menu"
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      size="sm"
                    />
                    <ChevronDown className={cn(
                      "w-4 h-4 text-gray-500 transition-transform",
                      isUserMenuOpen && "rotate-180"
                    )} />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={closeMenus} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        
                        {userNavigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={closeMenus}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                        
                        <hr className="my-2 border-gray-200" />
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
              aria-label="Toggle navigation menu"
              title="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-2">
              {/* Mobile Navigation */}
              {navigation.map((item) => {
                if (item.ngoOnly && user?.role !== 'ngo') return null;
                
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMenus}
                    className={cn(
                      'block px-4 py-3 text-base font-medium mx-2 rounded-full',
                      isActive
                        ? 'text-blue-600 bg-blue-100'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Auth */}
              {!user && (
                <div className="px-4 pt-4 space-y-2 border-t border-gray-200">
                  <Link to="/login" onClick={closeMenus} className="block">
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-gray-600 hover:text-gray-800"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenus} className="block">
                    <Button
                      className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
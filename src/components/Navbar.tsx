'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, Users, Info } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/challenge', label: 'وضع التحدي', icon: Users },
    { href: '/favorites', label: 'المفضلة', icon: Heart },
    { href: '/about', label: 'حول التطبيق', icon: Info },
  ];

  return (
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo (right side) */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 space-x-reverse">
                <div className="text-2xl">🍽️</div>
                <span className="text-xl font-bold text-gray-900">وش آكل؟</span>
              </Link>
            </div>

            {/* Centered Nav Items (desktop only) */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-8 space-x-reverse">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive
                                ? 'bg-orange-100 text-orange-700'
                                : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                        }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button (left side) */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-600 hover:text-orange-600 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                  <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive
                              ? 'bg-orange-100 text-orange-700'
                              : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
              );
            })}
          </div>
        </div>
      </nav>
  );
}

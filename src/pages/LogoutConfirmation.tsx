import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, 
    Bell, AlertCircle
} from 'lucide-react';

interface LogoutConfirmationProps {
    navigate: (route: string) => void;
}

export default function LogoutConfirmation({ navigate }: LogoutConfirmationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sidebarNavItems = [
        { icon: LayoutDashboard, label: 'Dashboard', route: 'admin_dashboard', active: true },
        { icon: Users, label: 'Directory', route: 'admin_students' },
        { icon: BookOpen, label: 'Academics', route: 'admin_classes' },
        { icon: Settings, label: 'Settings', route: 'admin_school_profile' },
    ];

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex flex-col md:flex-row font-sans relative">
            {/* Mobile Header */}
            <div className="md:hidden bg-[#1F3864] text-white p-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-xl font-bold tracking-tight">SchoolLink</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-20 w-64 bg-[#1F3864] text-white
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                flex flex-col
            `}>
                <div className="hidden md:flex p-6 items-center gap-3 border-b border-white/10">
                    <BookOpen className="w-8 h-8 text-white" />
                    <span className="text-2xl font-bold tracking-tight">SchoolLink</span>
                </div>

                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">AD</span>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Administrator</p>
                        <p className="text-xs text-white/70">System Admin</p>
                    </div>
                </div>

                <nav className="flex-1 py-4 flex flex-col gap-1 px-3 overflow-y-auto">
                    {sidebarNavItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                navigate(item.route);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                item.active 
                                ? 'bg-white/10 font-medium' 
                                : 'text-white/80 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : ''}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button onClick={() => navigate('empty_state')} 
                        className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden opacity-50 pointer-events-none">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0">
                    <h1 className="text-2xl font-bold text-[#1F3864]">Dashboard</h1>
                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-400 hover:text-[#1F3864] transition-colors relative">
                            <Bell className="w-6 h-6" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1F3864] text-white flex items-center justify-center font-bold text-sm">
                                AD
                            </div>
                            <span className="font-medium text-gray-700">System Admin</span>
                        </div>
                    </div>
                </header>

                {/* Content Area placeholder */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="h-64 bg-white rounded-xl shadow-sm border border-gray-100"></div>
                </div>
            </main>

            {/* Modal Overlay */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                        <LogOut className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-[#1F3864] mb-2">Log Out</h2>
                    <p className="text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => navigate('admin_dashboard')}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => navigate('login')}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

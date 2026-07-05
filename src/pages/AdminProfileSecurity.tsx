import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, 
    Bell, User, Lock, Smartphone, Shield, Monitor
} from 'lucide-react';

interface AdminProfileSecurityProps {
    navigate: (route: string) => void;
}

export default function AdminProfileSecurity({ navigate }: AdminProfileSecurityProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const sidebarNavItems = [
        { icon: LayoutDashboard, label: 'Dashboard', route: 'admin_dashboard' },
        { icon: Users, label: 'Directory', route: 'admin_students' },
        { icon: BookOpen, label: 'Academics', route: 'admin_classes' },
        { icon: Settings, label: 'Settings', route: 'admin_school_profile', active: true },
    ];

    const activeSessions = [
        { id: 1, device: 'MacBook Pro', browser: 'Chrome', os: 'macOS', location: 'Accra, Ghana', ip: '197.210.64.21', lastActive: 'Active now', isCurrent: true, icon: Monitor },
        { id: 2, device: 'iPhone 13', browser: 'Safari', os: 'iOS', location: 'Kumasi, Ghana', ip: '154.160.22.14', lastActive: '2 hours ago', isCurrent: false, icon: Smartphone },
    ];

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex flex-col md:flex-row font-sans">
            {/* Mobile Header */}
            <div className="md:hidden bg-[#1F3864] text-white p-4 flex justify-between items-center sticky top-0 z-50">
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
                fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1F3864] text-white
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
                    <button 
                        onClick={() => navigate('splash')}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <h1 className="text-2xl font-bold text-[#1F3864]">Profile & Security</h1>
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

                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        
                        {/* Profile Settings */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#DCE6F1]/20 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <User className="w-6 h-6 text-[#1F3864]" />
                                    <h2 className="text-lg font-bold text-[#1F3864]">Personal Information</h2>
                                </div>
                                <button className="text-[#1F3864] font-medium text-sm hover:underline">Edit</button>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-24 h-24 rounded-full bg-[#1F3864]/10 flex items-center justify-center text-[#1F3864] text-3xl font-bold border-4 border-white shadow-sm">
                                            AD
                                        </div>
                                        <button className="text-sm font-medium text-[#1F3864] hover:underline">Change Photo</button>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <p className="font-medium text-gray-900">System Admin</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <p className="font-medium text-gray-900">admin@school.edu.gh</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <p className="font-medium text-gray-900">+233 24 123 4567</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                            <p className="font-medium text-gray-900">Super Administrator</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#DCE6F1]/20 flex items-center gap-3">
                                <Shield className="w-6 h-6 text-[#1F3864]" />
                                <div>
                                    <h2 className="text-lg font-bold text-[#1F3864]">Security & Password</h2>
                                    <p className="text-sm text-gray-500">Update your password and secure your account.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="max-w-md space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                        <input type="password" required className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input type="password" required className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                        <input type="password" required className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864]" />
                                    </div>
                                    <button className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#1F3864]/90 transition-colors w-full sm:w-auto mt-2">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active Sessions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#DCE6F1]/20">
                                <h2 className="text-lg font-bold text-[#1F3864]">Active Sessions</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage and log out of your active sessions on other browsers and devices.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#1F3864] text-white">
                                            <th className="p-4 font-semibold text-sm">Device</th>
                                            <th className="p-4 font-semibold text-sm">Location / IP</th>
                                            <th className="p-4 font-semibold text-sm">Last Active</th>
                                            <th className="p-4 font-semibold text-sm text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {activeSessions.map((session, index) => (
                                            <tr key={session.id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-[#DCE6F1]/30 hover:bg-[#DCE6F1]/50'}>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                                                            <session.icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900 flex items-center gap-2">
                                                                {session.device}
                                                                {session.isCurrent && (
                                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 uppercase tracking-wider">This Device</span>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-gray-500">{session.browser} on {session.os}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-medium text-gray-900">{session.location}</div>
                                                    <div className="text-xs text-gray-500">{session.ip}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className={`font-medium ${session.isCurrent ? 'text-green-600' : 'text-gray-900'}`}>{session.lastActive}</div>
                                                </td>
                                                <td className="p-4 text-right">
                                                    {!session.isCurrent ? (
                                                        <button onClick={() => navigate('logout_confirmation')} className="px-3 py-1.5 border border-red-200 text-red-600 rounded hover:bg-red-50 font-medium transition-colors">
                                                            Log Out
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-400 font-medium px-3 py-1.5">Current</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe overflow-x-auto">
                {sidebarNavItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.route)}
                        className={`flex flex-col items-center p-2 min-w-[64px] ${item.active ? 'text-[#1F3864]' : 'text-gray-500 hover:bg-gray-50'} rounded-lg transition-colors`}
                    >
                        <item.icon className={`w-5 h-5 mb-1 ${item.active ? 'text-[#1F3864]' : 'text-gray-500'}`} />
                        <span className={`text-[10px] whitespace-nowrap ${item.active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

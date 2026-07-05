import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, 
    Bell, Search, Filter, Activity, Clock, ShieldAlert, FileEdit, Trash2, UserPlus
} from 'lucide-react';

interface AdminActivityLogProps {
    navigate: (route: string) => void;
}

export default function AdminActivityLog({ navigate }: AdminActivityLogProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Filters state
    const [searchTerm, setSearchTerm] = useState('');
    const [actionFilter, setActionFilter] = useState('All Actions');
    const [dateFilter, setDateFilter] = useState('All Time');

    const sidebarNavItems = [
        { icon: LayoutDashboard, label: 'Dashboard', route: 'admin_dashboard' },
        { icon: Users, label: 'Directory', route: 'admin_students' },
        { icon: BookOpen, label: 'Academics', route: 'admin_classes' },
        { icon: Settings, label: 'Settings', route: 'admin_school_profile' },
        { icon: Activity, label: 'Activity Log', route: 'admin_activity_log', active: true },
    ];

    const logs = [
        { id: 1, user: 'Mrs. Mensah', role: 'Teacher', action: 'Created', record: 'Mathematics Assignment', type: 'create', time: '10:42 AM', date: 'Oct 24, 2023', icon: FileEdit },
        { id: 2, user: 'Mr. Osei', role: 'Admin', action: 'Updated', record: 'Student Record (ID: 1042)', type: 'update', time: '09:15 AM', date: 'Oct 24, 2023', icon: FileEdit },
        { id: 3, user: 'System', role: 'System', action: 'Deleted', record: 'Old Announcement', type: 'delete', time: '08:00 AM', date: 'Oct 24, 2023', icon: Trash2 },
        { id: 4, user: 'Ms. Appiah', role: 'Teacher', action: 'Login', record: 'System Access', type: 'login', time: '07:45 AM', date: 'Oct 24, 2023', icon: Clock },
        { id: 5, user: 'Mr. Osei', role: 'Admin', action: 'Created', record: 'New User Account (Parent)', type: 'create', time: '04:30 PM', date: 'Oct 23, 2023', icon: UserPlus },
        { id: 6, user: 'System', role: 'System', action: 'Failed Login', record: 'Unknown IP Address', type: 'security', time: '02:10 PM', date: 'Oct 23, 2023', icon: ShieldAlert },
        { id: 7, user: 'Mrs. Mensah', role: 'Teacher', action: 'Updated', record: 'Gradebook (Science)', type: 'update', time: '11:20 AM', date: 'Oct 23, 2023', icon: FileEdit },
        { id: 8, user: 'Mr. Yeboah', role: 'Parent', action: 'Login', record: 'System Access', type: 'login', time: '08:30 AM', date: 'Oct 23, 2023', icon: Clock },
    ];

    // Helper for action badges
    const getActionBadge = (type: string, action: string) => {
        switch (type) {
            case 'create':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">{action}</span>;
            case 'update':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">{action}</span>;
            case 'delete':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">{action}</span>;
            case 'security':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">{action}</span>;
            case 'login':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">{action}</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{action}</span>;
        }
    };

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
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <h1 className="text-2xl font-bold text-[#1F3864]">Activity / Audit Log</h1>
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

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        
                        {/* Filters and Search */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full md:w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    defaultValue="Kofi" placeholder="Search user, record, or action..."
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-[#1F3864] focus:border-[#1F3864] text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex w-full md:w-auto gap-3">
                                <div className="relative flex-1 md:w-48">
                                    <select 
                                        className="appearance-none block w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-[#1F3864] focus:border-[#1F3864] text-sm bg-white"
                                        value={actionFilter}
                                        onChange={(e) => setActionFilter(e.target.value)}
                                    >
                                        <option>All Actions</option>
                                        <option>Creates</option>
                                        <option>Updates</option>
                                        <option>Deletes</option>
                                        <option>Logins</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <Filter className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                
                                <div className="relative flex-1 md:w-48">
                                    <select 
                                        className="appearance-none block w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-[#1F3864] focus:border-[#1F3864] text-sm bg-white"
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                    >
                                        <option>All Time</option>
                                        <option>Today</option>
                                        <option>Yesterday</option>
                                        <option>Last 7 Days</option>
                                        <option>This Month</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                
                                <button onClick={() => navigate('empty_state')} className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F3864]">
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* Audit Log Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#1F3864] text-white">
                                            <th className="p-4 font-semibold text-sm w-48">Date & Time</th>
                                            <th className="p-4 font-semibold text-sm">User</th>
                                            <th className="p-4 font-semibold text-sm">Action</th>
                                            <th className="p-4 font-semibold text-sm">Record</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {logs.map((log, index) => (
                                            <tr key={log.id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-[#DCE6F1]/30 hover:bg-[#DCE6F1]/50'}>
                                                <td className="p-4 text-gray-500 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{log.date}</div>
                                                    <div className="text-xs">{log.time}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                                                            <Users className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{log.user}</div>
                                                            <div className="text-xs text-gray-500">{log.role}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {getActionBadge(log.type, log.action)}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2 text-gray-700">
                                                        <log.icon className="w-4 h-4 text-gray-400" />
                                                        {log.record}
                                                    </div>
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

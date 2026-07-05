import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings,
    Search, Plus, Filter, MoreVertical, CheckCircle, XCircle, Shield, FolderOpen
} from 'lucide-react';

export default function AdminAccountList({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: true },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const adminData = [
        { id: 1, name: 'Principal Mensah', phone: '020 111 2222', email: 'principal@schoollink.edu.gh', dateAdded: 'Aug 10, 2021', status: 'Active', role: 'Super Admin' },
        { id: 2, name: 'Mr. David Osei', phone: '024 333 4444', email: 'david.osei@schoollink.edu.gh', dateAdded: 'Sep 05, 2022', status: 'Active', role: 'Academic Head' },
        { id: 3, name: 'Mrs. Janet Asare', phone: '027 555 6666', email: 'janet.asare@schoollink.edu.gh', dateAdded: 'Jan 15, 2023', status: 'Active', role: 'IT Administrator' },
        { id: 4, name: 'Ms. Clara Antwi', phone: '055 777 8888', email: 'clara.a@schoollink.edu.gh', dateAdded: 'Mar 20, 2023', status: 'Inactive', role: 'Records Officer' }
    ];

    const filteredAdmins = adminData.filter(admin => {
        const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              admin.phone.includes(searchQuery) ||
                              admin.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || admin.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1F3864]">SchoolLink</h1>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Admin Portal</p>
                    </div>
                    <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navItems.map((item, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                if (item.path !== '#') navigate(item.path);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-semibold transition-colors ${
                                item.active 
                                    ? 'bg-[#1F3864] text-white' 
                                    : 'text-gray-600 hover:bg-[#DCE6F1] hover:text-[#1F3864]'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="md:ml-[260px] flex flex-col min-h-screen pb-20 md:pb-0">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Administrators</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">Principal Mensah</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                PM
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F3864] mb-1">Administrator Accounts</h2>
                            <p className="text-sm text-gray-500 font-semibold">Manage system access for school staff.</p>
                        </div>
                        <button 
                            onClick={() => navigate('admin_account_form')}
                            className="w-full sm:w-auto bg-[#1F3864] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#2a4d8a] transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Administrator
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold transition-colors"
                                defaultValue="Kofi" placeholder="Search administrators by name, email, or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Filter className="h-4 w-4 text-gray-400" />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Roster Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-[#1F3864] text-white">
                                        <th className="py-3 px-5 text-sm font-bold w-16">ID</th>
                                        <th className="py-3 px-5 text-sm font-bold">Admin Name & Role</th>
                                        <th className="py-3 px-5 text-sm font-bold">Contact Info</th>
                                        <th className="py-3 px-5 text-sm font-bold">Date Added</th>
                                        <th className="py-3 px-5 text-sm font-bold text-center">Status</th>
                                        <th className="py-3 px-5 text-sm font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {filteredAdmins.map((admin, i) => (
                                        <tr key={admin.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                            <td className="py-4 px-5 font-bold text-gray-500">A{String(admin.id).padStart(3, '0')}</td>
                                            <td className="py-4 px-5 font-bold text-[#1F3864]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-xs shrink-0">
                                                        {admin.name.split(' ').map(n => n[0]).join('').substring(0, 2).replace('.', '')}
                                                    </div>
                                                    <div>
                                                        <div className="hover:underline cursor-pointer">{admin.name}</div>
                                                        <div className="text-xs text-gray-500 font-semibold">{admin.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-semibold text-[#1F3864]">{admin.phone}</span>
                                                    <span className="font-semibold text-gray-500 text-xs">{admin.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className="font-semibold text-gray-700">{admin.dateAdded}</span>
                                            </td>
                                            <td className="py-4 px-5 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                    admin.status === 'Active' 
                                                        ? 'bg-green-100 text-green-700 border-green-200' 
                                                        : 'bg-red-100 text-red-700 border-red-200'
                                                }`}>
                                                    {admin.status === 'Active' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                                    {admin.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <button onClick={() => navigate('empty_state')} className="p-2 text-gray-400 hover:text-[#1F3864] hover:bg-[#DCE6F1] rounded-lg transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredAdmins.length === 0 && (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center bg-white border-t border-gray-100 shadow-sm w-full">
                                <div className="w-16 h-16 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 text-[#1F3864]">
                                    <FolderOpen className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">No administrators found</h2>
                                <p className="text-gray-500 mb-6">There are currently no administrators matching your filters.</p>
                            </div>
                        )}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500 font-semibold">
                            Showing {filteredAdmins.length} of {adminData.length} administrators
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe overflow-x-auto">
                {navItems.filter(item => item.label !== 'Logout' && item.label !== 'Settings').map((item, i) => (
                    <button 
                        key={i}
                        onClick={() => {
                            if (item.path !== '#') navigate(item.path);
                        }}
                        className={`flex flex-col items-center p-2 min-w-[64px] rounded-lg transition-colors ${
                            item.active 
                                ? 'text-[#1F3864]' 
                                : 'text-gray-500 hover:text-[#1F3864]'
                        }`}
                    >
                        <item.icon className={`w-5 h-5 mb-1 ${item.active ? 'fill-[#1F3864]/10' : ''}`} />
                        <span className="text-[10px] font-bold truncate max-w-full px-1">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

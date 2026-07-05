import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, ChevronLeft,
    Save, X, Shield, User, Phone, Mail, CheckCircle
} from 'lucide-react';

export default function AdminAccountForm({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        role: 'Records Officer',
        isActive: true
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        navigate('admin_accounts');
    };

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
                        <X className="w-6 h-6" />
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
                        <div className="flex items-center gap-3 hidden sm:flex">
                            <button onClick={() => navigate('admin_accounts')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Add / Edit Administrator</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
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
                <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-3 bg-[#1F3864] text-white">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Administrator Profile</h2>
                                <p className="text-sm text-blue-200 font-semibold mt-0.5">Enter details and assign access level.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                            
                            {/* Personal Details Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-2">
                                    <User className="w-5 h-5 text-gray-400" />
                                    Personal Details
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            placeholder="e.g. Samuel Osei"
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            Phone Number
                                        </label>
                                        <input 
                                            type="tel" 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            placeholder="e.g. 024 123 4567"
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            Email Address
                                        </label>
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="e.g. samuel.o@schoollink.edu.gh"
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864]"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Access & Permissions Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-2">
                                    <Settings className="w-5 h-5 text-gray-400" />
                                    Access & Permissions
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Permission Level</label>
                                        <div className="relative">
                                            <select required 
                                                value={formData.role}
                                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] appearance-none cursor-pointer bg-white"
                                            >
                                                <option value="Super Admin">Super Admin</option>
                                                <option value="Academic Head">Academic Head</option>
                                                <option value="IT Administrator">IT Administrator</option>
                                                <option value="Records Officer">Records Officer</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-end">
                                        <label className="block text-sm font-bold text-gray-700 mb-3">Account Status</label>
                                        <label className="flex items-center cursor-pointer group">
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only" 
                                                    checked={formData.isActive}
                                                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                                                />
                                                <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isActive ? 'bg-[#1F3864]' : 'bg-gray-300'}`}></div>
                                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isActive ? 'transform translate-x-6' : ''}`}></div>
                                            </div>
                                            <div className="ml-3 font-bold text-sm">
                                                {formData.isActive ? (
                                                    <span className="text-green-600 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Active</span>
                                                ) : (
                                                    <span className="text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> Inactive</span>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
                                <button 
                                    type="button"
                                    onClick={() => navigate('admin_accounts')}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#2a4d8a] transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Administrator
                                </button>
                            </div>

                        </form>
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

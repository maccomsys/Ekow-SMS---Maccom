import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User, Mail, Phone, Lock, Link
} from 'lucide-react';

export default function ParentProfile({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'parent_dashboard', active: false },
        { icon: Users, label: 'Switch Child', path: 'child_switcher', active: false },
        { icon: BookOpen, label: 'Academics', path: 'grades_parent', active: false },
        { icon: BookMarked, label: 'Homework', path: 'homework_parent', active: false },
        { icon: FileText, label: 'Attendance', path: 'attendance_parent', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'announcements_parent', active: false },
        { icon: User, label: 'Profile', path: 'parent_profile', active: true },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const linkedChildren = [
        { id: 1, name: 'Kwame Mensah', grade: 'Grade 4 Gold', school: 'Ghana Academy', initial: 'K' },
        { id: 2, name: 'Ama Mensah', grade: 'Grade 2 Silver', school: 'Ghana Academy', initial: 'A' },
        { id: 3, name: 'Kofi Mensah', grade: 'Kindergarten Blue', school: 'Ghana Academy', initial: 'K' }
    ];

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1F3864]">SchoolLink</h1>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Parent Portal</p>
                    </div>
                    <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                        <FileX className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                if (item.path !== '#') navigate(item.path);
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
            <div className="md:ml-[260px] flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">My Profile</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">John Doe</p>
                                <p className="text-xs text-gray-500">Parent Account</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold text-[#1F3864]">Account Settings</h3>
                        <p className="text-gray-600 mt-1 text-sm font-semibold">Manage your personal details and linked student profiles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Column: Personal & Security */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-bold text-[#1F3864]">Personal Information</h4>
                                    <button onClick={() => navigate('parent_profile')} className="text-sm font-bold text-[#1F3864] border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                        Edit Details
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] shrink-0 mt-1">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</p>
                                            <p className="text-base font-semibold text-[#1F3864] mt-0.5">John Doe</p>
                                        </div>
                                    </div>
                                    <div className="h-px bg-gray-100 w-full"></div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] shrink-0 mt-1">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</p>
                                            <p className="text-base font-semibold text-[#1F3864] mt-0.5">+233 24 123 4567</p>
                                        </div>
                                    </div>
                                    <div className="h-px bg-gray-100 w-full"></div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] shrink-0 mt-1">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</p>
                                            <p className="text-base font-semibold text-[#1F3864] mt-0.5">johndoe@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h4 className="text-lg font-bold text-[#1F3864] mb-6">Security Settings</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</p>
                                            <p className="text-base font-bold text-[#1F3864] mt-0.5 tracking-widest">••••••••</p>
                                        </div>
                                    </div>
                                    <button onClick={() => navigate('reset_password')} className="text-sm font-bold text-[#1F3864] border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Linked Children */}
                        <div className="md:col-span-1">
                            <div className="bg-[#DCE6F1] rounded-xl border border-[#1F3864]/10 shadow-sm p-6 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-bold text-[#1F3864]">Linked Children</h4>
                                    <div className="bg-[#1F3864] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                        {linkedChildren.length}
                                    </div>
                                </div>
                                
                                <div className="space-y-3 flex-1">
                                    {linkedChildren.map((child) => (
                                        <div key={child.id} className="bg-white rounded-lg p-3 border border-white hover:border-[#1F3864]/20 transition-colors flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#F7F8FA] flex items-center justify-center font-bold text-[#1F3864] text-sm shrink-0">
                                                {child.initial}
                                            </div>
                                            <div className="overflow-hidden">
                                                <h5 className="text-sm font-bold text-[#1F3864] truncate">{child.name}</h5>
                                                <p className="text-xs font-semibold text-gray-500 truncate">{child.grade}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => navigate('linkage_confirmation')}
                                    className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-[#1F3864] text-sm font-bold py-2.5 rounded-lg hover:bg-opacity-80 transition-colors"
                                >
                                    <Link className="w-4 h-4" />
                                    Link Another Child
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe overflow-x-auto">
                {navItems.filter(item => item.label !== 'Logout').map((item, i) => (
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

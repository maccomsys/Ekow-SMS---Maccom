import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    CheckSquare, ChevronLeft, Mail, Phone, Lock, Book,
    ShieldCheck
} from 'lucide-react';

export default function TeacherProfile({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'teacher_dashboard', active: false },
        { icon: Users, label: 'Classes & Subjects', path: 'teacher_classes', active: false },
        { icon: CheckSquare, label: 'Attendance', path: 'teacher_attendance', active: false },
        { icon: BookMarked, label: 'Homework', path: 'teacher_homework_list', active: false },
        { icon: FileText, label: 'Grades', path: 'teacher_grades_entry', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'teacher_announcement', active: false },
        { icon: User, label: 'Profile', path: 'teacher_profile', active: true },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const assignedClasses = [
        { id: 1, name: 'Grade 4 Gold', subject: 'Mathematics' },
        { id: 2, name: 'Grade 4 Gold', subject: 'Science' },
        { id: 3, name: 'Grade 5 Silver', subject: 'Mathematics' },
    ];

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1F3864]">SchoolLink</h1>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Teacher Portal</p>
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
            <div className="md:ml-[260px] flex flex-col min-h-screen pb-20 md:pb-0">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3 hidden sm:flex">
                            <button onClick={() => navigate('teacher_dashboard')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">My Profile</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">Mr. Addo</p>
                                <p className="text-xs text-gray-500">Teacher Account</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                MA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
                    <div className="bg-[#1F3864] rounded-xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30 shrink-0">
                            MA
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-3xl font-bold mb-1">Mr. Michael Addo</h3>
                            <p className="text-blue-200 font-semibold mb-3">Senior Mathematics & Science Teacher</p>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-500/30">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Active Account
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6">
                            <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4">
                                <User className="w-5 h-5 text-gray-400" />
                                Contact Information
                            </h4>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#DCE6F1] flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-[#1F3864]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Email Address</p>
                                        <p className="font-semibold text-[#1F3864]">michael.addo@schoollink.edu.gh</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#DCE6F1] flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-[#1F3864]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Phone Number</p>
                                        <p className="font-semibold text-[#1F3864]">+233 24 123 4567</p>
                                    </div>
                                </div>
                            </div>
                            
                            <button onClick={() => navigate('teacher_profile')} className="w-full px-4 py-2 bg-white border border-gray-200 text-[#1F3864] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                Edit Contact Details
                            </button>
                        </div>

                        {/* Assigned Classes */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6">
                            <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4">
                                <Book className="w-5 h-5 text-gray-400" />
                                Assigned Classes & Subjects
                            </h4>
                            
                            <div className="space-y-3">
                                {assignedClasses.map((cls) => (
                                    <div key={cls.id} className="p-3 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-[#1F3864]">{cls.name}</p>
                                            <p className="text-sm font-semibold text-gray-500">{cls.subject}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Change Password */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6 md:col-span-2">
                            <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4">
                                <Lock className="w-5 h-5 text-gray-400" />
                                Security: Change Password
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864]" 
                                     defaultValue="••••••••" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864]" 
                                     defaultValue="••••••••" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864]" 
                                     defaultValue="••••••••" />
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-2">
                                <button onClick={() => navigate('reset_password')} className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm w-full sm:w-auto">
                                    Update Password
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

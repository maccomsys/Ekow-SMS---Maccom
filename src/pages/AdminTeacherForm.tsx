import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, FileX, MessageSquare, Settings,
    ChevronLeft, Save, User, Phone, Mail, BookOpen, Key, RefreshCw
} from 'lucide-react';

import { useMockData } from '../store/MockDataContext';

export default function AdminTeacherForm({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [tempPassword, setTempPassword] = useState("");
    
    const { addTeacher } = useMockData();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('teacherName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        
        addTeacher({
            id: `TCH${Date.now()}`,
            name: name || 'New Teacher',
            email: email || 'teacher@school.edu.gh',
            phone: phone || '000 000 0000',
            classes: [],
            status: isActive ? 'Active' : 'Inactive'
        });
        navigate('admin_teachers');
    };
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: true },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const generatePassword = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setTempPassword(password);
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
                            <button onClick={() => navigate('admin_teachers')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Add / Edit Teacher</h2>
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
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                PM
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        
                        <div className="p-6 md:p-8 space-y-8">
                            {/* Teacher Status */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1F3864]">Teacher Status</h3>
                                    <p className="text-sm font-semibold text-gray-500">Toggle if the teacher is currently active.</p>
                                </div>
                                <label className="flex items-center cursor-pointer relative">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only" 
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)}
                                    />
                                    <div className={`w-14 h-7 rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${isActive ? 'left-8' : 'left-1'}`}></div>
                                    </div>
                                    <span className={`ml-3 font-bold text-sm ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                                        {isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </label>
                            </div>

                            {/* Personal Details Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-400" />
                                    Personal & Contact Details
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-bold text-[#1F3864]">Full Name</label>
                                        <input 
                                            type="text" required
                                            name="teacherName"
                                            placeholder="e.g. Michael Addo" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#1F3864] flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            Phone Number
                                        </label>
                                        <input 
                                            type="tel"
                                            name="phone"
                                            placeholder="e.g. 024 123 4567" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#1F3864] flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            Email Address
                                        </label>
                                        <input 
                                            type="email" required
                                            name="email"
                                            placeholder="e.g. teacher@schoollink.edu.gh" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                </div>
                            </div>

                            {/* Class & Subject Assignment */}
                            <div className="space-y-6 pt-6 border-t border-gray-100">
                                <h3 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-gray-400" />
                                    Class & Subject Assignment
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-bold text-[#1F3864]">Primary Class Assignment (Optional)</label>
                                        <select required 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] bg-white transition-colors cursor-pointer"
                                            
                                        >
                                            <option value="" disabled>Select a primary class...</option>
                                            <option value="none">No specific primary class</option>
                                            <option value="class1">Grade 1</option>
                                            <option value="class2">Grade 2</option>
                                            <option value="class3">Grade 3 Blue</option>
                                            <option value="class4">Grade 4 Gold</option>
                                            <option value="class5">Grade 5 Silver</option>
                                            <option value="class6">Grade 6 Bronze</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-bold text-[#1F3864]">Subject Specialties</label>
                                        <input 
                                            type="text" required 
                                            placeholder="e.g. Mathematics, Science" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Account Security Section */}
                            <div className="space-y-6 pt-6 border-t border-gray-100">
                                <h3 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                    <Key className="w-5 h-5 text-gray-400" />
                                    Account Credentials
                                </h3>
                                
                                <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-5">
                                    <p className="text-sm text-gray-600 font-semibold mb-4">
                                        Generate a temporary password for the teacher to log in. They will be prompted to change it upon their first login.
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-3">
                                        <div className="w-full relative">
                                            <input 
                                                type="text" required 
                                                readOnly 
                                                value={tempPassword}
                                                placeholder="Click generate to create password"
                                                className="w-full border border-gray-200 rounded-lg pl-4 pr-10 py-3 bg-white font-mono font-bold text-[#1F3864] focus:outline-none"
                                            />
                                            {tempPassword && (
                                                <button 
                                                    type="button"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1F3864] transition-colors"
                                                    title="Copy to clipboard"
                                                    onClick={() => navigator.clipboard.writeText(tempPassword)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                                </button>
                                            )}
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={generatePassword}
                                            className="w-full sm:w-auto shrink-0 px-4 py-3 bg-[#DCE6F1] text-[#1F3864] font-bold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            Generate
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3">
                            <button 
                                type="button"
                                onClick={() => navigate('admin_teachers')}
                                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Save className="w-5 h-5" />
                                Save Teacher Record
                            </button>
                        </div>
                    </form>
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

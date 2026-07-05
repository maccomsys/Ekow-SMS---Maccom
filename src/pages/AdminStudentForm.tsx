import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, FileX, MessageSquare, Settings,
    ChevronLeft, Save, User, UserCheck, Phone, Mail, Home
} from 'lucide-react';

import { useMockData } from '../store/MockDataContext';

export default function AdminStudentForm({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    
    const { addStudent } = useMockData();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const studentName = formData.get('studentName') as string;
        addStudent({
            id: `STU${Date.now()}`,
            rollNumber: Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
            name: studentName.trim() || 'New Student'
        });
        navigate('admin_students');
    };
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: true },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

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
                            <button onClick={() => navigate('admin_students')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Add / Edit Student</h2>
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
                            {/* Student Status */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1F3864]">Student Status</h3>
                                    <p className="text-sm font-semibold text-gray-500">Toggle if the student is currently enrolled.</p>
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
                                    Personal Details
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#1F3864]">Full Name</label>
                                        <input 
                                            type="text"
                                            name="studentName"
                                            placeholder="e.g. Kwame Osei" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#1F3864]">Date of Birth</label>
                                        <input 
                                            type="date" required 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-bold text-[#1F3864]">Class Assignment</label>
                                        <select required 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] bg-white transition-colors cursor-pointer"
                                        >
                                            <option value="" disabled selected>Select a class...</option>
                                            <option value="class1">Grade 1</option>
                                            <option value="class2">Grade 2</option>
                                            <option value="class3">Grade 3</option>
                                            <option value="class4">Grade 4 Gold</option>
                                            <option value="class5">Grade 5 Silver</option>
                                            <option value="class6">Grade 6 Bronze</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Guardian Details Section */}
                            <div className="space-y-6 pt-6 border-t border-gray-100">
                                <h3 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-gray-400" />
                                    Guardian Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-bold text-[#1F3864]">Guardian Name(s)</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Mr. & Mrs. Osei" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#1F3864] flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            Primary Phone
                                        </label>
                                        <input 
                                            type="tel" 
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
                                            type="email" 
                                            placeholder="e.g. guardian@example.com" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-bold text-[#1F3864] flex items-center gap-2">
                                            <Home className="w-4 h-4 text-gray-400" />
                                            Residential Address
                                        </label>
                                        <textarea required 
                                            rows={3}
                                            placeholder="e.g. House No. 123, Accra" 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] text-[#1F3864] font-semibold transition-colors resize-y"
                                         ></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3">
                            <button 
                                type="button"
                                onClick={() => navigate('admin_students')}
                                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Save className="w-5 h-5" />
                                Save Student Record
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

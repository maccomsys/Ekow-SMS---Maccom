import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, ChevronRight, User, BookMarked, MessageSquare
} from 'lucide-react';

export default function ChildSwitcher({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const children = [
        { id: 1, name: 'Kwame Mensah', grade: 'Grade 4 Gold', school: 'Ghana Academy', initial: 'K' },
        { id: 2, name: 'Ama Mensah', grade: 'Grade 2 Silver', school: 'Ghana Academy', initial: 'A' },
        { id: 3, name: 'Kofi Mensah', grade: 'Kindergarten Blue', school: 'Ghana Academy', initial: 'K' }
    ];

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'parent_dashboard', active: false },
        { icon: Users, label: 'Switch Child', path: 'child_switcher', active: true },
        { icon: BookOpen, label: 'Academics', path: 'grades_parent', active: false },
        { icon: BookMarked, label: 'Homework', path: 'homework_parent', active: false },
        { icon: FileText, label: 'Attendance', path: 'attendance_parent', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'announcements_parent', active: false },
        { icon: User, label: 'Profile', path: 'parent_profile', active: false },
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
                        <p className="text-xs text-gray-500 uppercase font-semibold">Parent Portal</p>
                    </div>
                    <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                        <FileX className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="flex-1 py-6 px-4 space-y-2">
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Child Switcher</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-[#1F3864]">Select a Child</h3>
                        <p className="text-gray-600 mt-2">Choose which student's profile you would like to view.</p>
                    </div>

                    <div className="space-y-4">
                        {children.map((child) => (
                            <button 
                                key={child.id}
                                onClick={() => navigate('parent_dashboard')}
                                className="w-full bg-white border border-gray-200 hover:border-[#1F3864] rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-[#DCE6F1] border-2 border-[#1F3864]/20 flex items-center justify-center text-2xl font-bold text-[#1F3864]">
                                        {child.initial}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-xl font-bold text-[#1F3864] mb-1 group-hover:underline">{child.name}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                                            <span>{child.grade}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                            <span>{child.school}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#1F3864] group-hover:text-white transition-colors text-gray-400">
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            </button>
                        ))}

                        <button 
                            onClick={() => navigate('linkage_confirmation')}
                            className="w-full mt-6 bg-transparent border-2 border-dashed border-gray-300 hover:border-[#1F3864] rounded-xl p-6 text-gray-500 hover:text-[#1F3864] transition-colors flex flex-col items-center justify-center gap-2 font-semibold"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                <User className="w-6 h-6" />
                            </div>
                            Link Another Child
                        </button>
                    </div>
                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe">
                {navItems.filter(item => item.label !== 'Logout').map((item, i) => (
                    <button 
                        key={i}
                        onClick={() => {
                            if (item.path !== '#') navigate(item.path);
                        }}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                            item.active 
                                ? 'text-[#1F3864]' 
                                : 'text-gray-500 hover:text-[#1F3864]'
                        }`}
                    >
                        <item.icon className={`w-6 h-6 mb-1 ${item.active ? 'fill-[#1F3864]/10' : ''}`} />
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

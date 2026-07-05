import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    CheckSquare, ChevronRight
} from 'lucide-react';

export default function TeacherClassSelector({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'teacher_dashboard', active: false },
        { icon: Users, label: 'Classes & Subjects', path: 'teacher_classes', active: true },
        { icon: CheckSquare, label: 'Attendance', path: 'teacher_attendance', active: false },
        { icon: BookMarked, label: 'Homework', path: 'teacher_homework_list', active: false },
        { icon: FileText, label: 'Grades', path: 'teacher_grades_entry', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'teacher_announcement', active: false },
        { icon: User, label: 'Profile', path: 'teacher_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const classes = [
        { id: 1, name: 'Grade 4 Gold', subject: 'Mathematics', students: 32, schedule: 'Mon, Wed, Fri - 08:00 AM', room: 'Room 401' },
        { id: 2, name: 'Grade 4 Gold', subject: 'Science', students: 32, schedule: 'Tue, Thu - 10:00 AM', room: 'Lab A' },
        { id: 3, name: 'Grade 5 Silver', subject: 'Mathematics', students: 28, schedule: 'Mon, Wed, Fri - 11:30 AM', room: 'Room 502' },
        { id: 4, name: 'Grade 6 Bronze', subject: 'Science', students: 30, schedule: 'Tue, Thu - 01:00 PM', room: 'Lab B' }
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
            <div className="md:ml-[260px] flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Select a Class</h2>
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
                    <div>
                        <h3 className="text-2xl font-bold text-[#1F3864]">My Classes</h3>
                        <p className="text-gray-600 mt-1 text-sm font-semibold">Select a class to manage attendance, grades, and homework.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {classes.map((cls) => (
                            <button onClick={() => navigate('empty_state')} 
                                key={cls.id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-[#1F3864] hover:shadow-md transition-all group text-left flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4 w-full">
                                    <div>
                                        <h4 className="text-xl font-bold text-[#1F3864] group-hover:text-blue-800 transition-colors">{cls.name}</h4>
                                        <p className="text-sm font-bold text-gray-500 mt-1">{cls.subject}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#DCE6F1] group-hover:text-[#1F3864] transition-colors shrink-0">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#DCE6F1] text-[#1F3864] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                        <Users className="w-4 h-4" />
                                        {cls.students} Students
                                    </div>
                                    <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4" />
                                        {cls.room}
                                    </div>
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-gray-100 w-full flex items-center justify-between">
                                    <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        {cls.schedule}
                                    </p>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('teacher_roster');
                                        }}
                                        className="text-sm font-bold text-[#1F3864] hover:underline"
                                    >
                                        View Roster
                                    </button>
                                </div>
                            </button>
                        ))}
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

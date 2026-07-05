import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    FileEdit, ClipboardList, PenTool, CheckSquare, PlusCircle
} from 'lucide-react';

export default function TeacherDashboard({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'teacher_dashboard', active: true },
        { icon: Users, label: 'Classes & Subjects', path: 'teacher_classes', active: false },
        { icon: CheckSquare, label: 'Attendance', path: 'teacher_attendance', active: false },
        { icon: BookMarked, label: 'Homework', path: 'teacher_homework_list', active: false },
        { icon: FileText, label: 'Grades', path: 'teacher_grades_entry', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'teacher_announcement', active: false },
        { icon: User, label: 'Profile', path: 'teacher_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const classes = [
        { id: 1, name: 'Grade 4 Gold', subject: 'Mathematics', students: 32, schedule: 'Mon, Wed, Fri - 08:00 AM' },
        { id: 2, name: 'Grade 4 Gold', subject: 'Science', students: 32, schedule: 'Tue, Thu - 10:00 AM' },
        { id: 3, name: 'Grade 5 Silver', subject: 'Mathematics', students: 28, schedule: 'Mon, Wed, Fri - 11:30 AM' },
        { id: 4, name: 'Grade 6 Bronze', subject: 'Science', students: 30, schedule: 'Tue, Thu - 01:00 PM' }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3864] mb-4"></div>
                    <p className="text-[#1F3864] font-semibold">Loading dashboard...</p>
                </div>
            </div>
        );
    }

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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Teacher Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-8">
                    {isLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center h-[60vh]">
                            <div className="w-12 h-12 border-4 border-[#DCE6F1] border-t-[#1F3864] rounded-full animate-spin mb-4"></div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Dashboard</h2>
                            <p className="text-gray-500">Fetching your latest data...</p>
                        </div>
                    ) : (
                        <>
                    {/* Welcome Section */}
                    <div>
                        <h3 className="text-2xl font-bold text-[#1F3864]">Welcome back, Mr. Addo!</h3>
                        <p className="text-gray-600 font-semibold text-sm mt-1">Here is an overview of your classes and tasks for today.</p>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button 
                                onClick={() => navigate('teacher_attendance')}
                                className="bg-[#1F3864] text-white rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-[#162a4d] transition-colors shadow-sm"
                            >
                                <ClipboardList className="w-8 h-8" />
                                <span className="font-bold">Mark Attendance Today</span>
                            </button>
                            <button 
                                onClick={() => navigate('teacher_homework')}
                                className="bg-white border border-[#1F3864]/20 text-[#1F3864] rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-[#DCE6F1] transition-colors shadow-sm"
                            >
                                <FileEdit className="w-8 h-8" />
                                <span className="font-bold">Post Homework</span>
                            </button>
                            <button 
                                onClick={() => navigate('teacher_announcement')}
                                className="bg-white border border-[#1F3864]/20 text-[#1F3864] rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-[#DCE6F1] transition-colors shadow-sm"
                            >
                                <MessageSquare className="w-8 h-8" />
                                <span className="font-bold">Post Announcement</span>
                            </button>
                        </div>
                    </div>

                    {/* Assigned Classes */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">My Classes & Subjects</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {classes.map((cls) => (
                                <div key={cls.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-[#1F3864]/30 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h5 className="text-lg font-bold text-[#1F3864]">{cls.name}</h5>
                                            <p className="text-sm font-bold text-gray-500 mt-1">{cls.subject}</p>
                                        </div>
                                        <div className="bg-[#DCE6F1] text-[#1F3864] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            {cls.students} Students
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                                            <BookOpen className="w-4 h-4" />
                                            {cls.schedule}
                                        </p>
                                        <button onClick={() => navigate('teacher_classes')} className="text-sm font-bold text-[#1F3864] hover:underline">
                                            Manage Class
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </>
                    )}
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

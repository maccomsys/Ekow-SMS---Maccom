import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, Clock, Paperclip, CheckCircle2, AlertCircle, MessageSquare, User, FolderOpen
} from 'lucide-react';

export default function HomeworkParentView({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'parent_dashboard', active: false },
        { icon: Users, label: 'Switch Child', path: 'child_switcher', active: false },
        { icon: BookOpen, label: 'Academics', path: 'grades_parent', active: false },
        { icon: BookMarked, label: 'Homework', path: 'homework_parent', active: true },
        { icon: FileText, label: 'Attendance', path: 'attendance_parent', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'announcements_parent', active: false },
        { icon: User, label: 'Profile', path: 'parent_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { homeworkRecords } = useMockData();
    const homeworkList = homeworkRecords.map(hw => ({
        id: hw.id,
        subject: hw.subject,
        title: hw.title,
        description: hw.description,
        dueDate: hw.dueDate,
        status: hw.status === 'completed' ? 'submitted' : 'pending',
        attachment: null,
        teacher: 'Teacher'
    }));

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'late': return 'bg-amber-100 text-amber-700';
            case 'pending': return 'bg-white border-outline-variant text-[#1F3864]';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'late': return 'Due Soon / Late';
            case 'pending': return 'Pending';
            default: return 'Unknown';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-4 h-4" />;
            case 'late': return <AlertCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            default: return null;
        }
    };

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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Homework & Assignments</h2>
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
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-[#1F3864]">Kwame Mensah</h3>
                            <p className="text-gray-600 font-semibold text-sm mt-1">Grade 4 Gold - Ghana Academy</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => navigate('homework_parent')} className="px-4 py-2 bg-[#DCE6F1] text-[#1F3864] text-sm font-bold rounded-lg hover:bg-opacity-80 transition-colors">
                                View Completed
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {homeworkList.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm w-full">
                                <div className="w-16 h-16 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 text-[#1F3864]">
                                    <FolderOpen className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">No homework assignments</h2>
                                <p className="text-gray-500 mb-6">There are currently no homework assignments for this student.</p>
                            </div>
                        ) : (
                            homeworkList.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold bg-[#1F3864] text-white px-2.5 py-1 rounded">
                                                {item.subject}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-500">
                                                by {item.teacher}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-[#1F3864]">{item.title}</h4>
                                    </div>
                                    <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusStyle(item.status)}`}>
                                        {getStatusIcon(item.status)}
                                        {getStatusText(item.status)}
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                    {item.description}
                                </p>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-sm font-bold text-[#1F3864]">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        Due: {item.dueDate}
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        {item.attachment && (
                                            <button onClick={() => navigate('empty_state')} className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#1F3864] transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                                                <Paperclip className="w-4 h-4" />
                                                {item.attachment}
                                            </button>
                                        )}
                                        {item.status !== 'completed' && (
                                            <button onClick={() => navigate('homework_parent')} className="px-4 py-1.5 bg-[#1F3864] text-white text-sm font-bold rounded-lg hover:bg-[#162a4d] transition-colors active:scale-95">
                                                Mark Done
                                            </button>
                                        )}
                                    </div>
                                </div>
                                </div>
                            ))
                        )}
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

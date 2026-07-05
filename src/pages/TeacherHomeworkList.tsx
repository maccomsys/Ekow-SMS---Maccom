import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    CheckSquare, ChevronLeft, Plus, Edit2, Trash2, CheckCircle, Clock, FolderOpen
} from 'lucide-react';

export default function TeacherHomeworkList({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'teacher_dashboard', active: false },
        { icon: Users, label: 'Classes & Subjects', path: 'teacher_classes', active: false },
        { icon: CheckSquare, label: 'Attendance', path: 'teacher_attendance', active: false },
        { icon: BookMarked, label: 'Homework', path: 'teacher_homework_list', active: true },
        { icon: FileText, label: 'Grades', path: 'teacher_grades_entry', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'teacher_announcement', active: false },
        { icon: User, label: 'Profile', path: 'teacher_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { homeworkRecords, updateHomeworkStatus, deleteHomework } = useMockData();
    const homeworkList = homeworkRecords.map(hw => ({
        id: hw.id,
        title: hw.title,
        className: hw.classStr,
        subject: hw.subject,
        dueDate: hw.dueDate,
        status: hw.status,
        completed: hw.status === 'completed'
    }));

    const toggleCompletion = (id: string) => {
        const hw = homeworkRecords.find(h => h.id === id);
        if (hw) {
            updateHomeworkStatus(id, hw.status === 'completed' ? 'pending' : 'completed');
        }
    };



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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Homework Management</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-[#1F3864]">Assigned Homework</h3>
                            <p className="text-gray-600 mt-1 text-sm font-semibold">Manage your posted assignments and track completion.</p>
                        </div>
                        <button 
                            onClick={() => navigate('teacher_homework')}
                            className="px-5 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Post New Homework
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-[#1F3864] text-white">
                                        <th className="py-3 px-5 text-sm font-bold w-[35%]">Assignment Title</th>
                                        <th className="py-3 px-5 text-sm font-bold w-[20%]">Class & Subject</th>
                                        <th className="py-3 px-5 text-sm font-bold w-[15%]">Due Date</th>
                                        <th className="py-3 px-5 text-sm font-bold w-[15%] text-center">Status</th>
                                        <th className="py-3 px-5 text-sm font-bold w-[15%] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {homeworkList.map((hw, i) => (
                                        <tr key={hw.id as string} className={`border-b border-gray-100 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                            <td className="py-4 px-5">
                                                <p className="font-bold text-[#1F3864]">{hw.title}</p>
                                            </td>
                                            <td className="py-4 px-5">
                                                <p className="font-bold text-[#1F3864]">{hw.className}</p>
                                                <p className="text-xs font-semibold text-gray-500 mt-0.5">{hw.subject}</p>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    {hw.dueDate}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-center">
                                                <button 
                                                    onClick={() => toggleCompletion(hw.id as string)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                                                        hw.completed 
                                                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                                                            : 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200'
                                                    }`}
                                                >
                                                    {hw.completed ? (
                                                        <>
                                                            <CheckCircle className="w-3.5 h-3.5" />
                                                            Completed
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock className="w-3.5 h-3.5" />
                                                            Pending
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => navigate('empty_state')} 
                                                        className="p-2 text-gray-400 hover:text-[#1F3864] hover:bg-[#DCE6F1] rounded-lg transition-colors"
                                                        title="Edit Homework"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteHomework(hw.id as string)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Homework"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {homeworkList.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-0">
                                                <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center bg-white border-t border-gray-100 shadow-sm w-full">
                                                    <div className="w-16 h-16 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 text-[#1F3864]">
                                                        <FolderOpen className="w-8 h-8" />
                                                    </div>
                                                    <h2 className="text-xl font-bold text-gray-900 mb-2">No homework found</h2>
                                                    <p className="text-gray-500 mb-6">Click "Post New Homework" to create one.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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

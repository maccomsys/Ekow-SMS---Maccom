import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    CheckSquare, ChevronLeft, Upload, Send, Calendar, Clock
} from 'lucide-react';
import { useMockData } from '../store/MockDataContext';

export default function TeacherHomeworkPosting({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("class1");
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const { addHomeworkRecord } = useMockData();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        addHomeworkRecord({
            title: formData.get('title') as string || 'New Homework',
            subject: 'Mathematics', // Assuming math or whatever
            classStr: selectedClass === 'class1' ? 'Grade 4 Gold' : 'Grade 5 Silver',
            dueDate: formData.get('dueDate') as string || new Date().toISOString().split('T')[0],
            status: 'Active'
        });
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            navigate('teacher_dashboard');
        }, 1500);
    };
    
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
                            <button onClick={() => navigate('teacher_classes')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Post Homework</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full space-y-6 relative">
                    {showConfirmation && (
                        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 flex items-center gap-2 font-bold animate-fade-in-down">
                            <BookMarked className="w-5 h-5" />
                            Homework posted successfully! Returning to dashboard...
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                        <h3 className="text-xl font-bold text-[#1F3864] mb-6">Create New Assignment</h3>
                        
                        <div className="space-y-6">
                            {/* Class Selector */}
                            <div>
                                <label className="block text-sm font-bold text-[#1F3864] mb-2">Assign To Class</label>
                                <select required 
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] bg-white transition-colors cursor-pointer"
                                >
                                    <option value="class1">Grade 4 Gold - Mathematics</option>
                                    <option value="class2">Grade 4 Gold - Science</option>
                                    <option value="class3">Grade 5 Silver - Mathematics</option>
                                </select>
                            </div>

                            {/* Subject / Title */}
                            <div>
                                <label className="block text-sm font-bold text-[#1F3864] mb-2">Assignment Title</label>
                                <input 
                                    type="text" required 
                                    name="title"
                                    placeholder="e.g., Fractions Worksheet #3" 
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                  />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-[#1F3864] mb-2">Description / Instructions</label>
                                <textarea required 
                                    rows={5}
                                    placeholder="Enter instructions for the students..."
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] text-gray-700 transition-colors resize-y"
                                 ></textarea>
                            </div>

                            {/* Due Date & Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#1F3864] mb-2">Due Date</label>
                                    <div className="relative">
                                        <input 
                                            type="date" required 
                                            name="dueDate"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#1F3864] mb-2">Due Time</label>
                                    <div className="relative">
                                        <input 
                                            type="time" required 
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                          />
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* File Attachment */}
                            <div>
                                <label className="block text-sm font-bold text-[#1F3864] mb-2">Attachments (Optional)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-[#1F3864]" />
                                    </div>
                                    <p className="text-sm font-bold text-[#1F3864] mb-1">Click to upload or drag and drop</p>
                                    <p className="text-xs font-semibold text-gray-500">PDF, DOCX, JPG, PNG (Max 10MB)</p>
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-gray-100">
                            <button 
                                type="button"
                                onClick={() => navigate('teacher_homework_list')}
                                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Send className="w-4 h-4" />
                                Post Homework
                            </button>
                        </div>
                    </form>
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

import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    ArrowLeft, Save, Paperclip, CheckCircle2, X, Calculator, BookOpen, FileText
} from 'lucide-react';
import { useMockData } from '../store/MockDataContext';

export default function AdminAnnouncementForm({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [scope, setScope] = useState('School-Wide');
    const [message, setMessage] = useState('');
    const [fileAttached, setFileAttached] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Contact, label: 'Guardians', path: 'admin_parents', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: BookOpen, label: 'Subjects', path: 'admin_subjects', active: false },
        { icon: Calculator, label: 'Grades', path: 'admin_grade_oversight', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: FileText, label: 'Homework', path: 'admin_homework_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: true },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { addAnnouncementRecord } = useMockData();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            addAnnouncementRecord({
                title: title || 'New Announcement',
                content: message || 'Content',
                date: new Date().toISOString(),
                sender: 'System Admin',
                scope: scope,
                pinned: false
            });
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('admin_announcements');
            }, 1500);
        }, 1000);
    };

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans flex overflow-hidden">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 shrink-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1F3864]">SchoolLink</h1>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Admin Portal</p>
                    </div>
                    <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navItems.map((item, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                if (item.path !== '#') navigate(item.path);
                                setIsMobileMenuOpen(false);
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
            <div className="flex-1 flex flex-col h-screen md:ml-[260px]">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Announcements Management</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">Principal Mensah</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                PM
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-3xl mx-auto w-full">
                        <div className="mb-6">
                            <button 
                                onClick={() => navigate('admin_announcements')}
                                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1F3864] transition-colors mb-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Announcements
                            </button>
                            <h2 className="text-2xl font-bold text-[#1F3864]">Post New Announcement</h2>
                            <p className="text-sm text-gray-500 font-semibold mt-1">Create and distribute a new message to the school community.</p>
                        </div>

                        {isSuccess ? (
                            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                                <div>
                                    <h3 className="text-lg font-bold text-green-800">Announcement Posted Successfully</h3>
                                    <p className="text-sm text-green-600 font-semibold mt-1">Your message has been published and notifications have been sent.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 md:p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="block text-sm font-bold text-[#1F3864]">Announcement Title</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] transition-colors"
                                                placeholder="e.g. Mid-Term Break Schedule"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="block text-sm font-bold text-[#1F3864]">Target Audience (Scope)</label>
                                            <select required 
                                                value={scope}
                                                onChange={(e) => setScope(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] transition-colors appearance-none bg-white"
                                            >
                                                <option value="School-Wide">School-Wide (All Parents, Teachers, Students)</option>
                                                <option value="Grade 1 Blue">Grade 1 Blue Only</option>
                                                <option value="Grade 1 Gold">Grade 1 Gold Only</option>
                                                <option value="Grade 2 Blue">Grade 2 Blue Only</option>
                                                <option value="Grade 3 Silver">Grade 3 Silver Only</option>
                                                <option value="Grade 4 Gold">Grade 4 Gold Only</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="block text-sm font-bold text-[#1F3864]">Message Content</label>
                                            <textarea 
                                                required
                                                rows={6}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] transition-colors resize-none"
                                                placeholder="Type the full announcement details here..."
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className="block text-sm font-bold text-[#1F3864] mb-1">Attachment (Optional)</label>
                                                <p className="text-xs text-gray-500 font-semibold mb-3">Upload a PDF or Image file (max 5MB).</p>
                                            </div>
                                            {fileAttached ? (
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700">
                                                    <Paperclip className="w-4 h-4 text-gray-400" />
                                                    document.pdf
                                                    <button type="button" onClick={() => setFileAttached(false)} className="ml-2 text-gray-400 hover:text-red-500">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button 
                                                    type="button" 
                                                    onClick={() => setFileAttached(true)}
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-[#1F3864] hover:bg-gray-50 transition-colors"
                                                >
                                                    <Paperclip className="w-4 h-4" />
                                                    Add File
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => navigate('admin_announcements')}
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2.5 bg-[#1F3864] text-white rounded-lg font-bold hover:bg-[#2a4d8a] transition-colors flex items-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Posting...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Publish Announcement
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
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

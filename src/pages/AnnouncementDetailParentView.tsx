import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, ArrowLeft, Paperclip, Download, User
} from 'lucide-react';

export default function AnnouncementDetailParentView({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'parent_dashboard', active: false },
        { icon: Users, label: 'Switch Child', path: 'child_switcher', active: false },
        { icon: BookOpen, label: 'Academics', path: 'grades_parent', active: false },
        { icon: BookMarked, label: 'Homework', path: 'homework_parent', active: false },
        { icon: FileText, label: 'Attendance', path: 'attendance_parent', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'announcements_parent', active: true },
        { icon: User, label: 'Profile', path: 'parent_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { announcements } = useMockData();
    const globalAnnouncement = announcements[0]; // just grab the first one for the mock detail view
    const announcement = {
        title: globalAnnouncement.title,
        message: globalAnnouncement.content || "Details for this announcement...",
        date: globalAnnouncement.date,
        time: "10:00 AM",
        sender: globalAnnouncement.sender,
        type: globalAnnouncement.scope,
        attachments: globalAnnouncement.hasAttachment ? [
            { name: "Meeting_Agenda.pdf", size: "245 KB", type: "pdf" },
        ] : []
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Announcement Details</h2>
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
                    <button 
                        onClick={() => navigate('announcements_parent')}
                        className="flex items-center gap-2 text-gray-500 hover:text-[#1F3864] font-semibold mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Announcements
                    </button>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Detail Header */}
                        <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#1F3864] leading-tight">
                                    {announcement.title}
                                </h1>
                                <span className="text-xs font-bold uppercase tracking-wider bg-[#1F3864] text-white px-3 py-1 rounded-full shrink-0 self-start">
                                    {announcement.type}
                                </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864]">
                                        <Bell className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold text-[#1F3864]">{announcement.sender}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 font-semibold">
                                    <span>{announcement.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span>{announcement.time}</span>
                                </div>
                            </div>
                        </div>

                        {/* Message Content */}
                        <div className="p-6 md:p-8">
                            <div className="prose prose-sm md:prose-base text-gray-700 max-w-none whitespace-pre-wrap leading-relaxed">
                                {announcement.message}
                            </div>
                        </div>

                        {/* Attachments Section */}
                        {announcement.attachments && announcement.attachments.length > 0 && (
                            <div className="p-6 md:p-8 border-t border-gray-100 bg-[#F7F8FA]">
                                <h3 className="text-sm font-bold text-[#1F3864] mb-4 flex items-center gap-2">
                                    <Paperclip className="w-4 h-4" />
                                    Attachments ({announcement.attachments.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {announcement.attachments.map((attachment, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between group hover:border-[#1F3864] transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-sm font-bold text-[#1F3864] truncate group-hover:underline">{attachment.name}</p>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase">{attachment.type} • {attachment.size}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => navigate('empty_state')} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#DCE6F1] group-hover:text-[#1F3864] transition-colors shrink-0">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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

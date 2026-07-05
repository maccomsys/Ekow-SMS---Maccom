import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    FileBadge, FileEdit, Info, FolderOpen
} from 'lucide-react';

export default function NotificationsInbox({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'parent_dashboard', active: false },
        { icon: Users, label: 'Switch Child', path: 'child_switcher', active: false },
        { icon: BookOpen, label: 'Academics', path: 'grades_parent', active: false },
        { icon: BookMarked, label: 'Homework', path: 'homework_parent', active: false },
        { icon: FileText, label: 'Attendance', path: 'attendance_parent', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'announcements_parent', active: false },
        { icon: Bell, label: 'Notifications', path: 'notifications_inbox', active: true },
        { icon: User, label: 'Profile', path: 'parent_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const notifications = [
        {
            id: 1,
            type: 'grade',
            title: 'New Grade Posted',
            message: 'Kwame Mensah received a new grade (88/100) for Mid-Term Exam in Mathematics.',
            date: 'Today, 2:30 PM',
            isRead: false,
            link: 'grades_parent',
            icon: FileBadge,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-100'
        },
        {
            id: 2,
            type: 'homework',
            title: 'New Homework Assigned',
            message: 'A new assignment "Reading Comprehension" is due tomorrow for English Language.',
            date: 'Today, 10:00 AM',
            isRead: false,
            link: 'homework_parent',
            icon: FileEdit,
            iconColor: 'text-amber-600',
            iconBg: 'bg-amber-100'
        },
        {
            id: 3,
            type: 'announcement',
            title: 'Upcoming PTA Meeting',
            message: 'Reminder: The termly PTA meeting is scheduled for this Friday at 9:00 AM.',
            date: 'Yesterday, 4:15 PM',
            isRead: true,
            link: 'announcements_parent',
            icon: Info,
            iconColor: 'text-[#1F3864]',
            iconBg: 'bg-[#DCE6F1]'
        },
        {
            id: 4,
            type: 'attendance',
            title: 'Absence Notice',
            message: 'Kwame Mensah was marked absent on Thursday, Oct 10, 2024.',
            date: 'Oct 10, 2024',
            isRead: true,
            link: 'attendance_parent',
            icon: FileText,
            iconColor: 'text-red-600',
            iconBg: 'bg-red-100'
        }
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Inbox & Notifications</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-[#1F3864]">Notifications</h3>
                            <p className="text-gray-600 mt-1 text-sm font-semibold">Stay updated on your child's progress and school activities.</p>
                        </div>
                        <button onClick={() => navigate('notifications_inbox')} className="text-sm font-bold text-[#1F3864] hover:underline hidden sm:block">
                            Mark all as read
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {notifications.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 text-[#1F3864]">
                                    <FolderOpen className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">No notifications</h2>
                                <p className="text-gray-500 mb-6">You're all caught up! Check back later.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {notifications.map((notification) => (
                                    <button
                                        key={notification.id}
                                        onClick={() => navigate(notification.link)}
                                    className={`w-full text-left p-4 sm:p-6 hover:bg-gray-50 transition-colors flex items-start gap-4 ${
                                        !notification.isRead ? 'bg-[#F7F8FA]' : ''
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.iconBg} ${notification.iconColor}`}>
                                        <notification.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1">
                                            <h4 className={`text-base truncate ${!notification.isRead ? 'font-bold text-[#1F3864]' : 'font-semibold text-gray-700'}`}>
                                                {notification.title}
                                            </h4>
                                            <span className="text-xs font-semibold text-gray-500 shrink-0">
                                                {notification.date}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${!notification.isRead ? 'font-semibold text-gray-700' : 'text-gray-600'}`}>
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.isRead && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#1F3864] shrink-0 mt-2"></div>
                                    )}
                                </button>
                            ))}
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

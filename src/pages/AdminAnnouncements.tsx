import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    Search, BookOpen, Trash2, Edit2, Pin, Paperclip, Plus, Filter,
    CheckCircle2, Clock, AlertCircle, Calculator, FileText, Globe, FolderOpen
} from 'lucide-react';

export default function AdminAnnouncements({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedScope, setSelectedScope] = useState("All Scopes");
    const [searchQuery, setSearchQuery] = useState("");

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

    const { announcements: announcementsData, deleteAnnouncement, toggleAnnouncementPin } = useMockData();

    const filteredAnnouncements = announcementsData.filter(ann => {
        const matchesScope = selectedScope === "All Scopes" || ann.scope === selectedScope || (selectedScope === "School-Wide" && ann.scope === "School-Wide") || (selectedScope === "Class-Specific" && ann.scope !== "School-Wide");
        const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              ann.sender.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesScope && matchesSearch;
    }).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    const removeAnnouncement = (id: string) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            deleteAnnouncement(id);
        }
    };

    const togglePin = (id: string) => {
        toggleAnnouncementPin(id);
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
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1F3864] mb-1">School Announcements</h2>
                                <p className="text-sm text-gray-500 font-semibold">Manage school-wide and class-specific announcements and alerts.</p>
                            </div>
                            <button 
                                onClick={() => navigate('admin_announcement_form')}
                                className="flex items-center gap-2 px-4 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#2a4d8a] transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Post New Announcement
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <div className="relative w-full sm:w-48">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <select
                                        value={selectedScope}
                                        onChange={(e) => setSelectedScope(e.target.value)}
                                        className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                                    >
                                        <option value="All Scopes">All Scopes</option>
                                        <option value="School-Wide">School-Wide</option>
                                        <option value="Class-Specific">Class-Specific</option>
                                    </select>
                                </div>
                            </div>

                            <div className="relative w-full md:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    defaultValue="Kofi" placeholder="Search title or sender..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864]"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[900px]">
                                    <thead>
                                        <tr className="bg-[#1F3864] text-white">
                                            <th className="py-3 px-5 text-sm font-bold w-12"></th>
                                            <th className="py-3 px-5 text-sm font-bold">Title & Scope</th>
                                            <th className="py-3 px-5 text-sm font-bold">Sender</th>
                                            <th className="py-3 px-5 text-sm font-bold">Date Posted</th>
                                            <th className="py-3 px-5 text-sm font-bold text-center">Attachment</th>
                                            <th className="py-3 px-5 text-sm font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredAnnouncements.map((ann, i) => (
                                            <tr key={ann.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                <td className="py-4 px-5 text-center">
                                                    <button 
                                                        onClick={() => togglePin(ann.id)}
                                                        className={`p-1.5 rounded-full transition-colors ${ann.pinned ? 'text-[#1F3864] bg-[#DCE6F1]' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                                        title={ann.pinned ? "Unpin Announcement" : "Pin Announcement"}
                                                    >
                                                        <Pin className={`w-4 h-4 ${ann.pinned ? 'fill-current' : ''}`} />
                                                    </button>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <div className="font-bold text-[#1F3864]">{ann.title}</div>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        {ann.scope === 'School-Wide' ? (
                                                            <Globe className="w-3 h-3 text-blue-500" />
                                                        ) : (
                                                            <Building2 className="w-3 h-3 text-indigo-500" />
                                                        )}
                                                        <span className="text-xs font-semibold text-gray-500">{ann.scope}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5 font-semibold text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-[10px]">
                                                            {ann.sender.replace(/Mr\.\s|Mrs\.\s|Dr\.\s|Ms\.\s/g, '').split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                        </div>
                                                        {ann.sender}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5 font-semibold text-gray-600">
                                                    {ann.date}
                                                </td>
                                                <td className="py-4 px-5 text-center">
                                                    {ann.hasAttachment ? (
                                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600">
                                                            <Paperclip className="w-4 h-4" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => navigate('admin_announcement_form')}
                                                            className="p-1.5 text-gray-500 hover:text-[#1F3864] hover:bg-[#DCE6F1] rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => removeAnnouncement(ann.id)}
                                                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredAnnouncements.length === 0 && (
                                <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center bg-white rounded-xl border-t border-gray-100 shadow-sm">
                                    <div className="w-16 h-16 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 text-[#1F3864]">
                                        <FolderOpen className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">No announcements found</h2>
                                    <p className="text-gray-500 mb-6">There are currently no announcements matching your criteria.</p>
                                </div>
                            )}
                            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500 font-semibold">
                                Showing {filteredAnnouncements.length} announcements
                            </div>
                        </div>
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

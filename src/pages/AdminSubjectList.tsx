import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    Search, Filter, Plus, MoreVertical, BookOpen
} from 'lucide-react';

export default function AdminSubjectList({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Contact, label: 'Guardians', path: 'admin_parents', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: BookOpen, label: 'Subjects', path: 'admin_subjects', active: true },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const subjectData = [
        { id: 1, name: 'Mathematics', code: 'MAT101', type: 'Core', classes: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
        { id: 2, name: 'English Language', code: 'ENG101', type: 'Core', classes: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
        { id: 3, name: 'Integrated Science', code: 'SCI101', type: 'Core', classes: ['Grade 4', 'Grade 5', 'Grade 6'] },
        { id: 4, name: 'Social Studies', code: 'SST101', type: 'Core', classes: ['Grade 4', 'Grade 5', 'Grade 6'] },
        { id: 5, name: 'Information and Communication Technology', code: 'ICT101', type: 'Elective', classes: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
        { id: 6, name: 'Religious and Moral Education', code: 'RME101', type: 'Core', classes: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
        { id: 7, name: 'Ghanaian Language', code: 'GH101', type: 'Elective', classes: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
        { id: 8, name: 'French', code: 'FRE101', type: 'Elective', classes: ['Grade 4', 'Grade 5', 'Grade 6'] },
    ];

    const filteredSubjects = subjectData.filter(sub => {
        return sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               sub.code.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
            <div className="md:ml-[260px] flex flex-col min-h-screen pb-20 md:pb-0">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Subject Management</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
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
                <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F3864] mb-1">Subjects</h2>
                            <p className="text-sm text-gray-500 font-semibold">Manage academic subjects and curriculum assignments.</p>
                        </div>
                        <button 
                            onClick={() => navigate('admin_subject_form')}
                            className="w-full sm:w-auto bg-[#1F3864] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#2a4d8a] transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Subject
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold transition-colors"
                                defaultValue="Kofi" placeholder="Search subjects by name or code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-[#1F3864] text-white">
                                        <th className="py-3 px-5 text-sm font-bold w-16">ID</th>
                                        <th className="py-3 px-5 text-sm font-bold">Subject Code</th>
                                        <th className="py-3 px-5 text-sm font-bold">Subject Name</th>
                                        <th className="py-3 px-5 text-sm font-bold">Type</th>
                                        <th className="py-3 px-5 text-sm font-bold">Applicable Classes</th>
                                        <th className="py-3 px-5 text-sm font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {filteredSubjects.map((sub, i) => (
                                        <tr key={sub.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                            <td className="py-4 px-5 font-bold text-gray-500">S{String(sub.id).padStart(3, '0')}</td>
                                            <td className="py-4 px-5 font-bold text-[#1F3864]">
                                                {sub.code}
                                            </td>
                                            <td className="py-4 px-5 font-bold text-[#1F3864]">
                                                <div className="hover:underline cursor-pointer">{sub.name}</div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                    sub.type === 'Core' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {sub.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {sub.classes.map((cls, idx) => (
                                                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs border border-gray-200 font-semibold whitespace-nowrap">
                                                            {cls}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <button onClick={() => navigate('empty_state')} className="p-2 text-gray-400 hover:text-[#1F3864] hover:bg-[#DCE6F1] rounded-lg transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredSubjects.length === 0 && (
                            <div className="p-8 text-center text-gray-500 font-semibold">
                                No subjects found matching your search.
                            </div>
                        )}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500 font-semibold">
                            Showing {filteredSubjects.length} of {subjectData.length} subjects
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

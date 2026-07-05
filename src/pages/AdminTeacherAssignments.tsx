import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    BookOpen, Search, AlertCircle, UserPlus
} from 'lucide-react';

export default function AdminTeacherAssignments({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: true },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Contact, label: 'Guardians', path: 'admin_parents', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: BookOpen, label: 'Subjects', path: 'admin_subjects', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const subjects = ['Mathematics', 'English', 'Science', 'Soc. Studies', 'ICT', 'French'];
    
    const classesData = [
        { 
            id: 1, 
            name: 'Grade 1 Blue',
            assignments: {
                'Mathematics': 'Mrs. Sarah Osei',
                'English': 'Mrs. Sarah Osei',
                'Science': 'Mr. John Amoah',
                'Soc. Studies': null,
                'ICT': 'Mr. David Mensah',
                'French': null
            }
        },
        { 
            id: 2, 
            name: 'Grade 1 Gold',
            assignments: {
                'Mathematics': 'Mr. John Amoah',
                'English': 'Mrs. Sarah Osei',
                'Science': 'Mr. John Amoah',
                'Soc. Studies': 'Ms. Grace Addo',
                'ICT': null,
                'French': null
            }
        },
        { 
            id: 3, 
            name: 'Grade 2 Blue',
            assignments: {
                'Mathematics': 'Ms. Grace Addo',
                'English': 'Ms. Grace Addo',
                'Science': 'Mr. Daniel Appiah',
                'Soc. Studies': 'Ms. Grace Addo',
                'ICT': 'Mr. David Mensah',
                'French': 'Mr. Paul Kumi'
            }
        },
        { 
            id: 4, 
            name: 'Grade 3 Silver',
            assignments: {
                'Mathematics': 'Mrs. Mary Boakye',
                'English': 'Mrs. Mary Boakye',
                'Science': 'Mr. Daniel Appiah',
                'Soc. Studies': 'Mrs. Mary Boakye',
                'ICT': 'Mr. David Mensah',
                'French': 'Mr. Paul Kumi'
            }
        },
        { 
            id: 5, 
            name: 'Grade 4 Gold',
            assignments: {
                'Mathematics': 'Mr. David Mensah',
                'English': 'Mrs. Linda Nsiah',
                'Science': 'Mr. Daniel Appiah',
                'Soc. Studies': 'Mrs. Mary Boakye',
                'ICT': 'Mr. David Mensah',
                'French': 'Mr. Paul Kumi'
            }
        }
    ];

    const filteredClasses = classesData.filter(cls => 
        cls.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Teacher Assignments</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F3864] mb-1">Class-Subject Assignments</h2>
                            <p className="text-sm text-gray-500 font-semibold">Assign teachers to classes and subjects. Unassigned subjects are highlighted.</p>
                        </div>
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
                                defaultValue="Kofi" placeholder="Search classes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Matrix Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#1F3864] text-white">
                                        <th className="py-4 px-5 text-sm font-bold whitespace-nowrap min-w-[150px] sticky left-0 bg-[#1F3864] z-10 shadow-[1px_0_0_0_#e5e7eb]">
                                            Class
                                        </th>
                                        {subjects.map(subject => (
                                            <th key={subject} className="py-4 px-5 text-sm font-bold whitespace-nowrap min-w-[180px]">
                                                {subject}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {filteredClasses.map((cls, i) => (
                                        <tr key={cls.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                            <td className={`py-4 px-5 font-bold text-[#1F3864] whitespace-nowrap sticky left-0 z-10 shadow-[1px_0_0_0_#e5e7eb] ${i % 2 !== 0 ? 'bg-[#f4f7fa]' : 'bg-white'}`}>
                                                {cls.name}
                                            </td>
                                            {subjects.map(subject => {
                                                const teacher = cls.assignments[subject as keyof typeof cls.assignments];
                                                return (
                                                    <td key={subject} className="py-4 px-5">
                                                        {teacher ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-[10px] shrink-0">
                                                                    {teacher.replace(/Mr\.\s|Mrs\.\s|Dr\.\s|Ms\.\s/g, '').split(' ').map(n => n[0]).join('').substring(0, 2).replace('.', '')}
                                                                </div>
                                                                <span className="font-semibold text-gray-700 whitespace-nowrap">{teacher}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-2 group cursor-pointer hover:bg-amber-100 transition-colors">
                                                                <div className="flex items-center gap-1.5 text-amber-700">
                                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                                    <span className="font-bold text-xs whitespace-nowrap">Unassigned</span>
                                                                </div>
                                                                <UserPlus className="w-4 h-4 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredClasses.length === 0 && (
                            <div className="p-8 text-center text-gray-500 font-semibold">
                                No classes found matching your search.
                            </div>
                        )}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500 font-semibold">
                            Showing {filteredClasses.length} classes
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

import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    Search, BookOpen, Trash2, FileText, CheckCircle2, Clock, AlertCircle,
    Calculator
} from 'lucide-react';

export default function AdminHomeworkOversight({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("All Classes");
    const [selectedSubject, setSelectedSubject] = useState("All Subjects");
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
        { icon: FileText, label: 'Homework', path: 'admin_homework_oversight', active: true },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { homeworkRecords, deleteHomework } = useMockData();
    const homeworkData = homeworkRecords.map(hw => ({
        id: hw.id, title: hw.title, class: hw.classStr, subject: hw.subject, 
        teacher: 'Mrs. Sarah Osei', postedDate: '2024-10-15', dueDate: hw.dueDate, status: hw.status
    }));

    const filteredHomework = homeworkData.filter(hw => {
        const matchesClass = selectedClass === "All Classes" || hw.class === selectedClass;
        const matchesSubject = selectedSubject === "All Subjects" || hw.subject === selectedSubject;
        const matchesSearch = hw.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              hw.teacher.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesClass && matchesSubject && matchesSearch;
    });

    const removeHomework = (id: string) => {
        if (window.confirm('Are you sure you want to remove this homework assignment?')) {
            deleteHomework(id);
        }
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Homework Oversight</h2>
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
                                <h2 className="text-2xl font-bold text-[#1F3864] mb-1">School-wide Homework Tracking</h2>
                                <p className="text-sm text-gray-500 font-semibold">Monitor assignments posted by teachers across all classes and subjects.</p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <div className="relative w-full sm:w-48">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building2 className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                                    >
                                        <option value="All Classes">All Classes</option>
                                        <option value="Grade 1 Blue">Grade 1 Blue</option>
                                        <option value="Grade 1 Gold">Grade 1 Gold</option>
                                        <option value="Grade 2 Blue">Grade 2 Blue</option>
                                        <option value="Grade 3 Silver">Grade 3 Silver</option>
                                        <option value="Grade 4 Gold">Grade 4 Gold</option>
                                    </select>
                                </div>
                                <div className="relative w-full sm:w-48">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BookOpen className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <select
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                                    >
                                        <option value="All Subjects">All Subjects</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="English">English</option>
                                        <option value="Science">Science</option>
                                        <option value="Soc. Studies">Soc. Studies</option>
                                        <option value="French">French</option>
                                        <option value="ICT">ICT</option>
                                    </select>
                                </div>
                            </div>

                            <div className="relative w-full md:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    defaultValue="Kofi" placeholder="Search title or teacher..."
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
                                            <th className="py-3 px-5 text-sm font-bold w-20">ID</th>
                                            <th className="py-3 px-5 text-sm font-bold">Title</th>
                                            <th className="py-3 px-5 text-sm font-bold">Class & Subject</th>
                                            <th className="py-3 px-5 text-sm font-bold">Teacher</th>
                                            <th className="py-3 px-5 text-sm font-bold">Due Date</th>
                                            <th className="py-3 px-5 text-sm font-bold">Status</th>
                                            <th className="py-3 px-5 text-sm font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredHomework.map((hw, i) => (
                                            <tr key={hw.id as string} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                <td className="py-4 px-5 font-bold text-gray-500">{hw.id}</td>
                                                <td className="py-4 px-5 font-bold text-[#1F3864]">{hw.title}</td>
                                                <td className="py-4 px-5">
                                                    <div className="font-bold text-[#1F3864]">{hw.class}</div>
                                                    <div className="text-xs font-semibold text-gray-500">{hw.subject}</div>
                                                </td>
                                                <td className="py-4 px-5 font-semibold text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-[10px]">
                                                            {hw.teacher.replace(/Mr\.\s|Mrs\.\s|Dr\.\s|Ms\.\s/g, '').split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                        </div>
                                                        {hw.teacher}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5 font-semibold text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <CalendarCheck className="w-4 h-4 text-gray-400" />
                                                        {hw.dueDate}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${
                                                        hw.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                        hw.status === 'Active' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                                        'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                        {hw.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                                                        {hw.status === 'Active' && <Clock className="w-3 h-3" />}
                                                        {hw.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                                                        {hw.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <button 
                                                        onClick={() => removeHomework(hw.id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredHomework.length === 0 && (
                                <div className="p-8 text-center text-gray-500 font-semibold">
                                    No homework assignments found matching your criteria.
                                </div>
                            )}
                            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500 font-semibold">
                                Showing {filteredHomework.length} assignments
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

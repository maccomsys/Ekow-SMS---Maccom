import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, FileX, MessageSquare, Settings,
    Search, Plus, Filter, MoreVertical, CheckCircle, XCircle, FolderOpen
} from 'lucide-react';

export default function AdminStudentList({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [classFilter, setClassFilter] = useState("All");
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: true },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { students } = useMockData();
    const studentData = students.map(s => ({
        id: s.id,
        name: s.name,
        rollNumber: s.rollNumber,
        className: s.className || 'Grade 4 Gold',
        guardian: s.guardianName,
        status: 'Active'
    }));

    const filteredStudents = studentData.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              student.rollNumber.includes(searchQuery) ||
                              student.guardian.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesClass = classFilter === "All" || student.className === classFilter;
        return matchesSearch && matchesClass;
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Student Records</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">Principal Mensah</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                PM
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-[#1F3864]">All Students</h3>
                            <p className="text-gray-600 mt-1 text-sm font-semibold">Manage student records and information.</p>
                        </div>
                        
                        <button 
                            onClick={() => navigate('admin_student_form')}
                            className="px-5 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Student
                        </button>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold transition-colors"
                                defaultValue="Kofi" placeholder="Search by name, ID, or guardian..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Filter className="h-4 w-4 text-gray-400" />
                            </div>
                            <select
                                value={classFilter}
                                onChange={(e) => setClassFilter(e.target.value)}
                                className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                            >
                                <option value="All">All Classes</option>
                                <option value="Grade 4 Gold">Grade 4 Gold</option>
                                <option value="Grade 5 Silver">Grade 5 Silver</option>
                                <option value="Grade 6 Bronze">Grade 6 Bronze</option>
                            </select>
                        </div>
                    </div>

                    {/* Roster Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-[#1F3864] text-white">
                                        <th className="py-3 px-5 text-sm font-bold w-20">ID</th>
                                        <th className="py-3 px-5 text-sm font-bold">Student Name</th>
                                        <th className="py-3 px-5 text-sm font-bold">Class</th>
                                        <th className="py-3 px-5 text-sm font-bold">Guardian(s)</th>
                                        <th className="py-3 px-5 text-sm font-bold text-center">Status</th>
                                        <th className="py-3 px-5 text-sm font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {filteredStudents.map((student, i) => (
                                        <tr key={student.id as string} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                            <td className="py-4 px-5 font-bold text-gray-500">{student.rollNumber}</td>
                                            <td className="py-4 px-5 font-bold text-[#1F3864]">
                                                <div 
                                                    className="flex items-center gap-3 cursor-pointer hover:underline"
                                                    onClick={() => navigate('admin_student_detail')}
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-xs shrink-0">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className="font-semibold text-[#1F3864]">{student.className}</span>
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className="font-semibold text-gray-700">{student.guardian}</span>
                                            </td>
                                            <td className="py-4 px-5 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                    student.status === 'Active' 
                                                        ? 'bg-green-100 text-green-700 border-green-200' 
                                                        : 'bg-red-100 text-red-700 border-red-200'
                                                }`}>
                                                    {student.status === 'Active' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                                    {student.status}
                                                </span>
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
                        {filteredStudents.length === 0 && (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center bg-white rounded-xl border-t border-gray-100 shadow-sm">
                                <div className="w-16 h-16 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 text-[#1F3864]">
                                    <FolderOpen className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">No students found</h2>
                                <p className="text-gray-500 mb-6">There are currently no students matching your filters.</p>
                            </div>
                        )}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500 font-semibold">
                            Showing {filteredStudents.length} of {studentData.length} students
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

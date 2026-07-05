import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    Search, Filter, BookOpen, Edit2, History, X, Check, FileText,
    Calculator, AlertCircle
} from 'lucide-react';

export default function AdminGradeOversight({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("Grade 1 Blue");
    const [selectedTerm, setSelectedTerm] = useState("Term 1");
    const [selectedSubject, setSelectedSubject] = useState("Mathematics");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAuditPanelOpen, setIsAuditPanelOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Contact, label: 'Guardians', path: 'admin_parents', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: BookOpen, label: 'Subjects', path: 'admin_subjects', active: false },
        { icon: Calculator, label: 'Grades', path: 'admin_grade_oversight', active: true },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { gradeRecords, students } = useMockData();
    
    // Compute gradesData by matching students with gradeRecords for the selected subject
    const gradesData = students.map(s => {
        const record = gradeRecords.find(g => g.studentId === s.id && g.subject === selectedSubject);
        return {
            id: s.id,
            name: s.name,
            score: record ? parseInt(record.overallScore) : null,
            grade: record ? record.grade : '-',
            status: record ? 'Completed' : 'Pending',
            notes: record?.comment || ''
        };
    });

    const auditTrail = [
        { id: 1, date: 'Oct 20, 2023 10:30 AM', user: 'Principal Mensah', action: 'Changed Kwame Mensah score from 75 to 85', reason: 'Re-evaluated essay question' },
        { id: 2, date: 'Oct 19, 2023 02:15 PM', user: 'Mrs. Sarah Osei', action: 'Changed Ama Asare status to Completed (Score: 78)', reason: 'Late submission graded' },
        { id: 3, date: 'Oct 18, 2023 09:00 AM', user: 'Principal Mensah', action: 'Changed Akua Addo score from 50 to 45', reason: 'Data entry correction' },
    ];

    const filteredStudents = gradesData.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <X className="w-6 h-6" />
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
            <div className={`flex-1 flex flex-col h-screen md:ml-[260px] transition-all duration-300 ${isAuditPanelOpen ? 'mr-0 lg:mr-[360px]' : 'mr-0'}`}>
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Grade Oversight</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsAuditPanelOpen(!isAuditPanelOpen)}
                            className={`p-2 rounded-full transition-colors relative ${isAuditPanelOpen ? 'bg-[#1F3864] text-white' : 'text-gray-500 hover:bg-[#DCE6F1]'}`}
                            title="Audit Trail"
                        >
                            <History className="w-5 h-5" />
                        </button>
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
                                <h2 className="text-2xl font-bold text-[#1F3864] mb-1">Academic Grades & Corrections</h2>
                                <p className="text-sm text-gray-500 font-semibold">Review student scores and manage grade corrections.</p>
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
                                        <option value="Grade 1 Blue">Grade 1 Blue</option>
                                        <option value="Grade 1 Gold">Grade 1 Gold</option>
                                        <option value="Grade 2 Blue">Grade 2 Blue</option>
                                        <option value="Grade 3 Silver">Grade 3 Silver</option>
                                    </select>
                                </div>
                                <div className="relative w-full sm:w-40">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CalendarCheck className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <select
                                        value={selectedTerm}
                                        onChange={(e) => setSelectedTerm(e.target.value)}
                                        className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                                    >
                                        <option value="Term 1">Term 1</option>
                                        <option value="Term 2">Term 2</option>
                                        <option value="Term 3">Term 3</option>
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
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="English">English</option>
                                        <option value="Science">Science</option>
                                        <option value="French">French</option>
                                    </select>
                                </div>
                            </div>

                            <div className="relative w-full md:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    defaultValue="Kofi" placeholder="Search student..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864]"
                                />
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Total Class</p>
                                    <p className="text-xl font-bold text-[#1F3864]">24</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                    <Check className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Graded</p>
                                    <p className="text-xl font-bold text-[#1F3864]">22</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                                    <p className="text-xl font-bold text-[#1F3864]">2</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Class Avg</p>
                                    <p className="text-xl font-bold text-[#1F3864]">75.5</p>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-[#1F3864] text-white">
                                            <th className="py-3 px-5 text-sm font-bold w-20">ID</th>
                                            <th className="py-3 px-5 text-sm font-bold">Student Name</th>
                                            <th className="py-3 px-5 text-sm font-bold">Score</th>
                                            <th className="py-3 px-5 text-sm font-bold">Grade</th>
                                            <th className="py-3 px-5 text-sm font-bold">Status</th>
                                            <th className="py-3 px-5 text-sm font-bold">Notes</th>
                                            <th className="py-3 px-5 text-sm font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredStudents.map((student, i) => (
                                            <tr key={student.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                <td className="py-4 px-5 font-bold text-gray-500">{student.id}</td>
                                                <td className="py-4 px-5 font-bold text-[#1F3864]">{student.name}</td>
                                                <td className="py-4 px-5 font-bold text-[#1F3864]">
                                                    {student.score !== null ? student.score : '-'}
                                                </td>
                                                <td className="py-4 px-5 font-bold text-gray-600">{student.grade}</td>
                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                                                        student.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                        'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                        {student.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 font-semibold text-gray-500">{student.notes || '-'}</td>
                                                <td className="py-4 px-5 text-right">
                                                    <button onClick={() => navigate('empty_state')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-[#1F3864] bg-[#DCE6F1]/50 hover:bg-[#DCE6F1] rounded-lg transition-colors">
                                                        <Edit2 className="w-4 h-4" />
                                                        Correct Score
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredStudents.length === 0 && (
                                <div className="p-8 text-center text-gray-500 font-semibold">
                                    No students found matching your search.
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Right Audit Trail Panel */}
            <div className={`fixed inset-y-0 right-0 w-[360px] bg-white border-l border-gray-200 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${isAuditPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#F7F8FA]">
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-[#1F3864]" />
                        <h3 className="font-bold text-[#1F3864] text-lg">Correction History</h3>
                    </div>
                    <button 
                        onClick={() => setIsAuditPanelOpen(false)}
                        className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5">
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                        
                        {auditTrail.map((log, index) => (
                            <div key={log.id} className="relative flex items-start gap-4">
                                <div className="absolute left-5 -ml-1.5 mt-1.5 w-3 h-3 bg-white border-2 border-[#1F3864] rounded-full z-10 md:left-1/2 md:-ml-1.5"></div>
                                <div className="ml-8 md:ml-0 flex-1 w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-xs font-bold text-gray-500">{log.date}</p>
                                    </div>
                                    <p className="font-bold text-[#1F3864] text-sm mb-1">{log.action}</p>
                                    <p className="text-xs text-gray-500 font-semibold mb-3">"{log.reason}"</p>
                                    <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-50">
                                        <div className="w-5 h-5 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-[8px]">
                                            {log.user.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        <span className="text-xs font-bold text-gray-600">{log.user}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <button onClick={() => navigate('empty_state')} className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 text-sm shadow-sm">
                        <FileText className="w-4 h-4" />
                        Download Full Audit Log
                    </button>
                </div>
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

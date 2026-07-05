import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, FileX, MessageSquare, Settings,
    ChevronLeft, Edit2, User, Phone, Mail, Home, BookOpen,
    Key, Copy, CheckCircle, TrendingUp
} from 'lucide-react';
import { useMockData } from '../store/MockDataContext';

export default function AdminStudentDetail({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);
    
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

    const { students, attendanceRecords, gradeRecords } = useMockData();
    const globalStudent = students.find(s => s.id === 'STU001') || students[0];

    const student = {
        name: globalStudent.name,
        id: globalStudent.rollNumber,
        dob: "12 May 2014",
        currentClass: "Grade 4 Gold",
        status: "Active",
        enrollmentDate: "05 Sep 2021"
    };

    const studentAttendance = attendanceRecords.filter(r => r.studentId === globalStudent.id);
    const presentCount = studentAttendance.filter(r => r.status === 'present').length;
    const attendancePercentage = studentAttendance.length > 0 ? Math.round((presentCount / studentAttendance.length) * 100) : 0;

    const studentGrades = gradeRecords.filter(r => r.studentId === globalStudent.id);
    const validScores = studentGrades.map(g => parseInt(g.overallScore)).filter(n => !isNaN(n));
    const averageScore = validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;

    const guardians = [
        { name: "Mr. Kwame Appiah", relation: "Father", phone: "024 123 4567", email: "k.appiah@example.com" },
        { name: "Mrs. Sarah Appiah", relation: "Mother", phone: "020 987 6543", email: "s.appiah@example.com" }
    ];

    const classHistory = [
        { year: "2023/2024", term: "Term 1", className: "Grade 4 Gold", teacher: "Mr. Michael Addo" },
        { year: "2022/2023", term: "Term 3", className: "Grade 3 Blue", teacher: "Mrs. Grace Cudjoe" },
        { year: "2022/2023", term: "Term 2", className: "Grade 3 Blue", teacher: "Mrs. Grace Cudjoe" },
    ];

    const handleCopyCode = () => {
        // In a real app, copy to clipboard here
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
    };

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
                        <div className="flex items-center gap-3 hidden sm:flex">
                            <button onClick={() => navigate('admin_students')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Student Details</h2>
                        </div>
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
                <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
                    {/* Header Card */}
                    <div className="bg-[#1F3864] rounded-xl p-6 md:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30 shrink-0">
                                AA
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                                    {student.name}
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-500/30">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Active
                                    </span>
                                </h3>
                                <p className="text-blue-200 font-semibold mb-1">Roll Number: {student.id} &bull; Enrolled: {student.enrollmentDate}</p>
                                <p className="text-white font-bold text-sm bg-white/10 inline-block px-3 py-1 rounded-md mt-1">{student.currentClass}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate('admin_student_form')}
                            className="px-5 py-2.5 bg-white text-[#1F3864] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Personal Details */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                    <User className="w-5 h-5 text-gray-400" />
                                    Personal Details
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Date of Birth</p>
                                        <p className="font-semibold text-[#1F3864] mt-0.5">{student.dob}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Residential Address</p>
                                        <p className="font-semibold text-[#1F3864] mt-0.5">House No. 123, East Legon, Accra</p>
                                    </div>
                                </div>
                            </div>

                            {/* Linkage Code Generator */}
                            <div className="bg-gradient-to-br from-[#1F3864] to-[#2a4d8a] rounded-xl border border-[#1F3864]/20 shadow-sm p-6 text-white">
                                <h4 className="text-lg font-bold flex items-center gap-2 mb-2">
                                    <Key className="w-5 h-5 text-blue-300" />
                                    Parent Linkage Code
                                </h4>
                                <p className="text-sm text-blue-100 font-semibold mb-4 leading-relaxed">
                                    Share this secure code with the student's parents to allow them to link their account.
                                </p>
                                <div className="bg-white/10 border border-white/20 rounded-lg p-3 flex items-center justify-between backdrop-blur-sm">
                                    <span className="font-mono text-2xl font-bold tracking-widest text-white">X79-K4M</span>
                                    <button 
                                        onClick={handleCopyCode}
                                        className="p-2 bg-white text-[#1F3864] rounded-md hover:bg-gray-100 transition-colors"
                                        title="Copy Code"
                                    >
                                        {codeCopied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                                <button onClick={() => navigate('admin_student_detail')} className="w-full mt-4 py-2 text-sm font-bold bg-transparent border border-white/30 rounded-lg hover:bg-white/10 transition-colors">
                                    Generate New Code
                                </button>
                            </div>
                        </div>

                        {/* Middle/Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Performance Summaries */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                    <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                        <CalendarCheck className="w-5 h-5 text-gray-400" />
                                        Attendance (Term 1)
                                    </h4>
                                    <div className="flex items-end gap-3 mb-2">
                                        <span className="text-4xl font-bold text-[#1F3864]">{attendancePercentage}%</span>
                                        <span className="text-sm font-bold text-green-600 flex items-center gap-1 mb-1">
                                            <TrendingUp className="w-4 h-4" /> Good
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4 overflow-hidden">
                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${attendancePercentage}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-gray-500">
                                        <span>Present: {presentCount} days</span>
                                        <span>Absent: {studentAttendance.length - presentCount} days</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                    <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                        <BookOpen className="w-5 h-5 text-gray-400" />
                                        Grade Summary (Term 1)
                                    </h4>
                                    <div className="flex items-end gap-3 mb-4">
                                        <span className="text-4xl font-bold text-[#1F3864]">{averageScore}%</span>
                                        <span className="text-sm font-bold text-gray-500 mb-1">Average Score</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-600">Mathematics</span>
                                            <span className="font-bold text-[#1F3864]">92%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-600">English</span>
                                            <span className="font-bold text-[#1F3864]">85%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-600">Science</span>
                                            <span className="font-bold text-[#1F3864]">89%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Linked Guardians */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                    <Users className="w-5 h-5 text-gray-400" />
                                    Linked Guardians
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {guardians.map((guardian, i) => (
                                        <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-[#1F3864] transition-colors">
                                            <p className="font-bold text-[#1F3864]">{guardian.name}</p>
                                            <p className="text-xs font-bold text-gray-500 uppercase mt-0.5 mb-3">{guardian.relation}</p>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    {guardian.phone}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    {guardian.email}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Class History */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-gray-400" />
                                        Class History
                                    </h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 text-gray-500">
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Academic Year</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Term</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Class</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Class Teacher</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {classHistory.map((history, i) => (
                                                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 font-bold text-[#1F3864]">{history.year}</td>
                                                    <td className="py-4 px-6 font-semibold text-gray-600">{history.term}</td>
                                                    <td className="py-4 px-6 font-bold text-[#1F3864]">{history.className}</td>
                                                    <td className="py-4 px-6 font-semibold text-gray-600">{history.teacher}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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

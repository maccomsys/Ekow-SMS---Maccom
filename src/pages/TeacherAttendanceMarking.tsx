import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    CheckSquare, ChevronLeft, Calendar, Search, CheckCircle2, XCircle, Clock
} from 'lucide-react';

export default function TeacherAttendanceMarking({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            navigate('teacher_dashboard');
        }, 1500);
    };
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'teacher_dashboard', active: false },
        { icon: Users, label: 'Classes & Subjects', path: 'teacher_classes', active: false },
        { icon: CheckSquare, label: 'Attendance', path: 'teacher_attendance', active: true },
        { icon: BookMarked, label: 'Homework', path: 'teacher_homework_list', active: false },
        { icon: FileText, label: 'Grades', path: 'teacher_grades_entry', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'teacher_announcement', active: false },
        { icon: User, label: 'Profile', path: 'teacher_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { students, attendanceRecords, updateAttendanceStatus, addAttendanceRecord } = useMockData();
    const today = new Date().toISOString().split('T')[0];

    const studentData = students.map(s => {
        const record = attendanceRecords.find(r => r.studentId === s.id && r.date === today);
        return { ...s, status: record?.status || 'present', recordId: record?.id };
    });

    const handleStatusChange = (id: string, newStatus: string) => {
        const record = attendanceRecords.find(r => r.studentId === id && r.date === today);
        if (record) {
            updateAttendanceStatus(record.id, newStatus);
        } else {
            addAttendanceRecord({
                studentId: id,
                date: today,
                status: newStatus as any,
                classId: 'c1'
            });
        }
    };

    const markAllPresent = () => {
        students.forEach(s => {
            const record = attendanceRecords.find(r => r.studentId === s.id && r.date === today);
            if (record) {
                updateAttendanceStatus(record.id, 'present');
            } else {
                addAttendanceRecord({
                    studentId: s.id,
                    date: today,
                    status: 'present',
                    classId: 'c1'
                });
            }
        });
    };

    const filteredStudents = studentData.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.rollNumber.includes(searchQuery)
    );

    const summary = {
        total: studentData.length,
        present: studentData.filter(s => s.status === 'present').length,
        absent: studentData.filter(s => s.status === 'absent').length,
        late: studentData.filter(s => s.status === 'late').length,
    };

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1F3864]">SchoolLink</h1>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Teacher Portal</p>
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
                            <button onClick={() => navigate('teacher_classes')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Mark Attendance</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">Mr. Addo</p>
                                <p className="text-xs text-gray-500">Teacher Account</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                MA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full relative">
                    {showConfirmation && (
                        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 flex items-center gap-2 font-bold animate-fade-in-down">
                            <CheckCircle2 className="w-5 h-5" />
                            Attendance submitted successfully! Returning to dashboard...
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Info */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-[#DCE6F1] text-[#1F3864] text-xs font-bold px-2 py-0.5 rounded">Grade 4 Gold</span>
                                <span className="text-gray-500 text-sm font-semibold">• Mathematics</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#1F3864]">{currentDate}</h3>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-[#F7F8FA] p-3 rounded-lg border border-gray-100">
                            <div className="flex flex-col items-center px-3 border-r border-gray-200">
                                <span className="text-xs font-bold text-gray-500 uppercase">Total</span>
                                <span className="text-lg font-bold text-[#1F3864]">{summary.total}</span>
                            </div>
                            <div className="flex flex-col items-center px-3 border-r border-gray-200">
                                <span className="text-xs font-bold text-gray-500 uppercase">Present</span>
                                <span className="text-lg font-bold text-green-600">{summary.present}</span>
                            </div>
                            <div className="flex flex-col items-center px-3 border-r border-gray-200">
                                <span className="text-xs font-bold text-gray-500 uppercase">Late</span>
                                <span className="text-lg font-bold text-amber-500">{summary.late}</span>
                            </div>
                            <div className="flex flex-col items-center px-3">
                                <span className="text-xs font-bold text-gray-500 uppercase">Absent</span>
                                <span className="text-lg font-bold text-red-500">{summary.absent}</span>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold transition-colors"
                                defaultValue="Kofi" placeholder="Search by name or roll number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                onClick={() => navigate('teacher_attendance_history')}
                                className="px-4 py-2 bg-white border border-gray-200 text-[#1F3864] text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                View History
                            </button>
                            <button 
                                type="button"
                                onClick={markAllPresent}
                                className="px-4 py-2 bg-white border border-gray-200 text-[#1F3864] text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Mark All Present
                            </button>
                        </div>
                    </div>

                    {/* Roster Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-[#1F3864] text-white">
                                        <th className="py-3 px-5 text-sm font-bold w-16">Roll</th>
                                        <th className="py-3 px-5 text-sm font-bold">Student Name</th>
                                        <th className="py-3 px-5 text-sm font-bold text-center w-64">Attendance Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {filteredStudents.map((student, i) => (
                                        <tr key={student.id as string} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                            <td className="py-3 px-5 font-bold text-gray-500">{student.rollNumber}</td>
                                            <td className="py-3 px-5 font-bold text-[#1F3864]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-xs shrink-0">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td className="py-3 px-5">
                                                <div className="flex justify-center bg-gray-100 rounded-lg p-1 w-full max-w-[240px] mx-auto">
                                                    <button
                                                        onClick={() => handleStatusChange(student.id as string, 'present')}
                                                        className={`flex-1 flex justify-center items-center py-1.5 rounded-md text-xs font-bold transition-all ${
                                                            student.status === 'present' 
                                                                ? 'bg-white text-green-700 shadow-sm border border-gray-200' 
                                                                : 'text-gray-500 hover:text-gray-700'
                                                        }`}
                                                    >
                                                        Present
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(student.id as string, 'late')}
                                                        className={`flex-1 flex justify-center items-center py-1.5 rounded-md text-xs font-bold transition-all ${
                                                            student.status === 'late' 
                                                                ? 'bg-white text-amber-600 shadow-sm border border-gray-200' 
                                                                : 'text-gray-500 hover:text-gray-700'
                                                        }`}
                                                    >
                                                        Late
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(student.id as string, 'absent')}
                                                        className={`flex-1 flex justify-center items-center py-1.5 rounded-md text-xs font-bold transition-all ${
                                                            student.status === 'absent' 
                                                                ? 'bg-white text-red-600 shadow-sm border border-gray-200' 
                                                                : 'text-gray-500 hover:text-gray-700'
                                                        }`}
                                                    >
                                                        Absent
                                                    </button>
                                                </div>
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

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-6 py-3 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm w-full sm:w-auto">
                            Submit Attendance
                        </button>
                    </div>

                
                    </form>
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

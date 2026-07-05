import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    CheckSquare, ChevronLeft, Calendar, Search, CheckCircle2, XCircle, Clock, ChevronDown, ChevronUp, Edit2
} from 'lucide-react';

export default function TeacherAttendanceHistory({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedDay, setExpandedDay] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState("This Week");
    
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

    const { students, attendanceRecords } = useMockData();
    // Group records by date
    const grouped = attendanceRecords.reduce((acc, record) => {
        if (!acc[record.date]) {
            acc[record.date] = {
                date: record.date,
                day: record.day || 'Day',
                summary: { total: 0, present: 0, absent: 0, late: 0 },
                students: []
            };
        }
        const student = students.find(s => s.id === record.studentId);
        if (student) {
            acc[record.date].summary.total++;
            acc[record.date].summary[record.status as 'present'|'absent'|'late']++;
            acc[record.date].students.push({
                id: student.id,
                name: student.name,
                rollNumber: student.rollNumber,
                status: record.status
            });
        }
        return acc;
    }, {} as Record<string, any>);
    const historyData = (Object.values(grouped) as any[]).sort((a: any, b: any) => b.date.localeCompare(a.date));

    const toggleExpand = (date: string) => {
        if (expandedDay === date) {
            setExpandedDay(null);
        } else {
            setExpandedDay(date);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-700 border-green-200';
            case 'late': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'absent': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

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
                            <h2 className="text-xl font-bold text-[#1F3864]">Attendance History</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
                    {/* Header Info & Date Range Selector */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-[#DCE6F1] text-[#1F3864] text-xs font-bold px-2 py-0.5 rounded">Grade 4 Gold</span>
                                <span className="text-gray-500 text-sm font-semibold">• Mathematics</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#1F3864]">Past Attendance Records</h3>
                        </div>
                        
                        <div className="relative">
                            <select 
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="appearance-none bg-[#F7F8FA] border border-gray-200 text-[#1F3864] text-sm font-bold rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 cursor-pointer w-full sm:w-auto"
                            >
                                <option value="This Week">This Week</option>
                                <option value="Last Week">Last Week</option>
                                <option value="This Month">This Month</option>
                                <option value="Custom Range">Custom Range...</option>
                            </select>
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3864]" />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* History List */}
                    <div className="space-y-4">
                        {historyData.map((record) => (
                            <div key={record.date} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all">
                                {/* Summary Header (Clickable) */}
                                <button 
                                    onClick={() => toggleExpand(record.date)}
                                    className="w-full p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#DCE6F1] text-[#1F3864] p-3 rounded-lg flex flex-col items-center justify-center min-w-[72px]">
                                            <span className="text-xs font-bold uppercase">{record.day.slice(0, 3)}</span>
                                            <span className="text-xl font-bold">{record.date.split(' ')[1].replace(',', '')}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#1F3864]">{record.date}</h4>
                                            <p className="text-sm font-semibold text-gray-500 mt-0.5">Recorded by Mr. Addo</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 md:gap-8 ml-16 md:ml-0">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Present</span>
                                                <span className="text-sm font-bold text-green-600">{record.summary.present}/{record.summary.total}</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Late</span>
                                                <span className="text-sm font-bold text-amber-500">{record.summary.late}</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Absent</span>
                                                <span className="text-sm font-bold text-red-500">{record.summary.absent}</span>
                                            </div>
                                        </div>
                                        <div className="text-gray-400">
                                            {expandedDay === record.date ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded Details */}
                                {expandedDay === record.date && (
                                    <div className="border-t border-gray-100 bg-gray-50/50 p-4 md:p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h5 className="text-sm font-bold text-[#1F3864]">Class Roster for {record.date}</h5>
                                            <button onClick={() => navigate('empty_state')} className="flex items-center gap-1.5 text-sm font-bold text-[#1F3864] hover:underline bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                                                <Edit2 className="w-4 h-4" />
                                                Edit / Correct
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                                            <table className="w-full text-left border-collapse min-w-[500px]">
                                                <thead>
                                                    <tr className="bg-[#1F3864] text-white">
                                                        <th className="py-2.5 px-4 text-xs font-bold w-16">Roll</th>
                                                        <th className="py-2.5 px-4 text-xs font-bold">Student Name</th>
                                                        <th className="py-2.5 px-4 text-xs font-bold text-right">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {record.students.map((student, i) => (
                                                        <tr key={student.id as any as string} className={`border-b border-gray-100 ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                            <td className="py-2.5 px-4 font-bold text-gray-500">{student.rollNumber}</td>
                                                            <td className="py-2.5 px-4 font-bold text-[#1F3864]">{student.name}</td>
                                                            <td className="py-2.5 px-4 text-right">
                                                                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold border capitalize ${getStatusStyle(student.status)}`}>
                                                                    {student.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
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

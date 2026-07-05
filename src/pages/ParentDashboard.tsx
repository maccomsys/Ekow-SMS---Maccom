import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, Settings, 
    LogOut, Menu, ChevronDown, CheckCircle2, Clock, Calendar, 
    AlertCircle, FileX, BookMarked, MessageSquare, User
} from 'lucide-react';

import { useMockData } from '../store/MockDataContext';

export default function ParentDashboard({ navigate }: { navigate: (path: string) => void }) {
    const [selectedChild, setSelectedChild] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    
    const children = [
        { id: 1, name: 'Kwame Mensah', grade: 'Grade 4 Gold', school: 'Ghana Academy' },
        { id: 2, name: 'Ama Mensah', grade: 'Grade 2 Silver', school: 'Ghana Academy' }
    ];

    const { announcements: globalAnnouncements, homeworkRecords: globalHomework, attendanceRecords } = useMockData();

    const currentChildId = selectedChild === 0 ? 'STU001' : 'STU002'; // STU001 is Kwame Mensah (Kwame Osei), STU002 is Abena Osei

    // Get today's attendance for the current child
    const todaysAttendance = attendanceRecords.find(a => a.studentId === currentChildId && a.date === new Date().toISOString().split('T')[0]) || 
                             attendanceRecords.find(a => a.studentId === currentChildId); // Fallback to any recent record if today doesn't exist

    const announcements = globalAnnouncements.slice(0, 3).map(a => ({
        id: a.id,
        title: a.title,
        date: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        type: a.scope === 'School-Wide' ? 'General' : 'Academic'
    }));

    const homework = globalHomework.slice(0, 3).map(hw => ({
        id: hw.id,
        subject: hw.subject,
        title: hw.title,
        due: hw.dueDate,
        status: hw.status.toLowerCase() === 'active' ? 'pending' : hw.status.toLowerCase()
    }));

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'parent_dashboard', active: true },
        { icon: Users, label: 'Switch Child', path: 'child_switcher', active: false },
        { icon: BookOpen, label: 'Academics', path: 'grades_parent', active: false },
        { icon: BookMarked, label: 'Homework', path: 'homework_parent', active: false },
        { icon: FileText, label: 'Attendance', path: 'attendance_parent', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'announcements_parent', active: false },
        { icon: User, label: 'Profile', path: 'parent_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3864] mb-4"></div>
                    <p className="text-[#1F3864] font-semibold">Loading dashboard...</p>
                </div>
            </div>
        );
    }

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
                
                <nav className="flex-1 py-6 px-4 space-y-2">
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Parent Dashboard</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto space-y-6">
                    {isLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center h-[60vh]">
                            <div className="w-12 h-12 border-4 border-[#DCE6F1] border-t-[#1F3864] rounded-full animate-spin mb-4"></div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Dashboard</h2>
                            <p className="text-gray-500">Fetching your latest data...</p>
                        </div>
                    ) : (
                        <>
                    {/* Child Switcher */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                        <h3 className="text-lg font-bold text-[#1F3864]">Overview</h3>
                        <div className="relative w-full sm:w-auto">
                            <select 
                                className="w-full sm:w-64 appearance-none bg-white border border-[#1F3864]/20 text-[#1F3864] font-semibold py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864] cursor-pointer shadow-sm"
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(Number(e.target.value))}
                            >
                                {children.map((child, index) => (
                                    <option key={child.id} value={index}>
                                        {child.name} - {child.grade}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F3864] pointer-events-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Attendance Card */}
                        <div className="md:col-span-4 bg-[#DCE6F1] rounded-xl p-6 border border-[#1F3864]/10 shadow-sm flex flex-col">
                            <div className="flex items-center gap-2 mb-4 text-[#1F3864]">
                                <Calendar className="w-5 h-5" />
                                <h3 className="text-lg font-bold">Today's Attendance</h3>
                            </div>
                            
                            <div className="flex-1 flex flex-col items-center justify-center py-6 bg-white/50 rounded-lg border border-white/50">
                                {todaysAttendance ? (
                                    <>
                                        <div className={`w-20 h-20 rounded-full ${todaysAttendance.status === 'present' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center mb-3`}>
                                            {todaysAttendance.status === 'present' ? <CheckCircle2 className="w-10 h-10 text-green-600" /> : <AlertCircle className="w-10 h-10 text-red-600" />}
                                        </div>
                                        <span className={`text-xl font-bold ${todaysAttendance.status === 'present' ? 'text-green-700' : 'text-red-700'} mb-1 capitalize`}>
                                            {todaysAttendance.status}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-500">
                                            {todaysAttendance.timeIn ? `Checked in at ${todaysAttendance.timeIn}` : 'No time recorded'}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm font-semibold text-gray-500">No attendance recorded today</span>
                                )}
                            </div>
                            
                            <button onClick={() => navigate('attendance_parent')} className="mt-4 w-full py-2.5 border-2 border-[#1F3864]/20 text-[#1F3864] font-bold rounded-lg hover:bg-white transition-colors">
                                View History
                            </button>
                        </div>

                        {/* Announcements Card */}
                        <div className="md:col-span-8 bg-[#DCE6F1] rounded-xl p-6 border border-[#1F3864]/10 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-[#1F3864]">
                                    <Bell className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Latest Announcements</h3>
                                </div>
                                <button onClick={() => navigate('announcements_parent')} className="text-sm font-bold text-[#1F3864] hover:underline">View All</button>
                            </div>
                            
                            <div className="flex-1 space-y-3">
                                {announcements.map((item) => (
                                    <div key={item.id} className="bg-white p-4 rounded-lg border border-white/50 flex gap-4 items-start shadow-sm">
                                        <div className="bg-[#DCE6F1] text-[#1F3864] p-2 rounded-lg mt-0.5">
                                            <AlertCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold bg-[#1F3864] text-white px-2 py-0.5 rounded">
                                                    {item.type}
                                                </span>
                                                <span className="text-xs text-gray-500 font-semibold">{item.date}</span>
                                            </div>
                                            <h4 className="text-base font-bold text-[#1F3864]">{item.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grades Summary Card */}
                        <div className="md:col-span-4 bg-[#DCE6F1] rounded-xl p-6 border border-[#1F3864]/10 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-[#1F3864]">
                                    <BookOpen className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Recent Grades</h3>
                                </div>
                                <button onClick={() => navigate('grades_parent')} className="text-sm font-bold text-[#1F3864] hover:underline">View All</button>
                            </div>
                            <div className="flex-1 space-y-3">
                                {[
                                    { subject: 'Mathematics', score: '85', grade: 'A' },
                                    { subject: 'Science', score: '78', grade: 'B+' },
                                    { subject: 'English', score: '92', grade: 'A+' }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white p-3 rounded-lg border border-white/50 flex justify-between items-center shadow-sm">
                                        <span className="font-bold text-[#1F3864]">{item.subject}</span>
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-[#1F3864] mr-2">{item.score}%</span>
                                            <span className="text-xs font-bold bg-[#DCE6F1] text-[#1F3864] px-2 py-1 rounded">{item.grade}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Homework Card */}
                        <div className="md:col-span-8 bg-[#DCE6F1] rounded-xl p-6 border border-[#1F3864]/10 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-[#1F3864]">
                                    <BookMarked className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Upcoming Homework</h3>
                                </div>
                                <button onClick={() => navigate('homework_parent')} className="text-sm font-bold text-[#1F3864] hover:underline">All Assignments</button>
                            </div>
                            
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden border border-gray-200">
                                    <thead>
                                        <tr className="bg-[#1F3864] text-white">
                                            <th className="py-3 px-4 text-sm font-bold w-1/4">Subject</th>
                                            <th className="py-3 px-4 text-sm font-bold w-2/5">Title</th>
                                            <th className="py-3 px-4 text-sm font-bold w-1/5">Due Date</th>
                                            <th className="py-3 px-4 text-sm font-bold w-1/5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {homework.map((hw, i) => (
                                            <tr key={hw.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#DCE6F1]/50'}>
                                                <td className="py-3 px-4 font-bold text-[#1F3864] border-b border-gray-100">{hw.subject}</td>
                                                <td className="py-3 px-4 font-semibold text-gray-700 border-b border-gray-100">{hw.title}</td>
                                                <td className="py-3 px-4 border-b border-gray-100">
                                                    <span className="flex items-center gap-1.5 text-gray-600 font-semibold">
                                                        <Clock className="w-4 h-4" />
                                                        {hw.due}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 border-b border-gray-100">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                        hw.status === 'late' 
                                                            ? 'bg-amber-100 text-amber-700' 
                                                            : 'bg-green-100 text-green-700'
                                                    }`}>
                                                        {hw.status === 'late' ? 'Due Today' : 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    </>
                    )}
                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe">
                {navItems.filter(item => item.label !== 'Logout').map((item, i) => (
                    <button 
                        key={i}
                        onClick={() => {
                            if (item.path !== '#') navigate(item.path);
                        }}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                            item.active 
                                ? 'text-[#1F3864]' 
                                : 'text-gray-500 hover:text-[#1F3864]'
                        }`}
                    >
                        <item.icon className={`w-6 h-6 mb-1 ${item.active ? 'fill-[#1F3864]/10' : ''}`} />
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

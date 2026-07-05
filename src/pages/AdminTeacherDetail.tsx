import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, ChevronLeft,
    Phone, Mail, CheckCircle, Edit2, BookOpen, Clock, Activity, Briefcase, X
} from 'lucide-react';

export default function AdminTeacherDetail({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: true },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const teacher = {
        id: "T001",
        name: "Mr. Michael Addo",
        email: "michael.addo@example.com",
        phone: "024 123 4567",
        status: "Active",
        joinedDate: "Sept 12, 2021",
        qualifications: "B.Ed. Mathematics, University of Cape Coast"
    };

    const assignedClasses = [
        { id: 1, name: "Grade 4 Gold", subjects: "Mathematics, Science", students: 32 },
        { id: 2, name: "Grade 5 Silver", subjects: "Mathematics", students: 28 }
    ];

    const activityLog = [
        { id: 1, date: "Today, 08:15 AM", type: "Attendance Marking", description: "Marked attendance for Grade 4 Gold", status: "Completed" },
        { id: 2, date: "Yesterday, 14:30 PM", type: "Grade Entry", description: "Entered Mid-Term scores for Grade 5 Silver (Maths)", status: "Completed" },
        { id: 3, date: "Oct 10, 09:00 AM", type: "Announcement", description: "Posted: 'Upcoming Science Project Deadline'", status: "Completed" },
        { id: 4, date: "Oct 09, 08:20 AM", type: "Attendance Marking", description: "Marked attendance for Grade 4 Gold", status: "Late" }
    ];

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
            <div className="md:ml-[260px] flex flex-col min-h-screen pb-20 md:pb-0">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3 hidden sm:flex">
                            <button onClick={() => navigate('admin_teachers')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Teacher Details</h2>
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
                                MA
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                                    {teacher.name}
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-500/30">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Active
                                    </span>
                                </h3>
                                <p className="text-blue-200 font-semibold mb-1">Teacher ID: {teacher.id} &bull; Joined: {teacher.joinedDate}</p>
                                <p className="text-white font-bold text-sm bg-white/10 inline-block px-3 py-1 rounded-md mt-1">{teacher.qualifications}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate('admin_teacher_form')}
                            className="px-5 py-2.5 bg-white text-[#1F3864] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Contact Details */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                    <Activity className="w-5 h-5 text-gray-400" />
                                    Contact Info
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Phone Number</p>
                                            <p className="font-semibold text-[#1F3864] mt-0.5">{teacher.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Email Address</p>
                                            <p className="font-semibold text-[#1F3864] mt-0.5 break-all">{teacher.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Account Status Card */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                    <Settings className="w-5 h-5 text-gray-400" />
                                    Account Status
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-600">Portal Access</span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                                            Enabled
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-600">Last Login</span>
                                        <span className="font-bold text-[#1F3864]">Today, 08:12 AM</span>
                                    </div>
                                    <button onClick={() => navigate('admin_teacher_detail')} className="w-full mt-2 py-2.5 text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
                                        Suspend Account
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Assigned Classes */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-gray-400" />
                                        Assigned Classes & Subjects
                                    </h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[500px]">
                                        <thead>
                                            <tr className="bg-[#1F3864] text-white">
                                                <th className="py-3 px-6 text-sm font-bold">Class Name</th>
                                                <th className="py-3 px-6 text-sm font-bold">Subjects Handled</th>
                                                <th className="py-3 px-6 text-sm font-bold text-center">Students</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {assignedClasses.map((cls, i) => (
                                                <tr key={cls.id} className={`border-b border-gray-100 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                    <td className="py-4 px-6 font-bold text-[#1F3864]">{cls.name}</td>
                                                    <td className="py-4 px-6 font-semibold text-gray-600">{cls.subjects}</td>
                                                    <td className="py-4 px-6 font-bold text-center text-gray-600">{cls.students}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Activity Log */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        Recent Activity Log
                                    </h4>
                                    <button onClick={() => navigate('announcements_parent')} className="text-sm font-bold text-[#1F3864] hover:underline">View All</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="bg-gray-50 text-gray-500">
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Date & Time</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Activity Type</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Description</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {activityLog.map((log) => (
                                                <tr key={log.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 font-semibold text-gray-500 whitespace-nowrap">{log.date}</td>
                                                    <td className="py-4 px-6 font-bold text-[#1F3864] whitespace-nowrap">{log.type}</td>
                                                    <td className="py-4 px-6 font-semibold text-gray-600">{log.description}</td>
                                                    <td className="py-4 px-6 text-center">
                                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] uppercase font-bold border ${
                                                            log.status === 'Completed' 
                                                                ? 'bg-green-50 text-green-700 border-green-200' 
                                                                : 'bg-amber-50 text-amber-700 border-amber-200'
                                                        }`}>
                                                            {log.status}
                                                        </span>
                                                    </td>
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

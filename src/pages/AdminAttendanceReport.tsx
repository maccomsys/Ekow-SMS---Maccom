import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    BookOpen, Calculator, FileText, Download, Filter, FolderArchive,
    TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default function AdminAttendanceReport({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("All Classes");
    const [dateRange, setDateRange] = useState("Last 7 Days");

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Contact, label: 'Guardians', path: 'admin_parents', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: BookOpen, label: 'Subjects', path: 'admin_subjects', active: false },
        { icon: Calculator, label: 'Grades', path: 'admin_grade_oversight', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: true },
        { icon: FileText, label: 'Homework', path: 'admin_homework_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: FolderArchive, label: 'Media Library', path: 'admin_media_library', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const chartData = [
        { date: 'Oct 10', 'Grade 1': 95, 'Grade 2': 92, 'Grade 3': 96, 'Grade 4': 98 },
        { date: 'Oct 11', 'Grade 1': 94, 'Grade 2': 95, 'Grade 3': 97, 'Grade 4': 96 },
        { date: 'Oct 12', 'Grade 1': 96, 'Grade 2': 94, 'Grade 3': 95, 'Grade 4': 97 },
        { date: 'Oct 13', 'Grade 1': 98, 'Grade 2': 96, 'Grade 3': 98, 'Grade 4': 99 },
        { date: 'Oct 14', 'Grade 1': 97, 'Grade 2': 95, 'Grade 3': 96, 'Grade 4': 95 },
    ];

    const tableData = [
        { class: 'Grade 1 Blue', present: 28, absent: 2, late: 0, percentage: 93.3, trend: 'up' },
        { class: 'Grade 1 Gold', present: 30, absent: 0, late: 0, percentage: 100, trend: 'neutral' },
        { class: 'Grade 2 Blue', present: 25, absent: 3, late: 2, percentage: 83.3, trend: 'down' },
        { class: 'Grade 3 Silver', present: 32, absent: 1, late: 2, percentage: 91.4, trend: 'up' },
        { class: 'Grade 4 Gold', present: 29, absent: 1, late: 0, percentage: 96.6, trend: 'up' },
    ];

    const filteredTableData = tableData.filter(item => 
        selectedClass === "All Classes" || item.class === selectedClass
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Attendance Summary Report</h2>
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
                                <h2 className="text-2xl font-bold text-[#1F3864] mb-1">School-wide Attendance</h2>
                                <p className="text-sm text-gray-500 font-semibold">Monitor attendance trends and overall student participation.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => navigate('empty_state')} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>
                                <button onClick={() => navigate('empty_state')} className="flex items-center gap-2 px-4 py-2 bg-[#1F3864] text-white rounded-lg text-sm font-bold hover:bg-[#2a4d8a] transition-colors">
                                    <FileText className="w-4 h-4" />
                                    Generate PDF Report
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative w-full md:w-48">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-gray-400" />
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

                            <div className="relative w-full md:w-48">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CalendarCheck className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                                >
                                    <option value="Today">Today</option>
                                    <option value="Yesterday">Yesterday</option>
                                    <option value="Last 7 Days">Last 7 Days</option>
                                    <option value="Last 30 Days">Last 30 Days</option>
                                    <option value="This Term">This Term</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
                                <h3 className="text-lg font-bold text-[#1F3864] mb-6">Attendance Trends (Percentage)</h3>
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} domain={[80, 100]} />
                                            <Tooltip 
                                                cursor={{ fill: '#F3F4F6' }}
                                                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }} />
                                            <Bar dataKey="Grade 1" fill="#1F3864" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                            <Bar dataKey="Grade 2" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-2">Overall Average</h3>
                                    <p className="text-sm text-gray-500 font-semibold mb-6">Across selected filters</p>
                                    <div className="flex items-end gap-3">
                                        <span className="text-5xl font-bold text-[#1F3864]">94.2%</span>
                                        <span className="flex items-center text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            +1.2%
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-2">Total Absences</h3>
                                    <p className="text-sm text-gray-500 font-semibold mb-6">Across selected filters</p>
                                    <div className="flex items-end gap-3">
                                        <span className="text-5xl font-bold text-[#1F3864]">24</span>
                                        <span className="flex items-center text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md mb-1">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            +4
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                            <div className="p-5 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-[#1F3864]">Class Breakdown</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-[#1F3864] text-white">
                                            <th className="py-3 px-5 text-sm font-bold">Class Name</th>
                                            <th className="py-3 px-5 text-sm font-bold text-center">Present</th>
                                            <th className="py-3 px-5 text-sm font-bold text-center">Absent</th>
                                            <th className="py-3 px-5 text-sm font-bold text-center">Late</th>
                                            <th className="py-3 px-5 text-sm font-bold text-right">Attendance %</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredTableData.map((row, i) => (
                                            <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                <td className="py-4 px-5 font-bold text-[#1F3864]">{row.class}</td>
                                                <td className="py-4 px-5 text-center font-semibold text-gray-700">{row.present}</td>
                                                <td className="py-4 px-5 text-center font-semibold text-gray-700">{row.absent}</td>
                                                <td className="py-4 px-5 text-center font-semibold text-gray-700">{row.late}</td>
                                                <td className="py-4 px-5 text-right font-bold text-[#1F3864]">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {row.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                                        {row.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                                                        {row.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
                                                        {row.percentage}%
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    BookOpen, Calculator, FileText, Download, Filter, FolderArchive,
    TrendingUp, TrendingDown, Minus, Activity
} from 'lucide-react';
import {
    ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function AdminPerformanceReport({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState("Term 1");

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
        { icon: FileText, label: 'Homework', path: 'admin_homework_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: FolderArchive, label: 'Media Library', path: 'admin_media_library', active: false },
        { icon: Activity, label: 'Performance Report', path: 'admin_performance_report', active: true },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const chartData = [
        { class: 'Grade 1 Blue', attendance: 95, grade: 85 },
        { class: 'Grade 1 Gold', attendance: 98, grade: 88 },
        { class: 'Grade 2 Blue', attendance: 92, grade: 78 },
        { class: 'Grade 3 Silver', attendance: 96, grade: 82 },
        { class: 'Grade 4 Gold', attendance: 91, grade: 75 },
    ];

    const tableData = [
        { class: 'Grade 1 Blue', teacher: 'Mrs. Sarah Osei', attendance: 95, grade: 85, status: 'Excellent' },
        { class: 'Grade 1 Gold', teacher: 'Mr. John Amoah', attendance: 98, grade: 88, status: 'Excellent' },
        { class: 'Grade 2 Blue', teacher: 'Mr. Daniel Appiah', attendance: 92, grade: 78, status: 'Good' },
        { class: 'Grade 3 Silver', teacher: 'Mrs. Mary Boakye', attendance: 96, grade: 82, status: 'Excellent' },
        { class: 'Grade 4 Gold', teacher: 'Mr. Paul Kumi', attendance: 91, grade: 75, status: 'Average' },
    ];

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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Performance Overview Report</h2>
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
                                <h2 className="text-2xl font-bold text-[#1F3864] mb-1">School Performance</h2>
                                <p className="text-sm text-gray-500 font-semibold">Compare class-by-class attendance rate versus average grade.</p>
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
                                    <option value="Full Year">Full Year</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
                                <h3 className="text-lg font-bold text-[#1F3864] mb-6">Attendance vs Average Grade Correlation</h3>
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} dy={10} />
                                            <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} domain={[0, 100]} />
                                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} domain={[0, 100]} />
                                            <Tooltip 
                                                cursor={{ fill: '#F3F4F6' }}
                                                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }} />
                                            <Bar yAxisId="left" dataKey="attendance" name="Attendance Rate (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                            <Line yAxisId="right" type="monotone" dataKey="grade" name="Average Grade (%)" stroke="#1F3864" strokeWidth={3} dot={{ r: 5, fill: '#1F3864', strokeWidth: 0 }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                            <div className="p-5 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-[#1F3864]">Class Performance Details</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-[#1F3864] text-white">
                                            <th className="py-3 px-5 text-sm font-bold">Class Name</th>
                                            <th className="py-3 px-5 text-sm font-bold">Teacher</th>
                                            <th className="py-3 px-5 text-sm font-bold text-center">Attendance Rate</th>
                                            <th className="py-3 px-5 text-sm font-bold text-center">Average Grade</th>
                                            <th className="py-3 px-5 text-sm font-bold text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {tableData.map((row, i) => (
                                            <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                <td className="py-4 px-5 font-bold text-[#1F3864]">{row.class}</td>
                                                <td className="py-4 px-5 font-semibold text-gray-700">{row.teacher}</td>
                                                <td className="py-4 px-5 text-center font-bold text-[#1F3864]">
                                                    <span className={`inline-flex px-2 py-1 rounded text-sm ${row.attendance >= 95 ? 'text-green-700 bg-green-50' : row.attendance >= 90 ? 'text-blue-700 bg-blue-50' : 'text-amber-700 bg-amber-50'}`}>
                                                        {row.attendance}%
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 text-center font-bold text-[#1F3864]">
                                                    <span className={`inline-flex px-2 py-1 rounded text-sm ${row.grade >= 80 ? 'text-green-700 bg-green-50' : row.grade >= 60 ? 'text-blue-700 bg-blue-50' : 'text-amber-700 bg-amber-50'}`}>
                                                        {row.grade}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 text-right font-bold text-[#1F3864]">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                                                        row.status === 'Excellent' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                        row.status === 'Good' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                                        'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                        {row.status}
                                                    </span>
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

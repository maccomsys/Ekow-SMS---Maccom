import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    BookOpen, Calculator, FileText, Download, Filter, FolderArchive,
    Activity, Search, Trash2, RefreshCw, File
} from 'lucide-react';

export default function AdminExportCenter({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");

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
        { icon: Activity, label: 'Performance Report', path: 'admin_performance_report', active: false },
        { icon: Download, label: 'Export Center', path: 'admin_export_center', active: true },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const [reportsData, setReportsData] = useState([
        { id: 'REP001', name: 'Term 1 School-wide Attendance', type: 'Attendance', date: '2023-10-15 09:30 AM', format: 'PDF', size: '1.2 MB', status: 'Completed' },
        { id: 'REP002', name: 'Grade 4 Gold Grade Distribution', type: 'Grades', date: '2023-10-14 14:15 PM', format: 'CSV', size: '0.4 MB', status: 'Completed' },
        { id: 'REP003', name: 'Full Year Performance Overview', type: 'Performance', date: '2023-10-12 11:00 AM', format: 'PDF', size: '2.5 MB', status: 'Completed' },
        { id: 'REP004', name: 'Student Roster - All Classes', type: 'Students', date: '2023-10-10 16:45 PM', format: 'CSV', size: '0.8 MB', status: 'Completed' },
        { id: 'REP005', name: 'Parent Contact List', type: 'Guardians', date: '2023-10-09 10:20 AM', format: 'CSV', size: '0.6 MB', status: 'Completed' },
        { id: 'REP006', name: 'Term 1 Mid-Term Grades (Generating)', type: 'Grades', date: '2023-10-16 08:00 AM', format: 'PDF', size: '-', status: 'Pending' },
    ]);

    const filteredReports = reportsData.filter(report => {
        const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === "All Types" || report.type === selectedType;
        return matchesSearch && matchesType;
    });

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            setReportsData(reportsData.filter(r => r.id !== id));
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Export / Download Center</h2>
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
                                <h2 className="text-2xl font-bold text-[#1F3864] mb-1">Generated Reports</h2>
                                <p className="text-sm text-gray-500 font-semibold">Access, download, and manage your previously exported reports and data.</p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-48">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="block w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] sm:text-sm font-semibold text-[#1F3864] appearance-none cursor-pointer"
                                >
                                    <option value="All Types">All Types</option>
                                    <option value="Attendance">Attendance</option>
                                    <option value="Grades">Grades</option>
                                    <option value="Performance">Performance</option>
                                    <option value="Students">Students</option>
                                    <option value="Guardians">Guardians</option>
                                </select>
                            </div>

                            <div className="relative w-full md:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    defaultValue="Kofi" placeholder="Search reports..."
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
                                            <th className="py-3 px-5 text-sm font-bold">Report Name</th>
                                            <th className="py-3 px-5 text-sm font-bold">Type</th>
                                            <th className="py-3 px-5 text-sm font-bold">Format</th>
                                            <th className="py-3 px-5 text-sm font-bold">Date Created</th>
                                            <th className="py-3 px-5 text-sm font-bold">Status</th>
                                            <th className="py-3 px-5 text-sm font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredReports.map((report, i) => (
                                            <tr key={report.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center gap-3">
                                                        <File className={`w-5 h-5 ${report.format === 'PDF' ? 'text-red-500' : 'text-green-600'}`} />
                                                        <div>
                                                            <div className="font-bold text-[#1F3864]">{report.name}</div>
                                                            <div className="text-xs text-gray-500 font-semibold">{report.size}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5 font-semibold text-gray-700">{report.type}</td>
                                                <td className="py-4 px-5 font-bold text-[#1F3864]">{report.format}</td>
                                                <td className="py-4 px-5 font-semibold text-gray-600">{report.date}</td>
                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                                                        report.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            disabled={report.status !== 'Completed'}
                                                            className={`p-1.5 rounded-lg transition-colors ${
                                                                report.status === 'Completed' ? 'text-gray-500 hover:text-[#1F3864] hover:bg-[#DCE6F1]' : 'text-gray-300 cursor-not-allowed'
                                                            }`}
                                                            title="Download" onClick={() => navigate('empty_state')}
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => navigate('empty_state')} 
                                                            className="p-1.5 text-gray-500 hover:text-[#1F3864] hover:bg-[#DCE6F1] rounded-lg transition-colors"
                                                            title="Regenerate"
                                                        >
                                                            <RefreshCw className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(report.id)}
                                                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredReports.length === 0 && (
                                <div className="p-8 text-center text-gray-500 font-semibold">
                                    No reports found matching your criteria.
                                </div>
                            )}
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

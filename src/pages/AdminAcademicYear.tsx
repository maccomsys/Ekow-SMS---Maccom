import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    Save, BookOpen, CalendarIcon, CheckCircle2, Circle
} from 'lucide-react';

export default function AdminAcademicYear({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Form state
    const [academicYear, setAcademicYear] = useState('2023/2024');
    const [activeTerm, setActiveTerm] = useState('Term 1');
    const [terms, setTerms] = useState([
        { id: 'Term 1', name: 'Term 1', startDate: '2023-09-05', endDate: '2023-12-15' },
        { id: 'Term 2', name: 'Term 2', startDate: '2024-01-09', endDate: '2024-04-12' },
        { id: 'Term 3', name: 'Term 3', startDate: '2024-05-07', endDate: '2024-07-26' },
    ]);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Contact, label: 'Guardians', path: 'admin_parents', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: BookOpen, label: 'Subjects', path: 'admin_subjects', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_academic_year', active: true },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const handleTermChange = (id: string, field: string, value: string) => {
        setTerms(terms.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        alert("Academic year and term settings saved!");
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
            <div className="md:ml-[260px] flex flex-col min-h-screen pb-20 md:pb-0">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Academic Year & Term Setup</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-3 bg-[#1F3864] text-white">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                <CalendarIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Academic Calendar Configuration</h2>
                                <p className="text-sm text-blue-200 font-semibold mt-0.5">Set the active academic year and configure term dates.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                            
                            <div className="space-y-6">
                                {/* Academic Year Settings */}
                                <div className="bg-[#F7F8FA] p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-4">Academic Year</h3>
                                    <div className="max-w-md">
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Current Academic Year</label>
                                        <div className="relative">
                                            <select 
                                                value={academicYear}
                                                onChange={(e) => setAcademicYear(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-bold text-[#1F3864] appearance-none cursor-pointer bg-white text-lg"
                                            >
                                                <option value="2022/2023">2022/2023</option>
                                                <option value="2023/2024">2023/2024</option>
                                                <option value="2024/2025">2024/2025</option>
                                                <option value="2025/2026">2025/2026</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms Settings */}
                                <div>
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-4">Term Dates & Status</h3>
                                    <div className="space-y-4">
                                        {terms.map((term) => (
                                            <div 
                                                key={term.id} 
                                                className={`p-5 rounded-lg border transition-colors ${
                                                    activeTerm === term.id 
                                                        ? 'border-[#1F3864] bg-[#DCE6F1]/30' 
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                                                    {/* Term Identity & Toggle */}
                                                    <div className="flex-1 w-full lg:w-auto">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTerm(term.id)}>
                                                                {activeTerm === term.id ? (
                                                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                                                                ) : (
                                                                    <Circle className="w-6 h-6 text-gray-300 shrink-0" />
                                                                )}
                                                                <div>
                                                                    <h4 className="font-bold text-lg text-[#1F3864]">{term.name}</h4>
                                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                                                                        activeTerm === term.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                                                    }`}>
                                                                        {activeTerm === term.id ? 'Current Active Term' : 'Inactive'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Dates */}
                                                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
                                                        <div className="w-full sm:w-40">
                                                            <label className="block text-xs font-bold text-gray-500 mb-1">Start Date</label>
                                                            <input 
                                                                type="date" 
                                                                value={term.startDate}
                                                                onChange={(e) => handleTermChange(term.id, 'startDate', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-gray-700 text-sm"
                                                            />
                                                        </div>
                                                        <div className="w-full sm:w-40">
                                                            <label className="block text-xs font-bold text-gray-500 mb-1">End Date</label>
                                                            <input 
                                                                type="date" 
                                                                value={term.endDate}
                                                                onChange={(e) => handleTermChange(term.id, 'endDate', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-gray-700 text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end items-center">
                                <button 
                                    type="button"
                                    onClick={() => navigate('admin_dashboard')}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#2a4d8a] transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Configuration
                                </button>
                            </div>

                        </form>
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

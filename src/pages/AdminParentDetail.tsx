import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, ChevronLeft,
    Phone, Mail, Shield, Contact, Link as LinkIcon, Unlink, Key, CheckCircle, Clock, Plus, AlertTriangle
} from 'lucide-react';
import { useMockData } from '../store/MockDataContext';

export default function AdminParentDetail({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Contact, label: 'Guardians', path: 'admin_parents', active: true },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const parent = {
        id: "P001",
        name: "Mr. Emmanuel Osei",
        email: "e.osei@example.com",
        phone: "024 555 1234",
        status: "Confirmed",
        joinedDate: "Sept 12, 2021",
        address: "House No. 123, East Legon, Accra"
    };

    const { students } = useMockData();
    const studentS001 = students.find(s => s.id === 'STU002') || { id: 'STU002', rollNumber: '002', name: 'Abena Osei' };
    const studentS002 = students.find(s => s.id === 'STU001') || { id: 'STU001', rollNumber: '001', name: 'Kwame Osei' }; // Use Kwame Mensah as Kwame Osei
    
    const linkedChildren = [
        { id: studentS001.rollNumber, name: studentS001.name, class: "Grade 4 Gold", relation: "Father", status: "Active" },
        { id: studentS002.rollNumber, name: studentS002.name, class: "Grade 1 Blue", relation: "Father", status: "Active" }
    ];

    const pendingCodes = [
        { id: 1, studentName: "Daniel Osei", studentClass: "Grade 6 Silver", code: "X79-K4M", generatedDate: "Oct 10, 2023", status: "Pending" }
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
                        <div className="flex items-center gap-3 hidden sm:flex">
                            <button onClick={() => navigate('admin_parents')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Guardian Detail & Linkage Management</h2>
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
                                <p className="text-xs text-gray-500">Super Admin</p>
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
                                EO
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                                    {parent.name}
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-500/30">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Confirmed
                                    </span>
                                </h3>
                                <p className="text-blue-200 font-semibold mb-1">Guardian ID: {parent.id} &bull; Registered: {parent.joinedDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Contact Details */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                                    <Contact className="w-5 h-5 text-gray-400" />
                                    Contact Info
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Phone Number</p>
                                            <p className="font-semibold text-[#1F3864] mt-0.5">{parent.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Email Address</p>
                                            <p className="font-semibold text-[#1F3864] mt-0.5 break-all">{parent.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Residential Address</p>
                                        <p className="font-semibold text-[#1F3864] mt-0.5">{parent.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Linked Children */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                        <LinkIcon className="w-5 h-5 text-gray-400" />
                                        Linked Children
                                    </h4>
                                    <button onClick={() => navigate('empty_state')} className="text-sm font-bold bg-[#DCE6F1] text-[#1F3864] px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-blue-100 transition-colors">
                                        <Plus className="w-4 h-4" /> Link Child
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[500px]">
                                        <thead>
                                            <tr className="bg-[#1F3864] text-white">
                                                <th className="py-3 px-6 text-sm font-bold">Student Name</th>
                                                <th className="py-3 px-6 text-sm font-bold">Class</th>
                                                <th className="py-3 px-6 text-sm font-bold">Relation</th>
                                                <th className="py-3 px-6 text-sm font-bold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {linkedChildren.map((child, i) => (
                                                <tr key={child.id} className={`border-b border-gray-100 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                    <td className="py-4 px-6 font-bold text-[#1F3864]">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-[10px] shrink-0">
                                                                {child.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                            </div>
                                                            {child.name}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 font-semibold text-gray-600">{child.class}</td>
                                                    <td className="py-4 px-6 font-semibold text-gray-600">{child.relation}</td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button onClick={() => navigate('empty_state')} className="text-xs font-bold text-red-600 border border-red-200 bg-red-50 px-2 py-1.5 rounded flex items-center gap-1 hover:bg-red-100 transition-colors ml-auto">
                                                            <Unlink className="w-3.5 h-3.5" /> Unlink
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pending Linkage Codes */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h4 className="text-lg font-bold text-[#1F3864] flex items-center gap-2">
                                        <Key className="w-5 h-5 text-gray-400" />
                                        Pending Linkage Codes
                                    </h4>
                                    <button onClick={() => navigate('empty_state')} className="text-sm font-bold bg-[#1F3864] text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-[#2a4d8a] transition-colors">
                                        <Plus className="w-4 h-4" /> Generate New Code
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="bg-gray-50 text-gray-500">
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Student</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Linkage Code</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Generated</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {pendingCodes.map((code) => (
                                                <tr key={code.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 font-bold text-[#1F3864]">
                                                        {code.studentName}
                                                        <div className="text-xs text-gray-500 font-semibold">{code.studentClass}</div>
                                                    </td>
                                                    <td className="py-4 px-6 font-mono font-bold tracking-wider text-[#1F3864] bg-gray-100 rounded p-1 inline-block mt-3">{code.code}</td>
                                                    <td className="py-4 px-6 font-semibold text-gray-600">{code.generatedDate}</td>
                                                    <td className="py-4 px-6 text-center">
                                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] uppercase font-bold border bg-amber-50 text-amber-700 border-amber-200`}>
                                                            <Clock className="w-3 h-3" /> {code.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-right space-x-2">
                                                        <button onClick={() => navigate('empty_state')} className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1.5 rounded hover:bg-green-100 transition-colors">
                                                            Confirm
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {pendingCodes.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="py-8 text-center text-gray-500 font-semibold">
                                                        No pending linkage codes.
                                                    </td>
                                                </tr>
                                            )}
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

import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, Contact, Shield,
    BookOpen, Calculator, FileText, Download, FolderArchive, Activity,
    Camera, Save, MapPin, Phone, Mail, Globe, ArrowRight, CheckCircle2,
    CalendarDays
} from 'lucide-react';

export default function AdminSchoolProfile({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [formData, setFormData] = useState({
        schoolName: 'Accra Excellence Academy',
        motto: 'Empowering Minds, Shaping Futures',
        address: '15 Independence Avenue, Ridge',
        city: 'Accra',
        region: 'Greater Accra',
        phone: '+233 24 123 4567',
        email: 'info@accraexcellence.edu.gh',
        website: 'www.accraexcellence.edu.gh'
    });

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
        { icon: Download, label: 'Export Center', path: 'admin_export_center', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: true },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">School Profile & Settings</h2>
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
                    <div className="max-w-4xl mx-auto w-full">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1F3864] mb-1">School Profile</h2>
                                <p className="text-sm text-gray-500 font-semibold">Manage your institution's public profile, branding, and contact details.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {isSaved && (
                                    <span className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Changes Saved
                                    </span>
                                )}
                                <button 
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1F3864] text-white rounded-lg text-sm font-bold hover:bg-[#2a4d8a] transition-colors shadow-sm"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Profile
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Column: Form */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Basic Info Card */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-6">Basic Information</h3>
                                    
                                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                                        <div className="w-24 h-24 bg-[#F7F8FA] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-[#1F3864] transition-colors cursor-pointer shrink-0 group">
                                            <Camera className="w-8 h-8 mb-1 group-hover:text-[#1F3864]" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-[#1F3864]">Logo</span>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">School Name</label>
                                                <input 
                                                    type="text" 
                                                    name="schoolName"
                                                    value={formData.schoolName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">School Motto / Tagline</label>
                                                <input 
                                                    type="text" 
                                                    name="motto"
                                                    value={formData.motto}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Details Card */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-6">Location & Contact</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Street Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPin className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input 
                                                    type="text" 
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                                            <input 
                                                type="text" 
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Region</label>
                                            <input 
                                                type="text" 
                                                name="region"
                                                value={formData.region}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Phone className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input 
                                                    type="text" 
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Website</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Globe className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input 
                                                    type="text" 
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864]/20 focus:border-[#1F3864] transition-colors font-semibold text-[#1F3864]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Summaries & Links */}
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-[#1F3864]/30 transition-colors cursor-pointer" onClick={() => navigate('admin_academic_year')}>
                                    <div className="absolute top-0 right-0 p-4">
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#1F3864] transition-colors" />
                                    </div>
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                        <CalendarDays className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-2">Academic Settings</h3>
                                    <p className="text-sm text-gray-500 font-semibold mb-4">Manage academic years, terms, grading scales, and school holidays.</p>
                                    <div className="bg-[#F7F8FA] rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-gray-500 font-bold">Current Year</span>
                                            <span className="text-xs font-bold text-[#1F3864]">2023/2024</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500 font-bold">Active Term</span>
                                            <span className="text-xs font-bold text-green-600">Term 1</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#1F3864] to-[#2a4d8a] p-6 rounded-xl text-white shadow-md">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">System Security</h3>
                                    <p className="text-sm text-blue-100 mb-4 font-medium">Your platform is secured with role-based access control and encrypted connections.</p>
                                    <button onClick={() => navigate('admin_activity_log')} className="w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm font-bold backdrop-blur-sm">
                                        View Security Logs
                                    </button>
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

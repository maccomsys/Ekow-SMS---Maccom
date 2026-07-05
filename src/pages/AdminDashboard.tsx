import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, FileX, MessageSquare, Settings,
    UserPlus, ClipboardList, TrendingUp, Activity, Megaphone
} from 'lucide-react';

export default function AdminDashboard({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: true },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const stats = [
        { title: "Total Students", value: "1,245", trend: "+12 this term", icon: GraduationCap },
        { title: "Total Teachers", value: "84", trend: "+2 this term", icon: Users },
        { title: "Total Classes", value: "32", trend: "No change", icon: Building2 },
        { title: "Today's Attendance", value: "95.2%", trend: "+1.2% from yesterday", icon: TrendingUp },
    ];

    const activities = [
        { time: "10:30 AM", user: "Mr. Michael Addo", action: "Posted new homework for Grade 4 Gold" },
        { time: "09:15 AM", user: "Mrs. Sarah Mensah", action: "Submitted attendance for Grade 5 Silver" },
        { time: "08:45 AM", user: "Admin", action: "Enrolled new student 'Kwame Osei' into Grade 1" },
        { time: "Yesterday", user: "System", action: "Weekly attendance reports generated automatically" },
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
                        <p className="text-xs text-gray-500 uppercase font-semibold">Admin Portal</p>
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
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Admin Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
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
                <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
                    {isLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center h-[60vh]">
                            <div className="w-12 h-12 border-4 border-[#DCE6F1] border-t-[#1F3864] rounded-full animate-spin mb-4"></div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Dashboard</h2>
                            <p className="text-gray-500">Fetching your latest data...</p>
                        </div>
                    ) : (
                        <>
                    {/* Welcome Banner */}
                    <div>
                        <h2 className="text-3xl font-bold text-[#1F3864] mb-2">Welcome back, Principal Mensah</h2>
                        <p className="text-gray-600 font-semibold">Here is what's happening at SchoolLink today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864]">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.title}</h3>
                                <p className="text-3xl font-bold text-[#1F3864] mb-2">{stat.value}</p>
                                <p className="text-xs font-semibold text-green-600">{stat.trend}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quick Links */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-1 flex flex-col">
                            <h3 className="text-lg font-bold text-[#1F3864] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                <LayoutDashboard className="w-5 h-5 text-gray-400" />
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-1 gap-3 flex-1">
                                <button 
                                    onClick={() => navigate('admin_student_form')}
                                    className="bg-[#F7F8FA] border border-gray-200 text-[#1F3864] rounded-lg p-4 flex items-center gap-4 hover:bg-[#DCE6F1] transition-colors shadow-sm text-left"
                                >
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <UserPlus className="w-5 h-5 text-[#1F3864]" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm">Add New Student</span>
                                        <span className="block text-xs font-semibold text-gray-500">Enroll a student</span>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => navigate('admin_teachers')}
                                    className="bg-[#F7F8FA] border border-gray-200 text-[#1F3864] rounded-lg p-4 flex items-center gap-4 hover:bg-[#DCE6F1] transition-colors shadow-sm text-left"
                                >
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <Users className="w-5 h-5 text-[#1F3864]" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm">Add New Teacher</span>
                                        <span className="block text-xs font-semibold text-gray-500">Onboard a staff member</span>
                                    </div>
                                </button>
                                <button onClick={() => navigate('empty_state')} className="bg-[#F7F8FA] border border-gray-200 text-[#1F3864] rounded-lg p-4 flex items-center gap-4 hover:bg-[#DCE6F1] transition-colors shadow-sm text-left">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <Megaphone className="w-5 h-5 text-[#1F3864]" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm">School Announcement</span>
                                        <span className="block text-xs font-semibold text-gray-500">Broadcast a message</span>
                                    </div>
                                </button>
                                <button onClick={() => navigate('empty_state')} className="bg-[#F7F8FA] border border-gray-200 text-[#1F3864] rounded-lg p-4 flex items-center gap-4 hover:bg-[#DCE6F1] transition-colors shadow-sm text-left">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <ClipboardList className="w-5 h-5 text-[#1F3864]" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm">Generate Reports</span>
                                        <span className="block text-xs font-semibold text-gray-500">View analytics</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-2 flex flex-col">
                            <h3 className="text-lg font-bold text-[#1F3864] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                <Activity className="w-5 h-5 text-gray-400" />
                                Recent Activity
                            </h3>
                            <div className="space-y-6 flex-1">
                                {activities.map((activity, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#1F3864] mt-1.5"></div>
                                            {index !== activities.length - 1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                                        </div>
                                        <div className="pb-6">
                                            <p className="text-sm font-semibold text-gray-500 mb-0.5">{activity.time}</p>
                                            <p className="text-[#1F3864] text-sm">
                                                <span className="font-bold">{activity.user}</span> {activity.action}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => navigate('admin_activity_log')} className="w-full mt-4 py-2.5 text-sm font-bold text-[#1F3864] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                View All Activity
                            </button>
                        </div>
                    </div>
                    </>
                    )}
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

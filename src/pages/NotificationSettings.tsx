import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, 
    Bell, Smartphone, Mail, Globe, ShieldAlert, FileText, CheckCircle
} from 'lucide-react';

interface NotificationSettingsProps {
    navigate: (route: string) => void;
}

export default function NotificationSettings({ navigate }: NotificationSettingsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const sidebarNavItems = [
        { icon: LayoutDashboard, label: 'Dashboard', route: 'admin_dashboard' },
        { icon: Users, label: 'Directory', route: 'admin_students' },
        { icon: BookOpen, label: 'Academics', route: 'admin_classes' },
        { icon: Settings, label: 'Settings', route: 'admin_school_profile', active: true },
    ];

    const [settings, setSettings] = useState({
        email_daily_summary: true,
        email_new_users: true,
        email_system_alerts: true,
        push_attendance: false,
        push_messages: true,
        push_alerts: true,
        sms_critical: true
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex flex-col md:flex-row font-sans">
            {/* Mobile Header */}
            <div className="md:hidden bg-[#1F3864] text-white p-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-xl font-bold tracking-tight">SchoolLink</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1F3864] text-white
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                flex flex-col
            `}>
                <div className="hidden md:flex p-6 items-center gap-3 border-b border-white/10">
                    <BookOpen className="w-8 h-8 text-white" />
                    <span className="text-2xl font-bold tracking-tight">SchoolLink</span>
                </div>

                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">AD</span>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Administrator</p>
                        <p className="text-xs text-white/70">System Admin</p>
                    </div>
                </div>

                <nav className="flex-1 py-4 flex flex-col gap-1 px-3 overflow-y-auto">
                    {sidebarNavItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                navigate(item.route);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                item.active 
                                ? 'bg-white/10 font-medium' 
                                : 'text-white/80 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : ''}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button 
                        onClick={() => navigate('splash')}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <h1 className="text-2xl font-bold text-[#1F3864]">Notification Settings</h1>
                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-400 hover:text-[#1F3864] transition-colors relative">
                            <Bell className="w-6 h-6" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1F3864] text-white flex items-center justify-center font-bold text-sm">
                                AD
                            </div>
                            <span className="font-medium text-gray-700">System Admin</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        
                        {/* Email Notifications */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#DCE6F1]/20 flex items-center gap-3">
                                <Mail className="w-6 h-6 text-[#1F3864]" />
                                <div>
                                    <h2 className="text-lg font-bold text-[#1F3864]">Email Notifications</h2>
                                    <p className="text-sm text-gray-500">Manage what alerts are sent to your registered email address.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Daily Summary Report</h4>
                                        <p className="text-sm text-gray-500 mt-1">Receive a daily digest of school attendance, new enrollments, and activities.</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle('email_daily_summary')}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1F3864] focus:ring-offset-2 ${settings.email_daily_summary ? 'bg-[#1F3864]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.email_daily_summary ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900">New User Registrations</h4>
                                        <p className="text-sm text-gray-500 mt-1">Get notified when a new teacher or administrator account is created.</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle('email_new_users')}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1F3864] focus:ring-offset-2 ${settings.email_new_users ? 'bg-[#1F3864]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.email_new_users ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900">System Alerts & Security</h4>
                                        <p className="text-sm text-gray-500 mt-1">Receive immediate emails for failed login attempts or security events.</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle('email_system_alerts')}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1F3864] focus:ring-offset-2 ${settings.email_system_alerts ? 'bg-[#1F3864]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.email_system_alerts ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Push Notifications */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#DCE6F1]/20 flex items-center gap-3">
                                <Smartphone className="w-6 h-6 text-[#1F3864]" />
                                <div>
                                    <h2 className="text-lg font-bold text-[#1F3864]">Push Notifications</h2>
                                    <p className="text-sm text-gray-500">Manage alerts sent directly to your device or browser.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Direct Messages</h4>
                                        <p className="text-sm text-gray-500 mt-1">Get push notifications for new messages from teachers or parents.</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle('push_messages')}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1F3864] focus:ring-offset-2 ${settings.push_messages ? 'bg-[#1F3864]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.push_messages ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Critical Alerts</h4>
                                        <p className="text-sm text-gray-500 mt-1">Immediate notifications for emergency broadcasts or critical system issues.</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle('push_alerts')}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1F3864] focus:ring-offset-2 ${settings.push_alerts ? 'bg-[#1F3864]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.push_alerts ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-6 border-t border-gray-100">
                                <button className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#1F3864]/90 transition-colors w-full sm:w-auto">
                                    Save Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe overflow-x-auto">
                {sidebarNavItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.route)}
                        className={`flex flex-col items-center p-2 min-w-[64px] ${item.active ? 'text-[#1F3864]' : 'text-gray-500 hover:bg-gray-50'} rounded-lg transition-colors`}
                    >
                        <item.icon className={`w-5 h-5 mb-1 ${item.active ? 'text-[#1F3864]' : 'text-gray-500'}`} />
                        <span className={`text-[10px] whitespace-nowrap ${item.active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

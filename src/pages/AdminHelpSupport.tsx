import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, 
    Bell, HelpCircle, Phone, Mail, MessageSquare, ExternalLink, ChevronRight, Search
} from 'lucide-react';

interface AdminHelpSupportProps {
    navigate: (route: string) => void;
}

export default function AdminHelpSupport({ navigate }: AdminHelpSupportProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const sidebarNavItems = [
        { icon: LayoutDashboard, label: 'Dashboard', route: 'admin_dashboard' },
        { icon: Users, label: 'Directory', route: 'admin_students' },
        { icon: BookOpen, label: 'Academics', route: 'admin_classes' },
        { icon: Settings, label: 'Settings', route: 'admin_school_profile', active: true },
    ];

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
                    <h1 className="text-2xl font-bold text-[#1F3864]">Help & Support</h1>
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
                    <div className="max-w-4xl mx-auto space-y-6">
                        
                        {/* Search Help */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <HelpCircle className="w-12 h-12 text-[#1F3864] mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h2>
                            <p className="text-gray-500 mb-6">Search our knowledge base or browse frequently asked questions.</p>
                            
                            <div className="max-w-xl mx-auto relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for articles, guides, or FAQs..."
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-[#1F3864] focus:border-[#1F3864] text-base shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Contact Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-[#1F3864]/10 flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-6 h-6 text-[#1F3864]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Live Chat Support</h3>
                                    <p className="text-sm text-gray-500 mb-3">Chat with our support team in real-time. Available Mon-Fri, 8am-5pm.</p>
                                    <span className="text-[#1F3864] font-medium text-sm flex items-center gap-1">Start a chat <ChevronRight className="w-4 h-4" /></span>
                                </div>
                            </div>
                            
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-[#1F3864]/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-[#1F3864]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email Support</h3>
                                    <p className="text-sm text-gray-500 mb-3">Send us an email and we'll get back to you within 24 hours.</p>
                                    <span className="text-[#1F3864] font-medium text-sm flex items-center gap-1">support@schoollink.edu.gh <ChevronRight className="w-4 h-4" /></span>
                                </div>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#DCE6F1]/20">
                                <h2 className="text-lg font-bold text-[#1F3864]">Frequently Asked Questions</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    'How do I add a new student or teacher?',
                                    'Where can I export attendance reports?',
                                    'How do I reset a user\'s password?',
                                    'Can I change the school\'s grading scale?',
                                    'How do I manage user roles and permissions?'
                                ].map((question, i) => (
                                    <div key={i} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center group">
                                        <h4 className="font-medium text-gray-900 group-hover:text-[#1F3864]">{question}</h4>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#1F3864]" />
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                                <button className="text-[#1F3864] font-medium text-sm hover:underline flex items-center justify-center gap-1 mx-auto">
                                    View all FAQs <ExternalLink className="w-4 h-4" />
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

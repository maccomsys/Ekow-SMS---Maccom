import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, ChevronLeft,
    Shield, Lock, Plus, Check, X
} from 'lucide-react';

export default function AdminRolesPermissions({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: false },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Shield, label: 'Administrators', path: 'admin_accounts', active: false },
        { icon: Lock, label: 'Roles', path: 'admin_roles', active: true },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const [roles, setRoles] = useState([
        { 
            id: 1, 
            name: 'Super Admin', 
            description: 'Full access to all system features and settings.',
            users: 2,
            permissions: {
                studentRecords: true,
                teacherRecords: true,
                reports: true,
                announcements: true,
                settings: true
            }
        },
        { 
            id: 2, 
            name: 'Academic Head', 
            description: 'Can manage academic records, reports, and teachers.',
            users: 4,
            permissions: {
                studentRecords: true,
                teacherRecords: true,
                reports: true,
                announcements: true,
                settings: false
            }
        },
        { 
            id: 3, 
            name: 'Records Officer', 
            description: 'Can view and update student information and attendance.',
            users: 5,
            permissions: {
                studentRecords: true,
                teacherRecords: false,
                reports: true,
                announcements: false,
                settings: false
            }
        }
    ]);

    const togglePermission = (roleId: number, module: string) => {
        setRoles(roles.map(role => {
            if (role.id === roleId && role.name !== 'Super Admin') {
                return {
                    ...role,
                    permissions: {
                        ...role.permissions,
                        [module]: !role.permissions[module as keyof typeof role.permissions]
                    }
                };
            }
            return role;
        }));
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
                            <h2 className="text-xl font-bold text-[#1F3864]">Roles & Permissions</h2>
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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1F3864] mb-1">Roles & Permissions</h2>
                            <p className="text-sm text-gray-500 font-semibold">Define roles and module-level access for staff members.</p>
                        </div>
                        <button onClick={() => navigate('empty_state')} 
                            className="w-full sm:w-auto bg-[#1F3864] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#2a4d8a] transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Create Role
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roles.map((role) => (
                            <div key={role.id} className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#DCE6F1] text-[#1F3864] flex items-center justify-center shrink-0">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
                                            {role.users} Users
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1F3864] mb-2">{role.name}</h3>
                                    <p className="text-sm text-gray-500 font-semibold mb-6">{role.description}</p>
                                    
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Module Permissions</h4>
                                        
                                        <label className={`flex items-center justify-between p-2 rounded-lg transition-colors ${role.name !== 'Super Admin' ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-70'}`}>
                                            <span className="text-sm font-bold text-gray-700">Student Records</span>
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only" 
                                                    checked={role.permissions.studentRecords}
                                                    onChange={() => togglePermission(role.id, 'studentRecords')}
                                                    disabled={role.name === 'Super Admin'}
                                                />
                                                <div className={`block w-10 h-6 rounded-full transition-colors ${role.permissions.studentRecords ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${role.permissions.studentRecords ? 'transform translate-x-4' : ''}`}></div>
                                            </div>
                                        </label>
                                        
                                        <label className={`flex items-center justify-between p-2 rounded-lg transition-colors ${role.name !== 'Super Admin' ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-70'}`}>
                                            <span className="text-sm font-bold text-gray-700">Teacher Records</span>
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only" 
                                                    checked={role.permissions.teacherRecords}
                                                    onChange={() => togglePermission(role.id, 'teacherRecords')}
                                                    disabled={role.name === 'Super Admin'}
                                                />
                                                <div className={`block w-10 h-6 rounded-full transition-colors ${role.permissions.teacherRecords ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${role.permissions.teacherRecords ? 'transform translate-x-4' : ''}`}></div>
                                            </div>
                                        </label>

                                        <label className={`flex items-center justify-between p-2 rounded-lg transition-colors ${role.name !== 'Super Admin' ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-70'}`}>
                                            <span className="text-sm font-bold text-gray-700">Reports</span>
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only" 
                                                    checked={role.permissions.reports}
                                                    onChange={() => togglePermission(role.id, 'reports')}
                                                    disabled={role.name === 'Super Admin'}
                                                />
                                                <div className={`block w-10 h-6 rounded-full transition-colors ${role.permissions.reports ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${role.permissions.reports ? 'transform translate-x-4' : ''}`}></div>
                                            </div>
                                        </label>

                                        <label className={`flex items-center justify-between p-2 rounded-lg transition-colors ${role.name !== 'Super Admin' ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-70'}`}>
                                            <span className="text-sm font-bold text-gray-700">Announcements</span>
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only" 
                                                    checked={role.permissions.announcements}
                                                    onChange={() => togglePermission(role.id, 'announcements')}
                                                    disabled={role.name === 'Super Admin'}
                                                />
                                                <div className={`block w-10 h-6 rounded-full transition-colors ${role.permissions.announcements ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${role.permissions.announcements ? 'transform translate-x-4' : ''}`}></div>
                                            </div>
                                        </label>

                                        <label className={`flex items-center justify-between p-2 rounded-lg transition-colors ${role.name !== 'Super Admin' ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-70'}`}>
                                            <span className="text-sm font-bold text-gray-700">System Settings</span>
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only" 
                                                    checked={role.permissions.settings}
                                                    onChange={() => togglePermission(role.id, 'settings')}
                                                    disabled={role.name === 'Super Admin'}
                                                />
                                                <div className={`block w-10 h-6 rounded-full transition-colors ${role.permissions.settings ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${role.permissions.settings ? 'transform translate-x-4' : ''}`}></div>
                                            </div>
                                        </label>

                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                                    <button onClick={() => navigate('parent_profile')} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        ))}
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

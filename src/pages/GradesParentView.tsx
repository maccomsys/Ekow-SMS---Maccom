import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, ChevronDown, FileBadge, MessageCircle, BookMarked, MessageSquare, User, FolderOpen
} from 'lucide-react';

export default function GradesParentView({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState("Term 1 - 2024");
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'parent_dashboard', active: false },
        { icon: Users, label: 'Switch Child', path: 'child_switcher', active: false },
        { icon: BookOpen, label: 'Academics', path: 'grades_parent', active: true },
        { icon: BookMarked, label: 'Homework', path: 'homework_parent', active: false },
        { icon: FileText, label: 'Attendance', path: 'attendance_parent', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'announcements_parent', active: false },
        { icon: User, label: 'Profile', path: 'parent_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { gradeRecords } = useMockData();
    const subjects = gradeRecords.filter(g => g.studentId === 'STU001').map(g => ({
        id: g.id,
        name: g.subject,
        overallScore: g.overallScore + "%",
        grade: g.grade,
        assessments: g.assessments || []
    }));

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1F3864]">SchoolLink</h1>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Parent Portal</p>
                    </div>
                    <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                        <FileX className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="flex-1 py-6 px-4 space-y-2">
                    {navItems.map((item, i) => (
                        <button 
                            key={i as number}
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
            <div className="md:ml-[260px] flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">Academic Performance</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">John Doe</p>
                                <p className="text-xs text-gray-500">Parent Account</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
                    
                    {/* Header & Term Selector */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-[#1F3864]">Kwame Mensah</h3>
                            <p className="text-gray-600 font-semibold text-sm mt-1">Grade 4 Gold - Ghana Academy</p>
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <select 
                                className="w-full sm:w-56 appearance-none bg-white border border-[#1F3864]/20 text-[#1F3864] font-semibold py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3864] cursor-pointer shadow-sm"
                                value={selectedTerm}
                                onChange={(e) => setSelectedTerm(e.target.value)}
                            >
                                <option value="Term 1 - 2024">Term 1 - 2024 (Current)</option>
                                <option value="Term 3 - 2023">Term 3 - 2023</option>
                                <option value="Term 2 - 2023">Term 2 - 2023</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F3864] pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {subjects.map((subject) => (
                            <div key={subject.id as string} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50">
                                    <div className="flex items-center gap-2 text-[#1F3864]">
                                        <FileBadge className="w-6 h-6" />
                                        <h3 className="text-lg font-bold">{subject.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-gray-500 uppercase">Overall</span>
                                            <span className="text-xl font-bold text-[#1F3864]">{subject.overallScore}</span>
                                        </div>
                                        <div className="w-px h-8 bg-gray-300"></div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-gray-500 uppercase">Grade</span>
                                            <span className="text-xl font-bold text-green-700">{subject.grade}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#1F3864] text-white">
                                                <th className="py-3 px-5 text-sm font-bold w-1/4">Assessment</th>
                                                <th className="py-3 px-5 text-sm font-bold w-1/6">Date</th>
                                                <th className="py-3 px-5 text-sm font-bold w-1/6">Score</th>
                                                <th className="py-3 px-5 text-sm font-bold w-5/12">Comments</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {subject.assessments.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="py-12 px-5 text-center text-gray-500">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div className="w-16 h-16 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-4 text-[#1F3864]">
                                                                <FolderOpen className="w-8 h-8" />
                                                            </div>
                                                            <h2 className="text-xl font-bold text-gray-900 mb-2">No assessments</h2>
                                                            <p className="text-gray-500">There are currently no assessments recorded for this subject.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                subject.assessments.map((assessment, i) => (
                                                    <tr key={i as number} className={`border-b border-gray-100 ${i % 2 !== 0 ? 'bg-[#DCE6F1]/40' : 'bg-white'}`}>
                                                        <td className="py-4 px-5 font-bold text-[#1F3864]">{assessment.title}</td>
                                                        <td className="py-4 px-5 font-semibold text-gray-600">{assessment.date}</td>
                                                        <td className="py-4 px-5 font-bold text-[#1F3864]">{assessment.score}</td>
                                                        <td className="py-4 px-5">
                                                            {assessment.comment ? (
                                                                <div className="flex items-start gap-2 text-gray-600">
                                                                    <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                                                    <span className="italic">{assessment.comment}</span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-gray-400">-</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>

                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe">
                {navItems.filter(item => item.label !== 'Logout').map((item, i) => (
                    <button 
                        key={i as number}
                        onClick={() => {
                            if (item.path !== '#') navigate(item.path);
                        }}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                            item.active 
                                ? 'text-[#1F3864]' 
                                : 'text-gray-500 hover:text-[#1F3864]'
                        }`}
                    >
                        <item.icon className={`w-6 h-6 mb-1 ${item.active ? 'fill-[#1F3864]/10' : ''}`} />
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

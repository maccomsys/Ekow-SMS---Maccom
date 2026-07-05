import React, { useState } from 'react';
import { useMockData } from '../store/MockDataContext';
import { 
    LayoutDashboard, Users, BookOpen, FileText, Bell, 
    LogOut, Menu, FileX, BookMarked, MessageSquare, User,
    CheckSquare, ChevronLeft, Save, FileBadge
} from 'lucide-react';

export default function TeacherGradeEntry({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'teacher_dashboard', active: false },
        { icon: Users, label: 'Classes & Subjects', path: 'teacher_classes', active: false },
        { icon: CheckSquare, label: 'Attendance', path: 'teacher_attendance', active: false },
        { icon: BookMarked, label: 'Homework', path: 'teacher_homework_list', active: false },
        { icon: FileText, label: 'Grades', path: 'teacher_grades_entry', active: true },
        { icon: MessageSquare, label: 'Announcements', path: 'teacher_announcement', active: false },
        { icon: User, label: 'Profile', path: 'teacher_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const { students: globalStudents, gradeRecords, updateGradeRecord } = useMockData();
    
    // Local state for the current editing session
    const [students, setStudents] = useState(
        globalStudents.map(s => ({
            id: s.id,
            name: s.name,
            rollNumber: s.rollNumber,
            score: '',
            comment: ''
        }))
    );

    const handleScoreChange = (id: string, value: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, score: value } : s));
    };

    const handleCommentChange = (id: string, value: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, comment: value } : s));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Save back to MockDataContext
        students.forEach(student => {
            if (student.score) {
                // Determine what subject this is for. For simplicity, assume Mathematics.
                const subject = "Mathematics";
                const record = gradeRecords.find(g => g.studentId === student.id && g.subject === subject);
                
                if (record) {
                    // Update existing record
                    updateGradeRecord(student.id, subject, {
                        assessments: [
                            ...record.assessments,
                            {
                                title: "New Assignment", // or whatever the form's assessment name is
                                score: student.score,
                                date: new Date().toLocaleDateString(),
                                comment: student.comment || null
                            }
                        ]
                    });
                }
            }
        });
        
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            navigate('teacher_dashboard');
        }, 1500);
    };

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-[#1F3864] font-sans">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1F3864]">SchoolLink</h1>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Teacher Portal</p>
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
                        <div className="flex items-center gap-3 hidden sm:flex">
                            <button onClick={() => navigate('teacher_classes')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Grade Entry</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('notifications_inbox')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1F3864]">Mr. Addo</p>
                                <p className="text-xs text-gray-500">Teacher Account</p>
                            </div>
                            <div className="w-10 h-10 bg-[#DCE6F1] rounded-full flex items-center justify-center text-[#1F3864] font-bold border border-[#1F3864]/20">
                                MA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full relative">
                    {showConfirmation && (
                        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 flex items-center gap-2 font-bold animate-fade-in-down">
                            <CheckSquare className="w-5 h-5" />
                            Grades submitted successfully! Returning to dashboard...
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Info */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-[#DCE6F1] text-[#1F3864] text-xs font-bold px-2 py-0.5 rounded">Grade 4 Gold</span>
                            <span className="text-gray-500 text-sm font-semibold">• Mathematics</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assessment Name</label>
                                <input required 
                                    type="text" 
                                    placeholder="e.g., Mid-Term Examination" 
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] transition-colors"
                                  />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Academic Term</label>
                                <select required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-semibold text-[#1F3864] bg-white transition-colors cursor-pointer">
                                    <option value="term1">Term 1 (Sep - Dec)</option>
                                    <option value="term2">Term 2 (Jan - Apr)</option>
                                    <option value="term3">Term 3 (May - Jul)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Grading Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-[#1F3864] flex items-center gap-2">
                                <FileBadge className="w-5 h-5" />
                                Student Roster ({students.length})
                            </h3>
                            <div className="text-sm font-semibold text-gray-500">
                                Max Score: <span className="font-bold text-[#1F3864]">100</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-[#1F3864] text-white">
                                        <th className="py-3 px-5 text-sm font-bold w-16">Roll</th>
                                        <th className="py-3 px-5 text-sm font-bold w-1/3">Student Name</th>
                                        <th className="py-3 px-5 text-sm font-bold w-32 text-center">Score</th>
                                        <th className="py-3 px-5 text-sm font-bold">Comment (Optional)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {students.map((student, i) => (
                                        <tr key={student.id as string} className={`border-b border-gray-100 transition-colors ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                            <td className="py-3 px-5 font-bold text-gray-500">{student.rollNumber}</td>
                                            <td className="py-3 px-5 font-bold text-[#1F3864]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#DCE6F1] flex items-center justify-center text-[#1F3864] font-bold text-xs shrink-0">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td className="py-3 px-5">
                                                <input 
                                                    type="number" required 
                                                    min="0" 
                                                    max="100"
                                                    placeholder="0"
                                                    value={student.score}
                                                    onChange={(e) => handleScoreChange(student.id as string, e.target.value)}
                                                    className="w-full text-center border border-gray-300 rounded-md py-1.5 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] font-bold text-[#1F3864] transition-colors"
                                                />
                                            </td>
                                            <td className="py-3 px-5">
                                                <input required 
                                                    type="text" 
                                                    placeholder="Add a remark..."
                                                    value={student.comment}
                                                    onChange={(e) => handleCommentChange(student.id as string, e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-[#1F3864] focus:ring-1 focus:ring-[#1F3864] text-gray-700 transition-colors"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 pb-8">
                        <button 
                            type="button"
                            onClick={() => navigate('teacher_grade_history')}
                            className="px-6 py-2.5 bg-white border border-gray-200 text-[#1F3864] font-bold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                        >
                            View History
                        </button>
                        <button type="button" onClick={() => navigate('teacher_grades_entry')} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
                            Save as Draft
                        </button>
                        <button type="submit" className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#162a4d] transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                            <Save className="w-4 h-4" />
                            Submit Grades
                        </button>
                    </div>

                
                    </form>
                </main>
            </div>
            
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-40 pb-safe overflow-x-auto">
                {navItems.filter(item => item.label !== 'Logout').map((item, i) => (
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

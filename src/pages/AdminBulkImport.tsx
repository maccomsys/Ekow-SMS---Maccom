import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, GraduationCap, Building2, CalendarCheck, 
    Bell, LogOut, Menu, MessageSquare, Settings, ChevronLeft,
    UploadCloud, Download, FileText, CheckCircle, AlertTriangle, XCircle, ChevronRight, Play, Check
} from 'lucide-react';

export default function AdminBulkImport({ navigate }: { navigate: (path: string) => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Upload, 2: Preview, 3: Validation

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: 'admin_dashboard', active: false },
        { icon: GraduationCap, label: 'Students', path: 'admin_students', active: true },
        { icon: Users, label: 'Teachers', path: 'admin_teachers', active: false },
        { icon: Building2, label: 'Classes', path: 'admin_classes', active: false },
        { icon: CalendarCheck, label: 'Attendance', path: 'admin_attendance_oversight', active: false },
        { icon: MessageSquare, label: 'Announcements', path: 'admin_announcements', active: false },
        { icon: Settings, label: 'Settings', path: 'admin_school_profile', active: false },
        { icon: LogOut, label: 'Logout', path: 'login', active: false },
        { icon: Menu, label: 'Sitemap', path: 'sitemap', active: false }
    ];

    const previewData = [
        { row: 1, firstName: 'Kwame', lastName: 'Mensah', class: 'Grade 4', contact: '0241234567' },
        { row: 2, firstName: 'Abena', lastName: 'Osei', class: 'Grade 5', contact: '0209876543' },
        { row: 3, firstName: 'Samuel', lastName: 'Addo', class: 'Grade 4', contact: '0551112233' },
    ];

    const validationResults = {
        total: 150,
        accepted: 145,
        rejected: 5,
        errors: [
            { row: 42, error: 'Missing Class assignment' },
            { row: 87, error: 'Invalid phone number format' },
            { row: 91, error: 'Duplicate student record' },
            { row: 112, error: 'Missing First Name' },
            { row: 134, error: 'Invalid Grade level' }
        ]
    };

    const handleUpload = (e: React.DragEvent | React.ChangeEvent) => {
        e.preventDefault();
        // Simulate file upload
        setTimeout(() => setStep(2), 500);
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
                        <XCircle className="w-6 h-6" />
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
                            <button onClick={() => navigate('admin_students')} className="text-gray-400 hover:text-[#1F3864] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-[#1F3864]">Bulk Import Users</h2>
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
                <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
                    
                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-8 relative">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                        
                        <div className="flex flex-col items-center gap-2 bg-[#F7F8FA] px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#1F3864] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {step > 1 ? <Check className="w-4 h-4" /> : 1}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${step >= 1 ? 'text-[#1F3864]' : 'text-gray-400'}`}>Upload CSV</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 bg-[#F7F8FA] px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#1F3864] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {step > 2 ? <Check className="w-4 h-4" /> : 2}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${step >= 2 ? 'text-[#1F3864]' : 'text-gray-400'}`}>Map Columns</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 bg-[#F7F8FA] px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-[#1F3864] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                3
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${step >= 3 ? 'text-[#1F3864]' : 'text-gray-400'}`}>Validation</span>
                        </div>
                    </div>

                    {/* Step 1: Upload */}
                    {step === 1 && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
                            <div className="max-w-md mx-auto space-y-2">
                                <h3 className="text-xl font-bold text-[#1F3864]">Upload User Data</h3>
                                <p className="text-sm text-gray-500 font-semibold">Upload a CSV file containing student or teacher records to import them in bulk.</p>
                            </div>
                            
                            <div 
                                className="border-2 border-dashed border-[#1F3864]/30 rounded-xl p-12 hover:bg-gray-50 transition-colors cursor-pointer group"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleUpload}
                                onClick={() => setStep(2)}
                            >
                                <div className="w-16 h-16 bg-[#DCE6F1] text-[#1F3864] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-[#1F3864] mb-1">Click to browse or drag and drop</h4>
                                <p className="text-sm text-gray-500 font-semibold mb-4">Supported formats: .csv, .xlsx (Max 10MB)</p>
                                <div className="inline-block px-4 py-2 bg-white border border-gray-200 text-[#1F3864] font-bold rounded-lg shadow-sm group-hover:border-[#1F3864]">
                                    Select File
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-left">
                                    <h5 className="font-bold text-[#1F3864] mb-1">Need a template?</h5>
                                    <p className="text-xs text-gray-500 font-semibold">Download our standard CSV format to ensure smooth processing.</p>
                                </div>
                                <button onClick={() => navigate('empty_state')} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#1F3864] font-bold rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                                    <Download className="w-4 h-4" /> Download Template
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Mapping & Preview */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1F3864]">students_2023.csv</h3>
                                        <p className="text-sm text-gray-500 font-semibold">150 rows detected. Map your CSV columns to system fields.</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#1F3864] text-white">
                                                <th className="py-3 px-4 text-xs font-bold uppercase w-16">Row</th>
                                                <th className="py-3 px-4 text-xs font-bold uppercase">
                                                    CSV: First Name
                                                    <select required className="mt-2 w-full text-sm font-semibold text-[#1F3864] bg-white border-none rounded py-1 px-2 focus:ring-0 cursor-pointer">
                                                        <option>Map to: First Name</option>
                                                    </select>
                                                </th>
                                                <th className="py-3 px-4 text-xs font-bold uppercase">
                                                    CSV: Last Name
                                                    <select required className="mt-2 w-full text-sm font-semibold text-[#1F3864] bg-white border-none rounded py-1 px-2 focus:ring-0 cursor-pointer">
                                                        <option>Map to: Last Name</option>
                                                    </select>
                                                </th>
                                                <th className="py-3 px-4 text-xs font-bold uppercase">
                                                    CSV: Class
                                                    <select required className="mt-2 w-full text-sm font-semibold text-[#1F3864] bg-white border-none rounded py-1 px-2 focus:ring-0 cursor-pointer">
                                                        <option>Map to: Grade Level</option>
                                                    </select>
                                                </th>
                                                <th className="py-3 px-4 text-xs font-bold uppercase">
                                                    CSV: Phone
                                                    <select required className="mt-2 w-full text-sm font-semibold text-[#1F3864] bg-white border-none rounded py-1 px-2 focus:ring-0 cursor-pointer">
                                                        <option>Map to: Guardian Phone</option>
                                                    </select>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {previewData.map((row, i) => (
                                                <tr key={row.row} className={`border-b border-gray-100 ${i % 2 !== 0 ? 'bg-[#DCE6F1]/20' : 'bg-white'}`}>
                                                    <td className="py-3 px-4 font-bold text-gray-500">{row.row}</td>
                                                    <td className="py-3 px-4 font-semibold text-gray-700">{row.firstName}</td>
                                                    <td className="py-3 px-4 font-semibold text-gray-700">{row.lastName}</td>
                                                    <td className="py-3 px-4 font-semibold text-gray-700">{row.class}</td>
                                                    <td className="py-3 px-4 font-semibold text-gray-700">{row.contact}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <button 
                                    onClick={() => setStep(1)}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => setStep(3)}
                                    className="px-6 py-2.5 bg-[#1F3864] text-white font-bold rounded-lg hover:bg-[#2a4d8a] transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    Validate Data <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Validation */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
                                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Total Rows</p>
                                    <p className="text-3xl font-bold text-[#1F3864]">{validationResults.total}</p>
                                </div>
                                <div className="bg-green-50 rounded-xl border border-green-200 shadow-sm p-6 text-center">
                                    <p className="text-sm font-bold text-green-700 uppercase mb-1">Ready to Import</p>
                                    <p className="text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
                                        <CheckCircle className="w-6 h-6" /> {validationResults.accepted}
                                    </p>
                                </div>
                                <div className="bg-red-50 rounded-xl border border-red-200 shadow-sm p-6 text-center">
                                    <p className="text-sm font-bold text-red-700 uppercase mb-1">Errors Found</p>
                                    <p className="text-3xl font-bold text-red-700 flex items-center justify-center gap-2">
                                        <AlertTriangle className="w-6 h-6" /> {validationResults.rejected}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-gray-50">
                                    <h4 className="font-bold text-[#1F3864] flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-red-500" />
                                        Validation Errors
                                    </h4>
                                </div>
                                <ul className="divide-y divide-gray-100">
                                    {validationResults.errors.map((error, i) => (
                                        <li key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <span className="font-semibold text-gray-600 text-sm">Row {error.row}</span>
                                            <span className="font-bold text-red-600 text-sm">{error.error}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <button 
                                    onClick={() => setStep(2)}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Back to Mapping
                                </button>
                                <button 
                                    onClick={() => navigate('admin_students')}
                                    className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <Play className="w-4 h-4 fill-white" />
                                    Import {validationResults.accepted} Records
                                </button>
                            </div>
                        </div>
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

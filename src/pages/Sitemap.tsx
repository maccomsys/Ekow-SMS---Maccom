import React from 'react';
import { 
    Map, ArrowRight, ArrowLeft, KeyRound, Users, GraduationCap, 
    ShieldCheck, BookOpen, Activity, BarChart, AlertTriangle, FileText 
} from 'lucide-react';

export default function Sitemap({ navigate }: { navigate: (path: string) => void }) {
    const sitemapData = [
        {
            category: "Authentication & Onboarding",
            icon: KeyRound,
            pages: [
                { path: 'splash', name: 'Splash Screen', description: 'Initial loading and welcome screen.' },
                { path: 'login', name: 'Login', description: 'Authentication page for all users.' },
                { path: 'forgot_password', name: 'Forgot Password', description: 'Password recovery initiation.' },
                { path: 'reset_password', name: 'Reset Password', description: 'Password reset confirmation.' },
                { path: 'parent_registration', name: 'Parent Registration', description: 'Account creation for parents.' },
                { path: 'linkage_confirmation', name: 'Linkage Confirmation', description: 'Confirm student profile linkage.' },
                { path: 'role_selection', name: 'Role Selection', description: 'Choose dashboard (Parent/Admin).' }
            ]
        },
        {
            category: "Parent Portal",
            icon: Users,
            pages: [
                { path: 'parent_dashboard', name: 'Parent Dashboard', description: 'Parent view for student tracking.' },
                { path: 'child_switcher', name: 'Child Switcher', description: 'Select which child profile to view.' },
                { path: 'attendance_parent', name: 'Attendance Record', description: 'View student attendance history.' },
                { path: 'grades_parent', name: 'Grades & Academics', description: 'View student assessment scores and comments.' },
                { path: 'homework_parent', name: 'Homework & Assignments', description: 'View and track student homework.' },
                { path: 'announcements_parent', name: 'Announcements Feed', description: 'Chronological feed of school announcements.' },
                { path: 'announcement_detail', name: 'Announcement Detail', description: 'Full view of a single announcement and attachments.' },
                { path: 'notifications_inbox', name: 'Notifications / Inbox', description: 'List of recent alerts and updates.' },
                { path: 'notification_settings', name: 'Notification Settings', description: 'Configure email and push notification preferences.' },
                { path: 'parent_profile', name: 'Parent Profile', description: 'View parent account details and linked children.' }
            ]
        },
        {
            category: "Teacher Portal",
            icon: GraduationCap,
            pages: [
                { path: 'teacher_dashboard', name: 'Teacher Dashboard', description: 'Home view for teachers showing classes and quick actions.' },
                { path: 'teacher_classes', name: 'Class Selector', description: 'Select a class to manage as a teacher.' },
                { path: 'teacher_attendance', name: 'Attendance Marking', description: 'Mark student attendance for a selected class.' },
                { path: 'teacher_attendance_history', name: 'Attendance History', description: 'View and correct past attendance records.' },
                { path: 'teacher_grades_entry', name: 'Grade Entry', description: 'Enter scores and comments for an assessment.' },
                { path: 'teacher_grade_history', name: 'Grade History', description: 'View past assessment scores and statistics.' },
                { path: 'teacher_homework_list', name: 'Homework List', description: 'View and manage assigned homework.' },
                { path: 'teacher_homework', name: 'Post Homework', description: 'Create and assign homework to a class.' },
                { path: 'teacher_announcement', name: 'Post Announcement', description: 'Create and post announcements to classes.' },
                { path: 'teacher_roster', name: 'Class Roster', description: 'View student list and parent contact information.' },
                { path: 'teacher_profile', name: 'Teacher Profile', description: 'View and edit profile information and settings.' }
            ]
        },
        {
            category: "Admin: Users & Accounts",
            icon: ShieldCheck,
            pages: [
                { path: 'admin_dashboard', name: 'Admin Dashboard', description: 'Overview of school statistics and quick links for administrators.' },
                { path: 'admin_students', name: 'Admin Students List', description: 'Searchable directory of all student records.' },
                { path: 'admin_student_form', name: 'Add/Edit Student', description: 'Form to add a new student or edit an existing one.' },
                { path: 'admin_student_detail', name: 'Student Details', description: 'View student profile, guardian details, and academic history.' },
                { path: 'admin_teachers', name: 'Admin Teachers List', description: 'Searchable directory of all teacher records.' },
                { path: 'admin_teacher_form', name: 'Add/Edit Teacher', description: 'Form to add a new teacher or edit an existing one.' },
                { path: 'admin_teacher_detail', name: 'Teacher Details', description: 'View teacher profile, assigned classes, and activity log.' },
                { path: 'admin_accounts', name: 'Administrator Accounts', description: 'List of all system administrators.' },
                { path: 'admin_account_form', name: 'Add/Edit Administrator', description: 'Form to add a new administrator or edit an existing one.' },
                { path: 'admin_parents', name: 'Guardian Accounts', description: 'Searchable directory of all guardian accounts.' },
                { path: 'admin_parent_detail', name: 'Guardian Details', description: 'View guardian profile, linked children, and linkage codes.' },
                { path: 'admin_roles', name: 'Roles & Permissions', description: 'Manage system roles and access levels.' },
                { path: 'admin_bulk_import', name: 'Bulk Import Users', description: 'Upload and map CSV files for bulk user creation.' }
            ]
        },
        {
            category: "Admin: Academics",
            icon: BookOpen,
            pages: [
                { path: 'admin_classes', name: 'Class Management', description: 'List of all academic classes and assignments.' },
                { path: 'admin_class_form', name: 'Add/Edit Class', description: 'Form to add a new class or edit an existing one.' },
                { path: 'admin_subjects', name: 'Subject Management', description: 'List of all academic subjects and curriculum assignments.' },
                { path: 'admin_subject_form', name: 'Add/Edit Subject', description: 'Form to add a new subject or edit an existing one.' },
                { path: 'admin_academic_year', name: 'Academic Year Setup', description: 'Configure academic years and active term dates.' },
                { path: 'admin_teacher_assignments', name: 'Teacher Assignments', description: 'Matrix view for assigning teachers to class subjects.' }
            ]
        },
        {
            category: "Admin: Oversight & Comm.",
            icon: Activity,
            pages: [
                { path: 'admin_attendance_oversight', name: 'Attendance Oversight', description: 'Daily attendance records and status corrections.' },
                { path: 'admin_grade_oversight', name: 'Grade Oversight', description: 'Review student scores and manage grade corrections.' },
                { path: 'admin_homework_oversight', name: 'Homework Oversight', description: 'Monitor assignments posted by teachers across classes.' },
                { path: 'admin_announcements', name: 'Announcements Management', description: 'Manage school-wide and class-specific announcements and alerts.' },
                { path: 'admin_announcement_form', name: 'Post New Announcement', description: 'Form to compose and send a new announcement.' },
                { path: 'admin_media_library', name: 'Attachments & Media Library', description: 'Manage files uploaded for homework and announcements.' }
            ]
        },
        {
            category: "Admin: Reports & Settings",
            icon: BarChart,
            pages: [
                { path: 'admin_attendance_report', name: 'Attendance Summary Report', description: 'School-wide attendance trends and metrics.' },
                { path: 'admin_grade_report', name: 'Grade Summary Report', description: 'School-wide grade distributions and performance averages.' },
                { path: 'admin_performance_report', name: 'School Performance Overview', description: 'Compare class attendance rates vs average grades.' },
                { path: 'admin_export_center', name: 'Export / Download Center', description: 'Manage and download generated reports.' },
                { path: 'admin_school_profile', name: 'School Profile & Settings', description: 'Manage school information, branding, and contact details.' },
                { path: 'admin_activity_log', name: 'Activity / Audit Log', description: 'Chronological table showing system actions.' },
                { path: 'admin_profile_security', name: 'Admin Profile & Security', description: 'Manage admin personal info, password, and active sessions.' },
                { path: 'admin_help_support', name: 'Help & Support Content', description: 'Manage FAQ entries and support contact information.' }
            ]
        },
        {
            category: "States & Utilities",
            icon: AlertTriangle,
            pages: [
                { path: 'dashboard', name: 'Generic Dashboard', description: 'Generic fallback dashboard routing.' },
                { path: 'loading_state', name: 'Loading / Processing State', description: 'Centered loading indicator shown while data loads.' },
                { path: 'empty_state', name: 'Empty State', description: 'Friendly message shown when a list has no data yet.' },
                { path: 'error_state', name: 'Error Page (General)', description: 'Centered error message with a try again button.' },
                { path: 'no_connection_state', name: 'No Connection / Low Data Notice', description: 'Message indicating app could not reach the server.' },
                { path: 'access_denied_state', name: '403 / Access Denied Page', description: 'Centered message explaining access is restricted for the user.' },
                { path: 'logout_confirmation', name: 'Log Out Confirmation', description: 'Confirmation dialog asking to log out.' },
                { path: 'session_expired_state', name: 'Session Expired Page', description: 'Centered message explaining the session has ended.' }
            ]
        },
        {
            category: "Legal & Policies",
            icon: FileText,
            pages: [
                { path: 'legal', name: 'Legal & Policies', description: 'Terms of Service and Privacy Policy.' }
            ]
        }
    ];

    return (
        <div className="bg-[#F7F8FA] min-h-screen text-gray-900 font-sans">
            <header className="bg-[#1F3864] text-white px-6 md:px-12 py-10 sticky top-0 z-10 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Map className="w-8 h-8 text-[#DCE6F1]" />
                            <h1 className="text-3xl font-bold tracking-tight">Sitemap</h1>
                        </div>
                        <p className="text-[#DCE6F1] max-w-xl text-sm md:text-base">
                            Complete directory of all available pages within the SchoolLink application. Use these links to navigate directly to any section for testing and review.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('splash')}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg transition-colors font-medium border border-white/20 whitespace-nowrap self-start md:self-auto"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to App
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {sitemapData.map((section) => (
                        <div key={section.category} className="flex flex-col">
                            <div className="flex items-center gap-2 mb-4 px-1">
                                <section.icon className="w-5 h-5 text-[#1F3864]" />
                                <h2 className="text-lg font-bold text-[#1F3864]">{section.category}</h2>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                {section.pages.map((page) => (
                                    <button
                                        key={page.path}
                                        onClick={() => navigate(page.path)}
                                        className="group relative flex flex-col items-start p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1F3864] hover:shadow-md transition-all text-left overflow-hidden"
                                    >
                                        {/* Hover accent line */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1F3864] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="flex justify-between items-start w-full mb-1">
                                            <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#1F3864] transition-colors">{page.name}</h3>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1F3864] transition-colors mt-0.5 flex-shrink-0" />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2 pr-4">{page.description}</p>
                                        <div className="text-[11px] font-mono bg-[#F7F8FA] text-gray-500 px-2.5 py-1 rounded-md border border-gray-100 group-hover:bg-[#DCE6F1]/50 group-hover:border-[#DCE6F1] group-hover:text-[#1F3864] transition-colors">
                                            /{page.path}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

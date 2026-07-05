import React, { useState } from 'react';
import { MockDataProvider } from './store/MockDataContext';
import Splash from './pages/Splash';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ParentRegistration from './pages/ParentRegistration';
import LinkageConfirmation from './pages/LinkageConfirmation';
import RoleSelection from './pages/RoleSelection';
import LegalPolicies from './pages/LegalPolicies';
import SupportDashboard from './pages/SupportDashboard';
import ParentDashboard from './pages/ParentDashboard';
import ChildSwitcher from './pages/ChildSwitcher';
import AttendanceParentView from './pages/AttendanceParentView';
import GradesParentView from './pages/GradesParentView';
import HomeworkParentView from './pages/HomeworkParentView';
import AnnouncementsParentView from './pages/AnnouncementsParentView';
import AnnouncementDetailParentView from './pages/AnnouncementDetailParentView';
import ParentProfile from './pages/ParentProfile';
import NotificationsInbox from './pages/NotificationsInbox';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherClassSelector from './pages/TeacherClassSelector';
import TeacherAttendanceMarking from './pages/TeacherAttendanceMarking';
import TeacherAttendanceHistory from './pages/TeacherAttendanceHistory';
import TeacherGradeEntry from './pages/TeacherGradeEntry';
import TeacherGradeHistory from './pages/TeacherGradeHistory';
import TeacherHomeworkPosting from './pages/TeacherHomeworkPosting';
import TeacherHomeworkList from './pages/TeacherHomeworkList';
import TeacherAnnouncementPosting from './pages/TeacherAnnouncementPosting';
import TeacherClassRoster from './pages/TeacherClassRoster';
import TeacherProfile from './pages/TeacherProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminStudentList from './pages/AdminStudentList';
import AdminStudentForm from './pages/AdminStudentForm';
import AdminStudentDetail from './pages/AdminStudentDetail';
import AdminTeacherList from './pages/AdminTeacherList';
import AdminTeacherForm from './pages/AdminTeacherForm';
import AdminTeacherDetail from './pages/AdminTeacherDetail';
import AdminAccountList from './pages/AdminAccountList';
import AdminAccountForm from './pages/AdminAccountForm';
import AdminParentList from './pages/AdminParentList';
import AdminParentDetail from './pages/AdminParentDetail';
import AdminRolesPermissions from './pages/AdminRolesPermissions';
import AdminBulkImport from './pages/AdminBulkImport';
import AdminClassList from './pages/AdminClassList';
import AdminClassForm from './pages/AdminClassForm';
import AdminSubjectList from './pages/AdminSubjectList';
import AdminSubjectForm from './pages/AdminSubjectForm';
import AdminAcademicYear from './pages/AdminAcademicYear';
import AdminTeacherAssignments from './pages/AdminTeacherAssignments';
import AdminAttendanceOversight from './pages/AdminAttendanceOversight';
import AdminGradeOversight from './pages/AdminGradeOversight';
import AdminHomeworkOversight from './pages/AdminHomeworkOversight';
import AdminAnnouncements from './pages/AdminAnnouncements';
import AdminAnnouncementForm from './pages/AdminAnnouncementForm';
import AdminMediaLibrary from './pages/AdminMediaLibrary';
import AdminAttendanceReport from './pages/AdminAttendanceReport';
import AdminGradeReport from './pages/AdminGradeReport';
import AdminPerformanceReport from './pages/AdminPerformanceReport';
import AdminExportCenter from './pages/AdminExportCenter';
import AdminSchoolProfile from './pages/AdminSchoolProfile';
import AdminActivityLog from './pages/AdminActivityLog';
import AdminProfileSecurity from './pages/AdminProfileSecurity';
import AdminHelpSupport from './pages/AdminHelpSupport';
import LoadingState from './pages/LoadingState';
import EmptyState from './pages/EmptyState';
import ErrorState from './pages/ErrorState';
import NoConnectionState from './pages/NoConnectionState';
import AccessDeniedState from './pages/AccessDeniedState';
import LogoutConfirmation from './pages/LogoutConfirmation';
import SessionExpiredState from './pages/SessionExpiredState';
import NotificationSettings from './pages/NotificationSettings';
import Sitemap from './pages/Sitemap';

export default function App() {
    const [route, setRoute] = useState('splash');
    const [userRole, setUserRole] = useState<'guest' | 'parent' | 'teacher' | 'admin'>('guest');

    const navigate = (newRoute: string) => {
        let currentRole = userRole;

        // Auto-detect role upon landing on dashboard from guest/login
        if (newRoute === 'admin_dashboard' && currentRole === 'guest') { currentRole = 'admin'; setUserRole('admin'); }
        if (newRoute === 'teacher_dashboard' && currentRole === 'guest') { currentRole = 'teacher'; setUserRole('teacher'); }
        if (newRoute === 'parent_dashboard' && currentRole === 'guest') { currentRole = 'parent'; setUserRole('parent'); }
        if (newRoute === 'login' || newRoute === 'logout_confirmation') { currentRole = 'guest'; setUserRole('guest'); }

        const adminRoutes = [
            'admin_dashboard', 'admin_students', 'admin_student_form', 'admin_student_detail', 'admin_teachers',
            'admin_teacher_form', 'admin_teacher_detail', 'admin_accounts', 'admin_account_form', 'admin_parents',
            'admin_parent_detail', 'admin_roles', 'admin_bulk_import', 'admin_classes', 'admin_class_form',
            'admin_subjects', 'admin_subject_form', 'admin_academic_year', 'admin_teacher_assignments',
            'admin_attendance_oversight', 'admin_grade_oversight', 'admin_homework_oversight', 'admin_announcements',
            'admin_announcement_form', 'admin_media_library', 'admin_attendance_report', 'admin_grade_report',
            'admin_performance_report', 'admin_export_center', 'admin_school_profile', 'admin_activity_log',
            'admin_profile_security', 'admin_help_support'
        ];

        const teacherRoutes = [
            'teacher_dashboard', 'teacher_classes', 'teacher_attendance', 'teacher_attendance_history',
            'teacher_grades_entry', 'teacher_grade_history', 'teacher_homework_list', 'teacher_homework',
            'teacher_announcement', 'teacher_roster', 'teacher_profile'
        ];

        const parentRoutes = [
            'parent_dashboard', 'child_switcher', 'attendance_parent', 'grades_parent', 'homework_parent',
            'announcements_parent', 'announcement_detail', 'parent_profile', 'notifications_inbox', 'notification_settings'
        ];

        if (currentRole === 'guest' && (adminRoutes.includes(newRoute) || teacherRoutes.includes(newRoute) || parentRoutes.includes(newRoute))) {
            setRoute('access_denied_state');
            return;
        }

        if (currentRole === 'parent' && (adminRoutes.includes(newRoute) || teacherRoutes.includes(newRoute))) {
            setRoute('access_denied_state');
            return;
        }

        if (currentRole === 'teacher' && (adminRoutes.includes(newRoute) || parentRoutes.includes(newRoute))) {
            setRoute('access_denied_state');
            return;
        }
        
        if (newRoute === 'go_home') {
            if (currentRole === 'admin') setRoute('admin_dashboard');
            else if (currentRole === 'teacher') setRoute('teacher_dashboard');
            else if (currentRole === 'parent') setRoute('parent_dashboard');
            else setRoute('splash');
            return;
        }

        setRoute(newRoute);
    };

    const renderRoute = () => {
        switch (route) {
            case 'splash': return <Splash navigate={navigate} />;
            case 'login': return <Login navigate={navigate} />;
            case 'forgot_password': return <ForgotPassword navigate={navigate} />;
            case 'reset_password': return <ResetPassword navigate={navigate} />;
            case 'parent_registration': return <ParentRegistration navigate={navigate} />;
            case 'linkage_confirmation': return <LinkageConfirmation navigate={navigate} />;
            case 'role_selection': return <RoleSelection navigate={navigate} />;
            case 'legal': return <LegalPolicies navigate={navigate} />;
            case 'dashboard': return <SupportDashboard navigate={navigate} />;
            case 'parent_dashboard': return <ParentDashboard navigate={navigate} />;
            case 'child_switcher': return <ChildSwitcher navigate={navigate} />;
            case 'attendance_parent': return <AttendanceParentView navigate={navigate} />;
            case 'grades_parent': return <GradesParentView navigate={navigate} />;
            case 'homework_parent': return <HomeworkParentView navigate={navigate} />;
            case 'announcements_parent': return <AnnouncementsParentView navigate={navigate} />;
            case 'announcement_detail': return <AnnouncementDetailParentView navigate={navigate} />;
            case 'parent_profile': return <ParentProfile navigate={navigate} />;
            case 'notifications_inbox': return <NotificationsInbox navigate={navigate} />;
            case 'teacher_dashboard': return <TeacherDashboard navigate={navigate} />;
            case 'teacher_classes': return <TeacherClassSelector navigate={navigate} />;
            case 'teacher_attendance': return <TeacherAttendanceMarking navigate={navigate} />;
            case 'teacher_attendance_history': return <TeacherAttendanceHistory navigate={navigate} />;
            case 'teacher_grades_entry': return <TeacherGradeEntry navigate={navigate} />;
            case 'teacher_grade_history': return <TeacherGradeHistory navigate={navigate} />;
            case 'teacher_homework_list': return <TeacherHomeworkList navigate={navigate} />;
            case 'teacher_homework': return <TeacherHomeworkPosting navigate={navigate} />;
            case 'teacher_announcement': return <TeacherAnnouncementPosting navigate={navigate} />;
            case 'teacher_roster': return <TeacherClassRoster navigate={navigate} />;
            case 'teacher_profile': return <TeacherProfile navigate={navigate} />;
            case 'admin_dashboard': return <AdminDashboard navigate={navigate} />;
            case 'admin_students': return <AdminStudentList navigate={navigate} />;
            case 'admin_student_form': return <AdminStudentForm navigate={navigate} />;
            case 'admin_student_detail': return <AdminStudentDetail navigate={navigate} />;
            case 'admin_teachers': return <AdminTeacherList navigate={navigate} />;
            case 'admin_teacher_form': return <AdminTeacherForm navigate={navigate} />;
            case 'admin_teacher_detail': return <AdminTeacherDetail navigate={navigate} />;
            case 'admin_accounts': return <AdminAccountList navigate={navigate} />;
            case 'admin_account_form': return <AdminAccountForm navigate={navigate} />;
            case 'admin_parents': return <AdminParentList navigate={navigate} />;
            case 'admin_parent_detail': return <AdminParentDetail navigate={navigate} />;
            case 'admin_roles': return <AdminRolesPermissions navigate={navigate} />;
            case 'admin_bulk_import': return <AdminBulkImport navigate={navigate} />;
            case 'admin_classes': return <AdminClassList navigate={navigate} />;
            case 'admin_class_form': return <AdminClassForm navigate={navigate} />;
            case 'admin_subjects': return <AdminSubjectList navigate={navigate} />;
            case 'admin_subject_form': return <AdminSubjectForm navigate={navigate} />;
            case 'admin_academic_year': return <AdminAcademicYear navigate={navigate} />;
            case 'admin_teacher_assignments': return <AdminTeacherAssignments navigate={navigate} />;
            case 'admin_attendance_oversight': return <AdminAttendanceOversight navigate={navigate} />;
            case 'admin_grade_oversight': return <AdminGradeOversight navigate={navigate} />;
            case 'admin_homework_oversight': return <AdminHomeworkOversight navigate={navigate} />;
            case 'admin_announcements': return <AdminAnnouncements navigate={navigate} />;
            case 'admin_announcement_form': return <AdminAnnouncementForm navigate={navigate} />;
            case 'admin_media_library': return <AdminMediaLibrary navigate={navigate} />;
            case 'admin_attendance_report': return <AdminAttendanceReport navigate={navigate} />;
            case 'admin_grade_report': return <AdminGradeReport navigate={navigate} />;
            case 'admin_performance_report': return <AdminPerformanceReport navigate={navigate} />;
            case 'admin_export_center': return <AdminExportCenter navigate={navigate} />;
            case 'admin_school_profile': return <AdminSchoolProfile navigate={navigate} />;
            case 'admin_activity_log': return <AdminActivityLog navigate={navigate} />;
            case 'admin_profile_security': return <AdminProfileSecurity navigate={navigate} />;
            case 'admin_help_support': return <AdminHelpSupport navigate={navigate} />;
            case 'loading_state': return <LoadingState navigate={navigate} />;
            case 'empty_state': return <EmptyState navigate={navigate} />;
            case 'error_state': return <ErrorState navigate={navigate} />;
            case 'no_connection_state': return <NoConnectionState navigate={navigate} />;
            case 'access_denied_state': return <AccessDeniedState navigate={navigate} />;
            case 'logout_confirmation': return <LogoutConfirmation navigate={navigate} />;
            case 'session_expired_state': return <SessionExpiredState navigate={navigate} />;
            case 'notification_settings': return <NotificationSettings navigate={navigate} />;
            case 'sitemap': return <Sitemap navigate={navigate} />;
            default: return <Splash navigate={navigate} />;
        }
    };

    return <MockDataProvider>{renderRoute()}<button onClick={() => navigate('sitemap')} className="fixed bottom-4 right-4 bg-[#1F3864] text-white p-3 rounded-full shadow-lg z-50 hover:bg-[#162a4d] transition-colors group flex items-center justify-center" aria-label="Sitemap"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/></svg><span className="absolute right-full mr-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">View Sitemap</span></button></MockDataProvider>;
}

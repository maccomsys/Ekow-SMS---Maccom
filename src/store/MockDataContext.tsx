import React, { createContext, useContext, useState, ReactNode } from 'react';

// Common Types
export type Student = {
    id: string;
    rollNumber: string;
    name: string;
};

export type AttendanceRecord = {
    id: string;
    studentId: string;
    date: string;
    day?: string;
    status: 'present' | 'absent' | 'late' | string;
    timeIn?: string;
    notes?: string;
    classId?: string;
};

export type Assessment = {
    title: string;
    score: string;
    date: string;
    comment: string | null;
};

export type GradeRecord = {
    id: string;
    studentId: string;
    subject: string;
    overallScore: string;
    grade: string;
    assessments: Assessment[];
    comment?: string;
};

export type HomeworkRecord = {
    id: string;
    title: string;
    subject: string;
    classStr: string;
    dueDate: string;
    status: string; // for parent it's "pending" | "submitted" etc, for teacher "Active" | "Draft" | "Closed"
    description: string;
    submissions: number; // for teacher
    totalStudents: number; // for teacher
};

export type AnnouncementRecord = {
    id: string;
    title: string;
    date: string;
    scope: string;
    sender: string;
    hasAttachment: boolean;
    pinned: boolean;
    content?: string;
};

export type ClassRecord = {
    id: string;
    name: string;
    level: string;
    year: string;
    term: string;
    teacherName: string;
    students: number;
    room: string;
};

export type TeacherRecord = {
    id: string;
    name: string;
    email: string;
    phone: string;
    classes: string[];
    status: string;
};

interface MockDataContextType {
    classes: ClassRecord[];
    addClass: (cls: ClassRecord) => void;
    teachers: TeacherRecord[];
    addTeacher: (teacher: TeacherRecord) => void;
    students: Student[];
    addStudent: (student: Student) => void;
    attendanceRecords: AttendanceRecord[];
    setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
    updateAttendanceStatus: (id: string, newStatus: string) => void;
    addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
    
    gradeRecords: GradeRecord[];
    setGradeRecords: React.Dispatch<React.SetStateAction<GradeRecord[]>>;
    updateGradeRecord: (studentId: string, subject: string, updates: Partial<GradeRecord>) => void;

    homeworkRecords: HomeworkRecord[];
    setHomeworkRecords: React.Dispatch<React.SetStateAction<HomeworkRecord[]>>;
    updateHomeworkStatus: (id: string, newStatus: string) => void;
    deleteHomework: (id: string) => void;
    addHomeworkRecord: (record: Omit<HomeworkRecord, 'id'>) => void;
    
    announcements: AnnouncementRecord[];
    setAnnouncements: React.Dispatch<React.SetStateAction<AnnouncementRecord[]>>;
    deleteAnnouncement: (id: string) => void;
    toggleAnnouncementPin: (id: string) => void;
    addAnnouncementRecord: (record: Omit<AnnouncementRecord, 'id'>) => void;
}

const initialClasses: ClassRecord[] = [
    { id: 'CLS001', name: 'Grade 1 Blue', level: 'Grade 1', year: '2023/2024', term: 'Term 1', teacherName: 'Mrs. Sarah Osei', students: 30, room: 'Room 101' },
    { id: 'CLS002', name: 'Grade 2 Silver', level: 'Grade 2', year: '2023/2024', term: 'Term 1', teacherName: 'Mr. Michael Addo', students: 28, room: 'Room 102' },
    { id: 'CLS003', name: 'Grade 3 Gold', level: 'Grade 3', year: '2023/2024', term: 'Term 1', teacherName: 'Miss Grace Mensah', students: 32, room: 'Room 103' }
];

const initialTeachers: TeacherRecord[] = [
    { id: 'TCH001', name: 'Mrs. Sarah Osei', email: 's.osei@schoollink.edu.gh', phone: '024 123 4567', classes: ['Grade 1 Blue'], status: 'Active' },
    { id: 'TCH002', name: 'Mr. Michael Addo', email: 'm.addo@schoollink.edu.gh', phone: '020 987 6543', classes: ['Grade 2 Silver', 'Grade 4 Gold'], status: 'Active' },
    { id: 'TCH003', name: 'Miss Grace Mensah', email: 'g.mensah@schoollink.edu.gh', phone: '054 321 0987', classes: ['Grade 3 Gold'], status: 'On Leave' }
];

const initialStudents: Student[] = [
    { id: 'STU001', rollNumber: '001', name: 'Kwame Mensah' },
    { id: 'STU002', rollNumber: '002', name: 'Abena Osei' },
    { id: 'STU003', rollNumber: '003', name: 'Kofi Annan' },
    { id: 'STU004', rollNumber: '004', name: 'Ama Asare' },
    { id: 'STU005', rollNumber: '005', name: 'Yaw Boakye' },
    { id: 'STU006', rollNumber: '006', name: 'Akua Addo' },
    { id: 'STU007', rollNumber: '007', name: 'Kwasi Owusu' },
    { id: 'STU008', rollNumber: '008', name: 'Yaa Nsiah' },
];

// Today is 2024-10-15
const initialAttendance: AttendanceRecord[] = [
    { id: 'ATT1', studentId: 'STU001', date: '2024-10-15', day: 'Tuesday', status: 'present', timeIn: '07:45 AM', notes: '' },
    { id: 'ATT2', studentId: 'STU002', date: '2024-10-15', day: 'Tuesday', status: 'late', timeIn: '08:15 AM', notes: 'Traffic delay' },
    { id: 'ATT3', studentId: 'STU003', date: '2024-10-15', day: 'Tuesday', status: 'absent', timeIn: '-', notes: 'Sick leave reported by parent' },
    { id: 'ATT4', studentId: 'STU004', date: '2024-10-15', day: 'Tuesday', status: 'present', timeIn: '07:30 AM', notes: '' },
    { id: 'ATT5', studentId: 'STU005', date: '2024-10-15', day: 'Tuesday', status: 'present', timeIn: '07:40 AM', notes: '' },
    { id: 'ATT6', studentId: 'STU006', date: '2024-10-15', day: 'Tuesday', status: 'absent', timeIn: '-', notes: 'Unexcused' },
    { id: 'ATT7', studentId: 'STU007', date: '2024-10-15', day: 'Tuesday', status: 'present', timeIn: '07:50 AM', notes: '' },
    { id: 'ATT8', studentId: 'STU008', date: '2024-10-15', day: 'Tuesday', status: 'present', timeIn: '07:35 AM', notes: '' },
    // A past record for Kwame Mensah for parent view history
    { id: 'ATT9', studentId: 'STU001', date: '2024-10-14', day: 'Monday', status: 'present', timeIn: '07:30 AM', notes: '' },
];

const initialGrades: GradeRecord[] = [
    {
        id: 'GR1', studentId: 'STU001', subject: 'Mathematics', overallScore: '85', grade: 'A', comment: '',
        assessments: [
            { title: "Mid-Term Exam", score: "88/100", date: "Oct 10, 2024", comment: "Excellent progress in fractions." },
            { title: "Class Quiz 1", score: "15/20", date: "Sep 25, 2024", comment: null },
        ]
    },
    {
        id: 'GR2', studentId: 'STU002', subject: 'Mathematics', overallScore: '78', grade: 'B', comment: '',
        assessments: []
    },
    { id: 'GR3', studentId: 'STU003', subject: 'Mathematics', overallScore: '92', grade: 'A', comment: '', assessments: [] },
    { id: 'GR4', studentId: 'STU004', subject: 'Mathematics', overallScore: '65', grade: 'C', comment: '', assessments: [] },
    { id: 'GR5', studentId: 'STU005', subject: 'Mathematics', overallScore: '88', grade: 'A', comment: '', assessments: [] },
    { id: 'GR6', studentId: 'STU006', subject: 'Mathematics', overallScore: '73', grade: 'B', comment: '', assessments: [] },
    { id: 'GR7', studentId: 'STU007', subject: 'Mathematics', overallScore: '95', grade: 'A', comment: '', assessments: [] },
    { id: 'GR8', studentId: 'STU008', subject: 'Mathematics', overallScore: '81', grade: 'B', comment: '', assessments: [] },
    
    // Some other subjects for Kwame Mensah
    {
        id: 'GR9', studentId: 'STU001', subject: 'Science', overallScore: '92', grade: 'A', comment: '',
        assessments: [
            { title: "Lab Report", score: "28/30", date: "Oct 12, 2024", comment: "Great observation skills." },
        ]
    },
];

const initialHomework: HomeworkRecord[] = [
    { id: 'HW1', title: 'Fractions Practice', subject: 'Mathematics', classStr: 'Grade 1 Blue', dueDate: 'Oct 18, 2024', status: 'Active', description: 'Complete pages 45-47 in the workbook.', submissions: 15, totalStudents: 25 },
    { id: 'HW2', title: 'Plant Lifecycle Diagram', subject: 'Science', classStr: 'Grade 1 Blue', dueDate: 'Oct 20, 2024', status: 'Active', description: 'Draw and label the lifecycle of a bean plant.', submissions: 5, totalStudents: 25 },
];

const initialAnnouncements: AnnouncementRecord[] = [
    { id: 'ANN001', title: 'PTA Meeting Rescheduled', scope: 'School-Wide', sender: 'Principal Mensah', date: '2023-10-15', hasAttachment: true, pinned: true, content: 'The PTA meeting originally scheduled for Friday has been moved to next Wednesday.' },
    { id: 'ANN002', title: 'Mid-Term Break Commences', scope: 'School-Wide', sender: 'Admin Office', date: '2023-10-20', hasAttachment: false, pinned: false, content: 'School will be on break starting next week.' },
    { id: 'ANN003', title: 'Grade 1 Blue Field Trip', scope: 'Grade 1 Blue', sender: 'Mrs. Sarah Osei', date: '2023-10-12', hasAttachment: true, pinned: false, content: 'Please return the signed permission slips by Friday.' },
];

export const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
    const [classes, setClasses] = useState<ClassRecord[]>(initialClasses);
    const [teachers, setTeachers] = useState<TeacherRecord[]>(initialTeachers);
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendance);
    const [gradeRecords, setGradeRecords] = useState<GradeRecord[]>(initialGrades);
    const [homeworkRecords, setHomeworkRecords] = useState<HomeworkRecord[]>(initialHomework);
    const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>(initialAnnouncements);

    const addClass = (cls: ClassRecord) => setClasses(prev => [...prev, cls]);
    const addTeacher = (teacher: TeacherRecord) => setTeachers(prev => [...prev, teacher]);
    const addStudent = (student: Student) => setStudents(prev => [...prev, student]);

    const updateAttendanceStatus = (id: string, newStatus: string) => {
        setAttendanceRecords(prev => prev.map(record => 
            record.id === id ? { ...record, status: newStatus } : record
        ));
    };

    const updateGradeRecord = (studentId: string, subject: string, updates: Partial<GradeRecord>) => {
        setGradeRecords(prev => {
            const index = prev.findIndex(g => g.studentId === studentId && g.subject === subject);
            if (index !== -1) {
                const newRecords = [...prev];
                newRecords[index] = { ...newRecords[index], ...updates };
                return newRecords;
            }
            return prev;
        });
    };

    const updateHomeworkStatus = (id: string, newStatus: string) => {
        setHomeworkRecords(prev => prev.map(record =>
            record.id === id ? { ...record, status: newStatus } : record
        ));
    };

    const deleteHomework = (id: string) => {
        setHomeworkRecords(prev => prev.filter(record => record.id !== id));
    };

    const deleteAnnouncement = (id: string) => {
        setAnnouncements(prev => prev.filter(record => record.id !== id));
    };

    const toggleAnnouncementPin = (id: string) => {
        setAnnouncements(prev => prev.map(record =>
            record.id === id ? { ...record, pinned: !record.pinned } : record
        ));
    };

    const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id'>) => {
        const newRecord = { ...record, id: `ATT${Date.now()}` };
        setAttendanceRecords(prev => [...prev, newRecord]);
    };

    const addHomeworkRecord = (record: Omit<HomeworkRecord, 'id'>) => {
        const newRecord = { ...record, id: `HW${Date.now()}` };
        setHomeworkRecords(prev => [...prev, newRecord]);
    };

    const addAnnouncementRecord = (record: Omit<AnnouncementRecord, 'id'>) => {
        const newRecord = { ...record, id: `ANN${Date.now()}` };
        setAnnouncements(prev => [...prev, newRecord]);
    };

    return (
        <MockDataContext.Provider value={{
            classes, addClass,
            teachers, addTeacher,
            students, addStudent,
            attendanceRecords, setAttendanceRecords, updateAttendanceStatus, addAttendanceRecord,
            gradeRecords, setGradeRecords, updateGradeRecord,
            homeworkRecords, setHomeworkRecords, updateHomeworkStatus, deleteHomework, addHomeworkRecord,
            announcements, setAnnouncements, deleteAnnouncement, toggleAnnouncementPin, addAnnouncementRecord
        }}>
            {children}
        </MockDataContext.Provider>
    );
}

export function useMockData() {
    const context = useContext(MockDataContext);
    if (!context) {
        throw new Error("useMockData must be used within a MockDataProvider");
    }
    return context;
}

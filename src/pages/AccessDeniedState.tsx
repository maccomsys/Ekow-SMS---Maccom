import React from 'react';
import { ShieldAlert, ArrowLeft, BookOpen } from 'lucide-react';

interface AccessDeniedStateProps {
    navigate: (route: string) => void;
}

export default function AccessDeniedState({ navigate }: AccessDeniedStateProps) {
    return (
        <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-2 text-[#1F3864]">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-xl font-bold tracking-tight">SchoolLink</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center max-w-md w-full p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                            <ShieldAlert className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
                        <p className="text-gray-500 mb-6">You don't have the required permissions to view this page. This area is restricted based on your current role.</p>
                        <button 
                            onClick={() => navigate('go_home')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#1F3864] text-white rounded-lg font-medium hover:bg-[#152643] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

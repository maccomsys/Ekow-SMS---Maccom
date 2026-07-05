import React from 'react';
import { GraduationCap, Users, Building2, ArrowRight, LogOut, HelpCircle } from 'lucide-react';

export default function RoleSelection({ navigate }: { navigate: (path: string) => void }) {
    return (
        <div className="bg-background text-on-surface min-h-screen flex flex-col overflow-x-hidden relative">
            <div className="fixed inset-0 opacity-50 pointer-events-none -z-10" style={{background: 'linear-gradient(135deg, #f8f9fb 25%, #f2f4f6 25%, #f2f4f6 50%, #f8f9fb 50%, #f8f9fb 75%, #f2f4f6 75%, #f2f4f6 100%)', backgroundSize: '40px 40px'}}></div>
            
            <header className="w-full py-8 flex justify-center items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg">
                        <GraduationCap className="text-on-primary w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary tracking-tight">SchoolLink</h1>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 pb-12">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
                        <p className="text-on-surface-variant text-base max-w-lg mx-auto">
                            Registration successful. Please select which dashboard you would like to access to continue managing your educational profile.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <button onClick={() => navigate('parent_dashboard')} className="group relative bg-surface-container-lowest border border-outline-variant p-8 rounded-xl text-left transition-all duration-300 hover:border-primary-container hover:shadow-xl hover:-translate-y-1">
                            <div className="flex flex-col h-full">
                                <div className="w-16 h-16 rounded-full bg-secondary-container text-primary flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary-container group-hover:text-white group-hover:scale-110">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-primary mb-3">Parent Dashboard</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                    Monitor your child's academic progress, view attendance reports, track fee payments, and receive direct notifications from the school administration.
                                </p>
                                <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                                    <span>Access Student Portal</span>
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </div>
                            </div>
                        </button>

                        <button onClick={() => navigate('dashboard')} className="group relative bg-surface-container-lowest border border-outline-variant p-8 rounded-xl text-left transition-all duration-300 hover:border-primary-container hover:shadow-xl hover:-translate-y-1">
                            <div className="flex flex-col h-full">
                                <div className="w-16 h-16 rounded-full bg-secondary-container text-primary flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary-container group-hover:text-white group-hover:scale-110">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-primary mb-3">School Administrator</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                    Manage the institutional operations including student admissions, teacher assignments, financial auditing, exam scheduling, and whole-school reporting.
                                </p>
                                <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                                    <span>Access Admin Panel</span>
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-on-surface-variant text-sm mb-4">Logged in as <strong>kwame.admin@ghana.edu</strong></p>
                        <div className="flex justify-center gap-6">
                            <button onClick={() => navigate('login')} className="text-primary text-xs font-bold hover:underline uppercase tracking-widest flex items-center gap-1">
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                            <span className="text-outline-variant">|</span>
                            <button onClick={() => navigate('empty_state')} className="text-primary text-xs font-bold hover:underline uppercase tracking-widest flex items-center gap-1">
                                <HelpCircle className="w-4 h-4" /> Need Help?
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full py-6 border-t border-outline-variant/30 flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-[#006B3F]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#FCD116]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#CE1126]"></div>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">
                        Official Academic Management System of Ghana Academy
                    </p>
                    <span className="text-on-surface-variant opacity-60">•</span>
                    <button onClick={() => navigate('sitemap')} className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Sitemap</button>
                </div>
            </footer>
        </div>
    );
}

import React from 'react';
import { GraduationCap, CheckCircle2, DoorOpen, Building, ArrowRight, ArrowLeft, Lock, ShieldCheck, Shield, BookOpen } from 'lucide-react';

export default function LinkageConfirmation({ navigate }: { navigate: (path: string) => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-surface">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'radial-gradient(circle at 50% 0%, rgba(31, 56, 100, 0.05) 0%, transparent 70%)'}}></div>
            
            <main className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary p-3 rounded-xl mb-4 shadow-sm">
                        <GraduationCap className="text-on-primary w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary text-center tracking-tight">Confirm Linkage</h1>
                    <p className="text-base text-secondary text-center mt-2">Please verify the student details below to complete the connection.</p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-secondary-container px-4 py-4 border-b border-outline-variant flex items-center justify-between">
                        <span className="text-xs font-bold text-on-secondary-fixed-variant tracking-widest uppercase">Student Profile Found</span>
                        <span className="bg-primary text-on-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">Verified</span>
                    </div>
                    <div className="p-8 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full border-4 border-secondary-container overflow-hidden bg-surface-container">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgexVZB06h1rJCbAcQpsSh7IE5OH0r5VTjWES91mvLWlWT1yqCjHH29XWkrsV5HszJCN1v8-Z1s9J5SLeXxyIJ47zp0_k3TieNpd2G6rGtKLOSFTxb5U8_77fq6kdv_JTH6QsjLShmMAbEL-kkNAlggSCC6uxr7QkAanvSTWpwH9ZfXSv5dyR2oZFWwxNhvl9s5_93OOjtTn5FGbNcN7Gwzmx2Ewzs_Jh2jaWqIBoljSU6Jvm_I7Ts" alt="Student" />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-1 border-2 border-surface-container-lowest">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>
                        
                        <div className="text-center space-y-2 mb-8 w-full">
                            <h2 className="text-xl font-semibold text-primary">Kwame Mensah</h2>
                            <div className="flex items-center justify-center gap-2 text-secondary">
                                <DoorOpen className="w-4 h-4" />
                                <p className="text-base">Grade 4 Gold</p>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-secondary">
                                <Building className="w-4 h-4" />
                                <p className="text-base">Ghana Academy</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full p-4 bg-surface-container-low rounded-lg border border-outline-variant mb-8">
                            <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">STUDENT ID</p>
                                <p className="text-sm font-semibold text-primary">SL-2024-0892</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">ACADEMIC YEAR</p>
                                <p className="text-sm font-semibold text-primary">2023 / 2024</p>
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            <button onClick={() => navigate('parent_dashboard')} className="w-full bg-primary-container hover:bg-primary text-on-primary text-base font-semibold py-4 px-6 rounded-lg transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2">
                                Confirm and Continue
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={() => navigate('login')} className="w-full py-2 group flex items-center justify-center gap-2 text-secondary hover:text-primary transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                <span className="text-base border-b border-transparent group-hover:border-primary">Wrong child? Go back</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 flex flex-col items-center justify-center gap-4 text-outline">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            <span className="text-[12px] font-medium">Secure Linkage</span>
                        </div>
                        <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-[12px] font-medium">Official Record</span>
                        </div>
                    </div>
                    <button onClick={() => navigate('sitemap')} className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Sitemap</button>
                </div>
            </main>

            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden lg:block text-primary">
                <Shield className="w-[300px] h-[300px]" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 opacity-5 pointer-events-none hidden lg:block text-primary">
                <BookOpen className="w-[200px] h-[200px]" />
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { GraduationCap, AtSign, ArrowRight, ArrowLeft, HelpCircle, CheckCircle, Info, Shield } from 'lucide-react';

export default function ForgotPassword({ navigate }: { navigate: (path: string) => void }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [email, setEmail] = useState('admin@school.edu.gh');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-6 relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40" style={{backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
            <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container opacity-[0.03] rounded-full blur-[120px]"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary opacity-[0.05] rounded-full blur-[100px]"></div>

            <div className="w-full max-w-[480px] relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4 shadow-sm">
                        <GraduationCap className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-black text-primary tracking-tight">SchoolLink</h1>
                    <p className="text-sm text-on-surface-variant mt-1">Institutional Administration Portal</p>
                </div>

                <div className="bg-white/95 backdrop-blur-md border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm transition-all duration-300">
                    {status !== 'success' ? (
                        <div>
                            <header className="mb-8">
                                <h2 className="text-3xl font-bold text-primary mb-2">Forgot Password?</h2>
                                <p className="text-base text-on-surface-variant">Enter your registered email address or administrator ID to receive a secure password reset link.</p>
                            </header>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block" htmlFor="identifier">Email or Admin ID</label>
                                    <div className="relative">
                                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                                        <input 
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" 
                                            id="identifier" placeholder="e.g. admin@ghana-academy.edu" required type="text"
                                            value={email} onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button disabled={status === 'loading'} className="w-full py-4 bg-primary text-white text-base font-semibold rounded-lg hover:bg-primary-container transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group mt-4" type="submit">
                                    <span>{status === 'loading' ? 'Verifying...' : 'Send Reset Link'}</span>
                                    {!status && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-secondary-container text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-2">Email Sent</h2>
                            <p className="text-base text-on-surface-variant mb-8">
                                We've sent a recovery link to the email associated with <span className="font-bold text-on-surface">{email}</span>. Please check your inbox and spam folder.
                            </p>
                            <div className="bg-surface-container-low p-4 rounded-lg text-left border border-outline-variant mb-8 flex gap-3">
                                <Info className="text-primary w-5 h-5 shrink-0" />
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Link expires in 20 minutes. If you don't receive it shortly, you can request another link or contact the System Administrator.
                                </p>
                            </div>
                            <button onClick={() => navigate('reset_password')} className="text-primary text-base font-semibold hover:underline">
                                (Demo) Proceed to Reset Password
                            </button>
                        </div>
                    )}

                    <footer className="mt-8 pt-6 border-t border-outline-variant flex items-center justify-between">
                        <button onClick={() => navigate('login')} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Back to Login</span>
                        </button>
                        <button onClick={() => navigate('empty_state')} className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                            <HelpCircle className="w-4 h-4" /> Need help?
                        </button>
                    </footer>
                </div>

                <div className="mt-8 text-center space-y-2 opacity-60">
                    <p className="text-sm text-on-surface-variant">© 2024 SchoolLink Education Management System</p>
                    <div className="flex justify-center gap-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                        <button onClick={(e) => { e.preventDefault(); navigate('legal'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Privacy Policy</button>
                        <span>•</span>
                        <button onClick={(e) => { e.preventDefault(); navigate('legal'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Service Terms</button>
                        <span>•</span>
                        <button onClick={() => navigate('sitemap')} className="hover:text-primary transition-colors uppercase font-bold opacity-100 text-primary">Sitemap</button>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/50 border border-outline-variant rounded-xl p-4 flex flex-col justify-center items-center text-center">
                        <div className="w-full h-24 rounded-lg bg-cover bg-center mb-2" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlrHa_JytyjLCwj4IOwoptBvrz0Ie9dcJJtRGLcpwE_ya-o4gARc15fInLDA_MOaDQzco8fATUSGlwQld1l9j9gD7d_D_vxH2jVMltuFEyLMfY4YOvTLDH_Fwy-Q7N5DGD1oO-ayyTQxdH9OPwaiVjwtoQaiXsRLKOhl2QU8BFmtMMJv9shGv1cCdvCg8vpdoMB3m5AVfzEoD7BT509yEaowvhMX0AhHUBFa1acitOuF5OcFXpyuNl')"}}></div>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase">Academic Excellence</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex flex-col justify-center">
                        <Shield className="text-primary mb-2 w-6 h-6" />
                        <p className="text-[13px] font-semibold text-primary leading-tight">Advanced Data Encryption</p>
                        <p className="text-[11px] text-on-surface-variant mt-1 leading-tight">Your school's data is protected by government-grade protocols.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

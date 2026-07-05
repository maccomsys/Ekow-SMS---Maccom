import React, { useState } from 'react';
import { GraduationCap, Key, Lock, KeyRound, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ResetPassword({ navigate }: { navigate: (path: string) => void }) {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [val, setVal] = useState('NewPassword123!');
    const [loading, setLoading] = useState(false);
    
    let strength = 0;
    if (val.length > 5) strength += 25;
    if (val.length > 8) strength += 25;
    if (/[A-Z]/.test(val)) strength += 25;
    if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) strength += 25;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate('login');
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 md:p-8 bg-[#F7F8FA] relative z-0">
            <div className="fixed inset-0 -z-10 overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-fixed blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed blur-[120px]"></div>
            </div>

            <main className="w-full max-w-[480px] bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm overflow-hidden flex flex-col">
                <div className="bg-secondary-container/30 px-8 py-10 flex flex-col items-center text-center border-b border-outline-variant">
                    <div className="mb-6 flex items-center justify-center space-x-3">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                            <GraduationCap className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-black text-primary tracking-tight">SchoolLink</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Reset Your Password</h1>
                    <p className="text-base text-on-surface-variant max-w-[320px]">
                        Enter the reset code sent to your email or phone and choose a new password.
                    </p>
                </div>

                <div className="px-8 py-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-on-surface-variant uppercase block">RESET CODE / OTP</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                                <input className="block w-full pl-10 pr-3 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 123456" required type="text" defaultValue="123456" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-on-surface-variant uppercase block">NEW PASSWORD</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                                <input value={val} onChange={e=>setVal(e.target.value)} className="block w-full pl-10 pr-10 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Min. 8 characters" required type={show1 ? "text" : "password"} />
                                <button type="button" onClick={()=>setShow1(!show1)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary">
                                    {show1 ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-on-surface-variant uppercase block">CONFIRM NEW PASSWORD</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                                <input className="block w-full pl-10 pr-10 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Repeat your password" required type={show2 ? "text" : "password"} defaultValue="NewPassword123!" />
                                <button type="button" onClick={()=>setShow2(!show2)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary">
                                    {show2 ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                            <div className="flex-1 h-1.5 rounded-full bg-outline-variant">
                                <div className={`h-full rounded-full transition-all duration-300 ${strength <= 25 ? 'bg-error' : strength <= 75 ? 'bg-tertiary-fixed-dim' : 'bg-green-600'}`} style={{width: `${strength}%`}}></div>
                            </div>
                            <span className={`text-[10px] font-bold uppercase ${strength <= 25 ? 'text-error' : strength <= 75 ? 'text-on-tertiary-fixed-variant' : 'text-green-700'}`}>
                                {strength <= 25 ? 'Weak' : strength <= 75 ? 'Moderate' : 'Strong'}
                            </span>
                        </div>

                        <button disabled={loading} className="w-full bg-primary-container text-on-primary py-4 rounded-lg text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center space-x-2" type="submit">
                            <span>{loading ? 'Processing...' : 'Submit & Reset Password'}</span>
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <button onClick={()=>navigate('login')} className="inline-flex items-center space-x-2 text-sm text-on-surface-variant hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Back to Login</span>
                        </button>
                    </div>
                </div>
                <div className="bg-surface-container-low px-8 py-4 flex justify-between items-center text-[10px] uppercase tracking-widest text-outline">
                    <span>Security: 256-bit AES</span>
                    <button onClick={() => navigate('sitemap')} className="text-primary hover:underline font-bold">SITEMAP</button>
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                        <span>System Secure</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

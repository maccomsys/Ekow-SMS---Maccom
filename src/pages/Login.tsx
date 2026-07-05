import React, { useState } from 'react';
import { GraduationCap, AtSign, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function Login({ navigate }: { navigate: (path: string) => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate('role_selection');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-surface">
            <main className="w-full max-w-[440px] animate-in fade-in duration-700 slide-in-from-bottom-4">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                            <GraduationCap className="text-on-primary w-8 h-8" />
                        </div>
                        <h1 className="text-xl font-semibold text-primary tracking-tight">SchoolLink</h1>
                    </div>
                    <p className="text-base text-secondary">Advanced School Management for Ghana</p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-on-surface mb-2">Login</h2>
                        <p className="text-sm text-on-surface-variant">Enter your credentials to access your dashboard.</p>
                    </header>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="block text-base font-semibold text-on-surface" htmlFor="identifier">Email or Phone Number</label>
                            <div className="relative">
                                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                                <input className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg text-base text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" id="identifier" placeholder="e.g. admin@school.edu.gh" required type="text" defaultValue="admin@school.edu.gh" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-base font-semibold text-on-surface" htmlFor="password">Password</label>
                                <button type="button" onClick={() => navigate('forgot_password')} className="text-sm text-primary font-semibold hover:underline">Forgot password?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                                <input className="w-full pl-10 pr-12 py-3 bg-white border border-outline-variant rounded-lg text-base text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" id="password" placeholder="Enter your password" required type={showPassword ? "text" : "password"} defaultValue="password123" />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" onClick={() => setShowPassword(!showPassword)} type="button">
                                    {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox" defaultChecked={true} />
                            <label className="ml-2 text-sm text-on-surface-variant" htmlFor="remember">Keep me logged in on this device</label>
                        </div>
                        <button className="w-full py-4 bg-primary text-on-primary text-base font-semibold rounded-lg hover:bg-primary-container transition-colors duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm" type="submit" disabled={loading}>
                            <span>{loading ? 'Authenticating...' : 'Login to Dashboard'}</span>
                            {!loading && <LogIn className="w-5 h-5" />}
                        </button>
                    </form>
                    <footer className="mt-8 pt-6 border-t border-outline-variant text-center">
                        <p className="text-sm text-on-surface-variant mb-2">
                            Having trouble logging in? <br className="md:hidden" />
                            <button onClick={() => navigate('dashboard')} className="text-primary font-semibold hover:underline ml-1">Contact System Administrator</button>
                        </p>
                        <p className="text-sm text-on-surface-variant">
                            Need an account? 
                            <button onClick={() => navigate('parent_registration')} className="text-primary font-semibold hover:underline ml-1">Register as Parent</button>
                        </p>
                    </footer>
                </div>

                <div className="mt-12 opacity-50 grayscale hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-32 rounded-xl bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLIRBjjCi1bOVySCRcKmTcmOqmSiYiOrzUPdoNb_38TUScgIbqJB7N2D_D46WkwkQX4SKqUNvWi7HfI75yylsW2NbfaTaWAwqWEHxVy-UIfi-WUc1Ti0OHmphIdk8PaV_ourS8d-NgxObi5JrnYMQPPjsjx90XO5r9Ds4MFJ3UeF-uvJz09_mL22401jcXGCPrlejV1D2THE1fDCQbr9MHANAKEuqK0_5f9BFP60U3gYoP02aBG-Yj')"}}></div>
                </div>
                <div className="flex justify-center mt-8 gap-1">
                    <div className="w-4 h-2 bg-[#EF3340]"></div>
                    <div className="w-4 h-2 bg-[#FFD100]"></div>
                    <div className="w-4 h-2 bg-[#009739]"></div>
                </div>
                <p className="text-center text-xs font-bold text-outline mt-2 tracking-widest uppercase">Ghana Academy Network</p>
                
                {/* Demo Nav */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-secondary opacity-60">
                    <button onClick={()=>navigate('linkage_confirmation')} className="hover:underline">View Linkage Confirmation</button>
                    <button onClick={()=>navigate('legal')} className="hover:underline">View Legal Policies</button>
                    <button onClick={()=>navigate('reset_password')} className="hover:underline">View Reset Password</button>
                    <button onClick={()=>navigate('sitemap')} className="hover:underline font-bold text-primary opacity-100">Sitemap</button>
                </div>
            </main>
        </div>
    );
}

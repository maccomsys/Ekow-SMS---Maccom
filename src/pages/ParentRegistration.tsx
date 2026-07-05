import React from 'react';
import { GraduationCap, Phone, Key, ArrowRight } from 'lucide-react';

export default function ParentRegistration({ navigate }: { navigate: (path: string) => void }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F8FA] relative z-0">
            <div className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqg7N2FnvwtqM_ArOx1ewyazZ8TSSWDrNIgnTUWgZWaeeTk7UtrGrYWGBNR_yP-n5MWLqipHueg-aCXc-q-29nhGWVnnVl6nrTs5_u8MXDxENy_stre5_YE-SGWvjeB_7AqJCQVtMizecl6Zaskmfs2CwUnR7ZuuXwuwaeAaYsu6yIrfNpLVM_AZwiHXq-2TPF_GOyQmVTrNfR8tN0EH0oW3FT7b7SYCYcWT5GbP_cBEWr_zuMdTQY')"}}></div>
            
            <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-primary pt-10 pb-8 px-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-on-primary">
                            <GraduationCap className="w-10 h-10" />
                            <h1 className="text-xl font-semibold tracking-tight">SchoolLink</h1>
                        </div>
                        <p className="text-sm text-on-primary/80">Institutional Excellence in Academic Management</p>
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-primary mb-2">Create Parent Account</h2>
                        <p className="text-sm text-on-surface-variant">Please provide your details and your school-issued code to connect to your child's records.</p>
                    </div>
                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('linkage_confirmation'); }}>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-primary uppercase">Full Name</label>
                            <input className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg text-base outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Enter your full legal name" required type="text"  />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-primary uppercase">Phone Number</label>
                            <div className="relative flex items-center border border-outline-variant rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                                <div className="pl-4 pr-2 text-outline"><Phone className="w-5 h-5"/></div>
                                <input className="w-full py-3 pr-4 bg-transparent border-none text-base outline-none focus:ring-0" placeholder="+233 00 000 0000" required type="tel"  />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-primary uppercase">Email Address (Optional)</label>
                            <input required className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg text-base outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="email@example.com" type="email"  />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-primary uppercase">School-issued Invite Code</label>
                            <div className="relative flex items-center border border-outline-variant rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                                <div className="pl-4 pr-2 text-outline"><Key className="w-5 h-5"/></div>
                                <input className="w-full py-3 pr-4 bg-transparent border-none text-base outline-none focus:ring-0" placeholder="Enter unique registration code" required type="text"  />
                            </div>
                            <p className="text-[11px] text-on-surface-variant/70 italic">This code is provided by the school administration for account verification.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-primary uppercase">Create Password</label>
                                <input className="w-full py-3 px-4 bg-white border border-outline-variant rounded-lg text-base outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" required type="password"  />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-primary uppercase">Confirm Password</label>
                                <input className="w-full py-3 px-4 bg-white border border-outline-variant rounded-lg text-base outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" required type="password"  />
                            </div>
                        </div>
                        <div className="flex items-start gap-3 pt-2">
                            <input className="mt-1 w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" required type="checkbox" defaultChecked={true} />
                            <label className="text-sm text-on-surface-variant">
                                I accept the <button type="button" onClick={()=>navigate('legal')} className="text-primary font-semibold underline underline-offset-2">Terms of Use</button> and <button type="button" onClick={()=>navigate('legal')} className="text-primary font-semibold underline underline-offset-2">Privacy Policy</button>.
                            </label>
                        </div>
                        <div className="pt-4">
                            <button className="w-full py-4 bg-[#1F3864] text-white text-base font-semibold rounded-lg hover:bg-[#162a4d] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm" type="submit">
                                Create Parent Account
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                    <div className="mt-8 pt-6 border-t border-outline-variant text-center space-y-4">
                        <p className="text-sm text-on-surface-variant">
                            Already have an account? 
                            <button onClick={()=>navigate('login')} className="ml-1 text-primary font-bold hover:underline">Login</button>
                        </p>
                        <button onClick={() => navigate('sitemap')} className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Sitemap</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

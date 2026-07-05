import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, Banknote, FileText, ClipboardCheck, Settings,
    HelpCircle, LogOut, Menu, Search, Bell, Mail, Rocket, Badge, LockKeyhole,
    Server, ChevronDown, MessageCircle, Phone
} from 'lucide-react';

export default function SupportDashboard({ navigate }: { navigate: (path: string) => void }) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        { q: "How do I link multiple children to one parent profile?", a: "Navigate to the 'Students' module, select the primary student, and click 'Add Sibling'. You will need the registration code of the second child to verify the link. This allows parents to see a consolidated view of all fees and reports." },
        { q: "What do I do if I forgot my registration code?", a: "Registration codes are sent via SMS during initial onboarding. If you cannot find it, please contact your school administrator or use the 'Resend Code' button on the login screen. You will need your registered Ghana Card number for verification." },
        { q: "Can I process partial fee payments?", a: "Yes, SchoolLink supports flexible payment installments. When initiating a payment through Mobile Money, simply enter the amount you wish to pay. The system will automatically update the balance and generate a receipt for the specific installment." },
        { q: "How do I export end-of-term reports?", a: "Go to the 'Exams' tab, select the 'Reports' sub-module, and choose the Class and Term. You can download individual PDF reports or a bulk ZIP file for the entire class." },
    ];

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <aside className="w-[260px] h-screen fixed left-0 top-0 bg-primary flex flex-col py-6 z-50 hidden md:flex">
                <div className="px-6 mb-10">
                    <h1 className="text-xl font-bold text-on-primary">SchoolLink</h1>
                    <p className="text-on-primary/70 text-sm">Ghana Academy Admin</p>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard' },
                        { icon: Users, label: 'Students' },
                        { icon: Banknote, label: 'Fees' },
                        { icon: FileText, label: 'Exams' },
                        { icon: ClipboardCheck, label: 'Attendance' },
                        { icon: Settings, label: 'Settings' }
                    ].map((item, i) => (
                        <div key={i} className="text-on-primary/70 hover:text-on-primary px-4 py-3 cursor-pointer transition-all duration-200 active:scale-95 flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            <span className="text-base">{item.label}</span>
                        </div>
                    ))}
                </nav>
                <div className="mt-auto px-4 space-y-1 pb-4">
                    <div onClick={() => navigate('sitemap')} className="text-on-primary/70 hover:text-on-primary px-4 py-3 cursor-pointer transition-all duration-200 active:scale-95 flex items-center gap-3">
                        <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] tracking-wider uppercase border border-on-primary/70 rounded-full">S</span>
                        <span className="text-base">Sitemap</span>
                    </div>
                    <div className="bg-primary-container text-on-primary-container rounded-lg mx-2 px-4 py-3 cursor-pointer transition-all duration-200 flex items-center gap-3">
                        <HelpCircle className="w-5 h-5" />
                        <span className="text-base">Help Center</span>
                    </div>
                    <div onClick={() => navigate('login')} className="text-on-primary/70 hover:text-on-primary px-4 py-3 cursor-pointer transition-all duration-200 active:scale-95 flex items-center gap-3">
                        <LogOut className="w-5 h-5" />
                        <span className="text-base">Logout</span>
                    </div>
                </div>
            </aside>

            <header className="h-16 fixed top-0 right-0 left-0 md:left-[260px] bg-surface border-b border-outline-variant flex justify-between items-center px-4 md:px-8 z-40">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('empty_state')} className="md:hidden text-primary">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        <input className="pl-10 pr-4 py-2 bg-surface-container-high rounded-full border-none focus:outline-none focus:ring-2 focus:ring-primary w-64 transition-all" defaultValue="Kofi" placeholder="Search support articles..." type="text" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate('empty_state')} className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors"><Bell className="w-5 h-5" /></button>
                        <button onClick={() => navigate('empty_state')} className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors"><Mail className="w-5 h-5" /></button>
                    </div>
                    <div className="h-8 w-px bg-outline-variant mx-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-base font-semibold text-primary">Admin User</p>
                            <p className="text-xs text-on-surface-variant">Support Access</p>
                        </div>
                        <img className="w-10 h-10 rounded-full border border-outline-variant object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwjczezCPH04sOFh2ALyLB-MeKxvn3J05SBN9l6jkI1GHDfpgoLn3x5ydcdNThqfJmVi3PgaPJYSOM96i4EJ9kvYjjqu3G9RkqrKGdXdMxihEv6LtNre0JjmVyd7oug5QbcaNqh58I87rcyy2wC4dSEC5z5Xp3vChmT6XJbF2DkG1An35kEQfC2_JzhYnA9wo3zVh6Ck8HUNhINcaquEaoE-QK7FzprrrA-7USI0-_9NiEMaOEZinS" alt="Profile" />
                    </div>
                </div>
            </header>

            <main className="pt-16 md:pl-[260px] min-h-screen">
                <section className="relative py-20 px-4 md:px-8 bg-primary overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-on-primary mb-6">How can we help you today?</h2>
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 text-primary w-6 h-6" />
                            <input className="w-full py-4 pl-14 pr-6 bg-surface-container-lowest rounded-xl shadow-xl text-on-surface text-base focus:outline-none focus:ring-4 focus:ring-primary-container border-none" placeholder="Type your question or a keyword (e.g., 'fee receipt')" type="text"  defaultValue="Type your question or a keyword (e.g., 'fee receipt')" />
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            <span className="text-on-primary/60 text-sm">Popular:</span>
                            <button onClick={(e) => { e.preventDefault(); navigate('reset_password'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Reset Password</button>
                            <button onClick={(e) => { e.preventDefault(); navigate('empty_state'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Print Invoice</button>
                            <button onClick={(e) => { e.preventDefault(); navigate('empty_state'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Update Results</button>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
                    <h3 className="text-xl font-semibold text-primary mb-8 border-l-4 border-primary pl-4">Knowledge Base</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Rocket, title: "Getting Started", desc: "New to SchoolLink? Learn the basics of dashboard navigation and student setup." },
                            { icon: Banknote, title: "Fee Payments", desc: "Guides on processing Mobile Money payments, generating receipts, and debt tracking." },
                            { icon: Badge, title: "Student Records", desc: "How to update profiles, manage enrollments, and link siblings to one account." },
                            { icon: FileText, title: "Exams & Results", desc: "Entering grades, generating terminal reports, and standardizing grading systems." },
                            { icon: LockKeyhole, title: "Account Security", desc: "Password recovery, two-factor authentication, and managing user permissions." },
                            { icon: Server, title: "System Status", desc: "Check server availability and known outages in real-time across Ghana's network." }
                        ].map((card, i) => (
                            <div key={i} className="group bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:border-primary hover:shadow-md transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-primary-container/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                    <card.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-base font-semibold text-primary mb-2">{card.title}</h4>
                                <p className="text-sm text-on-surface-variant">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-xl font-semibold text-primary mb-2">Frequently Asked Questions</h3>
                        <p className="text-on-surface-variant text-base">Quick answers to the most common queries from school admins.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left focus:bg-surface-container-low transition-colors">
                                    <span className="text-base font-semibold text-primary">{faq.q}</span>
                                    <ChevronDown className={`text-primary transition-transform duration-300 w-5 h-5 ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                                    <div className="px-6 pb-6 text-base text-on-surface-variant">{faq.a}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-16 px-4 md:px-8 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="text-xl font-semibold text-primary">Still need help?</h3>
                            <p className="text-on-surface-variant text-base">Our support team is ready to assist you.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant flex flex-col items-center text-center">
                                <Mail className="w-10 h-10 text-primary mb-4" />
                                <h4 className="text-base font-semibold text-primary mb-2">Email Support</h4>
                                <p className="text-sm text-on-surface-variant mb-6">Send us a detailed message about your issue.</p>
                                <button onClick={() => navigate('empty_state')} className="mt-auto w-full py-3 bg-primary text-on-primary rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">support@schoollink.gh</button>
                            </div>
                            <div className="bg-surface-container-lowest p-8 rounded-xl border border-primary flex flex-col items-center text-center relative shadow-lg">
                                <div className="absolute -top-3 px-4 py-1 bg-primary text-on-primary text-[10px] font-bold rounded-full uppercase tracking-widest">Recommended</div>
                                <MessageCircle className="w-10 h-10 text-primary mb-4" />
                                <h4 className="text-base font-semibold text-primary mb-2">Live Chat</h4>
                                <p className="text-sm text-on-surface-variant mb-4">Available 8am - 5pm GMT</p>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-green-600 font-bold text-sm">We're Online</span>
                                </div>
                                <button onClick={() => navigate('empty_state')} className="mt-auto w-full py-3 bg-primary text-on-primary rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">Start Chatting</button>
                            </div>
                            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant flex flex-col items-center text-center">
                                <Phone className="w-10 h-10 text-primary mb-4" />
                                <h4 className="text-base font-semibold text-primary mb-2">Call Us</h4>
                                <p className="text-sm text-on-surface-variant mb-6">Speak directly with a support specialist.</p>
                                <button onClick={() => navigate('empty_state')} className="mt-auto w-full py-3 border border-primary text-primary rounded-lg text-base font-semibold hover:bg-primary/5 transition-colors">+233 24 000 0000</button>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="mt-20 border-t border-outline-variant bg-surface-container-lowest">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <h5 className="text-xl font-black text-primary mb-2">SchoolLink</h5>
                                <p className="text-on-surface-variant text-sm max-w-xs">The gold standard for academic management systems in Ghana.</p>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Resources</span>
                                    <button onClick={(e) => { e.preventDefault(); navigate('empty_state'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">User Manual</button>
                                    <button onClick={(e) => { e.preventDefault(); navigate('empty_state'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">Video Tutorials</button>
                                    <button onClick={(e) => { e.preventDefault(); navigate('empty_state'); }} className="hover:text-primary transition-colors hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit font-inherit">API Docs</button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Legal & Navigation</span>
                                    <button onClick={() => navigate('legal')} className="text-sm text-primary hover:underline text-left">Privacy Policy</button>
                                    <button onClick={() => navigate('legal')} className="text-sm text-primary hover:underline text-left">Terms of Service</button>
                                    <button onClick={() => navigate('sitemap')} className="text-sm text-primary hover:underline text-left font-bold">Sitemap</button>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => navigate('login')} className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-lg text-base font-semibold flex items-center gap-2 hover:bg-secondary-fixed transition-colors">
                                    <LogOut className="w-5 h-5" />
                                    Back to Login
                                </button>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-outline-variant text-center">
                            <p className="text-on-surface-variant text-[12px]">© 2024 SchoolLink Ghana. All Rights Reserved. Institutional Grade Security Enabled.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

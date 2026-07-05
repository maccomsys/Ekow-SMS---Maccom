import React from 'react';
import { GraduationCap, ArrowLeft, Gavel, Lock, ShieldAlert, Settings, Mail, MapPin, ArrowUp } from 'lucide-react';

export default function LegalPolicies({ navigate }: { navigate: (path: string) => void }) {
    return (
        <div className="bg-background text-on-background min-h-screen">
            <header className="h-16 fixed top-0 left-0 right-0 bg-surface z-50 border-b border-outline-variant flex items-center px-4 md:px-8">
                <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button onClick={()=>navigate('login')} className="flex items-center gap-2 group">
                            <GraduationCap className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-black text-primary tracking-tight">SchoolLink</span>
                        </button>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-base font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#tos">Terms of Service</a>
                        <a className="text-base font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#privacy">Privacy Policy</a>
                        <button onClick={() => navigate('sitemap')} className="text-base font-bold text-primary hover:underline transition-colors">Sitemap</button>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('login')} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline text-primary text-base font-semibold hover:bg-surface-container-high transition-all active:scale-95">
                            <ArrowLeft className="w-5 h-5" /> Back to Login
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center md:text-left">
                        <span className="text-xs font-bold text-primary bg-primary-fixed px-3 py-1 rounded-full uppercase">Legal Documentation</span>
                        <h1 className="text-4xl font-bold text-primary mt-4 mb-2">Terms of Service & Privacy Policy</h1>
                    </div>

                    <div className="bg-white border border-outline-variant rounded-2xl p-6 md:p-12 shadow-sm">
                        <section className="mb-20" id="tos">
                            <div className="flex items-center gap-3 mb-6">
                                <Gavel className="text-primary bg-secondary-container p-2 rounded-lg w-10 h-10" />
                                <h2 className="text-2xl font-semibold text-primary m-0">Terms of Service</h2>
                            </div>
                            <div className="prose prose-sm text-on-surface-variant max-w-none space-y-4">
                                <p>Welcome to SchoolLink. These Terms of Service ("Terms") govern your access to and use of the SchoolLink educational management platform, including our website, APIs, and mobile applications (the "Service"). By using SchoolLink, you agree to be bound by these Terms.</p>
                                <h3 className="text-xl font-semibold text-primary mt-6 mb-2 border-b border-outline-variant pb-2">1. Introduction</h3>
                                <p>SchoolLink is a comprehensive school management system designed specifically for the educational landscape of Ghana. Our platform facilitates communication between school administrators, teachers, parents, and students while streamlining academic operations, fee management, and record-keeping.</p>
                                <h3 className="text-xl font-semibold text-primary mt-6 mb-2 border-b border-outline-variant pb-2">2. User Responsibilities</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Provide accurate and complete information during the registration process.</li>
                                    <li>Maintain the confidentiality of your account credentials and notify us immediately of any unauthorized use.</li>
                                    <li>Use the platform only for lawful educational and administrative purposes.</li>
                                    <li>Ensure that any data uploaded (student records, financial data) is accurate and you have the legal right to share such information.</li>
                                </ul>
                            </div>
                        </section>

                        <section id="privacy">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="text-primary bg-secondary-container p-2 rounded-lg w-10 h-10" />
                                <h2 className="text-2xl font-semibold text-primary m-0">Privacy Policy</h2>
                            </div>
                            <div className="prose prose-sm text-on-surface-variant max-w-none space-y-4">
                                <p>Your privacy is critically important to us. SchoolLink is committed to protecting the personal information of students, parents, and educators. This policy outlines how we collect, use, and safeguard your data in accordance with the Ghana Data Protection Act, 2012 (Act 843).</p>
                                
                                <div className="grid md:grid-cols-2 gap-4 my-6">
                                    <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                                        <h4 className="text-base font-semibold text-primary mb-2 flex items-center gap-2">
                                            <ShieldAlert className="w-4 h-4" /> Data Encryption
                                        </h4>
                                        <p className="text-sm m-0">All data is encrypted in transit using SSL/TLS protocols and at rest using AES-256 standards.</p>
                                    </div>
                                    <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                                        <h4 className="text-base font-semibold text-primary mb-2 flex items-center gap-2">
                                            <Settings className="w-4 h-4" /> Access Control
                                        </h4>
                                        <p className="text-sm m-0">Role-based access ensures staff only see the data required for their specific duties.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 md:p-8 bg-primary rounded-2xl text-on-primary">
                                <h3 className="text-xl font-semibold mb-4">Questions or Legal Inquiries?</h3>
                                <p className="text-on-primary/80 mb-6 text-base">If you have any questions about these Terms or our Privacy Policy, please reach out to our legal and data protection team.</p>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-on-primary/60 uppercase">Email Us</span>
                                            <span className="text-base font-semibold">legal@schoollink.edu.gh</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-on-primary/60 uppercase">Head Office</span>
                                            <span className="text-base font-semibold">Accra Digital Centre, Ghana</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    
                    <footer className="mt-12 text-center text-on-surface-variant text-sm">
                        <p>© 2023 SchoolLink Management Systems. All rights reserved.</p>
                    </footer>
                </div>
            </main>
            <button onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary-container transition-colors">
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
}

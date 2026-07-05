import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

export default function Splash({ navigate }: { navigate: (path: string) => void }) {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('Initializing System');

    useEffect(() => {
        const steps = [
            { p: 15, t: "Connecting to Server..." },
            { p: 42, t: "Authenticating Identity..." },
            { p: 68, t: "Syncing Student Records..." },
            { p: 91, t: "Finalizing Dashboard..." },
            { p: 100, t: "Welcome Back" }
        ];
        
        let currentStep = 0;
        const updateProgress = () => {
            if (currentStep < steps.length) {
                setProgress(steps[currentStep].p);
                setText(steps[currentStep].t);
                const nextDelay = Math.random() * 800 + 400;
                currentStep++;
                if (currentStep < steps.length) {
                    setTimeout(updateProgress, nextDelay);
                } else {
                    setTimeout(() => navigate('login'), 1000);
                }
            }
        };
        setTimeout(updateProgress, 800);
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(circle_at_center,#ffffff_0%,#f8f9fb_100%)] overflow-hidden relative">
            <button onClick={() => navigate('sitemap')} className="absolute top-6 right-6 z-50 text-sm font-bold text-primary hover:underline bg-white/80 px-4 py-2 rounded-full shadow-sm">
                Sitemap
            </button>
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-cover bg-center grayscale" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkTBEC2A7q6BCKMA7QOqQydmGp6yAvBA_1bcHmVrANCL8syelqeVly_W0h_z-0H8ECVaXm4-_VPA7oOk9DFhZSM3-qe_57rc5tBM1jYDN4e8TtynPTmSZrn1OqIDOviW8ZmhBcLKOjtpTRrs6a2IetqvwsUI1boG2bv_KjZbDqNPbgrhw9m2OZU2cstXK1QTCcSntxFoQiiKiZXSblP6bccwONNotHDosuLPgVisySsTqEQtGSSaZ0')"}}></div>
            </div>
            <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">
                <div className="space-y-4 flex flex-col items-center">
                    <div className="w-20 h-20 bg-primary-container rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 duration-300">
                        <GraduationCap className="text-white w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-primary tracking-tight">SchoolLink</h1>
                        <p className="text-base text-secondary tracking-wide">Connecting Schools, Empowering Futures.</p>
                    </div>
                </div>
                <div className="w-full max-w-[280px] mt-12 space-y-2">
                    <div className="h-1.5 w-full bg-secondary-container rounded-full overflow-hidden relative">
                        <div className={`h-full ${progress === 100 ? 'bg-green-600' : 'bg-primary'} transition-all duration-700 ease-in-out rounded-full`} style={{width: `${progress}%`}}>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className={`text-xs font-bold uppercase ${progress === 100 ? 'text-green-700' : 'text-primary/60'}`}>{progress === 100 ? 'System Ready' : text}</span>
                        <span className="text-xs font-bold text-primary">{progress}%</span>
                    </div>
                </div>
                <div className="fixed bottom-12 flex flex-col items-center space-y-2 opacity-60">
                    <span className="text-xs font-bold text-secondary uppercase">A product for</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-base text-primary font-bold">Ghana Academy Admin</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

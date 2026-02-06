import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckSquare, LayoutDashboard, Moon, ShieldCheck, Zap } from 'lucide-react';

const Landing = () => {
    const { loginAsGuest } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLiveDemo = () => {
        loginAsGuest();
        navigate('/dashboard');
    };

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Texture Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
                style={{
                    backgroundImage: `radial-gradient(#6366f1 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />

            <div className="relative z-10 flex min-h-screen flex-col">
                {/* Navbar */}
                <nav className="flex items-center justify-between px-6 py-4 md:px-12">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20">
                            <CheckSquare className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TaskMaster</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                            Log in
                        </Link>
                        <Link to="/register">
                            <Button size="sm" className="shadow-lg shadow-primary/25">Get Started</Button>
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="flex flex-1 flex-col items-center justify-center px-4 text-center md:px-6">
                    <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        v1.0 is now live 🚀
                    </span>
                    <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
                        Manage your tasks with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Speed & Style</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Experience a beautifully designed task management tool optimized for productivity.
                        Track detailed tasks, organize your workflow, and get things done.
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-4">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link to="/register">
                                <Button size="lg" className="px-8 shadow-xl shadow-primary/30">Start for free</Button>
                            </Link>
                            <Button size="lg" variant="ghost" onClick={handleLiveDemo}>
                                Live Demo
                            </Button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            * Partial trial mode. No sign-in required.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-24 grid w-full max-w-5xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={LayoutDashboard}
                            title="Interactive Dashboard"
                            description="Get a bird's eye view of your progress with real-time stats and grid layout."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Instant Updates"
                            description="Update task status directly from the card. No extra clicks needed."
                        />
                        <FeatureCard
                            icon={Moon}
                            title="Dark Mode"
                            description="Beautifully crafted dark theme that respects your system preferences automatically."
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Secure & Private"
                            description="Your data is safe with enterprise-grade JWT authentication."
                        />
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-500">
                    <p>© 2026 TaskMaster. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <Card className="flex flex-col items-center p-6 text-center shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl border-slate-200/60 dark:border-slate-800/60 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </Card>
);

export default Landing;

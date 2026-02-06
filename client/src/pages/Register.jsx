import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { CheckSquare } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { name, email, password, confirmPassword } = formData;

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            setLoading(true);
            const result = await register(name, email, password);
            setLoading(false);
            if (result.success) {
                navigate('/dashboard');
            } else {
                alert(result.message);
            }
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
            {/* Texture Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
                style={{
                    backgroundImage: `radial-gradient(#6366f1 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />

            <Card className="relative z-10 w-full max-w-md border-slate-200/60 bg-white/80 p-8 shadow-2xl backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                        <CheckSquare className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Create an account
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Enter your information to get started
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="John Doe"
                        onChange={onChange}
                        required
                        className="bg-white/50 dark:bg-slate-950/50"
                    />
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="name@example.com"
                        onChange={onChange}
                        required
                        className="bg-white/50 dark:bg-slate-950/50"
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="••••••••"
                        onChange={onChange}
                        required
                        className="bg-white/50 dark:bg-slate-950/50"
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="••••••••"
                        onChange={onChange}
                        required
                        className="bg-white/50 dark:bg-slate-950/50"
                    />
                    <Button
                        type="submit"
                        className="mt-2 w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover shadow-lg shadow-primary/25"
                        size="lg"
                        isLoading={loading}
                    >
                        Create account
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                    </span>
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:text-primary-hover"
                    >
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;

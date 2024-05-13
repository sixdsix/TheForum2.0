import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/supabaseClient';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error: registerError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (registerError) {
                throw registerError;
            }

            setLoading(false);
            router.push('/');  // Redirect only after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Failed to register.');
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '420px', margin: '0 auto', padding: '20px' }}>
            <h1>Create Account</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <Link href="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
};

export default Register;

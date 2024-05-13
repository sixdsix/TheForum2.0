import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/supabaseClient';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                throw error;
            }

            router.push('/'); // Redirect to another page upon successful login
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '420px', margin: '0 auto', padding: '20px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <Link href="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
};

export default Login;

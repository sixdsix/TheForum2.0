import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/supabaseClient'; // Import supabase from the client

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const session = supabase.auth.getSession();
        if (!session) {
            // Redirect to login page if not logged in
            router.push('/login');
        }
    }, [router]);

    const handlePost = async () => {
            const { data: { user } } = await supabase.auth.getUser();
    
            if (!user || !user.email) {
                setError('No user logged in or user email not available');
                return;
            }
    
            const userEmail = user.email;
    
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    { title, content, user_email: userEmail }
                ]);
    
            if (error) throw error;
    
            router.push('/');
    };
    
    

    return (
        <div>
            <h1>Create Post</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={(e) => {
                e.preventDefault();
                handlePost();
            }}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
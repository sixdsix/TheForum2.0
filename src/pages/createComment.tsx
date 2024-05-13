import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import Link from 'next/link';
import supabase from '../utils/supabaseClient';

const CreateComment = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if user is initially logged in when component mounts
        const checkInitialSession = async () => {
            const session = supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            }
        };

        checkInitialSession();
    }, [router]);

    const handleCommentSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();
    
        if (!user || !user.email) {
            setError('No user logged in or user email not available');
            return;
        }
    
        const userEmail = user.email;
    
        const { data, error: insertError } = await supabase
            .from('comments')
            .insert([
                { 
                    content: content, 
                    post_id: postId, 
                    user_email: userEmail
                }
            ]);

        if (insertError) {
            setError(insertError.message);
        } else {
            router.push(`/post/${postId}`);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Add a Comment</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleCommentSubmit}>
                <div>
                    <label htmlFor="content">Comment:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Comment</button>
            </form>
            <div style={{ marginTop: '20px' }}>
                <Link href={`/post/${postId}`} passHref>
                    <button>Back to Post</button>
                </Link>
            </div>
        </div>
    );
};

export default CreateComment;

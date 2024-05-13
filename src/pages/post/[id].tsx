import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';

const PostPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchPostAndComments = async () => {
            // Fetch the post
            const { data: postData, error: postError } = await supabase
                .from('posts')
                .select(`
                    id,
                    title,
                    content,
                    created_at,
                    user_email
                `)
                .eq('id', id)
                .single();

            if (postError) {
                console.error('Error fetching post:', postError);
                setLoading(false);
                return;
            }

            setPost(postData);

            // Fetch comments related to the post
            const { data: commentData, error: commentError } = await supabase
                .from('comments')
                .select(`
                    id,
                    content,
                    created_at,
                    user_email
                `)
                .eq('post_id', id)
                .order('created_at', { ascending: false });

            if (commentError) {
                console.error('Error fetching comments:', commentError);
            }

            setComments(commentData);
            setLoading(false);
        };

        fetchPostAndComments();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!post) return <div>No post found.</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <small>Posted by: {post.user_email ? post.user_email.split('@')[0] : 'Unknown'}</small>
            <br />
            <Link href={`/createComment?postId=${id}`} passHref>
                <button style={{ marginTop: '10px' }}>Add Comment</button>
            </Link>

            <div>
                <h3>Comments:</h3>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.content}</p>
                            <small>Comment by: {comment.user_email.split('@')[0]}</small>
                            <br />
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            <Link href="/" passHref>
                <button style={{ marginTop: '10px' }}>Back to Home</button>
            </Link>
        </div>
    );
};

export default PostPage;

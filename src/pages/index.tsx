import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '../utils/supabaseClient'; // Import supabase from the client

const Index = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSessionAndSetupListener = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user || null);

      // Setup the listener for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
      });

      // Cleanup function to unsubscribe from listener on component unmount
      return () => {};
    };

    fetchSessionAndSetupListener();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
                id,
                title,
                content,
                created_at,
                user_email
            `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ width: '100vw', marginBottom: '50px', padding: '20px 0', margin: '0 auto' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <h1>TheForum</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {user ? (
            <>
              <button onClick={() => supabase.auth.signOut()}>Logout</button>
              <Link href="/create"><button style={{ marginLeft: '10px' }}>Create Post</button></Link>
            </>
          ) : (
            <>
              <Link href="/login"><button>Login</button></Link>
              <Link href="/register"><button style={{ marginLeft: '10px' }}>Register</button></Link>
            </>
          )}
        </div>
      </div>
      {posts.map((post, index) => (
        <div key={post.id} className={`post ${index === 0 ? 'first-post' : ''}`}>
          <Link href={`/post/${post.id}`} passHref>
            <div style={{ cursor: 'pointer' }}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <small>Posted by: {post.user_email.split('@')[0] || 'Unknown'}</small>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Index;

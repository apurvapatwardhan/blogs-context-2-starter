import React from 'react'
import Header from "../components/Header"
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import BlogDetails from '../components/BlogDetails';
function BlogPage() {
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  //const {blogId} = useParams();
  const blogId = location.pathname.split("/").at(-1);
  const {setLoading, loading} = useContext(AppContext)

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${baseUrl}?blogId=${blogId}`;
    try {
      const resp = await fetch(url);
      const op = await resp.json();

      setBlog(op.blog);
      setRelatedBlogs(op.relatedBlogs);
    }
    catch(err) {
      setBlog(null);
      setRelatedBlogs([]);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname])
  return (
    <div>
      <Header />
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      {
        loading ? (<div><p>Loading</p></div>) : (blog ? (<div>
          <BlogDetails post = {blog}/>
          <h2>Related Blogs</h2>
          {
            relatedBlogs.map(relatedBlog => {
              return (<div>
                <BlogDetails post={relatedBlog}/>
              </div>)
            })
          }
        </div>) :<div><p>No blog Found</p></div>)
      }
    </div>
  )
}

export default BlogPage

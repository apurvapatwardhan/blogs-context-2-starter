import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import TagPage from "./Pages/TagPage"
import Home from "./Pages/Home"
import BlogPage from "./Pages/BlogPage"
import CategoryPage from "./Pages/CategoryPage"
export default function App() {

  const { fetchBlogPosts } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    // Fetch the inital Blogposts data
    // fetchBlogPosts();
    
    const page = searchParams.get('page');

    if(location.pathname.includes('tag')) {
      const tag = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page), tag)
    }
    else if(location.pathname.includes('categories')) {
      const category = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page), null, category)
    }
    else {
      fetchBlogPosts(Number(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  return (
    <>
    <div className="fixed top-[300px] border-blue-600 border-2 ">Chacha</div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog/:blogId" element={<BlogPage />}></Route>
        <Route path="/tag/:tag" element={<TagPage />}></Route>
        <Route path="/categories/:category" element={<CategoryPage />}></Route>
      </Routes>
    </>
  );
}

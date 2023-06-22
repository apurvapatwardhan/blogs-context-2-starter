import React from 'react'
import Blogs from "../components/Blogs"
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination';

function TagPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const tag = location.pathname.split("/").at(-1).replace("-", " ");
  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
      <div className=' w-9/12 m-auto flex flex-col justify-center items-center'>
        <button className='self-center' onClick={() => navigate(-1)}>Back</button>
        <h2>Blogs tagged <span>{tag.replace(" ", "-")}</span></h2>
      </div>
      <Blogs />
      <Pagination />
      </div>
    </div>
  )
}

export default TagPage

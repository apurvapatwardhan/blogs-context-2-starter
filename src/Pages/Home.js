import React from 'react'
import Pagination from '../components/Pagination'
import Blogs from '../components/Blogs'
import Header from '../components/Header'

function Home() {
  return (
    <div>
       <Header />
      <div className="my-[100px]">
        <Blogs />
        <Pagination />
      </div>
    </div>
  )
}

export default Home

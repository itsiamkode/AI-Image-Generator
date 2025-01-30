import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Router from './Router/Router'
import ContextApi from './context/ContextApi'
import { GetPosts } from './api/index'
export default function App() {
  const [post, setPost] = useState({
    prompt: '',
    name: '',
    image: ''
  })
  const [imageGeneratorLoading, setImageGeneratorLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [postLoading, setPostLoading] = useState(false)

  const [allPosts, setAllPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [initialLoading, setInitialLoading] = useState(false)
  const [error, setError] = useState('')


  const getAllPosts = async () => {
    setInitialLoading(true)
    try {
      await GetPosts().then((res) => {
        setAllPosts(res?.data?.data)
        setInitialLoading(false)
      })
    } catch (error) {
      setInitialLoading(false)
      setError(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])
  return (
    <ContextApi.Provider value={{ post, setPost, loading, setLoading, imageGeneratorLoading, setImageGeneratorLoading, postLoading, setPostLoading, allPosts, setAllPosts, search, setSearch, searchResult, setSearchResult, initialLoading, setInitialLoading, error, setError }}>
      <div className='bg-[#010113]'>
        <Navbar />
        <Router />
      </div>
    </ContextApi.Provider>
  )
}

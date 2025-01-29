import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Router from './Router/Router'
import ContextApi from './context/ContextApi'
export default function App() {
  const [post, setPost] = useState({
    prompt: '',
    author: '',
    image: ''
  })
  const [imageGeneratorLoading, setImageGeneratorLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [postLoading, setPostLoading] = useState(false)
  return (
    <ContextApi.Provider value={{ post, setPost, loading, setLoading, imageGeneratorLoading, setImageGeneratorLoading, postLoading, setPostLoading }}>
      <div className='bg-[#010113]'>
        <Navbar />
        <Router />
      </div>
    </ContextApi.Provider>
  )
}

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Components/LandingPage'
import GenerateImage from '../Components/GenerateImage'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/generate-image' element={<GenerateImage />} />
    </Routes>
  )
}

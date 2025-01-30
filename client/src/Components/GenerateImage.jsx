import React from 'react'
import GeneratedImage from './GeneratedImage'
import GenerateImagePrompt from './GenerateImagePrompt'
export default function GenerateImage() {
  return (
    <div className='md:container  md:px-15 xxs:px-5 sm:px-5 mt-15 mx-auto flex xxs:gap-y-7 sm:gap-y-7 md:flex-row sm:flex-col xxs:flex-col justify-between'>
    <GenerateImagePrompt/>
     <GeneratedImage/>
    </div>
  )
}

import React, { useContext } from 'react'
import ContextApi from '../context/ContextApi'
import ImageGeneratorLoading from './ImageGeneratorLoading'
export default function GeneratedImage() {
    const {  post, imageGeneratorLoading } = useContext(ContextApi)
    return (
        <div className='md:w-[50%] border-2 flex justify-center items-center border-dashed rounded-xl p-2 border-[#f8edc2] md:h-[460px] xxs:h-[300px] sm:h-[300px]'>
            {
                imageGeneratorLoading ? (
                    <div className='text-[#c4c5c5c7] flex justify-center gap-2 items-center'>
                        <ImageGeneratorLoading /> Generating Your Image...
                    </div>
                ) : (
                    <>
                        {
                            post.image ? (
                                <img src={post.image} className='w-[100%] h-[100%] object-cover rounded-xl' alt="" />
                            ) : (
                                <div className='text-[#c4c5c5c7]'>Write a prompt to generate the image</div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

import React, { useContext, useState } from 'react'
import ContextApi from '../context/ContextApi'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import PostLoading from './PostLoading'
import { CreatePost, GenerateImage } from '../api/index'
export default function GenerateImagePrompt() {
    const { post, setPost, setLoading, loading, postLoading, setPostLoading, setImageGeneratorLoading } = useContext(ContextApi)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handleGenerateImage = async () => {
        setLoading(true)
        setImageGeneratorLoading(true)
        await GenerateImage({ prompt: post.prompt }).then((res) => {
            setPost({ ...post, image: res.data.image })
            setLoading(false)
            setImageGeneratorLoading(false)
        }).catch((err) => {
            setError(err?.response?.data?.message)
            setLoading(false)
            setImageGeneratorLoading(false)
        })
    }
    const handleCreatePost = async () => {
        setPostLoading(true)
        await CreatePost(post).then((res) => {
            navigate('/')
            setPostLoading(false)
        }).catch((err) => {
            setError(err?.response?.data?.message)
            setPostLoading(false)
        })
    }
    return (
        <div className='md:w-[50%]'>
            <div className='text-white md:text-3xl xxs:text-[27px] sm:text-[27px] font-semibold'>Generate Image with prompt</div>
            <div className='text-[#c4c5c5] md:text-lg xxs:pe-2 sm:pe-2 mt-2 '>Write your prompt according to the image you want to generate!</div>
            <div className='flex flex-col mt-5 gap-2'>
                <div className='text-[#c4c5c5] text-sm ms-1'>AUTHOR</div>
                <input type="text" name="name" id="name" value={post.name} onChange={(e) => { setPost({ ...post, name: e.target.value }) }} placeHolder="Enter your name" className='bg-transparent border-1 border-[#c4c5c577] md:w-[85%] rounded-lg text-white outline-none py-2 px-5' />
            </div>
            <div className='flex flex-col mt-3 xxs:mt-6 sm:mt-6 gap-2'>
                <div className='text-[#c4c5c5] text-sm ms-1'>IMAGE PROMPT</div>
                <textarea name="name" id="name" value={post.prompt} onChange={(e) => { setPost({ ...post, prompt: e.target.value }) }} placeHolder="Write a detailed prompt about the image" className='bg-transparent border-1 border-[#c4c5c577] md:w-[85%] h-[150px] rounded-lg text-white outline-none py-2 px-5' />
            </div>
            {error && (<div className='text-sm text-red-500 mt-2'>{error}</div>)}
            <div className='text-[#c4c5c5cb] md:text-[14px] xxs:text-[11px] sm:text-[11px] mt-3'>* You can post the AI Generated image to showcase in the community!</div>
            <div className='md:w-[83%] mt-5 flex justify-between'>
                <button disabled={post.prompt == '' || post.author == ''} onClick={handleGenerateImage} className='w-[48%] cursor-pointer flex gap-1 justify-center items-center rounded-lg py-2 text-white font-[500] md:text-lg bg-gradient-to-r from-[#215AF8] from-100%'>
                    {
                        loading ? (
                            <>
                                <Loading />
                            </>
                        ) : (
                            <>
                                <svg style={{ background: 'transparent' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#ffffff" d="M21.738 16.13a1 1 0 0 1-.19.61a1 1 0 0 1-.52.38l-1.71.57a3.6 3.6 0 0 0-1.4.86a3.5 3.5 0 0 0-.86 1.4l-.6 1.7a1 1 0 0 1-.36.51a1.1 1.1 0 0 1-.62.19a1 1 0 0 1-1-.71l-.57-1.71a3.5 3.5 0 0 0-.86-1.4a3.8 3.8 0 0 0-1.4-.87l-1.71-.56a1.1 1.1 0 0 1-.51-.37a1.1 1.1 0 0 1-.21-.62a1 1 0 0 1 .71-1l1.72-.57a3.54 3.54 0 0 0 2.28-2.28l.57-1.69a1 1 0 0 1 .95-.73c.215 0 .426.059.61.17c.182.125.322.303.4.51l.58 1.74a3.54 3.54 0 0 0 2.28 2.28l1.7.6a1 1 0 0 1 .51.38a1 1 0 0 1 .21.61m-9.999-6.36a1 1 0 0 1-.17.55a1 1 0 0 1-.47.35l-1.26.42c-.353.122-.673.32-.94.58a2.5 2.5 0 0 0-.58.94l-.43 1.24a.9.9 0 0 1-.35.47a1 1 0 0 1-.56.18a1 1 0 0 1-.57-.19a1 1 0 0 1-.34-.47l-.41-1.25a2.44 2.44 0 0 0-.58-.93a2.2 2.2 0 0 0-.93-.58l-1.25-.42a.93.93 0 0 1-.48-.35a1 1 0 0 1 .48-1.47l1.25-.41a2.49 2.49 0 0 0 1.53-1.53l.41-1.23a1 1 0 0 1 .32-.47a1 1 0 0 1 .55-.2a1 1 0 0 1 .57.16a1 1 0 0 1 .37.46l.42 1.28a2.49 2.49 0 0 0 1.53 1.53l1.25.43a.92.92 0 0 1 .46.35a.94.94 0 0 1 .18.56m5.789-5.36a1 1 0 0 1-.17.51a.82.82 0 0 1-.42.3l-.62.21a.84.84 0 0 0-.52.52l-.22.63a.93.93 0 0 1-.29.39a.82.82 0 0 1-.52.18a1.1 1.1 0 0 1-.49-.15a.9.9 0 0 1-.32-.44l-.21-.62a.7.7 0 0 0-.2-.32a.76.76 0 0 0-.32-.2l-.62-.2a1 1 0 0 1-.42-.31a.9.9 0 0 1-.16-.51a.94.94 0 0 1 .17-.51a.9.9 0 0 1 .42-.3l.61-.2a.9.9 0 0 0 .33-.2a.9.9 0 0 0 .2-.33l.21-.62c.06-.155.155-.292.28-.4a1 1 0 0 1 .49-.19a.94.94 0 0 1 .53.16a1 1 0 0 1 .32.41l.21.64a.9.9 0 0 0 .2.33a1 1 0 0 0 .32.2l.63.21a1 1 0 0 1 .41.3a.87.87 0 0 1 .17.51" />
                                </svg>
                                Generate Image
                            </>
                        )
                    }
                </button>
                <button disabled={post.prompt == '' || post.author == ''} onClick={handleCreatePost} className='w-[48%] cursor-pointer flex justify-center gap-1 items-center rounded-lg py-2 text-white font-[500] md:text-lg bg-gradient-to-r from-purple-600 to-purple-700'>
                    {
                        postLoading ? (
                            <>
                                <PostLoading />
                            </>
                        ) : (
                            <>
                                <svg style={{ background: 'transparent' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                    <path fill="#ffffff" d="M8.707 19.707L18 10.414L13.586 6l-9.293 9.293a1 1 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263M21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586L19.414 9z" />
                                </svg>
                                <div style={{ background: 'transparent' }}>Post Image</div>
                            </>
                        )
                    }
                </button>
            </div>
        </div>
    )
}

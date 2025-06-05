import React from 'react'
import ReturnButton from '../../Shared/Components/ReturnButton'
import PostComponent from '../Components/PostComponent'

const PostScreen = () => {
  return (
    <div className='w-full h-screen pl-7 pr-7'>
        <ReturnButton></ReturnButton>
        <PostComponent captionText="hehehehe"></PostComponent>
    </div>
  )
}

export default PostScreen
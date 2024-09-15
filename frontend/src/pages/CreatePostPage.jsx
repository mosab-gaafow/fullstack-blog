import React from 'react'
import CreatePost from '../components/CreatePost'
import ProtectedPage from '../util/ProtectedPage'

const CreatePostPage = () => {
  return (
    
    <>
    <h1>Cdae</h1>
    <ProtectedPage>
    <CreatePost/>
  </ProtectedPage>
    </>
  )
  


}

export default CreatePostPage

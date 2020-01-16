import React from 'react'

const BlogForm = ({
    onSubmit, 
    handleBlogChange, 
    handleAuthorChange,
    handleUrlChange,
    newBlog,
    newAuthor,
    newUrl}) => {
    return (
        <div>
            <h2>Add blog</h2>
            <form onSubmit={onSubmit}>
                title: <input value={newBlog} onChange={handleBlogChange} /><br />
                author: <input value={newAuthor} onChange={handleAuthorChange} /><br />
                url: <input value={newUrl} onChange={handleUrlChange} /><br />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default BlogForm
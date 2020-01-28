import React from 'react'

const BlogForm = ({
    onSubmit,
    newBlog,
    newAuthor,
    newUrl
    }) => {
    return (
        <div>
            <h2>Add blog</h2>
            <form onSubmit={onSubmit}>
                title: <input {...newBlog} reset={null} /><br />
                author: <input {...newAuthor} reset={null}/><br />
                url: <input {...newUrl} reset={null}/><br />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default BlogForm
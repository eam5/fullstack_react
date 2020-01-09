const dummy = (blogs) => {
    return 1
  }

const totalLikes = array => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return array.reduce(reducer, 0)
}

const favoriteBlog = array => {
    const likes = array.map(item => item.likes)
    return Math.max(...likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
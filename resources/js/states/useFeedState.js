import { atom, useRecoilState } from 'recoil'

const feedState = atom({
    key: 'feed',
    default: {
        currentPage: 0,
        lastPage: null,
        posts: []
    }
})

export default function() {
    const [feed, setFeed] = useRecoilState(feedState)

    const hasNext = feed.lastPage && feed.currentPage < feed.lastPage 

    const prependPosts = (post) => {
        setFeed(feed => {
            return {
                ...feed, 
                posts: [post, ...feed.posts]
            }
        })
    }

    const updateFeed = ({currentPage, lastPage, posts}) => {
        setFeed(({posts:oldPosts}) => {
            return {
                currentPage,
                lastPage,
                posts: [...oldPosts, ...posts]
            }
        })
    }

    return { feed, updateFeed, setFeed, hasNext, prependPosts }
}
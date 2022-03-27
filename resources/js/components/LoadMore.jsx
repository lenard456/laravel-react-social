import { Button } from "antd"
const LoadMore = function ({ isLoading, hasNext, seeMore }) {
    if (isLoading) return null

    return (
        <div className='text-center leading-8 mt-3 h-8' >
            {hasNext
                ? <Button onClick={seeMore}>See more</Button>
                : <span>You reach the end. Follow more people to see more</span>
            }
        </div>
    )
}

export default LoadMore
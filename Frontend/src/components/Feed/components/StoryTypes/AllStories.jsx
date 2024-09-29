import { useLoaderData } from 'react-router-dom'
import Stories from '../Stories/Stories.jsx'

function AllStories() {
    const data = useLoaderData()
    const storyTypes = ["Food", "Health & Fitness", "Travel", "Movie", "Education"]
    return (
        <>
            {data?.map((stories, idx) =>
                <Stories title={storyTypes[idx]} data={stories} key={idx}/>
            )}
        </>
    )
}

export default AllStories
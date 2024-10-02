import { useEffect, useState } from 'react'
import './index.css'
import {
    NavLink,
    useLoaderData,
    useParams
} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const apiUrl = import.meta.env.VITE_SERVER_API

function Stories({ title, data }) {
    const type = useParams().type || ""
    const [stories, setStories] = useState(data)
    const [fetchAll, setFetchAll] = useState(1)
    const loadData = useLoaderData()

    useEffect(() => {
        if (type) {
            setStories(ele => loadData)
            setFetchAll(1);
        }
    }, [type])


    const fetAllStories = async (e) => {
        e.target.style.pointerEvents = 'none'
        try {
            if (title == "Bookmarks") {
                const res = await axios.get(`${apiUrl}/feed/bookmarks?skip=${stories.length}`, {
                    withCredentials: true
                })
                const data = res.data.data
                setStories(ele => {
                    const arr = [...ele, ...data]
                    return arr;
                })
            }
            else {
                const tag = title || type
                const res = await axios.get(`${apiUrl}/feed/stories?skip=${stories.length}&type=${tag.split(" ")[0].toLowerCase()}`, {
                    withCredentials: true
                })
                const data = res.data.data
                setStories(ele => {
                    const arr = [...ele, ...data]
                    return arr;
                })
            }
        } catch (error) {
            toast(error.response?.data?.message || error.message)
        }
        setFetchAll(0)
        e.target.style.pointerEvents = 'auto'
    }

    return (
        <>
            {stories?.length ? <div className='stories-container'>
                <p className='stories-heading'>{`${title === 'Bookmarks' ? 'Bookmarks' : `Top Stories about ${title || type}`}`}</p>
                <div className='stories-row'>
                    {stories?.map((ele, idx) =>
                        <NavLink className="stories-story" style={ele.slide.type === 'image' ? { backgroundImage: `url(${ele.slide.url})` } : null} key={idx} to={`/${title === 'Bookmarks' ? `bookmarks?story=${ele.story}&slide=${ele.slide._id}` : type + `?story=${ele._id}`}`} >

                            {ele.slide.type === 'video' && <video src={ele.slide.url} className="story-video" />}
                            <div className="stories-story-footer">
                                <p className="stories-story-footer-heading">{ele.slide.name.substring(0, 30)}</p>
                                <p className="stories-story-footer-description">{ele.slide.description.substring(0, 200)}</p>
                            </div>

                        </NavLink>
                    )}
                </div>
                {fetchAll ? <button className='stories-more-btn' onClick={fetAllStories}>See more</button> : null}
            </div> : <div className='feed-nostory'>
                <p className='stories-heading'>{`${title === 'Bookmarks' ? 'Bookmarks' : `Top Stories about ${title || type}`}`}</p>
                <p className='feed-nostory-text'>No stories Available</p>
                <div />
            </div>}
        </>
    )
}

export default Stories
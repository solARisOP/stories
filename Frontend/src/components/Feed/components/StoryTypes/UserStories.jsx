import { useDispatch, useSelector } from "react-redux"
import { BiEdit } from "react-icons/bi";
import { addStory } from "../../../../features/storySlice";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import EditStory from "../../../EditStory/EditStory";

const apiUrl = import.meta.env.VITE_SERVER_API

function UserStories() {

    const [editOpen, setEditOpen] = useState("")

    const { type } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const userStories = useSelector(state => state.userStories)

    const [fetchAll, setFetchAll] = useState(1)

    const fetAllStories = async (e) => {
        try {
            e.target.style.pointerEvents = 'none'
            const res = await axios.get(`${apiUrl}/feed/user-stories?skip=${userStories.length}`, {
                withCredentials: true
            })
            const stories = res.data.data
            dispatch(addStory(stories))
        } catch (error) {
            toast(error.response?.data?.message || error.message)
        }
        setFetchAll(0)
        e.target.style.pointerEvents = 'auto'
    }

    const openEditModal = async (e) => {
        const key = e.currentTarget.dataset.id
        setEditOpen(key)
    }

    const closeEditModal = async (e) => {
        setEditOpen("")
    }

    return (
        <>
            {user ?
                (userStories.length ? <div className="feed-stories-container">
                    <p className="feed-stories-heading">Your Stories</p>
                    <div className="feed-stories-row">
                        {userStories.map((ele, idx) =>
                            <div className="feed-stories-story" key={idx} >
                                <NavLink className="feed-story-body" style={ele.slide.type === 'image' ? { backgroundImage: `url(${ele.slide.url})` } : null} to={`/${type || ""}?story=${ele._id}`}>
                                    {ele.slide.type === 'video' && <video src={ele.slide.url} className="story-video" />}
                                    <div className="feed-story-footer">
                                        <p className="feed-story-footer-heading">{ele.slide.name.substring(0, 30)}</p>
                                        <p className="feed-story-footer-description">I{ele.slide.description.substring(0, 200)}</p>
                                    </div>
                                </NavLink>
                                <div className="feed-story-edit-btn" onClick={openEditModal} data-id={ele._id}><BiEdit size={30} /> Edit </div>
                            </div>
                        )}
                    </div>
                    {fetchAll ? <button className="feed-stories-more-btn" onClick={fetAllStories}>See more</button> : null}
                </div> : <div className="feed-nostory">
                    <p className='stories-heading'>Your Stories</p>
                    <p className="feed-nostory-text">No stories Available</p>
                    <div />
                </div>)
                : null
            }

            {editOpen ? <EditStory storyId={editOpen} closeEditModal={closeEditModal} /> : null}
        </>
    )
}

export default UserStories
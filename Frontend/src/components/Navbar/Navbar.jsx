import "./index.css"
import { 
    useDispatch, 
    useSelector 
} from 'react-redux'

import { 
    NavLink, 
    useLocation,  
} from 'react-router-dom';

import {
    IoMenu,
    IoBookmarkSharp
} from "react-icons/io5";

import { 
    useEffect, 
    useState 
} from "react";

import { 
    setStories, 
    setUser 
} from "../../features/storySlice.js";

import Auth from "../Auth/Auth.jsx";
import EditStory from '../EditStory/EditStory.jsx'
import { FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import Story from "../Story/Story.jsx";

const apiUrl = import.meta.env.VITE_SERVER_API

function Navbar() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const location = useLocation()    
        
    const [openDropdown, setOpenDropdown] = useState(0);
    const [authOpen, setAuthOpen] = useState("");
    const [editOpen, setEditOpen] = useState(0);
    const [storyOpen, setStoryOpen] = useState("")
    
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const pathname = location.pathname
        const key = params.get('story')
        
        if(["/food", "/health", "/travel", "/movie", "/education", "/bookmarks", "/"].includes(pathname) && key && !storyOpen) {
            setStoryOpen(key)            
        }
        else if(!key) {
            setStoryOpen("") 
        }
    }, [location])

    const openEditModal = () => {
        setEditOpen(1);
    }
    
    const closeEditModal = () => {
        setEditOpen(0);
    }

    const openAuthModal = (e) => {
        const title = e.currentTarget.dataset.title;
        setAuthOpen(title);
    }

    const closeAuthModal = () => {
        setAuthOpen("");
    }

    const logout = async(e) => {
        try {
            e.target.style.pointerEvents = 'none';
            await axios.patch(`${apiUrl}/user/logout-user`, {}, {withCredentials: true})
            dispatch(setUser(null));
            dispatch(setStories([]));
            toast.success("user logged out successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
        e.target.style.pointerEvents = 'auto';
    }

    return (
        <>
            <div className='nav-body'>

                <div className='nav-content-big'>
                    {user ? <>
                        <NavLink className='nav-btn nav-mark' to={'/bookmarks'} ><IoBookmarkSharp size={24} color={'#FFFFF'} />Bookmarks</NavLink>
                        <button className='nav-btn' onClick={openEditModal}>Add story</button>
                        <div className='nav-pic' ></div>
                        <IoMenu size={24} color={'#000000'} style={{ cursor: "pointer" }} onClick={e => setOpenDropdown(ele => !ele)} />
                        <div style={{ display: `${openDropdown ? 'flex' : 'none'}` }} className="nav-big-lgt-div">
                            <p className=".nav-dropdown-title">{user.username}</p>
                            <button className='nav-btn' onClick={logout}>Logout</button>
                        </div>
                    </> : <>
                        <button className='nav-btn' onClick={openAuthModal} data-title ="Register">Register Now</button>
                        <button className='nav-btn' style={{ background: "#73ABFF" }} onClick={openAuthModal} data-title ="Login">Sign In</button>
                    </>}
                </div>

                <div className='nav-content-small-div' >
                    <div className="nav-small-btn-div">
                        <IoMenu size={24} color={'#000000'} style={{ cursor: "pointer" }} onClick={e => setOpenDropdown(ele => !ele)} />
                    </div>
                    <div className="nav-content-small" style={{ display: `${openDropdown ? 'flex' : 'none'}` }}>
                        {user ? <>
                            <div className="nav-small-name-div">
                                <div className='nav-pic' ></div>
                                <p className=".nav-dropdown-title">{user.username}</p>
                                <FiX size={24} color={'#000000'} style={{ cursor: "pointer" }} onClick={e => setOpenDropdown(ele => !ele)} />
                            </div>
                            <button className='nav-btn' onClick={logout}>Logout</button>
                            <NavLink className='nav-btn nav-mark' to={'/bookmarks'}><IoBookmarkSharp size={24} color={'#FFFFF'} />Bookmarks</NavLink>
                            <button className='nav-btn' onClick={openEditModal}>Add story</button>
                        </> : <>
                            <button className='nav-btn' onClick={openAuthModal} data-title ="Register">Register</button>
                            <button className='nav-btn' onClick={openAuthModal} data-title ="Login" >Login</button>
                        </>}
                    </div>
                </div>
            </div>

            {authOpen ? <Auth title={authOpen} closeAuthModal={closeAuthModal} /> : null}
            {editOpen ? <EditStory closeEditModal={closeEditModal} /> : null}
            {storyOpen ? <Story storyId={storyOpen} openAuthModal={setAuthOpen} closeModal={setStoryOpen} /> : null}
        </>
    )
}

export default Navbar
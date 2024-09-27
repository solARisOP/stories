import "./index.css"
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {
    IoMenu,
    IoBookmarkSharp
} from "react-icons/io5";
import Auth from "../Auth/Auth.jsx";
import EditStory from "../EditStory/EditStory.jsx";
import { useState } from "react";
import { FiX } from "react-icons/fi";

function Navbar() {
    const user = useSelector(state => state.user);

    const [openDropdown, setOpenDropdown] = useState(0);
    const [authOpen, setAuthOpen] = useState("");
    const [editOpen, setEditOpen] = useState(0);

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

    return (
        <>
            <div className='nav-body'>

                <div className='nav-content-big'>
                    {user ? <>
                        <button className='nav-btn nav-mark'><IoBookmarkSharp size={24} color={'#FFFFF'} />Bookmarks</button>
                        <button className='nav-btn' onClick={openEditModal}>Add story</button>
                        <div className='nav-pic' ></div>
                        <IoMenu size={24} color={'#000000'} style={{ cursor: "pointer" }} onClick={e => setOpenDropdown(ele => !ele)} />
                        <div style={{ display: `${openDropdown ? 'flex' : 'none'}` }} className="nav-big-lgt-div">
                            <p className=".nav-dropdown-title">Nitish</p>
                            <button className='nav-btn'>Logout</button>
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
                                <p className=".nav-dropdown-title">Nitish</p>
                                <FiX size={24} color={'#000000'} style={{ cursor: "pointer" }} onClick={e => setOpenDropdown(ele => !ele)} />
                            </div>
                            <button className='nav-btn '>Logout</button>
                            <button className='nav-btn nav-mark'><IoBookmarkSharp size={24} color={'#FFFFF'} />Bookmarks</button>
                            <button className='nav-btn' onClick={openEditModal}>Add story</button>
                        </> : <>
                            <button className='nav-btn' onClick={openAuthModal} data-title ="Register">Register</button>
                            <button className='nav-btn' onClick={openAuthModal} data-title ="Login" >Login</button>
                        </>}
                    </div>
                </div>
            </div>

            {authOpen && <Auth title={authOpen} closeAuthModal={closeAuthModal} />}
            {editOpen && <EditStory closeEditModal={closeEditModal} />}
        </>
    )
}

export default Navbar
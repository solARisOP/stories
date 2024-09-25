import "./index.css"
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { 
    IoMenu,
    IoBookmarkSharp
} from "react-icons/io5";
import Auth from "../Auth/Auth.jsx";
import EditStory from "../EditStory/EditStory.jsx";

function Navbar() {
    const user = useSelector(state => state.user);

    return (
        <>
        <div className='nav-body'>
            <div className='nav-content'>
                {user ? <>
                    <button className='nav-btn nav-mark'><IoBookmarkSharp size={24} color={'#FFFFF'} />Bookmarks</button>
                    <button className='nav-btn'>Add story</button>
                    <div className='nav-pic' ></div>
                    <IoMenu size={24} color={'#000000'} style={{cursor: "pointer"}}/>
                </> : <>
                <button className='nav-btn'>Register Now</button>
                <button className='nav-btn' style={{background: "#73ABFF"}}>Sign In</button>
                </>}
            </div>
        </div>
        <Auth title={"Register"} />
        {/* <EditStory /> */}
        
        </>
    )
}

export default Navbar
import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import { MdOutlineCancel } from "react-icons/md";
// import { GoEye } from "react-icons/go";
import './index.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setStories, setUser } from '../../features/storySlice.js';
const apiUrl = import.meta.env.VITE_SERVER_API

function Auth({title, closeAuthModal}) {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("");

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const submitAuth = async(e) => {
		let validationError = ""

		if(/^[a-zA-Z]{4,}$/.test(username.trim()) == 0) {
			setUsername("")
			validationError = "Please enter valid username";
		}

        if(/^(?=\S)(\S{5,})$/.test(password.trim())==0) {
			setPassword("")
			validationError = "Please enter valid password";
		}

        if(!validationError) { 
            e.target.style.pointerEvents = 'none';
			try {
                const res = await axios.post(`${apiUrl}/user/${title.toLowerCase()}-user`,{
                    username,
					password
				}, { 
                    withCredentials: true 
                })

                if(title == 'Login') {
                    const {user, stories} = res.data.data
                    dispatch(setUser(user))
                    dispatch(setStories(stories))
                }
                
                closeAuthModal()
                toast.success(`User ${title} Successfully`)
			} catch (error) {
                toast.error(error.response?.data?.message || error.message)
			}           
			e.target.style.pointerEvents = 'auto';
		}
		else setError(validationError);
    }

  return (
    <Modal> 
        <div className='auth-body'>
            <div className='auth-cancel-container'>
                <MdOutlineCancel color='#FF0000' size={35} onClick={closeAuthModal} style={{cursor: 'pointer'}}/>
            </div>
            <p className='auth-title'>{title}</p>
            <div className='auth-input-div'>
                <p className='auth-input-field-title'>Username</p>
                <input type="text" className='auth-input-field' placeholder='Enter your usename' value={username || ""} onChange={updateUsername}/>
            </div>
            <div className='auth-input-div'>
                <p className='auth-input-field-title'>Password</p>
                <input type="password" className='auth-input-field' placeholder='Enter your password' value={password || ""} onChange={updatePassword}/>
            </div>
            <p style={{textAlign: 'center', color: "#FF0E0E", fontSize: "12px", fontWeight: "700", lineHeight: "15.62px"}}>
                {error}
            </p>
            <button className='auth-submit-btn' onClick={submitAuth}>
                {title}
            </button>

        </div>
    </Modal>
  )
}

export default Auth
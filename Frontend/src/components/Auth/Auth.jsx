import React from 'react'
import Modal from '../Modal/Modal.jsx'
import { MdOutlineCancel } from "react-icons/md";
import { GoEye } from "react-icons/go";
import './index.css';


function Auth({title}) {
  return (
    <Modal> 
        <div className='auth-body'>
            <div className='auth-cancel-container'>
                <MdOutlineCancel color='#FF0000' size={35}/>
            </div>
            <p className='auth-title'>{title}</p>
            <div className='auth-input-div'>
                <p className='auth-input-field-title'>Username</p>
                <input type="text" className='auth-input-field' placeholder='Enter your usename'/>
            </div>
            <div className='auth-input-div'>
                <p className='auth-input-field-title'>Password</p>
                <input type="password" className='auth-input-field' placeholder='Enter your password'/>
            </div>
            <button className='auth-submit-btn'>
                {title}
            </button>

        </div>
    </Modal>
  )
}

export default Auth
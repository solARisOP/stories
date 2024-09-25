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
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "30px", width: "100%"}}>
                <p style={{fontSize: "20px", fontWeight: "700", lineHeight: "26.04px", textAlign: 'right'}}>Username</p>
                <input type="text" style={{border: "1px solid #000000", padding: "2px"}} placeholder='Enter your usename'/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "31px", width: "100%"}}>
                <p style={{fontSize: "20px", fontWeight: "700", lineHeight: "26.04px", textAlign: "right"}}>Password</p>
                <div style={{display: "flex"}}>
                    <input type="password" style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000", padding: "2px"}} placeholder='Enter your password'/>
                    <div style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderRight: "1px solid #000000"}}>
                    <GoEye size={24}/>
                    </div>
                </div>
            </div>
            <button style={{backgroundColor: "#73ABFF", fontWeight: "600", fontSize: "15px", lineHeight : "40px", width: "100px", borderRadius: "20px"}}>
                {title}
            </button>

        </div>
    </Modal>
  )
}

export default Auth
import Modal from "../Modal/Modal"
import { 
    MdArrowBackIos,
    MdArrowForwardIos
} from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import { 
    FaBookmark,
    FaHeart
} from "react-icons/fa";


import './index.css'

function Story() {
    const arr = [0,1,2,3,4,5]
    const imgUrl = 'https://images.pexels.com/photos/24014245/pexels-photo-24014245/free-photo-of-photo-of-a-small-domestic-dog-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    return (
        <Modal >
            <div style={{ width: "800px", zIndex: 10, display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
                <MdArrowBackIos size={60} color="#FFFFFF" style={{cursor: "pointer"}} />
                <div style={{backgroundImage: `url(${imgUrl})`}} className="story-body">
                    <div style={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                        <div style={{display: 'flex', gap: "8px", width: "100%", paddingTop: "35px", paddingInline: "10px"}}>
                            {arr.map(ele=>
                                <div style={{flex : "1 1 0%", backgroundColor: "#FFFFFF", height: "2px"}} />
                            )}
                        </div>
                        <div style={{display: 'flex', padding: "20px", width: "100%", justifyContent: "space-between", alignItems: 'center'}}>
                            <FiX size={30} color="#FFFFFF" />
                            <TbSend size={24} color="#FFFFFF" />
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: "100%", gap: "10px", paddingInline: "20px"}}>
                        <p style={{fontSize: "20px", fontWeight: "700", lineHeight: "26.04px", color: "#FFFFFF"}}>Heading comes here</p>
                        <p style={{fontSize: "10px", fontWeight: "700", lineHeight: "13.02px", color: "#FFFFFF"}}>Inspirational designs, illustrations, and graphic elements from the world's best designers.</p>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%", paddingInline: "20px", marginBottom: "20px"}}>
                            <FaBookmark size={24} color="#FFFFFF" />
                            <FaHeart size={24} color="#FFFFFF" />
                        </div>
                    </div>
                </div>
                <MdArrowForwardIos size={60} color="#FFFFFF" style={{cursor: "pointer"}} />
            </div>
        </Modal>
    )
}

export default Story
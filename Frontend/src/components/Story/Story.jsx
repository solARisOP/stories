import Modal from "../Modal/Modal"
import { 
    MdArrowBackIos,
    MdArrowForwardIos,
    MdOutlineFileDownloadDone
} from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import { 
    FaBookmark,
    FaHeart
} from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import './index.css'

const arr = [0,1,2,3,4,5]
const imgUrl = 'https://images.pexels.com/photos/24014245/pexels-photo-24014245/free-photo-of-photo-of-a-small-domestic-dog-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

function Story() {
    return (
        <Modal>
            <div className="story-container">
                <MdArrowBackIos size={60} color="#FFFFFF" className="story-arrow" />
                <div style={{backgroundImage: `url(${imgUrl}), linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))`}} className="story-body">
                    <div className="story-body-header">
                        <div className="story-body-bar-div">
                            {arr.map(ele=>
                                <div className="story-body-bar" />
                            )}
                        </div>
                        <div className="story-body-op-div">
                            <FiX size={30} color="#FFFFFF" />
                            <TbSend size={24} color="#FFFFFF" />
                        </div>
                    </div>
                    <div className="story-body-footer">
                        <p className="story-footer-heading">Heading comes here</p>
                        <p className="story-footer-description">Inspirational designs, illustrations, and graphic elements from the world's best designers.</p>
                        <div className="story-footer-op-div">
                            <FaBookmark size={24} color="#FFFFFF" />
                            <TfiDownload size={24} color="#FFFFFF"/>
                            <FaHeart size={24} color="#FFFFFF" />
                        </div>
                    </div>
                </div>
                <MdArrowForwardIos size={60} color="#FFFFFF" className="story-arrow" />
            </div>
        </Modal>
    )
}

export default Story
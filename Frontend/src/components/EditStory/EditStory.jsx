import Modal from '../Modal/Modal'
import { MdOutlineCancel } from "react-icons/md";
import './index.css'

function EditStory() {
    const arr = [0, 1, 2, 3, 4, 5]
    return (
        <Modal>
            <div className='edit-body'>
                <div className='edit-header'>
                    <MdOutlineCancel size={30} color='#FF0000' style={{ cursor: "pointer" }} />
                    <div className='edit-header-text-1st'>
                        Add upto 6 slides
                    </div>
                    <div className='edit-header-text-2nd'>
                        Add story to feed
                    </div>
                </div>
                <div className='edit-slides-feilds'>
                    <div className='edit-slides-div'>
                        {arr.map(ele =>
                            <div className='edit-slide-div'>
                                {ele > 2 && <MdOutlineCancel size={18} color='#FF0000' className='edit-slide-cancel' />}
                                <p className='edit-slide-title'> Slide {ele + 1} </p>
                            </div>
                        )}
                        {arr.length < 6 && <button className='edit-slide-div edit-slide-title'>
                                Add +
                        </button>}
                    </div>
                    <div className='edit-form-container'>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Heading :</p>
                            <input type="text" className='edit-form-field-input' placeholder='Your Heading'/>
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Description :</p>
                            <textarea className='edit-form-field-input edit-field-text-area' placeholder='Story Description'/>
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Image :</p>
                            <input type="text" className='edit-form-field-input' placeholder='Add Image url'/>
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Category :</p>
                            <input type="text" className='edit-form-field-input' placeholder='Select category'/>
                        </div>
                    </div>

                </div>
                <div className='edit-form-btn-div'>
                    <div className='edit-btn-div'>
                        <button className='edit-btn' style={{backgroundColor: "#7EFF73"}}>Previous</button>
                        <button className='edit-btn' style={{backgroundColor: "#73ABFF"}}>Next</button>
                    </div>
                    <button className='edit-btn' style={{backgroundColor: "#FF7373"}}>Post</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditStory
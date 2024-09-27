import Modal from '../Modal/Modal'
import { MdOutlineCancel } from "react-icons/md";
import './index.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import isUrl from 'is-url';

function EditStory({closeEditModal}) {
    const [slides, setslides] = useState([{}, {}, {}])
    const [currSlide, setCurrSlide] = useState({})
    const [currIdx, setCurrIdx] = useState(0);
    const [storyType, setStoryType] = useState("")

    const updateSlide = {
        name : (e) => {
            const name = e.target.value
            currSlide.name = name
            setCurrSlide(ele => {
                const newSlide = {...ele}
                newSlide.name = name
                return newSlide
            })
        },

        description : (e) => {
            const description = e.target.value
            currSlide.description = description
            setCurrSlide(ele => {
                const newSlide = {...ele}
                newSlide.description = description
                return newSlide
            })
        },

        url : (e) => {
            const url = e.target.value
            currSlide.url = url
            setCurrSlide(ele => {
                const newSlide = {...ele}
                newSlide.url = url
                return newSlide
            })
        }
    }

    const changeCurrSlide = (e) => {
        const id = parseInt(e.currentTarget.dataset.id)
        if ((e.target.nodeName == 'P' || e.currentTarget === e.target) && currIdx != id) {
            setslides(ele => {
                const arr = [...ele]
                arr[currIdx] = {...currSlide}
                return arr
            })
            setCurrIdx(id)           
            setCurrSlide(slides[id])
        }
    }

    const addnewSlide = () => {
        setslides(ele => {
            const arr = [...ele]
            arr.push({})
            return arr
        })

        setCurrIdx(slides.length)
        setCurrSlide({})
    }

    const deleteSlide = (e) => {
        const id = parseInt(e.currentTarget.dataset.id)

        if (currIdx == id) {
            if (id == slides.length - 1) {
                setCurrIdx(currIdx - 1)
                setCurrSlide(slides[currIdx - 1])
            }
            else setCurrSlide(slides[currIdx + 1])
        }
        else if (currIdx > id) {
            setCurrIdx(currIdx - 1)
        }

        setslides(ele => {
            var arr = [...ele];
            arr.splice(id, 1);
            return arr;
        })
    }

    const previousSlide = () => {
        setCurrIdx(ele => {
            if(!ele) return ele
            setslides(arr=>{
                const newArr = [...arr]
                newArr[ele] = {...currSlide}
                return newArr
            })
            setCurrSlide(slides[ele-1])
            return ele-1;
        })
    }

    const nextSlide = () => {        
        setCurrIdx(ele => {
            if(currIdx == slides.length-1) return ele
            setslides(arr=>{
                const newArr = [...arr]
                newArr[ele] = {...currSlide}
                return newArr
            })
            setCurrSlide(slides[ele+1])
            return ele+1;
        })
    }

    const createStory = (e) => {
        setslides(ele => {
            const arr = [...ele]
            arr[currIdx] = {...currSlide}
            return arr
        })

        const finalSlides = slides
        finalSlides[currIdx] = {...currSlide}

        if(!storyType) {
            toast.warning("please select a valid story type");
            return;
        }
        
        finalSlides.forEach((slide, idx) => {
            if(!slide.name.trim()) {
                toast.warning(`slide-${idx} name is empty`)
                return;
            }
            else if(!slide.description.trim()) {
                toast.warning(`slide-${idx} description is empty`)
                return;
            }
            else if(!slide.url.trim() || !isUrl(slide.url.trim())) {
                toast.warning(`slide-${idx} url is invalid`)
                return;
            }
        });

        const apiUrl = import.meta.env.VITE_SERVER_API;
        console.log(apiUrl);        

    }

    return (
        <Modal>
            <div className='edit-body'>
                <div className='edit-header'>
                    <MdOutlineCancel size={30} color='#FF0000' style={{ cursor: "pointer" }} onClick={closeEditModal} />
                    <div className='edit-header-text-1st'>
                        Add upto 6 slides
                    </div>
                    <div className='edit-header-text-2nd'>
                        Add story to feed
                    </div>
                </div>
                <div className='edit-slides-feilds'>
                    <div className='edit-slides-div'>
                        {slides.map((ele, idx) =>
                            <div className='edit-slide-div' onClick={changeCurrSlide} data-id = {idx}>
                                {idx > 2 && <MdOutlineCancel size={18} color='#FF0000' className='edit-slide-cancel' onClick={deleteSlide} data-id = {idx} />}
                                <p className='edit-slide-title'> Slide {idx + 1} </p>
                            </div>
                        )}
                        {slides.length < 6 && <button className='edit-slide-div edit-slide-title' onClick={addnewSlide}>
                                Add +
                        </button>}
                    </div>
                    <div className='edit-form-container'>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Heading :</p>
                            <input type="text" className='edit-form-field-input' placeholder='Your Heading' value={currSlide.name || ""} onChange={updateSlide.name}/>
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Description :</p>
                            <textarea className='edit-form-field-input edit-field-text-area' placeholder='Story Description' value={currSlide.description || ""} onChange={updateSlide.description}/>
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Image :</p>
                            <input type="url" className='edit-form-field-input' placeholder='Add Image url' value={currSlide.url || ""} onChange={updateSlide.url}/>
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Category :</p>
                            <select className='edit-form-field-input' onChange={e => setStoryType(e.target.value)}>
                                <option value="">--Please select an appropriate option--</option>
                                <option value="food">Food</option>
                                <option value="health and fitness">Health & Fitness</option>
                                <option value="travel">Travel</option>
                                <option value="movie">Movie</option>
                                <option value="education">Education</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className='edit-form-btn-div'>
                    <div className='edit-btn-div'>
                        <button className='edit-btn' style={{backgroundColor: "#7EFF73"}} onClick={previousSlide}>Previous</button>
                        <button className='edit-btn' style={{backgroundColor: "#73ABFF"}} onClick={nextSlide}>Next</button>
                    </div>
                    <button className='edit-btn' style={{backgroundColor: "#FF7373"}} onClick={createStory}>Post</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditStory
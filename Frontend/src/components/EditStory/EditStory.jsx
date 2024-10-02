import {
    useEffect,
    useState
} from 'react';

import { 
    addStory, 
    updateStory 
} from '../../features/storySlice.js';
import './index.css'
import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal'
import { MdOutlineCancel } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRef } from 'react';
import isUrl from 'is-url';

const apiUrl = import.meta.env.VITE_SERVER_API

function EditStory({ storyId, closeEditModal }) {
    const dispatch = useDispatch()
    const [slides, setslides] = useState([{}, {}, {}])
    const [currSlide, setCurrSlide] = useState({})
    const [currIdx, setCurrIdx] = useState(0);
    const [storyType, setStoryType] = useState("")
    const modalRef = useRef(null)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await axios.get(`${apiUrl}/story/get-story?key=${storyId}`)
                const { data } = res.data
                setslides(data.slides)
                setCurrSlide(data.slides[0])
                setStoryType(data.storytype)
            } catch (error) {
                closeEditModal()
                toast.error(error.response.data.message || error.message)
            }
        }
        if (storyId) {
            fetchStory()
        }
    }, [])

    const updateSlide = {
        name: (e) => {
            const name = e.target.value
            currSlide.name = name
            setCurrSlide(ele => {
                const newSlide = { ...ele }
                newSlide.name = name
                return newSlide
            })
        },

        description: (e) => {
            const description = e.target.value
            currSlide.description = description
            setCurrSlide(ele => {
                const newSlide = { ...ele }
                newSlide.description = description
                return newSlide
            })
        },

        url: (e) => {
            const url = e.target.value
            currSlide.url = url
            setCurrSlide(ele => {
                const newSlide = { ...ele }
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
                arr[currIdx] = { ...currSlide }
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
            if (!ele) return ele
            setslides(arr => {
                const newArr = [...arr]
                newArr[ele] = { ...currSlide }
                return newArr
            })
            setCurrSlide(slides[ele - 1])
            return ele - 1;
        })
    }

    const nextSlide = () => {
        setCurrIdx(ele => {
            if (currIdx == slides.length - 1) return ele
            setslides(arr => {
                const newArr = [...arr]
                newArr[ele] = { ...currSlide }
                return newArr
            })
            setCurrSlide(slides[ele + 1])
            return ele + 1;
        })
    }

    const checkMediaType = async (url, idx) => {
        const video = document.createElement('video');
        video.src = url;

        return new Promise((resolve, reject) => {
            video.onloadedmetadata = () => {
                const duration = video.duration;
                
                if (duration <= 15) {
                    resolve('video');
                } else {
                    reject(`slide-${idx} video is longer than 15 secs`);
                }
            };

            video.onerror = () => {
                const img = document.createElement('img');
                img.src = url;
        
                img.onload = () => {                
                    resolve('image');
                };

                img.onerror = () => {
                    reject('invalid url');
                };
            };
        });
    }

    const pushStory = async (e) => {
        setslides(ele => {
            const arr = [...ele]
            arr[currIdx] = { ...currSlide }
            return arr
        })

        const finalSlides = slides
        finalSlides[currIdx] = { ...currSlide }

        if (!storyType) {
            toast.warning("please select a valid story type");
            return;
        }

        for (const [idx, slide] of finalSlides.entries()) {
            if (!slide.name || !slide.name.trim()) {
                toast.warning(`slide-${idx + 1} name is empty`)
                return;
            }
            else if (!slide.description || !slide.description.trim()) {
                toast.warning(`slide-${idx + 1} description is empty`)
                return;
            }
            else if(!isUrl(slide.url.trim())) {
                toast.warning(`slide-${idx + 1} url is invalid`)
                return;
            }
            modalRef.current.style.pointerEvents = 'none'
            try {
                const type = await checkMediaType(slide.url.trim(), idx+1)
                slide.type = type                
            } catch (error) {
                toast.error(error);                
                modalRef.current.style.pointerEvents = 'auto'
                return;
            }
            modalRef.current.style.pointerEvents = 'auto'
        }
        
        modalRef.current.style.pointerEvents = 'none'
        try {
            if (!storyId) {
                const res = await axios.post(`${apiUrl}/story/create-story`,
                    {
                        type: storyType,
                        slides: finalSlides
                    }, {
                    withCredentials: true
                })
                const story = res.data.data;
                dispatch(addStory(story))
                toast.success("Story created Sucessfully");
            }
            else {
                const res = await axios.patch(`${apiUrl}/story/update-story/${storyId}`,
                    {
                        type: storyType,
                        slides: finalSlides
                    }, {
                    withCredentials: true
                })
                const slide = res.data.data
                dispatch(updateStory({key : storyId, slide}))
                toast.success("Story updated Sucessfully");
            }
            closeEditModal()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
        modalRef.current.style.pointerEvents = 'auto'
    }

    return (
        <Modal>
            <div className='edit-body' ref={modalRef}>
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
                            <div className={`edit-slide-div ${idx === currIdx ? 'edit-slide-border' : ''}`} onClick={changeCurrSlide} data-id={idx} key={idx}>
                                {idx > 2 && <MdOutlineCancel size={18} color='#FF0000' className='edit-slide-cancel' onClick={deleteSlide} data-id={idx} />}
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
                            <input type="text" className='edit-form-field-input' placeholder='Your Heading' value={currSlide.name || ""} onChange={updateSlide.name} />
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Description :</p>
                            <textarea className='edit-form-field-input edit-field-text-area' placeholder='Story Description' value={currSlide.description || ""} onChange={updateSlide.description} />
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Image :</p>
                            <input type="url" className='edit-form-field-input' placeholder='Add Image url' value={currSlide.url || ""} onChange={updateSlide.url} />
                        </div>
                        <div className='edit-form-field-div'>
                            <p className='edit-form-field-title'>Category :</p>
                            <select className='edit-form-field-input' onChange={e => setStoryType(e.target.value)} value={storyType}>
                                <option value="">--Please select an appropriate option--</option>
                                <option value="food">Food</option>
                                <option value="health">Health & Fitness</option>
                                <option value="travel">Travel</option>
                                <option value="movie">Movie</option>
                                <option value="education">Education</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className='edit-form-btn-div'>
                    <div className='edit-btn-div'>
                        <button className='edit-btn' style={{ backgroundColor: "#7EFF73" }} onClick={previousSlide}>Previous</button>
                        <button className='edit-btn' style={{ backgroundColor: "#73ABFF" }} onClick={nextSlide}>Next</button>
                    </div>
                    <button className='edit-btn' style={{ backgroundColor: "#FF7373" }} onClick={pushStory}>Post</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditStory


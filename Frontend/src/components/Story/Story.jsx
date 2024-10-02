import {
    MdArrowBackIos,
    MdArrowForwardIos,
    MdOutlineFileDownloadDone
} from "react-icons/md";

import {
    FaBookmark,
    FaHeart
} from "react-icons/fa";

import {
    useState,
    useEffect
} from "react";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import { TbSend } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import { TfiDownload } from "react-icons/tfi";
import axios from "axios";
import './index.css'
import Modal from "../Modal/Modal"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_SERVER_API
const clientUrl = import.meta.env.VITE_CLIENT_API

function Story({ storyId, openAuthModal, closeModal }) {
    const user = useSelector(state => state.user)
    const [slides, setSlides] = useState([])
    const [currIdx, setCurrIdx] = useState(0)

    const revertLoc = (message) => {
        const currentUrl = window.location.href
        const params = currentUrl.split('?')[0].split('/')
        const navUrl = new URL(`${clientUrl}/${params[params.length - 1]}`)

        window.history.replaceState({}, '', navUrl);
        closeModal("")
        if (message) toast.error(message)
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.href)
        let idx = queryParams.get('slide')
        const param = window.location.pathname

        const getStory = async () => {
            try {
                const res = await axios.get(`${apiUrl}/story/get-story?key=${storyId}`, {
                    withCredentials: true
                })

                const data = res.data.data.slides
                setSlides(data)
                if (param === '/bookmarks') {
                    data.forEach((slide, ind) => {
                        if (slide._id == idx) {
                            setCurrIdx(ind);
                        }
                    });
                }
                else if (currIdx < 0 || currIdx >= data.length) {
                    revertLoc("invalid story url")
                }
            } catch (error) {
                revertLoc(error.response.data.message || error.message)
            }
        }
        getStory();

        if (param !== '/bookmarks') {
            if (idx !== null) {
                if (idx !== isNaN(idx)) {
                    idx = parseInt(idx)
                    setCurrIdx(idx - 1)
                }
                else {
                    revertLoc("invalid story url")
                }
            }
        }

    }, [])

    useEffect(() => {
        setCurrIdx(ele => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('slide', ele + 1);
            window.history.replaceState({}, '', currentUrl);
            return ele
        })
    }, [currIdx])

    const changeSlide = (change) => {
        setCurrIdx(ele => {
            if (!change && ele) {
                return ele - 1;
            }
            else if (change && ele < slides.length - 1) {
                return ele + 1;
            }
            return ele
        })
    }

    const copyLink = () => {
        const url = import.meta.env.VITE_CLIENT_API
        navigator.clipboard.writeText(`${url}?story=${storyId}&slide=${currIdx + 1}`)
        toast.success('link copied sucessfully')
    }

    const closeStory = () => {
        revertLoc()
    }

    const likeSlide = async (e) => {
        if (!user) {
            revertLoc("Login to like the story")
            openAuthModal("Login");
            return;
        }
        e.currentTarget.style.pointerEvents = 'none'

        try {
            if (slides[currIdx].likedByUser) {
                await axios.delete(`${apiUrl}/slide/unlike-slide/${slides[currIdx]._id}`, {
                    withCredentials: true
                })
            }
            else {
                await axios.post(`${apiUrl}/slide/like-slide/${slides[currIdx]._id}`, {}, {
                    withCredentials: true
                })
            }
            setSlides(ele => {
                const arr = [...ele]
                if (arr[currIdx].likedByUser) {
                    arr[currIdx].likes--;
                }
                else {
                    arr[currIdx].likes++;
                }
                arr[currIdx].likedByUser = !arr[currIdx].likedByUser
                return arr
            })
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }

        e.target.style.pointerEvents = 'auto'
    }

    const bookmarkSlide = async (e) => {
        if (!user) {
            revertLoc("Login to bookmark the story")
            openAuthModal("Login");
            return;
        }
        e.currentTarget.style.pointerEvents = 'none'

        try {
            if (slides[currIdx].markedByUser) {
                await axios.delete(`${apiUrl}/slide/unmark-slide/${slides[currIdx]._id}`, {
                    withCredentials: true
                })
            }
            else {
                await axios.post(`${apiUrl}/slide/mark-slide/${storyId}/${slides[currIdx]._id}`, {}, {
                    withCredentials: true
                })
            }
            setSlides(ele => {
                const arr = [...ele]
                arr[currIdx].markedByUser = !arr[currIdx].markedByUser
                return arr
            })
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }

        e.target.style.pointerEvents = 'auto'
    }

    const downloadFile = async () => {
        const fileUrl = slides[currIdx].url;

        try {
            const response = await axios({
                url: fileUrl,
                method: 'GET',
                responseType: 'blob',
            });

            const blob = new Blob([response.data]);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;

            const regex = /[^/]+\.[a-z0-9]+(?=[?#]|$)/i;
            a.download = fileUrl.match(regex)[0]

            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast(error.response.data.message || error.message);
        }
    };

    return (
        <Modal>
            {slides.length ? <div className="story-container">
                <MdArrowBackIos size={60} color={currIdx ? "#FFFFFF" : "#FFFFFF88"} className="story-arrow" style={{ cursor: currIdx ? 'pointer' : 'auto' }} onClick={e => changeSlide(0)} />
                <div style={slides[currIdx].type === 'image' ? { backgroundImage: `url(${slides[currIdx].url}), linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))` } : null} className="story-body">
                    {slides[currIdx].type === 'video' && <video autoPlay loop muted src={slides[currIdx].url} className="story-video" />}
                    <div className="story-body-header">
                        <div className="story-body-bar-div">
                            {slides.map((ele, idx) =>
                                <div className="story-body-bar" style={{ backgroundColor: idx <= currIdx ? "#FFFFFF" : "#FFFFFF88" }} key={idx} />
                            )}
                        </div>
                        <div className="story-body-op-div">
                            <FiX size={30} color="#FFFFFF" onClick={closeStory} style={{ cursor: 'pointer' }} />
                            <TbSend size={24} color="#FFFFFF" onClick={copyLink} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div className="story-body-mid">
                        <div className="story-body-mid-section" onClick={e => changeSlide(0)} />
                        <div className="story-body-mid-section" onClick={e => changeSlide(1)} />
                    </div>
                    <div className="story-body-footer">
                        <p className="story-footer-heading">{slides[currIdx].name.substring(0, 30)}</p>
                        <p className="story-footer-description">{slides[currIdx].description.substring(0, 200)}</p>
                        <div className="story-footer-op-div">
                            <FaBookmark size={24} color={slides[currIdx].markedByUser ? "#085CFF" : "#FFFFFF"} onClick={bookmarkSlide} style={{ cursor: 'pointer' }} />

                            {user ? <TfiDownload size={24} color="#FFFFFF" style={{ cursor: 'pointer' }} onClick={downloadFile} /> : null}

                            <div className="story-likes-div">
                                <FaHeart size={24} color={slides[currIdx].likedByUser ? "#FF0000" : "#FFFFFF"} onClick={likeSlide} style={{ cursor: 'pointer' }} />
                                {slides[currIdx].likes ? <p className="story-likes-count">{slides[currIdx].likes}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <MdArrowForwardIos size={60} color={currIdx < slides.length - 1 ? "#FFFFFF" : "#FFFFFF88"} style={{ cursor: currIdx < slides.length - 1 ? 'pointer' : 'auto' }} className="story-arrow" onClick={e => changeSlide(1)} />
            </div> : null}
        </Modal>
    )
}

export default Story
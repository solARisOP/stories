import Modal from '../Modal/Modal'
import { MdOutlineCancel } from "react-icons/md";

function EditStory() {
    const arr = [0, 1, 2, 3, 4, 5]
    return (
        <Modal>
            <div style={{ width: "624px", borderRadius: "20px", backgroundColor: "#FFFFFF", zIndex: 10, display: 'flex', flexDirection: 'column', paddingLeft: "40px", paddingRight: "40px", paddingTop: "20px", paddingBottom: "20px", gap: "17px", justifyContent: 'flex-start'}}>
                <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', width: "100%", gap: "10px" }}>
                    <MdOutlineCancel size={30} color='#FF0000' style={{ cursor: "pointer" }} />
                    <p style={{ fontSize: "10px", fontWeight: "700", lineHeight: "13.02px" }}>
                        Add upto 6 slides
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: "100%", gap: "20px" }}>
                    {arr.map(ele =>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0px 4px 15px 0px #0000001A", borderRadius: "10px", width: "76px", height: "60px", position: 'relative' }}>
                            {ele > 2 && <MdOutlineCancel size={15} color='#FF0000' style={{ cursor: "pointer", position: 'absolute', right: "5px", top: "5px" }} />}
                            <p style={{ fontSize: "15px", fontWeight: "700", lineHeight: "19.53px" }}> Slide {ele + 1} </p>
                        </div>
                    )}
                    {arr.length < 6 && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0px 4px 15px 0px #0000001A", borderRadius: "10px", width: "76px", height: "60px" }}>
                            <p style={{ fontSize: "15px", fontWeight: "700", lineHeight: "19.53px" }}> Add + </p>
                    </div>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', paddingInlineStart: "10px", width: '80%', gap: "20px"}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: "18px", fontWeight: "700", lineHeight: "23.44px"}}>Heading :</p>
                        <input type="text" style={{border: "1px solid #000000", padding: "5px", width:"60%" }} placeholder='Your Heading'/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: "18px", fontWeight: "700", lineHeight: "23.44px"}}>Description :</p>
                        <textarea style={{border: "1px solid #000000", padding: "5px", width:"60%", height:"150px", resize: 'none' }} placeholder='Story Description'></textarea>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: "18px", fontWeight: "700", lineHeight: "23.44px"}}>Image :</p>
                        <input type="text" style={{border: "1px solid #000000", padding: "5px", width:"60%" }} placeholder='Add Image url'/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: "18px", fontWeight: "700", lineHeight: "23.44px"}}>Category :</p>
                        <input type="text" style={{border: "1px solid #000000", padding: "5px", width:"60%" }} placeholder='Select category'/>
                    </div>
                </div>
                <div style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <button style={{backgroundColor: "#7EFF73", borderRadius: '20px', width: '100px', fontWeight: '700', fontSize: '18px', lineHeight: '23.44px', color: '#FFFFFF', paddingTop: "7px", paddingBottom: "7px"}}>Previous</button>
                        <button style={{backgroundColor: "#73ABFF", borderRadius: '20px', width: '100px', fontWeight: '700', fontSize: '18px', lineHeight: '23.44px', color: '#FFFFFF', paddingTop: "7px", paddingBottom: "7px"}}>Next</button>
                    </div>
                    <button style={{backgroundColor: "#FF7373", borderRadius: '20px', width: '100px', fontWeight: '700', fontSize: '18px', lineHeight: '23.44px', color: '#FFFFFF', paddingTop: "7px", paddingBottom: "7px"}}>Post</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditStory
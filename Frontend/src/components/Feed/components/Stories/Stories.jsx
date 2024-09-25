import React from 'react'

function Stories() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: 'center' }}>
            <div style={{ width: "100%", marginBottom: "20px"}}>
                <p style={{fontSize: "35px", fontWeight: "700", textAlign: 'center'}}>You Stories</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, minmax(0, 1fr))", justifyItems: "center", width: "100%", rowGap: "30px" }}>
                {[1, 1, 1, 1].map(ele =>
                        <div style={{ width: "290px", height: "520px", border: "2px solid black", borderRadius: "14px" }} />
                )}
            </div>
            <button style={{borderRadius: "22px", fontSize: "20px", fontWeight: "400", textAlign: "center", paddingTop: "10px", lineHeight : "25px", paddingBottom: "10px", width: "135px", color: "#FFFFFF", background: "#FF7373", marginTop: "20px"}}>See more</button>
        </div>
    )
}

export default Stories
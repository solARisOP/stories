import "./index.css"
import { useSelector } from 'react-redux'
import { BiEdit } from "react-icons/bi";
import Stories from './components/Stories/Stories.jsx';

function Feed() {
	const user = useSelector(state => state.user)
	return (
		<div className='bod-main'>

			<div style={{ height: "200px", display: "flex", gap: "80px", overflow: 'auto', justifyContent: "center" }}>
				<div style={{ border: "2px solid black", borderRadius: "36px", height: "200px", minWidth: "200px" }} />
				<div style={{ border: "2px solid black", borderRadius: "36px", height: "200px", minWidth: "200px" }} />
				<div style={{ border: "2px solid black", borderRadius: "36px", height: "200px", minWidth: "200px" }} />
				<div style={{ border: "2px solid black", borderRadius: "36px", height: "200px", minWidth: "200px" }} />
				<div style={{ border: "2px solid black", borderRadius: "36px", height: "200px", minWidth: "200px" }} />
			</div>

			{user && (
				<div style={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: 'center' }}>
					<div style={{ width: "100%"}}>
						<p style={{fontSize: "35px", fontWeight: "700", textAlign: 'center'}}>You Stories</p>
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: "repeat(4, minmax(0, 1fr))", justifyItems: "center", width: "100%", rowGap: "30px" }}>
						{[1, 1, 1, 1].map(ele =>
							<div style={{ width: "300px", height: "570px", display: "flex", justifyContent: "center", alignItems: "center", position: 'relative' }} >
								<div style={{ width: "290px", height: "520px", border: "2px solid black", borderRadius: "14px" }} />

								<div style={{ cursor: 'pointer', boxShadow: "0px 4px 4px 0px #00000040", display: "flex", justifyContent: 'space-evenly', alignItems: "center", position: 'absolute', bottom: "10px", borderRadius: "20px", fontSize: "18px", fontWeight: "700", lineHeight: "23.44px", textAlign: "center", paddingTop: "4px", paddingBottom: "4px", width: "100px", backgroundColor: "#FFFFFF" }}><BiEdit size={30} /> Edit </div>
							</div>
						)}
					</div>
					<button style={{borderRadius: "22px", fontSize: "20px", fontWeight: "400", textAlign: "center", paddingTop: "10px", lineHeight : "25px", paddingBottom: "10px", width: "135px", color: "#FFFFFF", background: "#FF7373"}}>See more</button>
				</div>
			)}

			<Stories />
			<Stories />
			<Stories />
			<Stories />
			<Stories />

		</div>
	)
}

export default Feed
import "./index.css"
import { useSelector } from 'react-redux'
import { BiEdit } from "react-icons/bi";
import Stories from './components/Stories/Stories.jsx';
import Categories from "./components/Categories/Categories.jsx";

function Feed() {
	const user = useSelector(state => state.user)
	const imgUrl = 'https://images.pexels.com/photos/24014245/pexels-photo-24014245/free-photo-of-photo-of-a-small-domestic-dog-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
	return (
		<div className='feed-main'>

			<Categories />

			{user && (
				<div className="feed-stories-container">
					<p className="feed-stories-heading">You Stories</p>
					<div className="feed-stories-row">
						{[1, 1, 1, 1].map(ele =>
							<div className="feed-stories-story" >
								<div className="feed-story-body" style={{backgroundImage: `url(${imgUrl})`}}>
									<div className="feed-story-footer">
										<p className="feed-story-footer-heading">Heading comes here</p>
										<p className="feed-story-footer-description">Inspirational designs, illustrations, and graphic elements from the world's best designers.</p>
									</div>
								</div>
								<div className="feed-story-edit-btn"><BiEdit size={30} /> Edit </div>
							</div>
						)}
					</div>
					<button className="feed-stories-more-btn">See more</button>
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
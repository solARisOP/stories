import "./index.css"
import { useSelector } from 'react-redux'
import { BiEdit } from "react-icons/bi";
import Stories from './components/Stories/Stories.jsx';
import Categories from "./components/Categories/Categories.jsx";

function Feed(title) {

	const user = useSelector(state => state.user)
	const userStories = useSelector(state => state.userStories)
	return (
		<div className='feed-main'>

			<Categories />

			{(user && (title=='all' || title=='yourStories')) && (
				<div className="feed-stories-container">
					<p className="feed-stories-heading">You Stories</p>
					<div className="feed-stories-row">
						{userStories.map(ele =>
							<div className="feed-stories-story" >
								<div className="feed-story-body" style={{backgroundImage: `url(${ele.slide.url})`}}>
									<div className="feed-story-footer">
										<p className="feed-story-footer-heading">{ele.slide.name}</p>
										<p className="feed-story-footer-description">I{ele.slide.description}</p>
									</div>
								</div>
								<div className="feed-story-edit-btn"><BiEdit size={30} /> Edit </div>
							</div>
						)}
					</div>
					<button className="feed-stories-more-btn">See more</button>
				</div>
			)}

			{title == 'all' && <Stories title={"food"} />}
			{title == 'all' && <Stories title={"health"} />}
			{title == 'all' && <Stories title={"travel"} />}
			{title == 'all' && <Stories title={"movie"} />}
			{title == 'all' && <Stories title={"education"} />}

			{title != 'all' && <Stories title={title} />}
		</div>
	)
}

export default Feed
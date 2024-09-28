import "./index.css"
import Categories from "./components/Categories/Categories.jsx";
import UserStories from "./components/StoryTypes/UserStories.jsx";
import { Outlet } from "react-router-dom";

function Feed({ title }) {
	return (
		<div className='feed-main'>
			<Categories />
			<UserStories />
			<Outlet />
		</div>
	)
}

export default Feed
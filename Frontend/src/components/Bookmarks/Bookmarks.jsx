import React from 'react'
import Stories from '../Feed/components/Stories/Stories.jsx'
import { useLoaderData } from 'react-router-dom'

function Bookmarks() {
	const data = useLoaderData();
	return (
		<Stories title={"Bookmarks"} data={data} />
	)
}

export default Bookmarks
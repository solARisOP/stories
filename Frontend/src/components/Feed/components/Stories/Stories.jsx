import { useSelector } from 'react-redux'
import './index.css'

function Stories(title={title}) {
    
    const stories = useSelector(state => state[title])

    return (
        <div className='stories-container'>
            <p className='stories-heading'>{`Top Stories about ${title}`}</p>
            <div className='stories-row'>
                {stories.map(ele =>
                    <div className='stories-story' style={{backgroundImage: `url(${ele.slide.url})`}}>
                        <div className="stories-story-footer">
                            <p className="stories-story-footer-heading">{ele.slide.name}</p>
                            <p className="stories-story-footer-description">{ele.slide.description}</p>
                        </div>
                    </div>
                )}
            </div>
            <button className='stories-more-btn'>See more</button>
        </div>
    )
}

export default Stories
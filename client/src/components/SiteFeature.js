import siteFeatures from '../information/SiteFeatures.json';
import { RiArrowRightUpLine } from 'react-icons/ri'


function SiteFeature(props) {
    
    const tags = siteFeatures[props.name]["tags"];
    
    return (
        <div className='project-hover home-card skills-child site-feature text-center'>
            <div className='project-display'>
                <div className='flex-column p-4'>
                    <div className='project-name'>
                        <a href={siteFeatures[props.name]["projectUrl"]}>{siteFeatures[props.name]["name"]}</a>
                        <RiArrowRightUpLine className='project-arrow' />
                    </div>
                </div>
            </div>
            <div className="p-4">
                {siteFeatures[props.name]["info"]}
            </div>
            {/* TODO: Change tag color on hover for light theme */}
            <div className="project-tags d-flex flex-wrap">
                {tags.map(tag => (
                    <span className='project-tag'>{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default SiteFeature;
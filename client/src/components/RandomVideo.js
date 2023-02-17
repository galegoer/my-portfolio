import React, {useEffect, useState} from "react";
import Parse from 'parse';
import '../styles/SongRec.css';


function RandomVideo(props) {
    
    const [vidIds, setVidIds] = useState([]); // maybe add default video?

    useEffect(() => {
        provideVid();
    }, []);

    async function provideVid() {
        // get most recent random video
        // const VideoClass = Parse.Object.extend('VideoClass');
        let query = new Parse.Query('VideoClass');
        query.ascending('createdAt');
        query.limit(4);
        const videoIds = await query.find();
        // const videoIds = [];
        console.log('videoIds: \n');
        console.log(videoIds);
        try {
          const idArray = Array(4).fill('failedId');
          videoIds.forEach((id, idx) => idArray[idx] = id.get('videoId'));
          console.log(videoIds);
          setVidIds(idArray);
          console.log(idArray);
        } catch (error) {
          console.error('Error while fetching VideoClass', error);
        }
    }
    
    return (
      <div className="d-flex flex-column body-font">
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <h2 className="w-75 text-center">This is where I host a weekly song reccomendation! A new song will be added every Sunday night 9pm EST!</h2>
          <h4 className="w-50 text-center">This was coded with Back4App, which runs a JS cloud job daily to store and update the latest random reccomendations.
          Videos are randomly selected from a YouTube playlist utilizing YouTube Data APIs.</h4>
        </div>
        {/* TODO: Add a timer/countdown to next song? */}
        <div className="iframe-container" >
          <iframe
            src={`https://www.youtube.com/embed/${vidIds[0]}`}
            // src={`https://www.youtube.com/embed/k4V3Mo61fJM`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
          <h2 className="text-center mt-3 mb-3">Last 3 recommended videos</h2>
            <div className="grid-container">
              {vidIds.slice(1).map(id => (
                  <div className="iframe-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  /></div>
              ))}
            </div>
          {/* TODO: Could potentially add a list of all previously recommended songs not just last 3? */}
      </div>
    );
}

export default RandomVideo;
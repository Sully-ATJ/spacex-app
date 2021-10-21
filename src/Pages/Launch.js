import React from 'react';
import { request, gql } from "graphql-request";
import { useParams,Link } from 'react-router-dom';
import { useQuery } from "react-query";


const Launch = () => {
    const params = useParams();
    const endpoint = "https://api.spacex.land/graphql";
    const launchQ = gql`{
    launch(id: ${params.id}){
        mission_name
        links{
            flickr_images
            video_link
        }
        launch_date_utc
    }
}`;
    const{data, isLoading, error } = useQuery("launches", () => {
        return request(endpoint, launchQ);
    });

    if(isLoading) return "Loading...";
    if(error) return <Link to='/error'>{error.message}</Link>
    return (
        <div>
            <Link className="homeBtn" to="/"><h3>Home</h3></Link>
            <div className="mission-name">{data.launch.mission_name}</div>
            {data.launch.launch_date_utc}
            <div><a href={data.launch.links.video_link} >Watch Here</a></div>
            <h3>LAUNCH DETAILS</h3>
            <div className="gallery">
                {data.launch.links.flickr_images.map((image) => (
                    <img  className="api-img" alt=" " src={image}/>
                ))}
            </div>
        </div>
    )
}

export default Launch

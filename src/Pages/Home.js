import React from 'react';
import { request, gql } from "graphql-request";
import {Link} from 'react-router-dom';
import { useQuery } from "react-query";

const endpoint = "https://api.spacex.land/graphql";
const launchQ = gql`{
    launchesPast(limit:108){
        links{flickr_images}
        id
    }
}`;

const Home = () => {
    const{data, isLoading, error } = useQuery("launches", () => {
        return request(endpoint, launchQ);
    });

    if(isLoading) return "Loading...";
    if(error) return <Link to='/error'></Link>
    return (
        <div>
            <h1>SpaceX Launches</h1>
            <div className="gallery">
                {data.launchesPast.map((launch) => (
                    launch.links.flickr_images.length > 0 &&
                        <Link to={{pathname: `/launch/${launch.id}`}}>
                            <img  className="api-img" alt=" " src={launch.links.flickr_images}/>
                        </Link>
                    
                ))}
            </div>
        </div>
    )
}

export default Home

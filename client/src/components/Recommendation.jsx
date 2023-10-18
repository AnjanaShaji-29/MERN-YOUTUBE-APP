import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components';
import axios from 'axios';
import Card from './Card';

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {

    const [videos, setVideos]= useState([]); // Videos array

    useEffect( () => {
        const fetchVideos = async() => {
            const res = await axios.get(`/videos/tags?tags=${tags}`); // Fetching videos using tags as query parameters
            setVideos(res.data); // Setting videos with the result
        } 
        fetchVideos(); // Calling the fetchVideos method 
    }, [tags]) //dependency

  return (
    <Container>
      {videos.map((video)=>(
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Recommendation;

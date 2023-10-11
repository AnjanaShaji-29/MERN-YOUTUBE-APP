import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
`;


const Home = ({type}) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
      const fetchVideos = async () => {
      const res = await axios.get(`videos/${type}`); // Fetching videos depending on the url 
      setVideos(res.data); // Setting the video with the result
    };

    fetchVideos(); // Calling the fetchVideos function
  }, [type]); // Run only once when we refresh the page

  return (
    <Container>
    {videos.map((video) => (
      <Card  key={video._id} video={video} />
    ))}
    </Container>
  )
}

export default Home;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;


const Search = () => {

    const [videos, setVideos] = useState([]); // Videos array

    const query = useLocation().search; // Returns the search url from Search page

    useEffect( () => {
        const fetchVideos = async()=> {
            const res = await axios.get(`/videos/search${query}`); // Fetching the videos by passing search query
            setVideos(res.data); // Setting the videos with result
        };
        fetchVideos();
    }, [query]); // Dependency

  return (
    <Container>
      {videos.map((video) =>(
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Search;

import React from 'react';
import styled from 'styled-components';
import Youtubelogo from "../img/logo.png";
import { AccountCircleOutlined, ArticleOutlined, ExploreOutlined, FlagOutlined, HelpOutlineOutlined, HistoryOutlined, Home, LibraryMusicOutlined, LiveTvOutlined, MovieOutlined, SettingsBrightnessOutlined, SettingsOutlined, SportsEsportsOutlined, SubscriptionsOutlined, VideoLibraryOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Container = styled.div`
    flex: 1;
    height: 120vh;
    color: ${({theme}) => theme.text };
    background-color: ${({theme}) => theme.bgLighter };
    font-size: 14px;
    position: sticky;
    top:0;
`;

const Wrapper = styled.div`
    padding: 18px 26px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Img = styled.img`
    height: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 6px 0px;

    &:hover{
        background-color: ${ ({theme}) => theme.soft};
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft };
`;

const Login = styled.div`

`;

const Button = styled.button`
    padding:5px 15px;
    background-color:transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap:5px;
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 20px;
`;

export default function Menu({darkMode, setDarkMode}) {

    const { currentUser } = useSelector(state=>state.user); // Accessing the currentUser from store 

  return (
    <Container>
    <Wrapper>
    <Link to="/" style={{ textDecoration: "none", color: "inherit"}}> 
    <Logo>
        <Img src={Youtubelogo} /> Youtube
    </Logo>
    </Link>
    <Link to="/" style={{ textDecoration: "none", color: "inherit"}}> 
    <Item>
      <Home/> Home
    </Item>
    </Link>
    <Link to="trends" style={{textDecoration: "none", color: "inherit"}}> 
    <Item>
    <ExploreOutlined /> Explore
    </Item>
    </Link>
    <Link to="subscriptions" style={{textDecoration: "none", color: "inherit"}}> 
    <Item>
        <SubscriptionsOutlined/> Subscriptions
    </Item>
    </Link>
    <Hr />
    <Item>
        <VideoLibraryOutlined/> Library
    </Item>
    <Item>
        <HistoryOutlined /> History
    </Item>
    <Hr />
   { !currentUser &&
    <> 
    <Login> Sign in to like videos, comment and subscribe.
      <Link to="/signin" style={{textDecoration: "none"}}>   <Button> <AccountCircleOutlined /> SIGN IN </Button> </Link>
    </Login>
    <Hr />
    <Title> Best of Youtube </Title>
    <Item>
        <LibraryMusicOutlined/> Music
    </Item>
    <Item>
        <SportsEsportsOutlined/> Gaming
    </Item>
    <Item>
        <MovieOutlined/> Movies
    </Item>
    <Item>
        <ArticleOutlined /> News
    </Item>
    <Item>
        <LiveTvOutlined/> Live
    </Item>
    <Hr /> 
    </>}
    <Item>
        <SettingsOutlined /> Settings
    </Item>
    <Item>
        <FlagOutlined /> Report
    </Item>
    <Item>
        <HelpOutlineOutlined /> Help
    </Item>
    <Item onClick={() => setDarkMode(!darkMode)}>
        <SettingsBrightnessOutlined/> 
        {darkMode ? "Light" : "Dark"} Mode
    </Item>
    </Wrapper>
    </Container>
  )
}

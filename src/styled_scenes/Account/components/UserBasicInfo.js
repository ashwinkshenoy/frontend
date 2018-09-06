import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CircularProfilePic from './CircularProfilePic';
import Stars from './Stars';
import { Link } from 'react-router-dom';
import { Menu, Card } from 'semantic-ui-react';
import ImgurAvatar from './../../../assets/imgur-avatar.png';

const AttributeTitle = styled.h6`
  font-size: 9px;
  color: #a3a9b2;
`;

const CenteredDiv = styled.div`
  //text-align: center;
`;

const Wrapper = styled.div`
  //text-align: center;
  padding: 30px 0px 30px 0px;
`;

const NameDiv = styled.div`
  text-align: center;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  font-size: 24px;
  font-weight: 600;
`;

const MenuIcon = styled(Icon)`
  color: #5fb79e;
`;

const UserBasicInfo = ({ user_profile: user = {}, match, logOut }) => {
  const name = user.fullName || user.username;
  const dpUrl = (user.profilePicture && user.profilePicture.url) || ImgurAvatar;
  let activePath = match.path.replace('/account/', '');
  // const logout = () => {
  //   props.logOut();
  //   // Parse.User.logOut().then(() => {
  //   //   history.push('/');
  //   // });
  // };
  const scrollDownMobileOnly = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth <= 750) {
      setTimeout(() => {
        window.scrollBy(0, 520);
      }, 20);
    }
  };
  return (
    <Card>
      <Wrapper>
        <CenteredDiv>
          <Link to={'/users/' + user.username}>
            <CircularProfilePic src={dpUrl} />
            {name && <NameDiv>{name}</NameDiv>}
          </Link>
        </CenteredDiv>

        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <div>
                <AttributeTitle>PLS Balance</AttributeTitle>
                {user.plsBalance || 0}
              </div>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <div>
                <AttributeTitle>RATING</AttributeTitle>
                <Stars rating={user.rating} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <br />

        <Menu secondary fluid vertical style={{ paddingLeft: '10px' }}>
          <Link to="/account/trips/all" onClick={scrollDownMobileOnly}>
            <Menu.Item name="trips" active={activePath === 'trips'}>
              <MenuIcon disabled name="angle right" circular />
              <span>
                <MenuIcon disabled name="plane" circular />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; My Trips
              </span>
            </Menu.Item>
          </Link>

          <Link to="/account/services" onClick={scrollDownMobileOnly}>
            <Menu.Item name="services" active={activePath === 'services'}>
              <MenuIcon disabled name="angle right" circular />
              <span>
                <MenuIcon disabled name="list" circular />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; My Services
              </span>
            </Menu.Item>
          </Link>

          <Link to="/account/profile" onClick={scrollDownMobileOnly}>
            <Menu.Item name="profile" active={activePath === 'profile'}>
              <MenuIcon disabled name="angle right" circular />
              <span>
                <MenuIcon disabled name="user" circular />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Profile
              </span>
            </Menu.Item>
          </Link>
          {/*
          <Link to="/account/settings" onClick={scrollDownMobileOnly}>
            <Menu.Item name="settings" active={activePath === 'settings'}>
              <MenuIcon disabled name="angle right" circular />
              <span>
                <MenuIcon disabled name="cogs" circular />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Settings
              </span>
            </Menu.Item>
          </Link>
            */}
          <div style={{ cursor: 'pointer' }} onClick={() => logOut()}>
            <Menu.Item name="logout" active={activePath === 'logout'}>
              <MenuIcon disabled name="angle right" circular />
              <span>
                <MenuIcon disabled name="power" circular />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout
              </span>
            </Menu.Item>
          </div>
        </Menu>
      </Wrapper>
    </Card>
  );
};

export default withRouter(UserBasicInfo);

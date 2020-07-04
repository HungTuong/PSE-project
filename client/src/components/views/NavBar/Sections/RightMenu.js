/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import SubMenu from 'antd/lib/menu/SubMenu';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  }
  else {
    return (
      <Menu mode={props.mode}>
        {user.userData && user.userData.name &&
          <SubMenu title={<span>Welcome {user.userData.name}!</span>}>
            <Menu.Item key="profile">
              <a href={`/users/update/${user.userData._id}`}>Update profile</a>
            </Menu.Item>
          {user.userData && user.userData.isAdmin && 
            <Menu.Item key="upload">
              <a href='/movie/upload'>Upload film</a>
            </Menu.Item> 
          }
          {user.userData && user.userData.isAdmin &&
            <Menu.Item key="dashboard">
              <a href='/'>Dashboard</a>
            </Menu.Item>
          }
            <Menu.Item key="logout">
              <a onClick={logoutHandler}>Logout</a>
            </Menu.Item>
          </SubMenu>
        }
      </Menu>
    )
  }
}

export default withRouter(RightMenu);


import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase';
import { LOGOUT } from '../../actions/types';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  //logout
  const logout = () => {
    firebase.auth().signOut();
    //update state
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      {!user && (
        <Fragment>
          <Item
            className='float-right'
            key='register'
            icon={<UserAddOutlined />}
          >
            <Link to='/register'>Register</Link>
          </Item>
          <Item className='float-right' key='login' icon={<UserOutlined />}>
            <Link to='/login'>Login</Link>
          </Item>
        </Fragment>
      )}

      {user && (
        <SubMenu
          key='SubMenu'
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
          className='float-right'
        >
          <Item key='setting:1'>Option 1</Item>
          <Item key='setting:2'>Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;

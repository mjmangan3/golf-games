/**
 *
 * Nav
 *
 */

import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import LeftNav from '../LeftNav';
// import styled from 'styled-components';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  // eslint-disable-next-line react/no-access-state-in-setstate
  toggleDrawer = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => this.toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Golf Games</Typography>
          <LeftNav
            open={this.state.open}
            selectDrawerItem={this.props.selectDrawerItem}
            closeDrawer={() => this.toggleDrawer()}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

Nav.propTypes = {
  selectDrawerItem: PropTypes.func,
  // navigationContainer: PropTypes.object,
};

export default Nav;

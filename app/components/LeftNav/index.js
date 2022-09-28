/**
 *
 * LeftNav
 *
 */

import React from 'react';
import { Drawer, ListItemText, ListItem, List } from '@material-ui/core';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class LeftNav extends React.Component {
  render() {
    return (
      <Drawer
        key={`drawer_${Math.floor(Math.random() * 1000)}`}
        open={this.props.open}
        onClose={() => this.props.closeDrawer()}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Enter Scores"
              onClick={() => {
                this.props.selectDrawerItem('/addScoreCard');
                this.props.closeDrawer();
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Partner Game"
              onClick={() => {
                this.props.selectDrawerItem('/partnerGame');
                this.props.closeDrawer();
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

LeftNav.propTypes = {
  open: PropTypes.bool,
  closeDrawer: PropTypes.func,
  selectDrawerItem: PropTypes.func,
};

export default LeftNav;

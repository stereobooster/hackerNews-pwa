import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getData } from './actions/comment';
import Scroll from './utils/scroll';
import Container from './Container';
import Item from './components/Item';

class App extends Container {
  componentWillMount() {
    this.props.dispatch(getData('news', 1));
    Scroll(() => this.props.dispatch(getData('news', this.page += 1)));
  }

  render() {
    const { news } = this.props;
    return this.renderList(news);
  }
}

const mapStateToProps = state => state.comment;

export default connect(mapStateToProps)(App);

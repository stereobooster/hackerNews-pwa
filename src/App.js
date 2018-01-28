import React from "react";
import { connect } from "react-redux";
import { getData } from "./actions/comment";
import Container from "./Container";

const snap = navigator.userAgent === "ReactSnap";

class App extends Container {
  componentWillMount() {
    const page = this.props.match.params.page;
    this.props.dispatch(getData("top", page));
  }

  componentWillReceiveProps(nextProps, nextState, context) {
    const newPage = nextProps.match.params.page;
    const page = this.props.match.params.page;
    if (newPage !== page) {
      this.props.dispatch(getData("top", newPage));
    }
  }

  render() {
    if (snap) return <div />;
    const { top } = this.props;
    return (
      <div>
        {this.renderPage()}
        {this.renderList(top)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.comment;
};

export default connect(mapStateToProps)(App);

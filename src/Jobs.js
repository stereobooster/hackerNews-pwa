import React from "react";
import { connect } from "react-redux";
import { getData } from "./actions/comment";
import Container from "./Container";

class Jobs extends Container {
  componentWillMount() {
    const page = this.props.match.params.page;
    this.props.dispatch(getData("job", page));
  }

  componentWillReceiveProps(nextProps) {
    const newPage = nextProps.match.params.page;
    const page = this.props.match.params.page;
    if (newPage !== page) {
      this.props.dispatch(getData("job", newPage));
    }
  }

  render() {
    const { job } = this.props;
    return (
      <div>
        {this.renderPage("job")}
        {this.renderList(job)}
      </div>
    );
  }
}

const mapStateToProps = state => state.comment;

export default connect(mapStateToProps)(Jobs);

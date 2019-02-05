import React from 'react';
import { AnchorWithMouseEvents } from './AnchorWithMouseEvents';

export class ActivityFeedLink extends React.Component {

    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(e) {
        this.props.changeUrlPreview(this.props.url);
    }

    handleMouseLeave(e) {
        this.props.changeUrlPreview('');
    }

    render() {
        return (
            <AnchorWithMouseEvents url={this.props.url} content={this.props.content} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} />
          );
    }
}
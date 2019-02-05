import React from 'react';

export class AnchorWithMouseEvents extends React.Component {
    render() {
        return (
            <a href={this.props.url} onClick={this.props.onClick}
                onMouseOver={this.props.handleMouseOver} onMouseOut={this.props.handleMouseOut} 
                onMouseEnter={this.props.handleMouseEnter} onMouseLeave={this.props.handleMouseLeave}>
                {this.props.content}
            </a>
          );
    }
}
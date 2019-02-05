import React from 'react';

export class UrlPreview extends React.Component {
    render() {
        return (
            <span className="urlPreview">
                {this.props.url}
            </span>
          );
    }
}
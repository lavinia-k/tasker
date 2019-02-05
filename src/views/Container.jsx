import React from 'react';
import { ActivityFeedPage } from './ActivityFeedPage';

export class Container extends React.Component {
    render() {
        return (
            <div className="app-container">
                <ActivityFeedPage />
            </div>
          );
    }
}
import React, { Component } from 'react';
import NumberBaseball from '../pureComponent/NumberBaseball';
import ResponseCheck from '../responsecheck/ResponseCheck';

export default class GameMatcher extends Component {
    render() {
        if (this.props.match.params.name === 'number-baseball') {
            return <NumberBaseball />
        } else if (this.props.match.params.name === 'response-check') {
            return <ResponseCheck />
        }
        return (
            <div>일치하는 게임이 없습니다.</div>
        );
    }
}
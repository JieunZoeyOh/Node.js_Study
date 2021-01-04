import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import NumberBaseball from '../pureComponent/NumberBaseball';
import ResponseCheck from '../responsecheck/ResponseCheck';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to="/number-baseball">숫자야구</Link><br />
                <Link to="/response-check">반응속도체크</Link><br />
                {/* 하나씩 다 Route 설정 필요 */}

                <Link to="/game/index">게임매쳐</Link><br />
                <Link to="/game/number-baseball">숫자야구</Link><br />
                <Link to="/game/response-check">반응속도체크</Link><br />
                {/* Route 한 개로... 가능 */}
            </div>
            <div>
                <Route path="/number-baseball" component={NumberBaseball} />
                <Route path="/response-check" component={ResponseCheck} />

                <Switch>
                    <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
                    {/* exact 없으면 /랑 같다고 간주해버린다.. */}
                    <Route path="/game/:name" component={GameMatcher} />
                    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                </Switch>
                {/*<Route path="/game/:name" render={(props) => <GameMatcher props={props.example} />} /> */}
            </div>
        </BrowserRouter>
    );
};

export default Games;

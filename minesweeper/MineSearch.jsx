import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const FLAG_CELL = 'FLAG_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QEUSTION: -2,
    FLAG: -3,
    QEUSTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 OPENED
};

export const TableContext = createContext({ // 초기값 일단은...모양만 맞추기
    tableData: [],
    halted: true,
    dispatch: () => { },
});

const initialState = {
    tableData: [],
    timer: 0,
    halted: true,
    openedCount: 0,
    result: '',
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((v, i) => i);
    const shuffle = [];
    while (candidate.length > row * cell - mine) { // mine 갯수 만큼
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    // 모든 칸을 NORMAL로 채우기
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // shuffle 이용하여 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                openedCount: 0,
                timer: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            }
        case OPEN_CELL: {
            const tableData = [...state.tableData];

            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });
            const checked = [];
            let openedCount = 0;
            const checkAround = (row, cell) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QEUSTION_MINE, CODE.QEUSTION].includes(tableData[row][cell])) {
                    return;
                } // 닫힌 칸만 열기

                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { // 상하좌우 칸이 아닌 경우 필터링
                    return;
                }

                if (checked.includes(row + ',' + cell)) { // 이미 검사한 칸이면
                    return;
                } else {
                    checked.push(row + ',' + cell);
                }

                let around = [
                    tableData[row][cell - 1],
                    tableData[row][cell + 1],
                ];
                //[][]일 때 첫 번째 배열이 null이나 undefined면 에러가 나지만 두 번째 배열은 상관없습니다.
                if (tableData[row - 1]) {
                    around = around.concat(
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1],
                    );
                }

                if (tableData[row + 1]) {
                    around = around.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1],
                    );
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QEUSTION_MINE].includes(v)).length;

                if (count === 0) { // 내 주변에 아무런 지뢰가 없을 경우
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        })
                    }
                }
                if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };

            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
                halted = true;
                result = '승리하셨습니다.';
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QEUSTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QEUSTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QEUSTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    // useMemo를 통해서 caching을 한 번 해 줘야지 context api를 사용할 때 성능 저하가 덜 일어난다.
    // 참고로 dispatch는 절대 변하지 않으므로 두번째 매개변수 inputs에 넣지 않아도 된다.
    const value = useMemo(() => ({ tableData, dispatch, halted }), [tableData, halted]);

    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);
    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );

};

export default MineSearch;

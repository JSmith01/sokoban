export const _ = 0
export const O = 1;
export const M = 5;
export const X = 3;
export const V = 2;

const map = [
    [_, _, _, _, X, X, _, _, _, _],
    [_, _, X, X, _, _, X, X, _, _],
    [_, _, X, _, _, O, _, X, _, _],
    [_, _, _, _, _, _, O, _, X, _],
    [_, _, X, _, M, O, _, V, X, _],
    [_, _, X, _, _, _, _, V, X, _],
    [_, _, _, X, _, _, _, V, X, _],
    [_, _, _, _, X, X, X, X, X, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
];

export default map;
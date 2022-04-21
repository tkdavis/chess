import Board from './components/Board.js';
import Rules from './mixins/Rules.js';

let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

let board = new Board(canvas, ctx);
let rules = new Rules();
Object.assign(board, rules);
board.initialize();

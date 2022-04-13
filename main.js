import Board from "./components/Board.js";

let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

let board = new Board(canvas, ctx);
board.initialize();

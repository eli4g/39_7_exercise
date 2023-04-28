import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    //let initialBoard = new Array(nrows);
    //Array.from({length: 10}, _ => new Array(10).fill(1));

    let initialBoard = Array.from({length: ncols}, _ => new Array(nrows).fill());

   

    // TODO: create array-of-arrays of true/false values

    let randVal  =  0;
    let val = false;

  

    for (let i = 0; i < nrows ; i++){

       

        for (let j=0; j < ncols ; j++){

          randVal  =  Math.round(Math.random()) ;

          
    
          val = false;
      
          if (randVal === 1){
            val = true;
          } 

        
          initialBoard[i][j] = val;
          




        }



    }



    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {

    

    setBoard(oldBoard => {


      
      
      const [y, x] = coord["id"].split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          
        }

        //flip the cell on top, if it is on the board
        if (x >= 0 && x < ncols && y > 0 && y < nrows) {
          boardCopy[y-1][x] = !boardCopy[y-1][x];
        }

         //flip the cell on bottom, if it is on the board
         if (x >= 0 && x < ncols && y >= 0 && y+1 < nrows) {
          boardCopy[y+1][x] = !boardCopy[y+1][x];
        }
         //flip the cell to the left, if it is on the board
         if (x > 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x-1] = !boardCopy[y][x-1];
        }

         //flip the cell ot the right, if it is on the board
         if (x >= 0 && x+1 < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x+1] = !boardCopy[y][x+1];
        }


      };

      // TODO: Make a (deep) copy of the oldBoard

      let boardCopy = structuredClone(oldBoard);

      

      // TODO: in the copy, flip this cell and the cells around it
      
      flipCell(y,x, boardCopy);


      

      // TODO: return the copy

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else


  let boardCheck = board.map((val) =>{

    if(val.includes(true)){
      return true;
    }
    else{
      return false;
    }


  });


  if (!boardCheck.includes(true)){

    return(
      <div>
        <h1>You Won!</h1>
      </div>


    )



  }




  

  // TODO

  // make table board

  

  return(
    <div className = "Board">
      <table>
        <tbody>
         
        {board.map((r,rIdx) => { 
          
          return (

           
              <tr>
          
              {r.map((c,cIdx) => {
                    
                    return(
                    
                    <Cell isLit={c} flipCellsAroundMe={flipCellsAround} id={rIdx.toString() +"-"+ cIdx.toString()} />
                    
                  )

                })}

              </tr>
            
            
            
            
            )
            
            }

          )}

          
          
       
        
          </tbody>
        </table>
    </div>
  )
  // TODO
}

export default Board;

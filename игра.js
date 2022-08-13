var tiles = [];
var isshuffled=false;
function animateTiles() {
    // debugger
    tiles.forEach(tile=>
        tile.addEventListener('click', tileClick)
    )
}
var freeCell={
    y:3,
    x:3
}
function tileClick(event){
    bar = event.target
    if (bar.y==freeCell.y){
        tiles.forEach(tile => {
            if (between(freeCell.x,bar.x,tile.x)){
                if ((freeCell.x-1==tile.x)&&(tile==bar)){
                    freeCell.x=bar.x    
                    tile.x += 1
                    setCellOffset(tile)
                }
                else if ((freeCell.x+1==tile.x)&&(tile==bar)){
                    freeCell.x=bar.x    
                    tile.x -= 1 
                    setCellOffset(tile)
                }
                
            }
        })
    checkVictory();
    }
    else if (bar.x==freeCell.x)
        tiles.forEach(tile => {
            if (between(freeCell.y,bar.y,tile.y)){
                if ((freeCell.y-1==tile.y)&&(tile==bar)){
                    freeCell.y=bar.y    
                    tile.y += 1
                    setCellOffset(tile)
                }
                else if ((freeCell.y+1==tile.y)&&(tile==bar)){
                    freeCell.y=bar.y    
                    tile.y -= 1 
                    setCellOffset(tile)
                }
            }
        })
    }
function createField() {
    var x, y, cell;
    for( y = 0; y < 4; ++y) {
        for (x = 0; x < 4; ++x) {
            cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}
function createCellNull() {
    var div = document.createElement("div");
    div.classList.add("field__cell");
    div.classList.add("field__cell--null");
    return div;
}
function setCellOffset(cell) {
    var left;
    var top;
    var offset=15;
    // debugger
    left = offset + (offset + 80)*cell.x;
    top = offset + (offset + 80)*cell.y;
    cell.style.top = top + "px";
    cell.style.left = left + "px";
}
function checkVictory() {
    if (isshuffled) {
    const victoryDiv = document.querySelector(".modal")
    var rightnumbers=0
    tiles.forEach(tile => {
        if ((Number(tile.innerText))==tile.y*4+tile.x+1){
            rightnumbers++
        }
    })
    console.log(rightnumbers)
    if (rightnumbers ==15){
        victoryDiv.classList.add("modal--visible")
    }
}
}
function shuffleTiles() {
    console.log("fghgf")
    for (var i=0;i<=32;i++){
        var randomindex = Math.floor(Math.random()*15)
        // console.log(tiles[randomindex])
        // console.log(randomindex)
        tiles[randomindex].click()
    }
isshuffled=true
}
function appendCell(cell) {
    const field=document.querySelector(".pole");
    field.appendChild(cell);
}

createField();
function createTiles() {
    var x, y, cell;
    for (y = 0;y < 4;++y) {
        for (x = 0;x < 4; ++x) {
            if (y==3 && x==3)
                break
            else{
                cell = createTilesNull();
                cell.y = y;
                cell.x = x;
                setCellOffset(cell);
                cell.innerText=cell.y*4+cell.x+1;
                appendCell(cell);
                tiles.push(cell)
            }
        }
    } console.log(tiles)
}
function createTilesNull() {
    var stepdiv = document.createElement("div");
    stepdiv.classList.add("field__cell");
    stepdiv.classList.add("field__cell--tile");
    return stepdiv;
}
createTiles();
animateTiles();
function between(a,b,t){
    if ((a<=t)&&(t<=b) || (b<=t)&&(t<=a))
        return true
    else 
        return false
}




shuffleTiles();
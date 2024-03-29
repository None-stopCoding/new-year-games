const PUZZLE_DIFFICULTY = 4; //размер сетки ячейки
const PUZZLE_HOVER_TINT = "#000099"; //подсветка целевой ячейки
let ctx,
    canvas,
    img,
    pieces,
    mainWidth,
    mainHeight,
    pieceWidth,
    pieceHeight,
    currentPiece,
    imgResult,
    convasID,
    currentDroppedPiece,
    offsetLeft = 0,
    offsetTop = 0,
    mouse,
    audio = new Audio(),
    stateChanged = null;
let count = 0,
    maxCount = 0,
    gamesCount = 0;

export function init({ imagePath, el, stateChangedCallback }) {
    img = new Image();
    img.src = imagePath;
    img.addEventListener("load", onImage, false);
    convasID = el;
    stateChanged = stateChangedCallback;
}

function onImage(e) {
    pieceWidth = Math.floor(img.width / PUZZLE_DIFFICULTY);
    pieceHeight = Math.floor(img.height / PUZZLE_DIFFICULTY);
    mainWidth = pieceWidth * PUZZLE_DIFFICULTY + offsetLeft;
    mainHeight = pieceHeight * PUZZLE_DIFFICULTY + offsetTop;
    setCanvas();
    initPuzzle();
}

function setCanvas() {
    canvas = document.getElementById(convasID);
    imgResult = document.getElementById('pazzle-result');
    imgResult.src = img.src;
    ctx = canvas.getContext("2d");
    canvas.width = mainWidth;
    canvas.height = mainHeight;
    canvas.style.border = "3px solid #091c25";
    offsetLeft = canvas.offsetLeft;
    offsetTop = canvas.offsetTop;
}

function initPuzzle() {
    pieces = [];
    mouse = { x: 0, y: 0 };
    currentPiece = null;
    currentDroppedPiece = null;
    ctx.drawImage(
        img,
        0,
        0,
        mainWidth,
        mainHeight,
        0,
        0,
        mainWidth,
        mainHeight
    );
    if (!gamesCount) createTitle("Запускай!");
    buildPieces();
}

function createTitle(msg) {
    ctx.fillStyle = "rgba(107, 107, 240, 0.6)";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(100, mainHeight - 40, mainWidth - 200, 40);
    ctx.fillStyle = "#FFFFFF";
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px Arial";
    ctx.fillText(msg, mainWidth / 2, mainHeight - 20);
}

function buildPieces() {
    var i,
        piece,
        xPos = 0,
        yPos = 0;
    for (i = 0; i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY; i++) {
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        pieces.push(piece);
        xPos += pieceWidth;
        if (xPos >= mainWidth) {
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    canvas.onmousedown = shufflePuzzle;
    canvas.ontouchstart = shufflePuzzle;
}

function shufflePuzzle() {
    audio.src = './audio/thk.mp3';
    audio.play();
    pieces = shuffleArray(pieces);
    ctx.clearRect(0, 0, mainWidth, mainHeight);
    var i,
        piece,
        xPos = 0,
        yPos = 0;
    for (i = 0; i < pieces.length; i++) {
        piece = pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        ctx.drawImage(
            img,
            piece.sx,
            piece.sy,
            pieceWidth,
            pieceHeight,
            xPos,
            yPos,
            pieceWidth,
            pieceHeight
        );
        ctx.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
        xPos += pieceWidth;
        if (xPos >= mainWidth) {
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    canvas.onmousedown = onPuzzleClick;
    canvas.ontouchstart = onPuzzleClick;
}

function onPuzzleClick(e) {
    audio.src = './audio/click.mp3';
    audio.play();
    if (e.layerX || e.layerX == 0) {
        mouse.x = e.layerX;
        mouse.y = e.layerY;
    } else if (e.offsetX || e.offsetX == 0) {
        mouse.x = e.offsetX - canvas.offsetLeft;
        mouse.y = e.offsetY - canvas.offsetTop;
    }
    currentPiece = checkPieceClicked();
    if (currentPiece != null) {
        ctx.clearRect(
            currentPiece.xPos,
            currentPiece.yPos,
            pieceWidth,
            pieceHeight
        );
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(
            img,
            currentPiece.sx,
            currentPiece.sy,
            pieceWidth,
            pieceHeight,
            mouse.x - pieceWidth / 2,
            mouse.y - pieceHeight / 2,
            pieceWidth,
            pieceHeight
        );
        ctx.restore();
        canvas.onmousemove = updatePuzzle;
        canvas.ontouchmove = updatePuzzle;
        canvas.ontouchend = pieceDropped;
        canvas.onmouseup = pieceDropped;
    }
}

function checkPieceClicked() {
    var i, piece;
    for (i = 0; i < pieces.length; i++) {
        piece = pieces[i];
        if (
            mouse.x < piece.xPos ||
            mouse.x > piece.xPos + pieceWidth ||
            mouse.y < piece.yPos ||
            mouse.y > piece.yPos + pieceHeight
        ) {
            //часть картинки не кликнута
        } else return piece;
    }
    return null;
}

function updatePuzzle(e) {
    currentDroppedPiece = null;
    if (e.layerX || e.layerX == 0) {
        mouse.x = e.layerX;
        mouse.y = e.layerY;
    } else if (e.offsetX || e.offsetX == 0) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    }
    ctx.clearRect(0, 0, mainWidth, mainHeight);
    var i, piece;
    for (i = 0; i < pieces.length; i++) {
        piece = pieces[i];
        if (piece == currentPiece) continue;
        ctx.drawImage(
            img,
            piece.sx,
            piece.sy,
            pieceWidth,
            pieceHeight,
            piece.xPos,
            piece.yPos,
            pieceWidth,
            pieceHeight
        );
        ctx.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (currentDroppedPiece == null) {
            if (
                mouse.x < piece.xPos ||
                mouse.x > piece.xPos + pieceWidth ||
                mouse.y < piece.yPos ||
                mouse.y > piece.yPos + pieceHeight
            ) {
                //мшь не поверх картинки
            } else {
                currentDroppedPiece = piece;
                ctx.save();
                ctx.globalAlpha = 0.33;
                ctx.fillStyle = PUZZLE_HOVER_TINT;
                ctx.fillRect(
                    currentDroppedPiece.xPos,
                    currentDroppedPiece.yPos,
                    pieceWidth,
                    pieceHeight
                );
                ctx.restore();
            }
        }
    }
    ctx.save();
    ctx.globalAlpha = 0.66;
    ctx.drawImage(
        img,
        currentPiece.sx,
        currentPiece.sy,
        pieceWidth,
        pieceHeight,
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight
    );
    ctx.restore();
    ctx.strokeRect(
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight
    );
}

function pieceDropped(e) {
    audio.src = './audio/thk.mp3';
    audio.play();
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    if (currentDroppedPiece != null) {
        var tmp = { xPos: currentPiece.xPos, yPos: currentPiece.yPos };
        currentPiece.xPos = currentDroppedPiece.xPos;
        currentPiece.yPos = currentDroppedPiece.yPos;
        currentDroppedPiece.xPos = tmp.xPos;
        currentDroppedPiece.yPos = tmp.yPos;
        count++;
    }
    resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin() {
    ctx.clearRect(0, 0, mainWidth, mainHeight);
    var gameWin = true;
    var i, piece;
    for (i = 0; i < pieces.length; i++) {
        piece = pieces[i];
        ctx.drawImage(
            img,
            piece.sx,
            piece.sy,
            pieceWidth,
            pieceHeight,
            piece.xPos,
            piece.yPos,
            pieceWidth,
            pieceHeight
        );
        ctx.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
            gameWin = false;
        }
    }
    if (gameWin) {
        audio.src = './audio/win.mp3'
        audio.volume= 0.4;
        audio.play();
        setTimeout(gameOver, 330);
    }
}

function gameOver() {
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    gamesCount++;
    initPuzzle();
    if (maxCount == 0) maxCount = count;

    stateChanged(count, maxCount);
    // createTitle(
    //     "You are win in " +
    //         count +
    //         " step(s), " +
    //         (count <= maxCount ? "it's new record" : "record is " + maxCount) +
    //         "... Repeat?"
    // );
    if (count < maxCount) maxCount = count;
    count = 0;
}

function shuffleArray(o) {
    for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
}

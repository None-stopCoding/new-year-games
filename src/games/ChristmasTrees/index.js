import './styles.styl';

let treesFinishedCallback;
export function showTrees(nodeContainer, finishedCallback) {
    var usualRow = ['usual', 'usual', 'usual', 'usual', 'usual'];
    var unusualRow = ['usual', 'usual', 'usual', 'different', 'usual'];
    var gameContainer = document.createElement('div');
    treesFinishedCallback = finishedCallback;

    gameContainer.className = 're-game__Trees-container';
    gameContainer.append(generateTreesRow(usualRow));
    gameContainer.append(generateTreesRow(unusualRow));
    gameContainer.append(generateTreesRow(usualRow));

    nodeContainer.addClass('re-game__Trees');
    nodeContainer[0].append(gameContainer);
}

function generateTreesRow(treesRow) {
    var rowContainer = document.createElement('div');
    rowContainer.className = "re-game__Trees-row";
    for(var i = 0; i < treesRow.length; i++) {
        rowContainer.append(createTree(treesRow[i]));
    }
    return rowContainer;
}

function createTree(treeType) {
    var tree = new Image(104, 147);
    tree.className = 're-game__Trees-image'
    tree.src = './images/scene-future/' + treeType + 'Tree.png';
    tree.alt = "No-no, you can't just look for answers inside code. Even if you are a coder."
    tree.addEventListener('click', treeSelected);
    return tree;
}

function treeSelected(event) {
    var treeType = event.target.src.split('/').pop().split('Tree.png')[0];
    if (treeType === 'usual') {
        alert('Амм.. Эта та же елка, что и все другие :(')
    } else if (confirm('Отлично! Вы нашли ту самую елку')) {
        treesFinishedCallback();
    }
}

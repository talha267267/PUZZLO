let currentLevel = 0;
let levels = [];
let container = document.getElementById('game-container');
let status = document.getElementById('status');

async function loadLevels() {
  levels = await fetch('levels.json').then(r => r.json());
  renderLevel();
}

function renderLevel() {
  container.innerHTML = '';
  const grid = levels[currentLevel].grid;
  grid.flat().forEach((val, idx) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.innerText = val;
    tile.dataset.idx = idx;
    tile.onclick = () => {
      tile.innerText = (parseInt(tile.innerText)+1)%3;
      checkGoal();
    }
    container.appendChild(tile);
  });
}

function checkGoal() {
  const tiles = Array.from(container.children).map(t => parseInt(t.innerText));
  const goal = levels[currentLevel].goal.flat();
  if(tiles.every((v,i)=>v===goal[i])){
    status.innerText = 'Level Completed!';
  } else {
    status.innerText = '';
  }
}

document.getElementById('resetBtn').onclick = renderLevel;
loadLevels();
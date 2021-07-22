//dados iniciais
let grid = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: ''
}

let playerTurn = ''
let warning = ''
let playing = false

reset()

//eventos
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item =>{
  item.addEventListener('click', itemClick)
})

//funções
function itemClick(event){
  let item = event.target.getAttribute('data-item')
  if (playing && grid[item] === '') {
    grid[item] = playerTurn
    rendergrid()
    togglePlayer()
  }
}

function reset(){
  warning = ''

  let random = Math.floor(Math.random() * 2)
  playerTurn = random === 0 ? 'X' : 'O'

  for (let i in grid) {
    grid[i] = ''
  }

  playing = true

  rendergrid()
  renderInfo()
}

function rendergrid(){
  for (let i in grid){
    let item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = grid[i]
  }

  checkGame()
}

function renderInfo(){
  document.querySelector('.vez').innerHTML = playerTurn
  document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer(){
  playerTurn = playerTurn === 'X' ? 'O' : 'X'
  renderInfo()
}

function checkGame(){
  if (checkWinnerFor('X')){
    warning = 'O Jogador X venceu.'
    playing = false
  } else if (checkWinnerFor('O')){
    warning = 'O Jogador O venceu.'
    playing = false
  } else if (isFull()){
    warning = 'Empate. Jogue novamente'
    playing = false
  }
}

function checkWinnerFor(playerTurn){
  let possibilities = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a3,b2,c1',
    'a1,b2,c3'
  ]

  for (p in possibilities){
    let possibilitiesArray = possibilities[p].split(',')
    let victory = possibilitiesArray.every(option => grid[option] === playerTurn)

    if (victory){
      return true
    }
  }
  return false
}

function isFull(){
  for (let i in grid){
    if (grid[i] === ''){
      return false
    }
  }
  return true
}
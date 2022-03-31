// ---------- // AUDIO/SOUNDS // ---------- //

// var shotSound = new Audio("./assets/audio/lazerShot.mp3")

let board = document.getElementById("board")

// window size
let fat = window.innerWidth
let tall = window.innerHeight

// game Interval
const gameInterval = setInterval(() => {
  fat = window.innerWidth
  tall = window.innerHeight
}, 1000 / 60)

// ---------- // POP UP PAGE // ---------- //
let popPage = document.getElementById("popPage")
let instrutionsDivId = document.getElementById("instrutionsDivId")
let popUp = document.getElementById("popUp")
let openForm = document.getElementById("openForm")
let msg = document.getElementById("msg")
let msgB = document.getElementById("msgB")
let playerName = document.getElementById("nameInputI")
let msgC = document.getElementById("msgC")
let finishTheGameBtn = document.getElementById("finishTheGameBtn")
let gameOverBtn = document.getElementById("gameOverBtn")

//  top raw info
let topRowInfo = document.getElementById("topRowInfo")

let lifeMonitor = document.getElementById("lifeMonitor")
let playerNameText = document.getElementById("playerNameText")

let speedInfoDiv = document.getElementById("speedInfoDiv")
let speedMonitor = document.getElementById("speedMonitor")

let healthDiv = document.getElementById("healthDiv")
let healthDivSpan = document.getElementById("healthDivSpan")

let shieldDiv = document.getElementById("shieldDiv")
let shieldDivSpan = document.getElementById("shieldDivSpan")

let speedDiv = document.getElementById("speedDiv")
let speedDivSpan = document.getElementById("speedDivSpan")

let shotRateDiv = document.getElementById("shotRateDiv")
let shotRateDivSpan = document.getElementById("shotRateDivSpan")

let shotsRateInfoDiv = document.getElementById("shotsRateInfoDiv")
let shotsRatesMonitor = document.getElementById("shotsRatesMonitor")

openForm.addEventListener("submit", (e) => {
  e.preventDefault()
  playerName = document.getElementById("nameInputI").value
  if (playerName === "") {
    playerName = "DoTaN"
  }
  playerNameText.innerText = playerName

  startGame()
})

// ---------- // GAME // ---------- //
let player = document.getElementById("player")

// player size
let playerWidth = 40
let playerHeight = 40

// player movement
let turnRight = false
let turnLeft = false
let highSpeedPlayer = 1.5

let speedPlayerX = 0 // first X speed for PLAYER
let speedPlayerY = 0 // first Y speed for PLAYER

let locationPlayerX = fat / 2 // first location X of PLAYER
let locationPlayerY = tall / 2 // first location Y of PLAYER

// shot size
let shotWidth = 5
let shotHeight = 10

// shot direction
let shotDirectionX
let shotDirectionY

// general variables
let isShooting = false
let canShoot = true
let gas = false
let nose = 0
let life = 100

// shield variables
let gotShield = 0
let shieldTime = 5000 // 5 seconds
let protected = false

// health variables
let gotHealth = 0

// speed variables
let howMuchSpeed = 0
let tryToMoveFast = false
let speedTime = 0

// shotsRate variables
let regularShotsRate = 250
let higeShotsRate = 10
// let higeShotsRate = 10
let shotsRate = regularShotsRate

let shotTime = 0
let tryToShootFast = false
let howMuchShots = 0
// let gotSuperSpeedShots = false

// levels variables
let level = 1
let finishLevel = false
let gameOverB = false
let finishTheGameCheck = false

// enemies variables
let enemiesCords = []
let hitEnemy = null
let numberOfEnemies = 1
// let sizes = [20, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30, 40, 40]
let sizes = [
  20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
  190, 200,
]
let speeds = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]
let speeds1 = [-3, -2, -1, 1, 2, 3]
let speeds2 = [-4, -3, -2, 2, 3, 4]
let speeds3 = [-5, -4, -3, 3, 4, 5]
let speeds4 = [-5, -4, 4, 5]
let colors = ["red", "blue", "yellow", "green", "pink", "purple", "orange"]
let hitsTimesOptions = [3, 4, 5, 6, 7]
let startingPoints = [
  [-200, -200],
  [-200, fat / 2],
  [-200, fat + 200],
  [tall / 2, -200],
  [tall / 2, fat + 200],
  [tall + 200, -200],
  [tall + 200, fat / 2],
  [tall + 200, fat + 200],
]

// start game function
function startGame() {
  instrutionsDivId.style.display = "none"
  openForm.style.display = "none"
  popUp.innerHTML =
    '<p id="msg" class="msgC">STARTING GAME:</p><p id="msgB" class="msgB">LEVEL 1</p>'
  level = 1
  life = 100
  gameOverB = false
  finishLevel = false
  finishTheGameCheck = false
  gotShield = 0
  gotHealth = 0
  howMuchSpeed = 0
  speedTime = 0
  shotsRate = regularShotsRate
  shotTime = 0
  howMuchShots = 0
  shieldDiv.style.borderColor = null

  const gameStartMsg = setTimeout(() => {
    // console.log("game strat")
    popPage.style.visibility = "hidden"
    player.style.visibility = "visible"
    topRowInfo.style.visibility = "visible"
    locationPlayerX = fat / 2
    locationPlayerY = tall / 2
    setLevelDificulty(level)
    clearTimeout(gameStartMsg)
  }, 3000)
}

// you finished the game - start NEW game?
function finishTheGame() {
  player.style.visibility = "hidden"
  topRowInfo.style.visibility = "hidden"
  popPage.style.visibility = "visible"
  finishTheGameCheck = true
  popUp.innerHTML =
    '<p id="msg" class="msgC">CONGRATULATIONS!</p><p id="msgB" class="msgBC">You finished the game</p><p id="msgC" class="msgCC">New game?</p><button id="finishTheGameBtn" class="finishTheGameBtnC">Start New Game</button>'
  finishTheGameBtn = document.getElementById("finishTheGameBtn")
  msgC = document.getElementById("msgC")

  finishTheGameBtn.addEventListener("click", (e) => {
    e.preventDefault()
    startGame()
  })
}

// game over - you die and out of the game - start NEW game?
function gameOver() {
  player.style.visibility = "hidden"
  topRowInfo.style.visibility = "hidden"
  popPage.style.visibility = "visible"
  popUp.innerHTML =
    '<p id="msg" class="msgC">GAME - OVER</p><p id="msgB" class="msgBC">You out of life</p><p id="msgC" class="msgCC">New game?</p> <button id="gameOverBtn" class="gameOverBtnC">Start New Game</button>'
  gameOverBtn = document.getElementById("gameOverBtn")
  msgC = document.getElementById("msgC")

  gameOverBtn.addEventListener("click", (e) => {
    e.preventDefault()
    startGame()
  })
}

// level up function
function levelUp() {
  if (level === 10) {
    finishTheGame()
  } else {
    popPage.style.visibility = "visible"
    popUp.innerHTML = `<p id="msg" class="msgC">You finished level ${level}</p><p id="msgB" class="msgB">LEVEL ${
      level + 1
    }</p>`
    level++

    const levelUpMsg = setTimeout(() => {
      popPage.style.visibility = "hidden"
      setLevelDificulty(level)
      clearTimeout(levelUpMsg)
    }, 3000)
  }
}

// setLevelDificulty : set level dificulty - and call enemies in the end
function setLevelDificulty(level) {
  numberOfEnemies = level + 10

  if (level === 1) {
    sizes = [
      20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
      180, 190, 200,
    ]
  }

  if (level > 1) {
    sizes.splice(sizes.length - 2, 2)
  }

  if (level < 3) {
    speeds = speeds1
  }

  if (level > 2 && level < 6) {
    speeds = speeds2
  }

  if (level > 5 && level < 9) {
    speeds = speeds3
  }

  if (level > 8) {
    speeds = speeds4
  }

  getEnemies(level)
}

// getEnemies function: set and get enemies
function getEnemies() {
  enemiesCords = []

  for (let i = 0; i < numberOfEnemies; i++) {
    let randomWidth = Math.floor(Math.random() * sizes.length)
    let randomHeight = Math.floor(Math.random() * sizes.length)
    let randomSpeedX = Math.floor(Math.random() * speeds.length)
    let randomSpeedY = Math.floor(Math.random() * speeds.length)
    let randomBgcolor = Math.floor(Math.random() * colors.length)
    let randomHitsForEnemy = Math.floor(Math.random() * hitsTimesOptions.length)
    let startLocation = Math.floor(Math.random() * startingPoints.length)

    // present randomly
    let presentOrNot = Math.floor(
      // do we get present? => random number beetwin 0-1 = 50% chance for getting one
      Math.random() * 2
    )

    if (presentOrNot === 0) {
      presentOrNot = true
    } else {
      presentOrNot = false
    }

    // create enemy
    let enemy = document.createElement("div")
    enemy.setAttribute("class", `enemy${i} enemy`)
    board.appendChild(enemy)

    // set enemy object
    let enemyObj = {
      enemyName: `${i}`,
      position: "absolute",
      width: sizes[randomWidth],
      height: sizes[randomHeight],
      bgColor: colors[randomBgcolor],
      speedX: speeds[randomSpeedX],
      speedY: speeds[randomSpeedY],
      locationY: startingPoints[startLocation][0],
      locationX: startingPoints[startLocation][1],
      hits: hitsTimesOptions[randomHitsForEnemy],
      present: presentOrNot,
    }

    // set enemy style
    enemy.style.position = enemyObj.position
    enemy.style.width = enemyObj.width + "px"
    enemy.style.height = enemyObj.height + "px"
    enemy.style.backgroundColor = enemyObj.bgColor
    enemy.style.display = "flex"
    enemy.style.justifyContent = "center"
    enemy.style.alignItems = "center"
    // enemy.style.borderRadius = '50%'

    // push enemy details for collision with shot
    enemiesCords.push([
      enemyObj.locationX,
      enemyObj.locationY,
      enemyObj.width,
      enemyObj.height,
    ])

    // enemy interval
    const enemyInterval = setInterval(() => {
      enemyObj.locationX += enemyObj.speedX
      enemyObj.locationY += enemyObj.speedY

      // for collision enemy with shot
      enemiesCords[i][0] = enemyObj.locationX
      enemiesCords[i][1] = enemyObj.locationY
      enemiesCords[i][2] = enemyObj.width
      enemiesCords[i][3] = enemyObj.height

      // if hitEnemy
      if (hitEnemy === i) {
        hitEnemy = null
        enemyObj.hits--
      }

      //  if kill enemy
      if (enemyObj.hits === 0) {
        // console.log("kill")
        if (enemyObj.present) {
          givePresent(
            enemyObj.locationX,
            enemyObj.locationY,
            enemyObj.width,
            enemyObj.height,
            enemyObj.present
          )
        }
        enemiesCords[i][0] = null
        enemiesCords[i][1] = null
        enemiesCords[i][2] = null
        enemiesCords[i][3] = null
        numberOfEnemies--
        enemy.remove()
        clearInterval(enemyInterval)
      }

      // if game over
      if (gameOverB) {
        enemiesCords[i][0] = null
        enemiesCords[i][1] = null
        enemiesCords[i][2] = null
        enemiesCords[i][3] = null
        enemy.remove()
        clearInterval(enemyInterval)
      }

      // number of hits in the enemy
      enemy.innerText = `${enemyObj.hits}`

      // collision enemy with player
      if (
        enemyObj.locationX < locationPlayerX + playerWidth &&
        enemyObj.locationX + enemyObj.width > locationPlayerX &&
        enemyObj.locationY < locationPlayerY + playerHeight &&
        enemyObj.locationY + enemyObj.height > locationPlayerY
      ) {
        if (!protected) {
          life -= 1
        }
      }

      // boundreis enemies
      if (enemyObj.locationY + enemyObj.height > tall + 200) {
        enemyObj.locationY = tall + 200 - enemyObj.height
        enemyObj.speedY *= -1
      }

      if (enemyObj.locationY < 0 - 200) {
        enemyObj.speedY *= -1
      }

      if (enemyObj.locationX + enemyObj.width > fat + 200) {
        enemyObj.locationX = fat + 200 - enemyObj.width
        enemyObj.speedX *= -1
      }

      if (enemyObj.locationX < 0 - 200) {
        enemyObj.speedX *= -1
      }

      // final movement enemy
      if (enemy) {
        enemy.style.top = enemyObj.locationY + "px"
        enemy.style.left = enemyObj.locationX + "px"
      }
    }, 1000 / 60)
  }
}

// playerInterval
const playerInterval = setInterval(() => {
  locationPlayerX += speedPlayerX
  locationPlayerY += speedPlayerY

  if (turnRight) {
    nose += 5 //right
  }

  if (turnLeft) {
    nose -= 5 //left
  }

  player.style.transform = `rotate(${nose}deg)`

  direction(nose)

  playerLimits()

  if (gotHealth === 0) {
    healthDiv.style.borderColor = null
  }

  healthDivSpan.innerText = gotHealth

  // speed checks
  if (tryToMoveFast) {
    if (howMuchSpeed > 0) {
      speedDiv.style.backgroundColor = "rgb(21, 255, 0, 0.5)"
      if (gas) {
        speedTime--
        speedPlayerX = speedPlayerX * highSpeedPlayer
        speedPlayerY = speedPlayerY * highSpeedPlayer
      }
    } else {
      tryToMoveFast = false
    }
  } else {
    speedDiv.style.backgroundColor = null
  }

  if (speedTime === 0) {
    howMuchSpeed--

    if (howMuchSpeed > 0) {
      speedTime = 200
    } else {
      howMuchSpeed = 0
      speedDiv.style.borderColor = null
      speedTime = null
      speedInfoDiv.style.visibility = "hidden"
    }
  }

  speedDivSpan.innerText = howMuchSpeed
  shieldDivSpan.innerText = gotShield
  shotRateDivSpan.innerText = howMuchShots

  // speedMonitor update
  speedMonitor.style.width = speedTime / 2 + "%"

  // shooting checks

  if (isShooting && !gameOverB) {
    shotFunction()
  }

  if (tryToShootFast) {
    if (howMuchShots > 0) {
      shotsRate = higeShotsRate
      shotRateDiv.style.backgroundColor = "rgb(21, 255, 0, 0.5)"

      if (isShooting) {
        shotTime--
      }
    } else {
      tryToShootFast = false
      shotsRate = regularShotsRate
    }
  } else {
    tryToShootFast = false
    shotsRate = regularShotsRate
    shotRateDiv.style.backgroundColor = null
  }

  if (shotTime === 0) {
    howMuchShots--
    shotsRate = regularShotsRate
    if (howMuchShots > 0) {
      shotTime = 200
    } else {
      howMuchShots = 0
      shotRateDiv.style.borderColor = null
      shotsRate = regularShotsRate
      shotTime = null
      shotsRateInfoDiv.style.visibility = "hidden"
    }
  }

  // shotsRatesMonitor update
  shotsRatesMonitor.style.width = shotTime / 2 + "%"

  //    finish level checks
  if (numberOfEnemies === 0) {
    numberOfEnemies = null
    finishLevel = true
  }

  if (finishLevel) {
    finishLevel = false
    levelUp(level)
  }

  // life update

  if (life <= 0) {
    life = 100
    gameOverB = true
    gameOver()
  }

  if (life > 100) {
    life = 100
  }

  // lifeMonitor update
  lifeMonitor.style.width = life + "%"

  if (life > 60) {
    lifeMonitor.style.backgroundColor = "rgb(21, 255, 0)"
  } else if (life < 60 && life > 30) {
    lifeMonitor.style.backgroundColor = "orange"
  } else if (life < 30) {
    lifeMonitor.style.backgroundColor = "red"
  }

  // final location
  player.style.top = locationPlayerY + "px"
  player.style.left = locationPlayerX + "px"
}, 1000 / 60)

// player limits
function playerLimits() {
  if (locationPlayerY > tall - playerHeight) {
    locationPlayerY = tall - playerHeight
  }

  if (locationPlayerY < 0) {
    locationPlayerY = 0
  }

  if (locationPlayerX > fat - playerWidth) {
    locationPlayerX = fat - playerWidth
  }

  if (locationPlayerX < 0) {
    locationPlayerX = 0
  }
}

// shot function
const shotFunction = () => {
  if (canShoot) {
    // shotSound.play()
    canShoot = false
    let shot = document.createElement("div")
    shot.setAttribute("id", "shot")
    board.appendChild(shot)

    shot.style.transform = `rotate(${nose}deg)`

    let shotObj = {
      speedX: shotDirectionX * 4,
      speedY: shotDirectionY * 4,
      locationY: locationPlayerY + 15,
      locationX: locationPlayerX + 17.5,
    }

    const shotInterval = setInterval(() => {
      shotObj.locationX += shotObj.speedX
      shotObj.locationY += shotObj.speedY

      // shotLimits
      if (shotObj.locationY > tall) {
        shot.remove()
        clearInterval(shotInterval)
      }

      if (shotObj.locationY < 0 - shotHeight) {
        shot.remove()
        clearInterval(shotInterval)
      }

      if (shotObj.locationX > fat) {
        shot.remove()
        clearInterval(shotInterval)
      }

      if (shotObj.locationX < 0 - shotWidth) {
        shot.remove()
        clearInterval(shotInterval)
      }

      // collision shot with enemy
      for (let i = 0; i < enemiesCords.length; i++) {
        if (
          enemiesCords[i][0] < shotObj.locationX + shotWidth &&
          enemiesCords[i][0] + enemiesCords[i][2] > shotObj.locationX &&
          enemiesCords[i][1] < shotObj.locationY + shotHeight &&
          enemiesCords[i][1] + enemiesCords[i][3] > shotObj.locationY
        ) {
          // console.log("hit enemy")
          shotObj = {
            speedX: 0,
            speedY: 0,
            locationY: -400,
            locationX: -400,
          }
          hitEnemy = i
          shot.remove()
          clearInterval(shotInterval)
        }
      }

      //final location
      if (shot) {
        shot.style.top = shotObj.locationY + "px"
        shot.style.left = shotObj.locationX + "px"
      }
    }, 1000 / 60)

    const shotRateIntervel = setTimeout(() => {
      canShoot = true
      clearTimeout(shotRateIntervel)
    }, shotsRate)
  }
}

// give/create Present function
function givePresent(locX, locY, width, height, presentItem) {
  // create present
  let present = document.createElement("div")
  present.setAttribute("class", `present`)
  board.appendChild(present)

  let thePresent = null

  if (presentItem) {
    let whichPresent = Math.floor(
      // which Present we get? => random number beetwin 0-3 = 25% (4 types of presents)
      Math.random() * 4
    )

    if (whichPresent === 0) {
      thePresent = "Health"
      present.classList.add("bgHealth")
    } else if (whichPresent === 1) {
      thePresent = "Shield"
      present.classList.add("bgShield")
    } else if (whichPresent === 2) {
      thePresent = "Speed"
      present.classList.add("bgSpeed")
    } else if (whichPresent === 3) {
      thePresent = "FastShots"
      present.classList.add("bgshotRate")
    }
  }

  // set present object
  let presentObj = {
    presentItem: thePresent,
    locationX: locX - 20 + width / 2,
    locationY: locY - 20 + height / 2,
  }

  const selfDistractionPresent = setTimeout(() => {
    present.remove()
    clearInterval(presentInterval)
    clearTimeout(selfDistractionPresent)
  }, 6000)

  const presentInterval = setInterval(() => {
    // collision enemy with player
    if (
      presentObj.locationX < locationPlayerX + playerWidth &&
      presentObj.locationX + 20 > locationPlayerX &&
      presentObj.locationY < locationPlayerY + playerHeight &&
      presentObj.locationY + 20 > locationPlayerY
    ) {
      takePresent(presentObj.presentItem)
      present.remove()
      clearInterval(presentInterval)
    }

    // if game over or finish game or finish level and didnt take present
    if (gameOverB || finishTheGameCheck || finishLevel) {
      present.remove()
      clearInterval(presentInterval)
    }

    // final movement enemy
    if (present) {
      present.style.top = presentObj.locationY + "px"
      present.style.left = presentObj.locationX + "px"
    }
  }, 1000 / 60)
}

// take Present to presents bank
function takePresent(presentItem) {
  if (presentItem === "Health") {
    if (life < 21) {
      life = 100
      gotHealth--
    }

    gotHealth++
    healthDiv.style.borderColor = "rgb(21, 255, 0)"
  } else if (presentItem === "Shield") {
    shieldDiv.style.borderColor = "rgb(21, 255, 0)"
    gotShield++
  } else if (presentItem === "Speed") {
    speedDiv.style.borderColor = "rgb(21, 255, 0)"
    howMuchSpeed++
    if (howMuchSpeed === 1) {
      speedTime = 200
    }
    speedInfoDiv.style.visibility = "visible"
  } else if (presentItem === "FastShots") {
    shotRateDiv.style.borderColor = "rgb(21, 255, 0)"
    howMuchShots++
    if (howMuchShots === 1) {
      shotTime = 200
    }
    shotsRateInfoDiv.style.visibility = "visible"
  }
}

// shieldFunction
function shieldFunction() {
  protected = true
  player.style.border = "solid"
  player.style.borderWidth = "3px"
  player.style.borderColor = "white"
  player.style.borderRadius = "50%"
  shieldDiv.style.backgroundColor = "rgb(21, 255, 0, 0.5)"

  const shieldTimeOut = setTimeout(() => {
    protected = false
    player.style.border = null
    player.style.borderWidth = null
    player.style.borderColor = null
    player.style.borderRadius = null
    shieldDiv.style.backgroundColor = null

    if (gotShield <= 0) {
      shieldDiv.style.borderColor = null
    }
  }, shieldTime)
}

// Event Listeneres: keypress, keydown, keyup
document.addEventListener("keypress", (e) => {
  // console.log(e.key);

  switch (e.key) {
    case "1":
      if (gotHealth > 0) {
        if (life < 51) {
          life = 100
          gotHealth--
          healthDiv.style.backgroundColor = "rgb(21, 255, 0, 0.5)"

          let flash = setTimeout(() => {
            healthDiv.style.backgroundColor = null
            clearTimeout(flash)
          }, 500)
        }
      }
      break

    case "2":
      if (gotShield > 0 && protected !== true) {
        shieldFunction()
        gotShield--
      }
      break

    case "3":
      tryToMoveFast = !tryToMoveFast
      break

    case "4":
      tryToShootFast = !tryToShootFast

      break
  }
})

document.addEventListener("keydown", (e) => {
  // console.log(e.key);

  switch (e.key) {
    case "ArrowUp":
      gas = true
      break

    case "ArrowRight":
      if (turnLeft) {
        turnLeft = false
      }

      turnRight = true
      break

    case "ArrowLeft":
      if (turnRight) {
        turnRight = false
      }

      turnLeft = true
      break

    case " ":
      isShooting = true
      break
  }
})

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      gas = false
      break

    case "ArrowRight":
      turnRight = false
      break

    case "ArrowLeft":
      turnLeft = false
      break

    case " ":
      isShooting = false
      break
  }
})

// function direction
function direction(n) {
  let x = 0
  let y = 0

  // special limits of nose

  if (nose == -10) {
    nose = 350
  }

  if (nose == 370) {
    nose = 10
  }

  if (nose == 360) {
    nose = 0
  }

  // options nose

  if (n == 0) {
    x = 0
    y = -2.25
  } else if (n == 5) {
    x = 0.125
    y = -2.125
  } else if (n == 10) {
    x = 0.25
    y = -2
  } else if (n == 15) {
    x = 0.375
    y = -1.875
  } else if (n == 20) {
    x = 0.5
    y = -1.75
  } else if (n == 25) {
    x = 0.625
    y = -1.625
  } else if (n == 30) {
    x = 0.75
    y = -1.5
  } else if (n == 35) {
    x = 0.875
    y = -1.375
  } else if (n == 40) {
    x = 1
    y = -1.25
  } else if (n == 45) {
    x = 1.125
    y = -1.125
  } else if (n == 50) {
    x = 1.25
    y = -1
  } else if (n == 55) {
    x = 1.375
    y = -0.875
  } else if (n == 60) {
    x = 1.5
    y = -0.75
  } else if (n == 65) {
    x = 1.625
    y = -0.625
  } else if (n == 70) {
    x = 1.75
    y = -0.5
  } else if (n == 75) {
    x = 1.875
    y = -0.375
  } else if (n == 80) {
    x = 2
    y = -0.25
  } else if (n == 85) {
    x = 2.125
    y = -0.125
  } else if (n == 90) {
    x = 2.25
    y = 0
  } else if (n == 95) {
    x = 2.125
    y = 0.125
  } else if (n == 100) {
    x = 2
    y = 0.25
  } else if (n == 105) {
    x = 1.875
    y = 0.375
  } else if (n == 110) {
    x = 1.75
    y = 0.5
  } else if (n == 115) {
    x = 1.625
    y = 0.625
  } else if (n == 120) {
    x = 1.5
    y = 0.75
  } else if (n == 125) {
    x = 1.375
    y = 0.875
  } else if (n == 130) {
    x = 1.25
    y = 1
  } else if (n == 135) {
    x = 1.125
    y = 1.125
  } else if (n == 140) {
    x = 1
    y = 1.25
  } else if (n == 145) {
    x = 0.875
    y = 1.375
  } else if (n == 150) {
    x = 0.75
    y = 1.5
  } else if (n == 155) {
    x = 0.625
    y = 1.625
  } else if (n == 160) {
    x = 0.5
    y = 1.75
  } else if (n == 165) {
    x = 0.375
    y = 1.875
  } else if (n == 170) {
    x = 0.25
    y = 2
  } else if (n == 175) {
    x = 0.125
    y = 2.125
  } else if (n == 180) {
    x = 0
    y = 2.25
  } else if (n == 185) {
    x = -0.125
    y = 2.125
  } else if (n == 190) {
    x = -0.25
    y = 2
  } else if (n == 195) {
    x = -0.375
    y = 1.875
  } else if (n == 200) {
    x = -0.5
    y = 1.75
  } else if (n == 205) {
    x = -0.625
    y = 1.625
  } else if (n == 210) {
    x = -0.75
    y = 1.5
  } else if (n == 215) {
    x = -0.875
    y = 1.375
  } else if (n == 220) {
    x = -1
    y = 1.25
  } else if (n == 225) {
    x = -1.125
    y = 1.125
  } else if (n == 230) {
    x = -1.25
    y = 1
  } else if (n == 235) {
    x = -1.375
    y = 0.875
  } else if (n == 240) {
    x = -1.5
    y = 0.75
  } else if (n == 245) {
    x = -1.625
    y = 0.625
  } else if (n == 250) {
    x = -1.75
    y = 0.5
  } else if (n == 255) {
    x = -1.875
    y = 0.375
  } else if (n == 260) {
    x = -2
    y = 0.25
  } else if (n == 265) {
    x = -2.125
    y = 0.125
  } else if (n == 270) {
    x = -2.25
    y = 0
  } else if (n == 275) {
    x = -2.125
    y = -0.125
  } else if (n == 280) {
    x = -2
    y = -0.25
  } else if (n == 285) {
    x = -1.875
    y = -0.375
  } else if (n == 290) {
    x = -1.75
    y = -0.5
  } else if (n == 295) {
    x = -1.625
    y = -0.625
  } else if (n == 300) {
    x = -1.5
    y = -0.75
  } else if (n == 305) {
    x = -1.375
    y = -0.875
  } else if (n == 310) {
    x = -1.25
    y = -1
  } else if (n == 315) {
    x = -1.125
    y = -1.125
  } else if (n == 320) {
    x = -1
    y = -1.25
  } else if (n == 325) {
    x = -0.875
    y = -1.375
  } else if (n == 330) {
    x = -0.75
    y = -1.5
  } else if (n == 335) {
    x = -0.625
    y = -1.625
  } else if (n == 340) {
    x = -0.5
    y = -1.75
  } else if (n == 345) {
    x = -0.375
    y = -1.875
  } else if (n == 350) {
    x = -0.25
    y = -2
  } else if (n == 355) {
    x = -0.125
    y = -2.125
  }

  if (x === 0 && y === 0) {
    y = -2.25
  }

  shotDirectionX = x
  shotDirectionY = y

  if (gas === true) {
    speedPlayerX = x * 2
    speedPlayerY = y * 2
  } else {
    speedPlayerX *= 0.97
    speedPlayerY *= 0.97
  }
}

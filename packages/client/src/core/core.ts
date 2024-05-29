import * as models from './models/models'
import { addEventKeys } from './events'
import { map } from './collision-map'
import { distanceHypot } from './utils/hypot'
import { Boundary } from './classes/Boundary'
import { Player } from './classes/Player'
import { Home } from './classes/Home'
import { Enemy } from './classes/Enemy'
import { TowerPlace } from './classes/TowerPlace'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  IMAGES,
  START_COUNT_TOWERS,
  TILE_SIZE,
  TILE_WIDTH,
} from '../constants/core.config'
import { Tower } from './classes/Tower'
import { findPath } from './findPath'
import { mouseCordsCheck } from './utils/mouseCordsCheck'
import { randomInt } from './utils/randomInt'
import { IimgSprite } from './models/models'

export class Core {
  private _activeTile!: null | TowerPlace
  private _activeHome = false
  private _activeHomeClick = false
  private _player!: Player
  private _home!: Home
  private _enemies: Enemy[] = []
  private _collisions: number[] = map
  private _collisionMap: number[][] = []
  private _boundaries: Boundary[] = []
  private _towerPlaces: TowerPlace[] = []
  private _towers: Tower[] = []
  private _homePlace = [7, 3]
  private _imgSprite: IimgSprite = {}
  private _imgPromises: Promise<HTMLImageElement>[] = []

  CANVAS_NODE: HTMLCanvasElement
  CTX: CanvasRenderingContext2D

  countTowers = START_COUNT_TOWERS
  homeHealth = 100
  killedEnemies = 0

  images: models.ObjectString = IMAGES

  keys = {
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  }

  mouse: models.CordsType = {
    x: 0,
    y: 0,
  }

  constructor({ ...props }) {
    this.CANVAS_NODE = props.canvas
    this.CANVAS_NODE.width = CANVAS_WIDTH
    this.CANVAS_NODE.height = CANVAS_HEIGHT
    this.CTX = this.CANVAS_NODE.getContext('2d') as CanvasRenderingContext2D
  }

  startGame = () => {
    this.CTX.imageSmoothingEnabled = false
    this.homeHealth = 100
    this._enemies = []

    this.buildCollision()

    this.createImage(this.images)

    Promise.all(this._imgPromises).then(() => {
      this._home = new Home({
        canvas: this.CTX,
        position: {
          x: TILE_SIZE * 2,
          y: TILE_SIZE * 5,
        },
        image: this._imgSprite.home,
        sprites: {
          before: this._imgSprite.home,
          after: this._imgSprite.homeAfter,
        },
      })

      this._player = new Player({
        canvas: this.CTX,
        position: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2,
        },
        image: this._imgSprite.playerImageRigth,
        size: 2,
        velocity: 3,
        frames: {
          max: 12,
        },
        sprites: {
          left: this._imgSprite.playerImageLeft,
          rigth: this._imgSprite.playerImageRigth,
        },
        target: null,
      })

      this._boundaries.forEach(boundary => {
        boundary.draw()
      })

      this.animate()
      this.spawnEnemy(5)

      this.CANVAS_NODE.addEventListener('mousemove', this.listenerMouceMove)
      this.CANVAS_NODE.addEventListener('click', this.listenerClick)

      addEventKeys('keydown', this.keys, true)
      addEventKeys('keyup', this.keys, false)
    })
  }

  endGame() {
    this.CANVAS_NODE.removeEventListener('mousemove', this.listenerMouceMove)
    this.CANVAS_NODE.removeEventListener('click', this.listenerClick)
    this.onEndGame()
  }

  onEndGame() {
    return
  }

  createImage(images: models.ObjectString) {
    Object.keys(images).forEach(key => {
      const img = new Image()
      img.src = images[key]
      this._imgSprite[key] = img
      this._imgPromises.push(
        new Promise<HTMLImageElement>((resolve, reject) => {
          img.onload = () => resolve(img)
          img.onerror = () => reject(new Error('Ошибка загрузки изображения'))
          img.src = images[key]
        })
      )
    })
  }

  listenerMouceMove = (event: MouseEvent) => {
    if (event.target !== null) {
      const target = event.target as HTMLCanvasElement
      this.mouse.x = event.clientX - target.offsetLeft
      this.mouse.y = event.clientY - target.offsetTop
    }

    this._activeTile = null
    this._activeHome = false

    if (this._activeHomeClick) {
      for (let i = 0; i < this._towerPlaces.length; i++) {
        const tile = this._towerPlaces[i]
        if (
          mouseCordsCheck(this.mouse, tile.position, tile.width, tile.height)
        ) {
          this._activeTile = tile
          break
        }
      }
    }

    if (
      mouseCordsCheck(
        this.mouse,
        this._home.position,
        this._home.width,
        this._home.height
      )
    ) {
      this._home.image = this._home.sprites.after
      this._activeHome = true
    } else {
      if (!this._activeHomeClick) {
        this._home.image = this._home.sprites.before
        this._activeHome = false
      }
    }
  }

  listenerClick = () => {
    if (this._activeHome && this.countTowers > 0) {
      this._activeHomeClick = !this._activeHomeClick
    }

    if (this._activeTile && this.countTowers > 0) {
      this.createTower(this._activeTile)
      this.countTowers -= 1
      this._enemies.forEach(enemy => {
        const newPath = findPath(
          this._collisions,
          [
            Math.round(enemy.center.y / TILE_SIZE),
            Math.round(enemy.center.x / TILE_SIZE),
          ],
          this._homePlace
        )
        if (
          newPath.length > 0 &&
          this._activeTile &&
          enemy.center.x > this._activeTile.position.x + this._activeTile.width
        ) {
          enemy.pointIndex = 2
          enemy.path = newPath
        }
      })
    }

    if (this.countTowers <= 0) {
      this._activeHomeClick = false
    }
  }

  buildCollision = () => {
    for (
      let i = 0;
      i < this._collisions.length;
      i += CANVAS_WIDTH / TILE_SIZE
    ) {
      this._collisionMap.push(
        this._collisions.slice(i, CANVAS_WIDTH / TILE_SIZE + i)
      )
    }

    this._collisionMap.forEach((row, i) => {
      row.forEach((el, k) => {
        if (el === 1 || el === 2) {
          this._boundaries.push(
            new Boundary({
              canvas: this.CTX,
              position: {
                x: k,
                y: i,
              },
            })
          )
        }
        if (el === 2) {
          this._boundaries.push(
            new Boundary({
              canvas: this.CTX,
              position: {
                x: k,
                y: i,
              },
            })
          )
        }
        if (el === 0 && [1, 2, 3, 20, 21].indexOf(k) === -1) {
          this._towerPlaces.push(
            new TowerPlace({
              canvas: this.CTX,
              position: {
                x: k,
                y: i,
              },
            })
          )
        }
      })
    })
  }

  createTower(_activeTile: TowerPlace) {
    this._collisions.splice(
      (_activeTile.position.y / TILE_SIZE) * TILE_WIDTH +
        _activeTile.position.x / TILE_SIZE +
        1,
      1,
      1
    )
    this._boundaries.push(
      new Boundary({
        canvas: this.CTX,
        position: {
          x: _activeTile.position.x / TILE_SIZE,
          y: _activeTile.position.y / TILE_SIZE,
        },
      })
    )
    this._boundaries.forEach(boundary => {
      boundary.draw()
    })
    this._towers.push(
      new Tower({
        canvas: this.CTX,
        image: this._imgSprite.tower,
        position: {
          x: _activeTile.position.x,
          y: _activeTile.position.y,
        },
        velocity: 0,
        target: null,
        size: 0,
        sprites: {},
        frames: { max: 10 },
      })
    )
  }

  spawnEnemy(quantity: number) {
    for (let i = 1; i < quantity + 1; i++) {
      if (randomInt(0, 1) === 1) {
        this._enemies.push(
          new Enemy({
            canvas: this.CTX,
            position: {
              x: CANVAS_WIDTH + 200,
              y: 100 + (i * TILE_SIZE + 100),
            },
            image: this._imgSprite.enemyBat,
            size: 2,
            velocity: 2,
            frames: {
              max: 7,
            },
            sprites: {},
            target: null,
            path: findPath(
              this._collisions,
              [randomInt(4, 7), 22],
              this._homePlace
            ),
          })
        )
      } else {
        this._enemies.push(
          new Enemy({
            canvas: this.CTX,
            position: {
              x: CANVAS_WIDTH + 200,
              y: CANVAS_HEIGHT / 2 + i * TILE_SIZE,
            },
            image: this._imgSprite.enemyRock,
            size: 2,
            velocity: 2,
            target: null,
            sprites: {},
            frames: {
              max: 14,
            },
            path: findPath(
              this._collisions,
              [randomInt(4, 7), 22],
              this._homePlace
            ),
          })
        )
      }
    }
  }

  moving(x: number, y: number) {
    if (x > 0) this._player.image = this._player.sprites.left
    if (x < 0) this._player.image = this._player.sprites.rigth
    this._player.moving = true
    let stop = false
    this._boundaries.forEach(boundary => {
      if (
        this._player.position.x - x + this._player.width >=
          boundary.position.x &&
        this._player.position.x - x <= boundary.position.x + boundary.width &&
        this._player.position.y + y <= boundary.position.y + boundary.height &&
        this._player.position.y + y + this._player.width >= boundary.position.y
      ) {
        stop = true
      }
    })
    return stop
  }

  killCheck(gunner: Player | Tower) {
    const validEnemies = this._enemies.filter(enemy => {
      const distance = distanceHypot(enemy.center, gunner.center)
      return distance < enemy.radius + gunner.attackRange
    })

    const validEnemiesDistance: models.ValidEnemyType = {}

    validEnemies.forEach(target => {
      validEnemiesDistance[distanceHypot(target.center, gunner.center)] = target
    })

    gunner.target =
      validEnemiesDistance[
        Math.min(...Object.keys(validEnemiesDistance).map(Number))
      ]
    for (let i = gunner.projectile.length - 1; i >= 0; i--) {
      const projectile = gunner.projectile[i]
      projectile.update()
      const distance = distanceHypot(
        projectile.target.center,
        projectile.position
      )
      if (distance <= projectile.target.width + projectile.radius) {
        projectile.target.health -= 20
        if (projectile.target.health <= 0) {
          const targetIndex = this._enemies.findIndex(enemy => {
            return projectile.target === enemy
          })
          if (0 <= targetIndex) {
            this._enemies.splice(targetIndex, 1)
            this.killedEnemies += 1
          }
        }
        gunner.projectile.splice(i, 1)
      }
    }
  }

  animate() {
    this.CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    this.CTX.drawImage(this._imgSprite.background, 0, 0)

    this._player.update()
    this._home.draw()

    if (this._activeHomeClick) {
      this._towerPlaces.forEach(place => {
        place.update(this.mouse)
      })
    }

    for (let i = this._enemies.length - 1; i >= 0; i--) {
      const enemy = this._enemies[i]
      enemy.update()
      const enemyPlace = [
        Math.round(enemy.center.y / TILE_SIZE),
        Math.round(enemy.center.x / TILE_SIZE),
      ]
      if (
        this._homePlace[0] === enemyPlace[0] &&
        this._homePlace[1] === enemyPlace[1]
      ) {
        this._enemies.splice(i, 1)
        this.homeHealth -= 10
      }
      if (this.homeHealth <= 0) {
        this.endGame()
      }
    }

    this.killCheck(this._player)

    if (this._enemies.length < 10) {
      this.spawnEnemy(Math.round((this.killedEnemies + 5) / 2))
    }

    if (this._player.frames.val === 0) {
      this._player.moving = false
    }

    const verticalDirection = this.keys.w.pressed
      ? -1
      : this.keys.s.pressed
      ? 1
      : 0
    const horizontalDirection = this.keys.a.pressed
      ? 1
      : this.keys.d.pressed
      ? -1
      : 0

    if (this.keys.a.pressed || this.keys.d.pressed) {
      if (!this.moving(horizontalDirection * 5, 0)) {
        this._player.center.x -= horizontalDirection * this._player.velocity
        this._player.position.x -= horizontalDirection * this._player.velocity
      }
    }
    if (this.keys.w.pressed || this.keys.s.pressed) {
      if (!this.moving(0, verticalDirection * 5)) {
        this._player.center.y += verticalDirection * this._player.velocity
        this._player.position.y += verticalDirection * this._player.velocity
      }
    }

    this._towers.forEach(tower => {
      tower.update()
      this.killCheck(tower)
    })

    this.homeHealth <= 0
      ? this.endGame()
      : window.requestAnimationFrame(this.animate.bind(this))
  }
}

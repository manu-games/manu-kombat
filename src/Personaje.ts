import * as PIXI from 'pixi.js';

import { MySprite } from "./sprites"
import { GameApp } from "./GameApp"
import { Accion } from "./Accion"

// TODO: Agregar animaciones
// TODO: Implementar las colisiones entre personajes
export class PersonajeFactory{
    public static getPersonaje(tipo: string, nombre: string): Personaje{
        if(tipo.toLocaleLowerCase() == 'player1'){
            return new Player1(nombre)
        }

        if(tipo.toLocaleLowerCase() == 'player2'){
            return new Player2(nombre)
        }
    }
}

interface Habilidad{
    saltar():void
    darPatada():void
    darPunietazo():void
}

export abstract class Personaje implements Habilidad{
    protected _nombre: string
    protected _sprite: PIXI.AnimatedSprite
    protected saltando: boolean = false

    // TODO: El PIXI.AnimatedSprite deberia tener los atributos vx, vy por defecto
    protected vx: number
    protected vy: number
    protected position: string

    public get nombre():string{
        return this._nombre
    }

    public darPatada():void{
    }

    public darPunietazo():void{
    }

    public saltar():void{
        if(!this.saltando){
            console.log('saltando..!')
            this.vy = 1

            this._sprite.y -= 150
            this.saltando = true
        }
    }

    public update(delta: number):void{
        let luchador = this._sprite

        if(this.saltando && GameApp.posicionPiso >= luchador.y){
            luchador.y += 10
        }
        else{
            this.saltando = false

            luchador.x += this.vx * delta;
            luchador.y += this.vy * delta;
        }
    }

    // TODO: Refactor, demasiados parámetros
    protected setupKeyboard(_left:string, _right:string, _up:string, _down:string, _kick:string, _hit: string):void{
        let luchador = this

        let kick = Accion.keyboard(_kick)
        let hit = Accion.keyboard(_hit)

        let left = Accion.keyboard(_left)
        let up = Accion.keyboard(_up)
        let right = Accion.keyboard(_right)
        let down = Accion.keyboard(_down)

        kick.press = () => {
            console.log('kicked..!')
            this.darPatada()
        };

        hit.press = () => {
            console.log('hit..!')
        };

        left.press = () => {
            luchador.vx = -5;
            luchador.vy = 0;
        };

        left.release = () => {
            if (!right.isDown && luchador.vy === 0) {
                luchador.vx = 0;
            }
        };

        up.press = () => {
            //luchador.vy = -5;
            luchador.vx = 0;

            this.saltar()
            //this.saltando = true
        };
        up.release = () => {
            if (!down.isDown && luchador.vx === 0) {
                luchador.vy = 0;
            }
        };

        right.press = () => {
            luchador.vx = 5;
            luchador.vy = 0;
        };
        right.release = () => {
            if (!left.isDown && luchador.vy === 0) {
                luchador.vx = 0;
            }
        };

        down.press = () => {
            luchador.vy = 5;
            luchador.vx = 0;
        };
        down.release = () => {
            if (!up.isDown && luchador.vx === 0) {
                luchador.vy = 0;
            }
        };
    }
}

class Player1 extends Personaje{
    public constructor(nameSprite: string){
        super()

        this._sprite = MySprite.GetSprite(nameSprite)
        this._sprite.animationSpeed = 0.1
        this._sprite.play()

        this.vx = 0
        this.vy = 0

        GameApp.stage.addChild(this._sprite)
        this.setupKeyboard('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'z', 'x')
        this.posicionar()
    }

    private posicionar():void{
        this._sprite.y = GameApp.posicionPiso
        this._sprite.x = 0
    }
}

class Player2 extends Personaje{
    public constructor(nameSprite: string){
        super()

        this._sprite = MySprite.GetSprite(nameSprite)
        this._sprite.animationSpeed = 0.1
        this._sprite.play()

        this.vx = 0
        this.vy = 0

        GameApp.stage.addChild(this._sprite)
        this.setupKeyboard('h', 'l', ' ', 'Control', 'q', 'w')
        this.posicionar()
    }

    private posicionar():void{
        this._sprite.y = GameApp.posicionPiso
        this._sprite.x = GameApp.width

        this._sprite.scale.x *= -1
    }
}

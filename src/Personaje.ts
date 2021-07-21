import * as PIXI from 'pixi.js';

import { MySprite } from "./sprites"

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

        this.posicionar()
    }

    private posicionar():void{
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

        this.posicionar()
    }

    private posicionar():void{
        this._sprite.scale.x *= -1
    }
}

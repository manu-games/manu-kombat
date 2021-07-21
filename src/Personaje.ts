import * as PIXI from 'pixi.js';

import { MySprite } from "./sprites"

interface Habilidad{
    saltar():void
    darPatada():void
    darPunietazo():void
}

export abstract class Personaje implements Habilidad{
    protected _nombre: string
    protected _sprite: PIXI.AnimatedSprite
    protected saltando: boolean = false

    // TODO: El PIXI.Sprite deberia tener los atributos vx, vy
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

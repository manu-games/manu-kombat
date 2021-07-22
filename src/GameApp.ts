import {Personaje, PersonajeFactory} from "./Personaje"
import {Escenario, EscenarioFactory} from "./Escenario"

import * as PIXI from 'pixi.js'

type WorldObject = Personaje | Escenario

export class GameApp{
    private app: PIXI.Application
    static stage: PIXI.Container
    private entidades: Array<WorldObject> = []
    public static posicionPiso: number = 0
    public static width: number = 0

    public constructor(_width:number, _height:number){
        this.app = new PIXI.Application({
            transparent: true,
            backgroundColor: 0x1099bb,
            width: _width,
            height: _height,
            resolution: 1,
            antialias: true
        })

        GameApp.stage = this.app.stage
        // TODO: Ajustar los valores a una constante para los personajes
        // TODO: Mejorar expresividad de los atributos
        GameApp.posicionPiso = _height-160
        GameApp.width = _width - 100

        document.body.appendChild(this.app.view)

        this.setup()
        this.app.ticker.add(delta => this.update(delta))
    }

    private update(delta: number):void{
        for(let i=0; i < this.entidades.length; i++){
            const entidad = this.entidades[i]
            entidad.update(delta)
        }
    }

    private setup():void{
        const escenario = EscenarioFactory.getEscenario('entrenamiento', 'temple')
        const liu1 = PersonajeFactory.getPersonaje('player1', 'liuKangWait')
        const liu2 = PersonajeFactory.getPersonaje('player2', 'liuKangWait')

        this.entidades.push(escenario)
        this.entidades.push(liu1)
        this.entidades.push(liu2)
    }
}
export interface Patada{
    darPatada():void
}

export class PatadaVoladora implements Patada{
    public darPatada():void{
        console.log("Patada voladora..!")
    }
}

export class PatadaRapida implements Patada{
    public darPatada():void{
        console.log("Patada rapida..!")
    }
}

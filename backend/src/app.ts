import express, {Express} from "express"

export class App {
    private port: number
    private app: Express

    constructor() {
        this.port = 5000
        this.app = express()
    }

    public init(){
        this.app.use(express.json())
        this.app.listen(this.port, () => {
            console.log(`[app] сервер работает на http://127.0.0.1:${this.port}`)
        })
    }
}
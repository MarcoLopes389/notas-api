import { app } from './server'
import 'src/infra/typeorm'

app.setup()

app.server.listen(3000, () => {
    console.log('[ Application ] Running')
})

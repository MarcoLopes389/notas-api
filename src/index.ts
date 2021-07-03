import app from './server'
import cluster from 'cluster'
import os from 'os'
const numCPU = os.cpus().length

if(cluster.isMaster) {

    for (let index = 0; index < numCPU; index++) {
        const worker = cluster.fork()
    }

} else {

    app.listen(process.env.PORT || 3000, () => {
        console.log('Servidor rodando')
    })
}
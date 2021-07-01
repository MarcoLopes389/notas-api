import app from './server'
import cluster from 'cluster'

if(cluster.isMaster) {

    const worker = cluster.fork()

} else {

    app.listen(process.env.PORT || 3000, () => {
        console.log('Servidor rodando')
    })
}
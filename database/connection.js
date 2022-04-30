const { default: mongoose } = require('mongoose')

async function main(){
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@api-node.pvowd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    .then(()=>{
        console.log("Mongo DB cennected")
        app.listen(PORT)
    })
    
}

main().catch((err)=>{
    return console.log("Erro na nonecção:", err)
})

module.exports = mongoose
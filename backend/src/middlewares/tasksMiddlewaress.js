
const validafielstitle = (req, res, next) => {
    const {body} = req

    if(body.title === undefined){
       return res.status(400).json({messege: 'O campo de "titulo" e obrigatorio'})
    }
    if(body.title === ""){
       return res.status(400).json({messege: 'o "titulo" nao pode estar fazio'})
    }

    next();
}

const validafieldstatus = (req, res, next) => {
    const {body} = req

    if(body.status === undefined){
       return res.status(400).json({messege: 'o campo "status" e obrigatorio'})
    }
    if(body.status === ""){
       return res.status(400).json({messege: 'o "status" nao pode esta fazio'})
    }

    next();
}


module.exports = {
    validafielstitle,
    validafieldstatus,
}
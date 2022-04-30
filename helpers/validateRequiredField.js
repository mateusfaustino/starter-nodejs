module.exports = function(field, res, fieldName,language='en'){
    var message = `${fieldName}, is required.`
    switch (language) {
        case 'pt-br':
            message=` Por favor, prencha o campo ${fieldName}.`
            break;
        default:
            break;
    }
    if(!field){
        res.status(422).json({
            message:"name is required"
        })
        return
    }
}
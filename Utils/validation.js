function isValidemail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidName (name){
    return typeof name === 'string' && name.length >=3;
}

function isUniqueNumericId(id, users){
    return typeof id === 'number' && !users.some(user => user.id === id);
}

function validateUser(user, users){
    const {name, email, id} = user;
    if(!isValidName(name)){
        return{
            isValid: false,
            error: 'El nombre debe tener al menos 3 caracteres.'
        };
    }
    if(!isValidemail(email)){
        return {isValid:false, error: 'El email electronico no es valido'};
    };
    if(!isUniqueNumericId(id, users)){
        return{isValid: false, error: 'El ID debe ser numerico y unico.'}
    }
    return{isValid: true};
}

module.exports ={
    isValidName,
    isUniqueNumericId,
    isValidemail,
    isUniqueNumericId,
    validateUser
};
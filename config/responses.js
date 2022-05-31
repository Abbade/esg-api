error = (message) => {
    return {success: false, message: message }
}
genericError = () => {
    return {success: false, message: GENERIC_ERROR }
}
responseMessage = (success, message, id) => {
    return {success, message, id}
}

module.exports = {
    USER_NOT_FOUND: 'Usuário não encontrado',
    INVALID_PASSWORD: 'Senha informada é inválida',
    GENERIC_ERROR: 'Ocorreu um problema interno',
    USER_CREATED: 'Usuário cadastrado com sucesso',
    INVALID_PASSWORD: 'A senha informada é inválida',
    MISSING_DATA: 'Dados incompletos',
    USER_ALREADY_EXIST: 'Usuário ja está cadastrado',
    responseMessage,    
    error,    
    genericError
}

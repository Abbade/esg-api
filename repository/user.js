const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const { authSecret } = require('../.env')
const responses = require('../config/responses')

recuperar = async (id) => {
  try {
    let rows = await db.query("SELECT * FROM userSystem where id = $1", [id]);
    return rows[0];

  } catch (error) {
    throw new Error(responses.GENERIC_ERROR);
  }
}

cadastrar = async (user) => {
  try {

    let hash = await bcrypt.hash(user.passwordSystem, 10);
    user.passwordSystem = hash

    let userEmails = await db.query('SELECT EMAIL from userSystem where email = $1', [user.email]);

    if(userEmails[0]){
      return responses.error(responses.USER_ALREADY_EXIST);
    }

    let rows = await db.query('INSERT INTO userSystem (email, passwordSystem, name, active) VALUES($1, $2, $3, true) RETURNING id', [user.email, user.passwordSystem, user.name])
    return responses.responseMessage(true, responses.USER_CREATED, rows[0].id);

  } catch (error) {
    throw new Error(responses.GENERIC_ERROR);
  }

}

login =  async (email, password) => {
  try {

    let qr = `
    select id, name, email, passwordSystem from userSystem where email = $1 and active = true
    `;
    let rows = await db.query(qr, [email]);
    let user = rows[0];

    if (user){

      let match = await bcrypt.compare(password, user.passwordsystem);

      if(match){

        const payload =    {
          id: user.id,
          name: user.name,
          email: user.email
        }

        return {
          success: true,
          name: user.nome,
          email: user.email,
          token: jwt.encode(payload, authSecret),
        };

      }
      else{
        return responses.error(responses.INVALID_PASSWORD);
      }
    }
    else{
      return responses.error(responses.USER_NOT_FOUND);
    }

    
  } catch (error) {
    throw new Error(responses.GENERIC_ERROR);
  }  
}


module.exports = {
  recuperar,
  cadastrar,
  login
}


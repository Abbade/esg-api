const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const responses = require('../config/responses')
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

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
    let emailId = uuidv4();
    let rows = await db.query('INSERT INTO userSystem (email, passwordSystem, name, active, emailid) VALUES($1, $2, $3, true, $4) RETURNING id', [user.email, user.passwordSystem, user.name, emailId])
    return responses.responseMessage(true, responses.USER_CREATED, rows[0].id);

  } catch (error) {
    console.log(error);
    throw new Error(responses.GENERIC_ERROR);
  }

}

loginWithGoogle = async (loginData) => {
  console.log(loginData);
  const ticket = await client.verifyIdToken({
    idToken: loginData.token,
    audience: process.env.CLIENT_ID,
  });
  console.log(ticket);
  const { name, email  } = ticket.getPayload();
  let qr = `
  select id, name, email, active from userSystem where email = $1
  `;
  let rowsUser = await db.query(qr, [email]);
  console.log(rowsUser);
  let user = rowsUser[0];
  if(user){
    const payload =    {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active
    }
    return {
      success: true,
      name: name,
      email: email,
      active: user.active,
      token: jwt.encode(payload, process.env.AUTH_SECRET),
    };
  }
  else{
    let emailId = uuidv4();
    let qrInsert = `
    INSERT INTO public.usersystem
      (email, "name", active, emailid)
      VALUES($1, $2, false, $3) RETURNING id
    `;
    let rowsUserInsert = await db.query(qrInsert, [email, name, emailId]);
    let userId = rowsUserInsert[0];
    const payloadInsert =    {
      id: userId,
      name: name,
      email: email,
      active: false
    }
    return {
      success: true,
      name: name,
      email: email,
      active: false,
      token: jwt.encode(payloadInsert, process.env.AUTH_SECRET),
    };
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
          token: jwt.encode(payload, process.env.AUTH_SECRET),
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
    console.log(error);
    throw new Error(responses.GENERIC_ERROR);
  }  
}
getUsers = async () => {
  try {
    let rows = await db.query("SELECT * FROM userSystem order by name");
    return rows;

  } catch (error) {
    console.log(error);
    throw new Error(responses.GENERIC_ERROR);
  }
}
changeStatus = async (body) => {
  try {
    let rows = await db.query("UPDATE userSystem set active = $1 where id = $2", [body.active, body.id]);
    return {sucess: true};

  } catch (error) {
    console.log(error);
    throw new Error(responses.GENERIC_ERROR);
  }
}

module.exports = {
  recuperar,
  cadastrar,
  login,
  loginWithGoogle,
  getUsers,
  changeStatus
}


const db = require('../config/db')


getEsgType = async () => {
  try {
    let rows = await db.query("SELECT * FROM esg");
    return rows;

  } catch (error) {
    throw new Error(responses.GENERIC_ERROR);
  }
}

getEsgSubjects = async (esgId) => {
  try {
    let rows = await db.query("select * from subject where esg_id = $1", [esgId]);
    return rows;

  } catch (error) {
    throw new Error(responses.GENERIC_ERROR);
  }
}

create = async (feedback) => {
  try {
    let rows = await db.query('INSERT INTO feedback (subject_id, esg_id, description, email) VALUES($1, $2, $3, $4)', [feedback.subject_id, feedback.esg_id, feedback.description, feedback.email])
    return {message: "Create successfully"};

  } catch (error) {
    throw new Error(responses.GENERIC_ERROR);
  }
}

getFeedback = async () => {
  try {
    let rows = await db.query(`
    select f.id, e."name" as "esg_name", s."name" as "subject_name", f.description , f.email  from feedback f 
    left join subject s on s.id = f.subject_id 
    left join esg e ON e.id  = f.esg_id `, [])
    return rows;

  } catch (error) {
    throw new Error(responses.GENERIC_ERROR);
  }
}




module.exports = {
  getEsgType,
  getEsgSubjects,
  create,
  getFeedback
}


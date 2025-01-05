// ##############################################################
// REQUIRE MODULES
// ##############################################################
const db = require("../config/db"); // Import database connection

// ##############################################################
// INSERT CHALLENGE
// ##############################################################
module.exports.insertChallenge = (data, callback) => {
    const query = `
        INSERT INTO FitnessChallenge (challenge, skillpoints, creator_id) 
        VALUES (?, ?, ?)`;
    db.query(query, [data.challenge, data.skillpoints, data.creator_id], callback);
};

// ##############################################################
// SELECT ALL CHALLENGES
// ##############################################################
module.exports.selectAll = (callback) => {
    const query = `SELECT * FROM FitnessChallenge`;
    db.query(query, callback);
};

// ##############################################################
// SELECT CHALLENGE BY ID
// ##############################################################
module.exports.selectById = (data, callback) => {
    const query = `
        SELECT * 
        FROM FitnessChallenge 
        WHERE challenge_id = ?`;
    db.query(query, [data.id], callback);
};

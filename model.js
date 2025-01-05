const model = require("../model");

const handleErrorResponse = (res, error, statusCode = 500) => {
    console.error(error);
    return res.status(statusCode).json({ 
        status: 'error',
        message: "Internal server error" 
    });
};

const handleSuccessResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json(data);
};

// Create a new challenge
module.exports.createChallenge = (req, res) => {
    const { challenge, skillpoints, creator_id } = req.body;

    if (!challenge || !skillpoints || !creator_id) {
        return res.status(400).json({ 
            status: 'error',
            message: "Missing required data: challenge, skillpoints, or creator_id" 
        });
    }

    const data = { challenge, skillpoints, creator_id };

    model.insertChallenge(data, (error, results) => {
        if (error) return handleErrorResponse(res, error);

        res.status(201).json({
            challenge_id: results.insertId,
            ...data
        });
    });
};

// Get all challenges
module.exports.readAllChallenges = (req, res) => {
    model.selectAll((error, results) => {
        if (error) return handleErrorResponse(res, error);

        if (!results || results.length === 0) {
            return res.status(404).json({ 
                status: 'error',
                message: "No challenges found" 
            });
        }

        handleSuccessResponse(res, results);
    });
};


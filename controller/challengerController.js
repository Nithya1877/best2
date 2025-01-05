const model = require("./models/challlengeModel");

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

module.exports.createChallenge = (req, res) => {
    const { challenge, skillpoints, user_id } = req.body;

    if (!challenge || !skillpoints || !user_id) {
        return res.status(400).json({ 
            status: 'error',
            message: "Missing required data: challenge, skillpoints, or user_id" 
        });
    }

    model.checkUserExists({ user_id }, (error, userResults) => {
        if (error) return handleErrorResponse(res, error);

        if (!userResults || userResults.length === 0) {
            return res.status(404).json({ 
                status: 'error',
                message: "User not found" 
            });
        }

        const data = { 
            challenge, 
            skillpoints, 
            creator_id: user_id 
        };

        model.insertChallenge(data, (error, results) => {
            if (error) return handleErrorResponse(res, error);

            res.status(201).json({
                challenge_id: results.insertId,
                challenge,
                creator_id: user_id,
                skillpoints
            });
        });
    });
};

module.exports.readAllChallenges = (req, res) => {
    model.selectAll((error, results) => {
        if (error) return handleErrorResponse(res, error);

        if (!results || results.length === 0) {
            return res.status(404).json({ 
                status: 'error',
                message: "No challenges found" 
            });
        }

        // Return only relevant fields for each challenge
        const formattedResults = results.map(challenge => ({
            challenge_id: challenge.challenge_id,
            challenge: challenge.challenge,
            skillpoints: challenge.skillpoints,
            creator_id: challenge.creator_id
        }));

        handleSuccessResponse(res, formattedResults);
    });
};

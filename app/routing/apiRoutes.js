var tableData = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(tableData);
    });

    app.post("/api/friends", function (req, res) {
        tableData.push(req.body);
        var newFriend = req.body;
        // console.log(tableData);
        // console.log(newFriend);

        var bestMatch = 0;
        var mostDifferent = 40;

        for (var i = 0; i < tableData.length - 1; i++) {
            var matchScore = 0;
            for (var j = 0; j < tableData[i].scores.length; j++) {
                var x = tableData[i].scores[j];
                var y = parseInt(newFriend.scores[j]);
                var z = Math.abs(x - y);
                matchScore += z;

                if (matchScore < mostDifferent) {
                    bestMatch = i;
                    mostDifferent = matchScore;
                }

            }
        }

        var matchedFriend = tableData[bestMatch];
        res.json(matchedFriend)
    });
};
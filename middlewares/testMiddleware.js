const asyncHandler = require("express-async-handler");

const testMiddleware = asyncHandler(async (req, res, next) => {
    console.log("....running")
    console.log(req.method)
    if (req.method == 'POST') {
        console.log("....if statement");
        console.log(req.on);
        var jsonString = '';
        req.on('data', function (data) {
            "......req.on(data)"
            jsonString += data;
        });

        req.on('end', function () {
            console.log(JSON.parse(jsonString));
        });
    }
    // next();
})



module.exports = {
    testMiddleware
};

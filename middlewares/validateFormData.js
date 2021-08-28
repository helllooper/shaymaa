const validateFormData = (req, res, next) => {
    // var input = JSON.parse(req.body.data);
    // req.body = input;
    console.log("start");
    console.log(req.body);
    console.log("==========");
    console.log(req.file);
    console.log("=========");
    console.log(req.files);
    console.log("end");
    throw new Error("STop");
}

module.exports = {
    validateFormData
};
const dishModel = require("../../../../database/models/dishModel");

const setAvailaibility = async (request, response) => {
  try {
    if (!request.body) {
      response.json({ code: "DATA_NOT_FOUND", message: "NO DATA" });
    } else {
      await dishModel.updateOne(
        { _id: request.body.dishId },
        {
          available: request.body.available,
        }
      );
      response.json({ code: "SUCCESS" });
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = setAvailaibility;

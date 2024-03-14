const advertisementModel = require("../../../../database/models/advertisementModel");

const addAdvertisement = async (request, response) => {
  try {
    if (!request.body.image) {
      response.json({
        code: "IMAGE_NOT_FOUND",
        message: "NO image found",
      });
    } else {
      const advertisement = await advertisementModel.create({
        title:request.body.title,
        visible:request.body.visible,
        image:request.body.image
      })
      if (advertisement) {
        response.json({ code: "SUCCESS" });
      } else response.json({ code: "NOT_FOUND" });
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = addAdvertisement;

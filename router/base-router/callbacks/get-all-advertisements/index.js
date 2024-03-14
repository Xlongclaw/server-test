const AdvertisementModel = require("../../../../database/models/advertisementModel");

const getAllAdvertisements = async (_, response) => {
  try {
    const advertisements = await AdvertisementModel.find({});
    if (advertisements) {
      response.json({ code: "SUCCESS", data: advertisements });
    } else response.json({ code: "NOT_FOUND" });
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = getAllAdvertisements;

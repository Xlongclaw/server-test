// const dishModel = require("../../../../database/models/dishModel");
// const userModel = require("../../../../database/models/userModel");
// const verifyToken = require("../../../../utils/verifyToken");

// const getDishQuantity = async (request, response) => {
//   const tokenData = verifyToken(request.query.userToken);

//   if (tokenData.status == "VERIFIED") {
//     const data = await userModel
//       .findOne(
//         {
//           phoneNumber: tokenData.data,
//         },
//         {
//           _id: 0,
//           basket: {
//             $elemMatch: {
//               restaurantId: request.query.restaurantId,
//               "orderItems.$.dishId": request.query.dishId,
//             },
//           },
//         }
//       )
//       .select("basket")
//       .catch(() => {
//         response.status(401).json({ code: "NOT_FOUND" });
//       });
//     response.status(200).json({ code: "SUCCESS", data });
//   } else {
//     response.status(400).json({ code: "INVALID_TOKEN" });
//   }
// };

// module.exports = getDishQuantity;

import PropertyTable from "./property.model.js";
export const isOwnerofProperty = async (req, res, next) => {
  const propertyId = req.params.id;
  const property = await PropertyTable.findOne({ _id: propertyId });
  if (!property) {
    return res.status(404).send({ message: "Property does not exists" });
  }
  const isOwner = property.landlordId?.equals(req.loggedInUserId);
  if (!isOwner) {
    return res
      .status(200)
      .send({ message: "You have no access to this resource" });
  }
  next();
};

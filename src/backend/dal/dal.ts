// mongodb queires global service
interface Pagination {
  skip?: number;
  limit?: number;
}
export const create = async (model: any, body: any) => {
    console.log("🚀 ~ create ~ body:", body)
    
  return await model.create(body);
};
// // create Many
// exports.createMany = async (model: any, body: any) => {
//   return await model.insertMany(body, { validateBeforeSave: true });
// };

// // find and filter
export const find = async (
  model: any,
  filter = {},
  pagination: Pagination = {},
  sort = {},
  projection = {}
) => {
  return await model
    .find(filter, projection)
    .sort(sort)
    .skip(pagination.skip || 0)
    .limit(pagination.limit || 0);
};

export const findOne = async (model: any, filter: any, projection = {}) => {
  return await model.findOne(filter, projection);
};

export const findByID = async (model: any, id: any) => {
  return await model.findById(id);
};

// exports.countDocuments = async (model: any, filter: any) => {
//   return await model.countDocuments(filter);
// };

// // updates
// exports.bulkWrite = async (model: any, body: any) => {
//   return await model.bulkWrite(body);
// };

export const findOneAndUpdate = async (model: any, filter: any, body: any) => {
  return await model.findOneAndUpdate(filter, body, {
    new: true,
    useFindAndModify: false,
  });
};

// exports.findOneAndUpdateArray = async (model: any, filter: any, body: any, arrayFilters: any) => {
//   return await model.findOneAndUpdate(filter, body, arrayFilters);
// };

// exports.findOneAndUpsert = async (model: any, filter: any, body: any) => {
//   return await model.findOneAndUpdate(filter, body, {
//     new: true,
//     upsert: true,
//     runValidators: true,
//     context: "query",
//     setDefaultsOnInsert: true,
//   });
// };

// exports.updateMany = async (model: any, filter: any, body: any) => {
//   return await model.updateMany(filter, body, { new: true });
// };

// delete
export const findOneAndDelete = async (model: any, filter: any) => {
  return await model.findOneAndDelete(filter);
};

// exports.deleteMany = async (model: any, filter: any) => {
//   return await model.deleteMany(filter);
// };

// // aggregation
// exports.aggregate = async (model: any, query: any) => {
//   return await model
//     .aggregate(query)
//     .collation({ locale: "en_US", strength: 1 });
// };

// //distinct values
// exports.distinct = async (model: any, field: any, query = {}, options = {}) => {
//   return await model.distinct(field, query);
// };

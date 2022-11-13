// const features = new APIFeatures(Category.find(), req.query)
//   .filter()
//   .sort()
//   .limitFields()
//   .paginate();

// const category = await Category.aggregate([
//   {
//     $match: {
//       _id: new mongoose.Types.ObjectId(req.params.id),
//     },
//   },
//   {
//     $lookup: {
//       from: 'products',
//       localField: '_id',
//       foreignField: 'categories',
//       as: 'products',
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//     },
//   },
// ]);

// const sid = new mongoose.Types.ObjectId(req.params.id);

// const products = await Product.find({
//   categories: req.params.id,
// }).populate('categories');

// const updatedCategories = [...product.categories];
// const flaggedIdIndex = updatedCategories.indexOf(
//   new mongoose.Schema.Types.ObjectId(req.params.id)
// );

// if (flaggedIdIndex > -1) {
//   updatedCategories.splice(flaggedIdIndex, 1);
// }

// const updatedProduct = await Product.findByIdAndUpdate(
//   req.params.prodid,
//   {
//     categories: updatedCategories,
//   },
//   { new: true, runValidators: true }
// );

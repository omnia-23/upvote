import { Product } from "../../../database/models/product.model.js";
import { AppError, catchError } from "../../utils/errorHandler.js";

export const createProduct = catchError(async (req, res, next) => {
  const addedBy = req.user.id;
  const { title, price, description } = JSON.parse(JSON.stringify(req.body));
  const products = await Product.create({
    title,
    price,
    description,
    addedBy,
    image: req.file.filename,
  });
  res.status(201).json({ products });
});

export const getProducts = catchError(async (req, res, next) => {
  const products = await Product.find().populate("addedBy");
  res.status(201).json({ products });
});

export const updateProduct = catchError(async (req, res, next) => {
  const addedBy = req.user.id;
  const { id } = req.params;
  const { title, price, description } = req.body;
  const product = await Product.findById(id);

  if (product.addedBy != addedBy) throw new AppError("forbidden", 403);
  await product.updateOne(
    {
      title,
      price,
      description,
    },
    { new: true }
  );

  res.status(201).json({ product });
});

export const deleteProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.findByIdAndDelete(id);
  if (!products) throw new AppError("not found", 404);
  res.status(200).json({ products });
});

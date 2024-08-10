export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((err) => err.message);
      return res.json({ messages });
    }
    next();
    // next(new AppError(error, 400));
  };
};

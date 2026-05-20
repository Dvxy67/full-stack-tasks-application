export const validate = (schemas) => (req, res, next) => {
  const errors = [];

  if (schemas.body) {
    const result = schemas.body.safeParse(req.body);
    if (!result.success) errors.push(...result.error.errors);
  }

  if (schemas.params) {
    const result = schemas.params.safeParse(req.params);
    if (!result.success) errors.push(...result.error.errors);
  }

  if (schemas.query) {
    const result = schemas.query.safeParse(req.query);
    if (!result.success) errors.push(...result.error.errors);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Données invalides",
      errors: errors.map((e) => ({ field: e.path.join("."), message: e.message })),
    });
  }

  next();
};

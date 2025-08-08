import { z } from "zod";

const categoriesOptions = ["red", "white", "rosé", "sparkling", "fortified"];

const TastingSchema = z.object({
  wine_category_name:
      z.string({
          required_error: "Wine category name is required",
          invalid_type_error: "Wine category name must be a string",
      })
      .min(1, "Wine category name is required")
      .refine((val) => categoriesOptions.includes(val), {
          message: `Wine category name must be ${categoriesOptions.join("/")}`,
      }),
  favorite:
      z.boolean({ required_error: "Favorite is required" }),
  sample_number:
      z.string().optional(),
  wine_denomination:
      z.string({
          required_error: "Wine denomination is required",
          invalid_type_error: "Wine denomination must be a string",
      })
      .min(1, "Wine denomination is required"),
  winemaker:
      z.string({
          required_error: "Winemaker is required",
          invalid_type_error: "Winemaker must be a string",
      })
      .min(1, "Winemaker is required"),
  alcohol_content:
      z.string({
          required_error: "Alcohol content is required",
          invalid_type_error: "Alcohol content must be a string",
      })
      .refine((val) => !isNaN(parseFloat(val)), {
          message: "Alcohol content must be a valid number",
      }),
  vintage:
      z.number({
          required_error: "Vintage is required",
          invalid_type_error: "Vintage must be a number",
      })
      .int()
      .gte(1000, "Vintage must be a 4-digit number")
      .lte(9999, "Vintage must be a 4-digit number"),
  wine_temperature:
      z.string({
          required_error: "Wine temperature is required",
          invalid_type_error: "Wine temperature must be a string",
      })
      .refine((val) => !isNaN(parseFloat(val)), {
          message: "Wine temperature must be a valid number",
      }),

  ambient_temperature:
      z.string({
          required_error: "Ambient temperature is required",
          invalid_type_error: "Ambient temperature must be a string",
      })
      .refine((val) => !isNaN(parseFloat(val)), {
          message: "Ambient temperature must be a valid number",
      }),
  tasting_date:
      z.string({
          required_error: "Tasting date is required",
          invalid_type_error: "Tasting date must be a string",
        })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Tasting date must be in YYYY-MM-DD format"),
  tasting_time:
      z.string({
          required_error: "Tasting time is required",
          invalid_type_error: "Tasting time must be a string",
      })
      .regex(/^\d{2}:\d{2}$/, "Tasting time must be in HH:MM format"),
  tasting_location:
      z.string({
          required_error: "Tasting location is required",
          invalid_type_error: "Tasting location must be a string",
      })
      .min(1, "Tasting location is required"),
  notes:
      z.string().optional()
});

export { TastingSchema };

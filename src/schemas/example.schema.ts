import mongoose, { Document } from "mongoose";
import { IExample } from "interfaces/IExample";

export interface IExampleModel extends IExample, Document {}

export const ExampleSchema = new mongoose.Schema(
  {
    exampleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fill in other shema name here",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

ExampleSchema.virtual("variable name", {
  ref: "fill in ref here",
  localField: "local variable name",
  foreignField: "variable name from other schema",
  justOne: true,
});

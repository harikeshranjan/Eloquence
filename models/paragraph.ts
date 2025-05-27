import mongoose, { Schema, models, model } from "mongoose";

export interface IParagraph {
  _id?: mongoose.Types.ObjectId;
  title: string;
  content: string;
  tags: string[];
  wordCount: number;
  charCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ParagraphSchema = new Schema<IParagraph>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  wordCount: {
    type: Number,
    default: 0,
  },
  charCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

const Paragraph = models.Paragraph || model<IParagraph>("Paragraph", ParagraphSchema);

export default Paragraph;
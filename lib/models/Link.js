
import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  target: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
  lastClicked: { type: Date, default: null },
  deleted: { type: Boolean, default: false }
});

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);

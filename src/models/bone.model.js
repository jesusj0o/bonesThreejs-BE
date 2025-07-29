// models/bone.model.js
const mongoose = require("mongoose");

const BoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  components: { type: String, required: true },
  region: { type: String, required: true },
  recomendedBooks: { type: String, required: true },
  facts: { type: String, required: true },
});

// IMPORTANTE: nombre del modelo debe coincidir con como lo usas después (en este caso: "Bone")

module.exports = BoneSchema;

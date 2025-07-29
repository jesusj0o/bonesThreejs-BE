const path = require("path");
const fs = require("fs").promises;
const connectDB = require("../config/db"); // este es tu nuevo método de conexión dinámica
const BoneSchema = require("../models/bone.model");

// Ruta al JSON fallback
const fallbackDataPath = path.join(
  __dirname,
  "..",
  "data",
  "fallbackBoneData.json"
);

let staticBoneData = null;

// Función para cargar el JSON solo una vez
async function loadFallbackData() {
  if (!staticBoneData) {
    try {
      const file = await fs.readFile(fallbackDataPath, "utf-8");
      staticBoneData = JSON.parse(file);
    } catch (err) {
      console.error("Error loading fallbackBoneData.json:", err);
      staticBoneData = {};
    }
  }
  return staticBoneData;
}

// Mapeo para nombres del modelo 3D
const nameMap = {
  creaneo001: "Cráneo",
  mandibula: "Mandíbula",
  dentadura: "Dentadura",
  esternon: "Esternón",
  costillas: "Costillas",
  clavicula_der: "Clavícula derecha",
  clavicula_izq: "Clavícula izquierda",
};

// Conexión dinámica y modelo (sin duplicar modelos globales)
async function queryBoneFromDB(resolvedName) {
  try {
    const conn = await connectDB("BoneData"); // Nombre de la base de datos
    const Bone = conn.model("Bone", BoneSchema); // ← ahora sí está registrado

    const bone = await Bone.findOne({
      name: { $regex: `^${resolvedName}$`, $options: "i" },
    }).lean();
    return bone;
  } catch (error) {
    console.log("DB query error", error);
    throw error;
  }
}

// Método principal del controlador
exports.getBoneByName = async (req, res) => {
  try {
    const rawName = req.params.boneName.toLowerCase();
    const resolvedName = nameMap[rawName] || rawName;

    let boneInfo = await queryBoneFromDB(resolvedName);

    if (!boneInfo) {
      const fallbackData = await loadFallbackData();
      boneInfo = fallbackData[resolvedName];
    }

    if (boneInfo) {
      return res.json({ name: resolvedName, ...boneInfo });
    } else {
      return res
        .status(404)
        .json({ error: `No information found for "${resolvedName}".` });
    }
  } catch (error) {
    console.error("Error in getBoneByName:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

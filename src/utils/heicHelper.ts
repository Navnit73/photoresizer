import heic2any from "heic2any";

export async function processHeicFile(file: File): Promise<File> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif");

  if (!isHeic) return file;

  try {
    const convertedBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    const newName = file.name.replace(/\.hei[cf]$/i, ".jpg");

    return new File([finalBlob], newName, { type: "image/jpeg" });
  } catch (error) {
    console.error("HEIC conversion failed", error);
    return file;
  }
}

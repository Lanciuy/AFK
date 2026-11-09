// Penggabungan stylesheet global untuk konsistensi seluruh aplikasi

import { StyleSheet } from "react-native";
import { formStyles } from "./formStyles";
import { homeStyles } from "./homeStyles";

// Menggabungkan style beranda dan formulir agar impor lama tetap kompatibel
export const styles = StyleSheet.create({
  ...homeStyles,
  ...formStyles,
});

export { formStyles } from "./formStyles";
export { homeStyles } from "./homeStyles";
export { detailStyles } from "./detailStyles";

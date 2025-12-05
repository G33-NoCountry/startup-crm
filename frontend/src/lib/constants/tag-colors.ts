export const tagColorClasses: Record<string, string> = {
  blue: "bg-blue-200 text-blue-800",
  sky: "bg-sky-200 text-sky-800",
  green: "bg-green-200 text-green-800",
  lime: "bg-lime-200 text-lime-800",
  yellow: "bg-yellow-200 text-yellow-800",
  orange: "bg-orange-200 text-orange-800",
  red: "bg-red-200 text-red-800",
  pink: "bg-pink-200 text-pink-800",
  purple: "bg-purple-200 text-purple-800",
  indigo: "bg-indigo-200 text-indigo-800",
  gray: "bg-gray-200 text-gray-800"
};

export type TagColorKey = keyof typeof tagColorClasses;

// Estructura de opciones para el componente RadioGroup
const colorStyleMap: Record<TagColorKey, { bgClass: string; ringClass: string }> = {
  blue: { bgClass: "bg-blue-200", ringClass: "ring-blue-800" },
  sky: { bgClass: "bg-sky-200", ringClass: "ring-sky-800" },
  green: { bgClass: "bg-green-200", ringClass: "ring-green-800" },
  lime: { bgClass: "bg-lime-200", ringClass: "ring-lime-800" },
  yellow: { bgClass: "bg-yellow-200", ringClass: "ring-yellow-800" },
  orange: { bgClass: "bg-orange-200", ringClass: "ring-orange-800" },
  red: { bgClass: "bg-red-200", ringClass: "ring-red-800" },
  pink: { bgClass: "bg-pink-200", ringClass: "ring-pink-800" },
  purple: { bgClass: "bg-purple-200", ringClass: "ring-purple-800" },
  indigo: { bgClass: "bg-indigo-200", ringClass: "ring-indigo-800" },
  gray: { bgClass: "bg-gray-200", ringClass: "ring-gray-800" }
};

// Estructura de opciones para el componente RadioGroup
export const colorOptions = Object.keys(tagColorClasses).map((key) => {
  const colorKey = key as TagColorKey;

  return {
    value: colorKey,
    label: colorKey.charAt(0).toUpperCase() + colorKey.slice(1),
    // Usamos las clases estáticas para el color de fondo y el anillo de selección
    bgClass: colorStyleMap[colorKey].bgClass,
    ringClass: colorStyleMap[colorKey].ringClass,
  };
});
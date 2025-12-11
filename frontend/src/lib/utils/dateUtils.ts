/**
 * Utilidades para manejo de fechas
 */

/**
 * Convierte una fecha ISO a formato relativo en español
 * Ejemplos: "Ahora", "Hace 5 min", "Hace 2 h", "Hace 3 días", "15 nov"
 */
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Ahora";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  
  return past.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

/**
 * Formatea una fecha ISO a formato legible en español
 * Ejemplo: "10 dic 2024, 14:30"
 */
export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formatea solo la hora de una fecha ISO
 * Ejemplo: "14:30"
 */
export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

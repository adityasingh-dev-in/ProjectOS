export const SHARED_CONSTANT = "shared";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

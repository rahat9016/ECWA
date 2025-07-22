import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const toggle = (
  stateSetter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  key: string,
) => {
  stateSetter((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

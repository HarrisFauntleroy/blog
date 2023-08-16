import { Stack } from "@mantine/core";
import React from "react";

interface Language {
  name: string;
  color: string;
}

interface LanguagesProps {
  languages: Language[];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getContrastYIQ(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (rgb) {
    const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }
  // Fallback to black if color conversion fails
  return "black";
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  return (
    <Stack>
      {languages.map((language, index) => (
        <span
          key={index}
          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600"
          style={{
            backgroundColor: language.color || "#333",
            color: getContrastYIQ(language.color),
          }}
        >
          {language.name}
        </span>
      ))}
    </Stack>
  );
};

export default Languages;

// iconSource.js
export const ICON_COMPONENT_SOURCE = `
import React from "react";
import * as LucideIcons from "lucide-react";

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ariaLabel,
}) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(\`Icon "\${name}" does not exist\`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    />
  );
};

export default Icon;
`.trim();

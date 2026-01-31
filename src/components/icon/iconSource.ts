// iconSource.ts
export const ICON_COMPONENT_SOURCE = `
import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ariaLabel,
}) => {
  const LucideIcon = LucideIcons[name] as LucideIcon | undefined;

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

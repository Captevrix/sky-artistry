import logoLight from "../../assets/trg-logo.webp.asset.json";
import logoDark from "../../assets/trg-logo-dark.png.asset.json";

type Variant = "light" | "dark"; // "dark" = for dark backgrounds; "light" = for light backgrounds

export function TrgLogo({
  className = "",
  height = 36,
  variant = "dark",
  alt = "The Rockhill Group, Inc.",
}: {
  className?: string;
  height?: number;
  variant?: Variant;
  alt?: string;
}) {
  const src = variant === "dark" ? logoDark.url : logoLight.url;
  return (
    <img
      src={src}
      alt={alt}
      style={{ height, width: "auto" }}
      className={`block select-none ${className}`}
      draggable={false}
    />
  );
}

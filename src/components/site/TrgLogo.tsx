import logoAsset from "../../assets/trg-logo.webp.asset.json";

type Variant = "light" | "dark"; // dark = for dark backgrounds (wraps in light plate)

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
  const img = (
    <img
      src={logoAsset.url}
      alt={alt}
      style={{ height, width: "auto" }}
      className="block select-none"
      draggable={false}
    />
  );
  if (variant === "light") return <span className={className}>{img}</span>;
  return (
    <span
      className={`inline-flex items-center rounded-sm bg-[oklch(0.97_0.01_85)] px-2.5 py-1.5 ${className}`}
    >
      {img}
    </span>
  );
}

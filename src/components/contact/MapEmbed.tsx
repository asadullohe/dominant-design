interface MapEmbedProps {
  lat: number;
  lng: number;
  locale: string;
  title: string;
}

/** Google Maps embed pinned to exact coordinates; loads only when scrolled near. No API key needed. */
export function MapEmbed({ lat, lng, locale, title }: MapEmbedProps) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=17&hl=${locale}&output=embed`;

  return (
    <div className="relative aspect-[16/11] max-w-full overflow-hidden rounded-panel bg-tint">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}

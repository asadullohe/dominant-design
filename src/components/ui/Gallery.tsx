"use client";

import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

export interface GallerySlide {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Must stay within next.config images.deviceSizes and images.qualities.
const WIDTHS = [828, 1200, 1920];
const QUALITY = 75;

/** Routes a /public image through the Next image optimizer so the lightbox never ships 2000px originals to phones. */
function optimized(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}`;
}

interface GalleryProps {
  slides: GallerySlide[];
  index: number;
  open: boolean;
  onClose: () => void;
}

export function Gallery({ slides, index, open, onClose }: GalleryProps) {
  const t = useTranslations("gallery");

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      plugins={[Counter, Zoom]}
      controller={{ closeOnBackdropClick: true }}
      labels={{ Close: t("close"), Previous: t("prev"), Next: t("next"), "Zoom in": t("zoomIn"), "Zoom out": t("zoomOut") }}
      styles={{ container: { backgroundColor: "rgba(10, 10, 10, 0.94)" } }}
      slides={slides.map((slide) => ({
        src: optimized(slide.src, 1920),
        alt: slide.alt,
        width: slide.width,
        height: slide.height,
        srcSet: WIDTHS.map((w) => ({
          src: optimized(slide.src, w),
          width: w,
          height: Math.round((slide.height / slide.width) * w),
        })),
      }))}
    />
  );
}

import Image from "next/image";
import styles from "../promo.module.css";
import { SHOT_H, SHOT_W } from "./screens";

type DeviceProps = {
  src: string;
  alt: string;
  /** extra classes on the device body (sizing handled by .device / .device-sm) */
  className?: string;
  eager?: boolean;
  small?: boolean;
  sizes?: string;
};

/**
 * iPhone-style device frame built entirely in HTML/CSS — bezel, side
 * buttons, clipped screen, faint sheen, realistic shadow. The screenshot
 * itself is never modified (it already carries status bar + home indicator).
 */
export default function DeviceMockup({
  src,
  alt,
  className = "",
  eager = false,
  small = false,
  sizes = "(max-width: 768px) 70vw, 330px",
}: DeviceProps) {
  return (
    <div
      className={`${styles.device} ${small ? styles["device-sm"] : ""} ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className={styles["device-btn-l1"] + " " + styles["device-btn"]} aria-hidden />
      <span className={styles["device-btn-l2"] + " " + styles["device-btn"]} aria-hidden />
      <span className={styles["device-btn-r"] + " " + styles["device-btn"]} aria-hidden />
      <div className={styles["device-screen"]}>
        <Image
          src={src}
          alt=""
          width={SHOT_W}
          height={SHOT_H}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          priority={eager}
        />
        <span className={styles["device-sheen"]} aria-hidden />
      </div>
    </div>
  );
}

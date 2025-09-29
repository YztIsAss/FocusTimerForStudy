// SwipeWheel.tsx
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  onChange: (v: number) => void;
};

export default function SwipeWheel({
  value,
  min = 0,
  max = 999,
  step = 1,
  label,
  onChange,
}: Props) {
  const startY = useRef<number | null>(null);
  const acc = useRef(0);
  const clamp = (v: number) => {
    v = v > max ? min + v - max : v;
    v = v < 0 ? max - v : v;
    return Math.max(min, Math.min(max, v));
  }

  const ANIM_MS = 220;
  const transition = `transform ${ANIM_MS}ms cubic-bezier(.2,.9,.2,1), opacity ${ANIM_MS}ms cubic-bezier(.2,.9,.2,1)`;

  const [displayFrom, setDisplayFrom] = useState<number>(value);
  const [displayTo, setDisplayTo] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  const fromRef = useRef<HTMLElement | null>(null);
  const toRef = useRef<HTMLElement | null>(null);
  const commitTimerRef = useRef<number | null>(null);

  const clearCommitTimer = () => {
    if (commitTimerRef.current != null) {
      clearTimeout(commitTimerRef.current);
      commitTimerRef.current = null;
    }
  };

  // commit latest displayTo after animation, and clean inline styles to prevent opacity=0 leftovers
  const scheduleCommit = (finalValue: number | null) => {
    clearCommitTimer();
    commitTimerRef.current = window.setTimeout(() => {
      // commit
      if (finalValue != null) setDisplayFrom(finalValue);
      setDisplayTo(null);
      setDirection(null);

      // clear inline styles so the committed "from" element is clean
      if (fromRef.current) {
        fromRef.current.style.transition = "";
        fromRef.current.style.transform = "";
        fromRef.current.style.opacity = "";
      }
      if (toRef.current) {
        toRef.current.style.transition = "";
        toRef.current.style.transform = "";
        toRef.current.style.opacity = "";
      }

      commitTimerRef.current = null;
    }, ANIM_MS);
  };

  // start or update animation toward newValue
  const startAnimation = (newValue: number) => {
    if (newValue === displayFrom && displayTo == null) return;
    const dir = newValue > displayFrom ? "up" : "down";

    // if no animation active: prepare fromRef shown as center, toRef will be created by render
    setDirection(dir);
    setDisplayTo(newValue);

    // ensure we start from known styles:
    requestAnimationFrame(() => {
      // from: move out & fade
      if (fromRef.current) {
        fromRef.current.style.transition = transition;
        fromRef.current.style.transform = dir === "up" ? "translateY(-50%)" : "translateY(50%)";
        fromRef.current.style.opacity = "0";
      }
      // to: move in & fade
      if (toRef.current) {
        toRef.current.style.transition = transition;
        toRef.current.style.transform = dir === "up" ? "translateY(50%)" : "translateY(-50%)";
        toRef.current.style.opacity = "0";
        // force reflow then animate to center
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        toRef.current.offsetHeight;
        toRef.current.style.transform = "translateY(0%)";
        toRef.current.style.opacity = "1";
      }
    });

    scheduleCommit(newValue);
  };

  useEffect(() => {
    if (value === displayFrom && displayTo == null) return;
    // update to latest value and trigger animation
    startAnimation(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // pointer handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    acc.current = 0;
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (startY.current == null) return;
    e.preventDefault();
    const dy = startY.current - e.clientY;
    acc.current += dy;
    startY.current = e.clientY;
    const stepPx = 6;
    if (Math.abs(acc.current) >= stepPx) {
      const delta = Math.trunc(acc.current / stepPx);
      acc.current -= delta * stepPx;
      onChange(clamp(value + delta * step));
    }
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
    startY.current = null;
    acc.current = 0;
  };

  useEffect(() => {
    return () => {
      clearCommitTimer();
    };
  }, []);

  const fmt = (n: number) => n.toString().padStart(2, "0");

  const containerSx = {
    width: 120,
    height: 72,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "grey.100",
    backgroundColor: "transparent",
    cursor: "grab",
    mx: 1,
    position: "relative" as const,
    overflow: "hidden" as const,
    touchAction: "none" as const
  };

  const commonNumberSx = {
    position: "absolute" as const,
    left: 0,
    right: 0,
    margin: "auto",
    width: "100%",
    textAlign: "center" as const,
    pointerEvents: "none" as const,
  };

  return (
    <Box sx={{ userSelect: "none", textAlign: "center", px: 1 }}>
      <IconButton size="small" onClick={() => onChange(clamp(value + step))}>
        <ArrowDropUp />
      </IconButton>

      <Box
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        sx={containerSx}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            ...commonNumberSx,
            transform: displayTo == null ? "translateY(0%)" : direction === "up" ? "translateY(-50%)" : "translateY(50%)",
            opacity: displayTo == null ? 1 : 0,
            transition,
          }}
          ref={(el) => {
            fromRef.current = el as HTMLElement | null;
            // ensure when not animating, styles are clean
            if (!el && fromRef.current == null) return;
          }}
        >
          {fmt(displayFrom)}
        </Typography>

        {displayTo != null && (
          <Typography
            variant="h4"
            component="div"
            sx={{
              ...commonNumberSx,
            }}
            ref={(el) => {
              if (el) {
                toRef.current = el as HTMLElement;
                // initialize to starting offset immediately so animation can run
                el.style.transition = "";
                el.style.transform = direction === "up" ? "translateY(50%)" : "translateY(-50%)";
                el.style.opacity = "0";
                // animate next frame (startAnimation also sets styles; this is defensive)
                requestAnimationFrame(() => {
                  el.style.transition = transition;
                  el.style.transform = "translateY(0%)";
                  el.style.opacity = "1";
                });
              } else {
                toRef.current = null;
              }
            }}
          >
            {fmt(displayTo)}
          </Typography>
        )}
      </Box>

      <IconButton size="small" onClick={() => onChange(clamp(value - step))}>
        <ArrowDropDown />
      </IconButton>

      {label && (
        <Typography variant="caption" display="block">
          {label}
        </Typography>
      )}
    </Box>
  );
}

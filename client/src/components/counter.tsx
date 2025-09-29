// Counter.tsx
import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Button, Typography, Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Switch
} from "@mui/material";
import { PlayArrow, Pause, Stop } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import SwipeWheel from "./SwipeWheel";
import timerService, { ExternalSetters } from "../timerService";
import type { TimerSettings } from "./settings";

type CounterProps = {
  externalSetters?: ExternalSetters;
  settings?: TimerSettings;
};

export default function Counter({ externalSetters, settings }: CounterProps) {
  const [displayTime, setDisplayTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [phase, setPhase] = useState<"idle" | "work" | "shortBreak" | "longBreak">("idle");

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);

  const [cycleCount, setCycleCount] = useState<number>(0);
  const [openBreakDialog, setOpenBreakDialog] = useState(false);

  // ユーザーがホイールを操作したか（ユーザー指定を優先するため）
  const [userEditedWheels, setUserEditedWheels] = useState<boolean>(false);
  // カスタムホイール表示フラグ
  const [showCustomWheels, setShowCustomWheels] = useState<boolean>(false);
  // settings を自動適用済みか（初回のみ適用）
  const [settingsAppliedOnce, setSettingsAppliedOnce] = useState<boolean>(false);

  useEffect(() => {
    const merged: ExternalSetters = {
      setDisplayTime,
      setIsRunning,
      setPhase: (p) => setPhase(p as any),
      ...externalSetters,
    };
    timerService.init(merged);
    timerService.forceTick();

    timerService.onFinish(() => {
      const curPhase = timerService.getPhase();
      if (curPhase === "work") {
        setOpenBreakDialog(true);
      } else {
        timerService.setPhase("idle");
      }
    });

    const inter = setInterval(() => timerService.displayTick(), 5);
    return () => clearInterval(inter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // settings を初回だけ反映（ただしユーザーがホイールを編集していれば上書きしない）
  const applySettings = () => {
    if (!settings) return;
    if (settings.preset && settings.preset !== "カスタム") {
      const totalSeconds = (settings.pomoMinutes ?? 0) * 60;
      setHours(Math.floor(totalSeconds / 3600));
      setMinutes(Math.floor((totalSeconds % 3600) / 60));
      setSeconds(totalSeconds % 60);
      // 自動適用はユーザーがまだホイールを編集していない場合のみ timerService にセット
      if (!userEditedWheels) {
        const ms = totalSeconds * 1000;
        timerService.setTarget(ms);
        timerService.setPhase("work");
        timerService.displayTick();
      }
      //setShowCustomWheels(false);
    } else if (settings.preset === "カスタム" && settings.pomoMinutes) {
      const totalSeconds = settings.pomoMinutes * 60;
      setHours(Math.floor(totalSeconds / 3600));
      setMinutes(Math.floor((totalSeconds % 3600) / 60));
      setSeconds(totalSeconds % 60);
      if (!userEditedWheels) {
        const ms = totalSeconds * 1000;
        timerService.setTarget(ms);
        timerService.setPhase("work");
        timerService.displayTick();
      }
      // Custom プリセットの場合、ホイールを表示してユーザーが確定する流れにする
      //setShowCustomWheels(true);
    }

    setSettingsAppliedOnce(true);
  }
  useEffect(() => {
    if (!settings || isRunning) return;

    applySettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, showCustomWheels]);

  // ホイール操作時に userEditedWheels を立てるラッパー
  const onHoursChange = (v: number) => {
    setHours(v);
    setUserEditedWheels(true);
  };
  const onMinutesChange = (v: number) => {
    setMinutes(v);
    setUserEditedWheels(true);
  };
  const onSecondsChange = (v: number) => {
    setSeconds(v);
    setUserEditedWheels(true);
  };

  const msFromWheels = () => ((hours * 60 + minutes) * 60 + seconds) * 1000;

  const handleStartPause = () => {
    if (isRunning) {
      timerService.pause();
      return;
    }

    // 優先順位：
    // 1) ユーザーがホイールを編集した -> ホイール値を使用
    // 2) settings のプリセット（Custom 以外）かつユーザーが編集していない -> settings 値を使用
    // 3) どちらも無ければホイール（デフォルト）を使用
    let ms = 0;

    if (userEditedWheels) {
      ms = msFromWheels();
    } else if (settings && settings.preset && settings.preset !== "Custom") {
      ms = (settings.pomoMinutes ?? 0) * 60 * 1000;
    } else {
      ms = msFromWheels();
    }

    // 0ms は開始しない（誤操作防止）
    if (ms <= 0) {
      // もしまだホイールを明示表示していないなら表示だけする
      if (!showCustomWheels && !isRunning) setShowCustomWheels(true);
      return;
    }

    timerService.setTarget(ms);
    timerService.setPhase("work");
    timerService.start();
    // 開始後はカスタムホイール UI を閉じる
    setShowCustomWheels(false);
  };

  const handleReset = () => {
    timerService.reset();
    setCycleCount(0);
    setShowCustomWheels(false);
    applySettings();
    // リセットはユーザー編集フラグを残す（ユーザー入力は維持した方が UX が自然）
  };

  const handleStartBreak = (useLong: boolean) => {
    setOpenBreakDialog(false);
    const nextPhase = useLong ? "longBreak" : "shortBreak";
    timerService.setPhase(nextPhase);
    const minutesForBreak = useLong ? (settings?.longBreakMinutes ?? 15) : (settings?.shortBreakMinutes ?? 5);
    const ms = minutesForBreak * 60 * 1000;
    timerService.setTarget(ms);
    timerService.start();
    setCycleCount((c) => c + 1);
  };

  const handleSkipBreak = () => {
    setOpenBreakDialog(false);
    timerService.setPhase("idle");
  };

  const shouldUseLongBreakNext = () => {
    const cyclesBeforeLong = settings?.cyclesBeforeLongBreak ?? 4;
    return (cycleCount + 1) % cyclesBeforeLong === 0;
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const secondsOnly = totalSeconds % 60;
    const minutesAll = Math.floor(totalSeconds / 60);
    const minutesOnly = minutesAll % 60;
    const hoursOnly = Math.floor(minutesAll / 60);

    if (hoursOnly > 0) {
      return `${hoursOnly}:${minutesOnly.toString().padStart(2, "0")}:${secondsOnly.toString().padStart(2, "0")}`;
    } else {
      return `${minutesOnly}:${secondsOnly.toString().padStart(2, "0")}`;
    }
  };

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <Box sx={{ bgcolor: "grey.900", color: "white", p: 2 }}>
          <Typography variant="h6" component="h3">タイマー</Typography>
          <Typography variant="body2" color="grey.300">まずは机に向かおう！適切な時間配分にすると集中の負担が軽減されるよ！時間配分は設定で変更してください。</Typography>
        </Box>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          {!isRunning && 
            <Box sx={{ mb: 2 }}>
              <Switch checked={showCustomWheels} onChange={() => setShowCustomWheels(!showCustomWheels)}/>自分で時間を指定する
            </Box>
          }
          
          {(!showCustomWheels || isRunning) && 
            <Typography variant="h1" component="div" color="primary" sx={{ fontWeight: "bold", fontSize: "3.5rem", mb: 2 }}>
              {formatTime(displayTime)}
            </Typography>
          }

          {(!isRunning && showCustomWheels) && 
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
              <SwipeWheel value={hours} min={0} max={99} step={1} onChange={onHoursChange} label="時間" />
              <SwipeWheel value={minutes} min={0} max={59} step={1} onChange={onMinutesChange} label="分" />
              <SwipeWheel value={seconds} min={0} max={59} step={1} onChange={onSecondsChange} label="秒" />
            </Stack>
          }

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button onClick={handleStartPause} variant="contained" size="large" startIcon={isRunning ? <Pause /> : <PlayArrow />}>
              {isRunning ? "一時停止" : "スタート"}
            </Button>

            <AnimatePresence>
              {(displayTime > 0 && isRunning) && (
                <motion.div initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.8 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                  <Button onClick={handleReset} variant="outlined" color="error" size="large" startIcon={<Stop />}>リセット</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={openBreakDialog} onClose={handleSkipBreak}>
        <DialogTitle>休憩を始めますか？</DialogTitle>
        <DialogContent>
          <Typography>
            {shouldUseLongBreakNext()
              ? `長い休憩 (${settings?.longBreakMinutes ?? 15} 分) を始めますか？`
              : `短い休憩 (${settings?.shortBreakMinutes ?? 5} 分) を始めますか？`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkipBreak}>いいえ</Button>
          <Button onClick={() => handleStartBreak(shouldUseLongBreakNext())} autoFocus>はい、始める</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

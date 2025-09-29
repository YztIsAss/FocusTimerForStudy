import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from "@mui/material";
import { Save } from "@mui/icons-material";

export interface TimerSettings {
  pomoMinutes: number;         // 作業時間（分）
  shortBreakMinutes: number;   // 短い休憩（分）
  longBreakMinutes: number;    // 長い休憩（分）
  cyclesBeforeLongBreak: number; // 長い休憩までのサイクル数
  roundsPerSession: number;    // セッションの繰り返し回数（任意）
  enableSound: boolean;        // 通知音を鳴らすか
  enableVibration: boolean;    // バイブレーション（モバイル向け）
  isDarkMode: boolean;         // ダークテーマ有効化
  preset: string;              // 選択中のプリセット名
}

const defaultSettings: TimerSettings = {
  pomoMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
  roundsPerSession: 1,
  enableSound: true,
  enableVibration: false,
  isDarkMode: false,
  preset: "カスタム",
};

interface Props {
  initialSettings?: Partial<TimerSettings>;
  onSave?: (settings: TimerSettings) => void;
}

export default function Settings({ initialSettings, onSave }: Props) {
  const [settings, setSettings] = useState<TimerSettings>({
    ...defaultSettings,
    ...initialSettings,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);

  // プリセット定義
  const presets: Record<string, Partial<TimerSettings>> = {
    Pomodoro: {
      pomoMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 15,
      cyclesBeforeLongBreak: 4,
      preset: "ポモドーロ",
    },
    "Short Session": {
      pomoMinutes: 15,
      shortBreakMinutes: 3,
      longBreakMinutes: 10,
      cyclesBeforeLongBreak: 3,
      preset: "ショート",
    },
    "Deep Work": {
      pomoMinutes: 52,
      shortBreakMinutes: 17,
      longBreakMinutes: 30,
      cyclesBeforeLongBreak: 2,
      preset: "ディープ",
    },
    Custom: {},
  };

  // 例: ローカルストレージから復元（任意）
  useEffect(() => {
    try {
      const raw = localStorage.getItem("timerSettings");
      if (raw) {
        setSettings((prev) => ({ ...prev, ...(JSON.parse(raw) as TimerSettings) }));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleFieldChange = (
    key: keyof TimerSettings,
    value: string | number | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetName: string) => {
    const preset = presets[presetName] || {};
    setSettings((prev) => ({ ...prev, ...preset, preset: presetName }));
  };

  const validate = (s: TimerSettings) => {
    if (s.pomoMinutes <= 0 || s.shortBreakMinutes < 0 || s.longBreakMinutes < 0) {
      return "時間は正の値で指定してください。";
    }
    if (s.cyclesBeforeLongBreak <= 0) return "サイクル数は1以上にしてください。";
    if (s.roundsPerSession <= 0) return "ラウンド数は1以上にしてください。";
    return null;
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const err = validate(settings);
    if (err) {
      setShowError(err);
      return;
    }

    setIsSaving(true);
    // 保存処理（例：ローカルストレージ、または親コンポーネントへ渡す）
    try {
      // 保存シミュレーション
      await new Promise((r) => setTimeout(r, 50));
      localStorage.setItem("timerSettings", JSON.stringify(settings));
      onSave?.(settings);
      setShowSuccess(true);
    } catch {
      setShowError("設定の保存に失敗しました。");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <Box sx={{ bgcolor: "grey.900", color: "white", p: 2 }}>
          <Typography variant="h6" component="h3">
            設定
          </Typography>
          <Typography variant="body2" color="grey.300">
            タイマーのプリセット等を設定しよう！
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSave}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="preset-label">プリセット</InputLabel>
                <Select
                  labelId="preset-label"
                  value={settings.preset}
                  label="Preset"
                  onChange={(e) => applyPreset(e.target.value as string)}
                >
                  {Object.keys(presets).map((p) => (
                    <MenuItem key={p} value={p}>
                      {presets[p].preset || "カスタム"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="集中時間 (分)"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={settings.pomoMinutes}
                    onChange={(e) => handleFieldChange("pomoMinutes", Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">分</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="短い休憩 (分)"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={settings.shortBreakMinutes}
                    onChange={(e) =>
                      handleFieldChange("shortBreakMinutes", Number(e.target.value))
                    }
                    InputProps={{
                      endAdornment: <InputAdornment position="end">分</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="長い休憩 (分)"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={settings.longBreakMinutes}
                    onChange={(e) => handleFieldChange("longBreakMinutes", Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">分</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="長い休憩までのサイクル数"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={settings.cyclesBeforeLongBreak}
                    onChange={(e) =>
                      handleFieldChange("cyclesBeforeLongBreak", Number(e.target.value))
                    }
                  />
                </Grid>

                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="各セッションのラウンド数"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={settings.roundsPerSession}
                    onChange={(e) => handleFieldChange("roundsPerSession", Number(e.target.value))}
                  />
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableSound}
                    onChange={(e) => handleFieldChange("enableSound", e.target.checked)}
                  />
                }
                label="サウンド通知"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableVibration}
                    onChange={(e) => handleFieldChange("enableVibration", e.target.checked)}
                  />
                }
                label="バイブレーション（ベータ機能）"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.isDarkMode}
                    onChange={(e) => handleFieldChange("isDarkMode", e.target.checked)}
                  />
                }
                label="ダークモード"
              />

              {isSaving && <CircularProgress size={24} />}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                disabled={isSaving}
                size="large"
              >
                {isSaving ? "保存しています..." : "設定を適用"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          設定が適用されました。
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!showError}
        autoHideDuration={6000}
        onClose={() => setShowError(null)}
      >
        <Alert onClose={() => setShowError(null)} severity="error">
          {showError}
        </Alert>
      </Snackbar>
    </>
  );
}

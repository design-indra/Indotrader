/**
 * app/api/settings/route.js
 * GET  /api/settings
 * POST /api/settings
 *
 * v5: Tambah toggle ultraProfitMode dan ultraLightMode.
 *     Mode bersifat eksklusif — enable satu otomatis disable dua lainnya.
 */
import { NextResponse } from 'next/server';
import { getRiskSettings, updateRiskSettings } from '../../../lib/riskManager.js';
import { resetDemo, setStartBalance }           from '../../../lib/demoStore.js';

export async function GET() {
  const risk = getRiskSettings();
  const hasApiKey = !!(process.env.INDODAX_API_KEY && process.env.INDODAX_SECRET_KEY);
  return NextResponse.json({
    success: true,
    risk,
    api: {
      configured: hasApiKey,
      keyPreview: hasApiKey ? `${process.env.INDODAX_API_KEY?.slice(0,6)}...` : null,
    },
  });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { action, settings } = body;

  if (action === 'updateRisk') {
    const updated = updateRiskSettings(settings);
    return NextResponse.json({ success: true, risk: updated });
  }

  // ── Toggle Max Profit Mode ──────────────────────────────────────────────────
  // Mode eksklusif: aktifkan satu → matikan dua lainnya
  if (action === 'toggleMaxProfitMode') {
    const current = getRiskSettings();
    const turningOn = !current.maxProfitMode;
    const updated = updateRiskSettings({
      maxProfitMode:   turningOn,
      ultraProfitMode: false,     // Matikan mode lain
      ultraLightMode:  false,
    });
    return NextResponse.json({ success: true, maxProfitMode: updated.maxProfitMode, risk: updated });
  }

  // ── Toggle Ultra Profit Mode ────────────────────────────────────────────────
  // Agresif: risk 70%, streak bonus max 1.5x, partial TP di +0.7%, R:R min 1.0
  if (action === 'toggleUltraProfitMode') {
    const current  = getRiskSettings();
    const turningOn = !current.ultraProfitMode;
    const updated = updateRiskSettings({
      ultraProfitMode: turningOn,
      maxProfitMode:   false,     // Matikan mode lain
      ultraLightMode:  false,
    });
    return NextResponse.json({ success: true, ultraProfitMode: updated.ultraProfitMode, risk: updated });
  }

  // ── Toggle Ultra Light Profit Mode ─────────────────────────────────────────
  // Konservatif: risk 20%, no compounding, partial TP di +0.5%, R:R min 2.0
  if (action === 'toggleUltraLightMode') {
    const current  = getRiskSettings();
    const turningOn = !current.ultraLightMode;
    const updated = updateRiskSettings({
      ultraLightMode:  turningOn,
      maxProfitMode:   false,     // Matikan mode lain
      ultraProfitMode: false,
    });
    return NextResponse.json({ success: true, ultraLightMode: updated.ultraLightMode, risk: updated });
  }

  if (action === 'toggleScanner') {
    const current = getRiskSettings();
    const updated  = updateRiskSettings({ autoScannerEnabled: !current.autoScannerEnabled });
    return NextResponse.json({ success: true, autoScannerEnabled: updated.autoScannerEnabled, risk: updated });
  }

  if (action === 'resetDemoBalance') {
    const amount = parseInt(settings?.balance || '100000');
    setStartBalance(amount);
    resetDemo(amount);
    return NextResponse.json({
      success: true,
      message: `Demo balance reset ke Rp ${amount.toLocaleString('id-ID')}`,
    });
  }

  return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
}

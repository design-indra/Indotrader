# 📱 IndoTrader Pro — Command Prompt Termux Lengkap

> Salin perintah ini satu per satu di Termux Android Anda

---

## ═══════════════════════════════════
## TAHAP 1 — PERSIAPAN TERMUX
## ═══════════════════════════════════

### 1.1 Update & upgrade semua package
```bash
pkg update -y && pkg upgrade -y
```

### 1.2 Install Node.js + Git + tools
```bash
pkg install -y nodejs git curl unzip zip nano
```

### 1.3 Cek versi (pastikan berhasil)
```bash
node -v
npm -v
git --version
```
> Output harusnya: v18.x.x / v10.x.x / git version 2.x.x


---

## ═══════════════════════════════════
## TAHAP 2 — SETUP PROJECT
## ═══════════════════════════════════

### 2.1 Buat folder kerja
```bash
mkdir -p ~/projects
cd ~/projects
```

### 2.2 Transfer file ZIP ke Termux
Ada 2 cara:

**Cara A — lewat Download folder Android:**
```bash
# Taruh indodax-bot.zip di folder Download HP
cp /storage/emulated/0/Download/indodax-bot.zip ~/projects/
cd ~/projects
unzip indodax-bot.zip
cd indodax-bot
```

**Cara B — langsung clone dari GitHub (jika sudah push):**
```bash
cd ~/projects
git clone https://github.com/USERNAME/indodax-bot.git
cd indodax-bot
```

### 2.3 Beri akses storage (jika belum)
```bash
termux-setup-storage
# Ketuk "Allow" di popup Android
```


---

## ═══════════════════════════════════
## TAHAP 3 — KONFIGURASI .ENV
## ═══════════════════════════════════

### 3.1 Buat file .env dari template
```bash
cp .env.example .env
```

### 3.2 Edit .env dengan nano
```bash
nano .env
```

### 3.3 Isi nilai-nilai berikut di dalam nano:
```
INDODAX_API_KEY=masukkan_api_key_indodax_anda
INDODAX_SECRET_KEY=masukkan_secret_key_indodax_anda
DEMO_BALANCE=10000000
STOP_LOSS_PERCENT=1
TAKE_PROFIT_PERCENT=2
TRAILING_STOP_PERCENT=0.5
MAX_POSITIONS=2
MAX_RISK_PERCENT=15
MAX_CONSECUTIVE_LOSSES=3
```

### 3.4 Simpan di nano
```
CTRL + O   → Simpan file
ENTER      → Konfirmasi nama file
CTRL + X   → Keluar dari nano
```

### 3.5 Cek isi .env sudah benar
```bash
cat .env
```


---

## ═══════════════════════════════════
## TAHAP 4 — INSTALL DEPENDENCIES
## ═══════════════════════════════════

### 4.1 Install semua npm packages
```bash
npm install
```
> Proses ini 2–5 menit. Tunggu sampai selesai.

### 4.2 Jika ada error npm — coba ini:
```bash
npm install --legacy-peer-deps
```

### 4.3 Jika error TensorFlow.js di Termux:
```bash
# Skip TF.js (opsional, Level 4 & 5 pakai fallback)
npm install --ignore-scripts
```


---

## ═══════════════════════════════════
## TAHAP 5 — JALANKAN BOT (DEV MODE)
## ═══════════════════════════════════

### 5.1 Start development server
```bash
npm run dev
```

### 5.2 Output yang benar:
```
▲ Next.js 14.2.3
- Local:   http://localhost:3000
- Ready in 2.5s
```

### 5.3 Buka di browser HP
```
Buka browser Android → ketik:
http://localhost:3000
```

### 5.4 Jalankan di background (opsional)
```bash
# Install screen/tmux agar tetap jalan walau Termux ditutup
pkg install -y tmux

# Buat sesi baru
tmux new -s indotrader

# Di dalam tmux, jalankan bot
npm run dev

# Detach dari tmux (bot tetap jalan)
CTRL + B  lalu tekan  D

# Kembali ke sesi tmux
tmux attach -t indotrader

# Lihat semua sesi
tmux ls
```


---

## ═══════════════════════════════════
## TAHAP 6 — BUILD PRODUCTION
## ═══════════════════════════════════

### 6.1 Build untuk production
```bash
npm run build
```

### 6.2 Jalankan versi production
```bash
npm run start
```


---

## ═══════════════════════════════════
## TAHAP 7 — DEPLOY KE VERCEL
## ═══════════════════════════════════

### 7.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 7.2 Login ke Vercel
```bash
vercel login
```
> Pilih: "Continue with GitHub" → buka link di browser → authorize

### 7.3 Deploy project
```bash
cd ~/projects/indodax-bot
vercel
```

### 7.4 Jawab pertanyaan Vercel:
```
Set up and deploy? → Y
Which scope? → pilih akun Anda
Link to existing project? → N
Project name → indodax-bot (atau nama lain)
Directory → . (titik = folder sekarang)
Override settings? → N
```

### 7.5 Set Environment Variables di Vercel
```bash
# Cara 1: via CLI
vercel env add INDODAX_API_KEY production
# ketik nilai API key → Enter

vercel env add INDODAX_SECRET_KEY production
# ketik secret key → Enter

vercel env add DEMO_BALANCE production
# ketik: 10000000 → Enter

# Cara 2: via Dashboard (lebih mudah)
# Buka: https://vercel.com/dashboard
# Pilih project → Settings → Environment Variables
# Tambahkan semua key dari .env
```

### 7.6 Deploy ulang setelah set env
```bash
vercel --prod
```

### 7.7 Cek URL deployment
```bash
# Output akan tampilkan URL seperti:
# https://indodax-bot-xxx.vercel.app
```


---

## ═══════════════════════════════════
## PERINTAH BERGUNA LAINNYA
## ═══════════════════════════════════

### Lihat log real-time
```bash
npm run dev 2>&1 | tee bot.log
```

### Lihat file log
```bash
tail -f bot.log
```

### Restart bot
```bash
# CTRL + C untuk stop
npm run dev
```

### Update project dari GitHub
```bash
cd ~/projects/indodax-bot
git pull origin main
npm install
npm run build
```

### Cek port yang dipakai
```bash
netstat -tlnp | grep 3000
# atau
ss -tlnp | grep 3000
```

### Ganti port (default 3000)
```bash
PORT=8080 npm run dev
# Buka: http://localhost:8080
```

### Hapus cache Next.js
```bash
rm -rf .next
npm run dev
```

### Backup .env ke folder aman
```bash
cp .env ~/backup-env-indotrader.txt
```


---

## ═══════════════════════════════════
## TROUBLESHOOTING
## ═══════════════════════════════════

### ❌ Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Error: "ENOSPC: no space left"
```bash
# Cek storage tersisa
df -h
# Hapus cache npm
npm cache clean --force
```

### ❌ Error: "Port 3000 already in use"
```bash
# Cari proses yang pakai port 3000
lsof -i :3000
# Kill proses (ganti PID dengan angka dari output di atas)
kill -9 PID
# Atau ganti port:
PORT=3001 npm run dev
```

### ❌ Error: "INDODAX_API_KEY not configured"
```bash
# Cek .env ada dan terisi
cat .env | grep API_KEY
# Jika kosong, isi ulang:
nano .env
```

### ❌ Bot tidak start / error 500
```bash
# Cek log error
npm run dev
# Lihat output merah di terminal
# Screenshot error dan perbaiki sesuai pesan
```

### ❌ TensorFlow.js error di Termux
```bash
# TF.js memang kadang susah di ARM Android
# Bot akan otomatis fallback ke random prediction
# Level 1-3 tetap berfungsi normal
# Tidak perlu TF.js untuk Level 1, 2, 3
```

### ❌ Vercel deploy gagal
```bash
# Cek apakah build lokal berhasil dulu
npm run build
# Jika build lokal OK, coba deploy lagi
vercel --prod --force
```


---

## ═══════════════════════════════════
## CARA DAPAT API KEY INDODAX
## ═══════════════════════════════════

```
1. Login ke https://indodax.com
2. Klik nama profil → API Management
3. Klik "Create New API Key"
4. Beri nama: IndoTraderPro
5. Centang permission:
   ✅ View  (wajib)
   ✅ Trade (untuk live trading)
   ❌ Withdraw (jangan centang ini!)
6. Klik "Create"
7. Salin API Key dan Secret Key
8. Paste ke file .env
```

> ⚠️ KEAMANAN: Jangan share API key ke siapapun.
> Jangan centang "Withdraw" untuk keamanan.
> Bisa batasi IP di setting API Indodax.


---

## ═══════════════════════════════════
## QUICK CHEATSHEET
## ═══════════════════════════════════

```bash
# Setup awal (sekali saja)
pkg update -y && pkg upgrade -y
pkg install -y nodejs git curl unzip nano
cd ~/projects/indodax-bot
cp .env.example .env && nano .env
npm install

# Jalankan setiap kali
cd ~/projects/indodax-bot
npm run dev

# Deploy ke Vercel
vercel --prod

# Tmux (jalan di background)
tmux new -s bot
npm run dev
# Ctrl+B lalu D untuk detach
```

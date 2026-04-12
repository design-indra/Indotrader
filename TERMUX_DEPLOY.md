# 🚀 Panduan Deploy ke Vercel via Termux (HP Android)

## 📋 Persiapan

### 1. Install Termux
Download Termux dari **F-Droid** (bukan Play Store):
→ https://f-droid.org/packages/com.termux/

---

## ⚙️ Setup Termux (Lakukan Sekali)

Buka Termux, jalankan satu per satu:

```bash
# Update paket
pkg update && pkg upgrade -y

# Install tools yang dibutuhkan
pkg install -y nodejs git curl unzip

# Cek versi Node (harus v18+)
node --version

# Install Vercel CLI secara global
npm install -g vercel

# Cek Vercel berhasil terinstall
vercel --version
```

---

## 📁 Upload & Ekstrak Project

### Cara 1: Dari file ZIP di HP
```bash
# Pindah ke folder home
cd ~

# Cek file ZIP ada di mana (biasanya di Downloads)
ls /sdcard/Download/

# Copy ke Termux home
cp /sdcard/Download/indodax-bot-fixed.zip ~/

# Ekstrak
unzip indodax-bot-fixed.zip

# Masuk ke folder project
cd indodax-bot-fixed
```

### Cara 2: Clone dari GitHub (jika sudah push)
```bash
cd ~
git clone https://github.com/USERNAME/indodax-bot.git
cd indodax-bot
```

---

## 📦 Install Dependencies

```bash
# Pastikan kamu di dalam folder project
cd ~/indodax-bot-fixed

# Install semua package
npm install

# Kalau ada error peer deps, pakai:
npm install --legacy-peer-deps
```

---

## 🔑 Setup Environment Variables

### Untuk development/test lokal:
```bash
# Buat file .env.local
cp .env.local.example .env.local

# Edit isi file (pakai nano)
nano .env.local
```

Di nano:
- Ganti `your_api_key_here` dengan API Key Indodax kamu
- Ganti `your_secret_key_here` dengan Secret Key Indodax kamu
- Tekan **Ctrl+X** → **Y** → **Enter** untuk simpan

> ⚠️ PENTING: Kalau hanya mau mode DEMO, API key boleh dikosongkan dulu.
> Mode demo tidak butuh API key.

---

## 🧪 Test Build Lokal (Opsional tapi Disarankan)

```bash
# Build project untuk cek ada error atau tidak
npm run build
```

Kalau build berhasil → lanjut deploy ke Vercel.
Kalau ada error → lihat pesan error dan hubungi developer.

---

## 🌐 Deploy ke Vercel

### Login ke Vercel
```bash
vercel login
```
Pilih metode login:
- **Email** → masukkan email → cek kotak masuk untuk konfirmasi
- **GitHub** → lebih mudah kalau punya akun GitHub

### Deploy!
```bash
# Deploy dari folder project
vercel --prod
```

Ikuti pertanyaan yang muncul:
```
? Set up and deploy "~/indodax-bot-fixed"? → Y (Enter)
? Which scope? → pilih akunmu (Enter)
? Link to existing project? → N (Enter)
? What's your project's name? → indodax-bot (Enter)
? In which directory is your code located? → ./ (Enter)
? Want to modify settings? → N (Enter)
```

Tunggu beberapa menit sampai muncul:
```
✅ Production: https://indodax-bot-xxxx.vercel.app
```

**Catat URL ini** — itulah alamat app kamu!

---

## 🔐 Set Environment Variables di Vercel Dashboard

Setelah deploy, buka browser HP:
1. Buka https://vercel.com/dashboard
2. Klik project **indodax-bot**
3. Klik tab **Settings**
4. Klik **Environment Variables**
5. Tambahkan satu per satu:

| Key | Value |
|-----|-------|
| `INDODAX_API_KEY` | API Key dari Indodax |
| `INDODAX_SECRET_KEY` | Secret Key dari Indodax |
| `DEMO_BALANCE` | `10000000` |
| `MAX_POSITIONS` | `2` |
| `STOP_LOSS_PERCENT` | `1` |
| `TAKE_PROFIT_PERCENT` | `2` |

6. Setelah semua diisi, klik **Redeploy** agar env vars aktif:
   - Klik tab **Deployments**
   - Klik titik tiga (...) di deployment teratas
   - Klik **Redeploy**

---

## 🔄 Update Project (Kalau Ada Perubahan File)

```bash
cd ~/indodax-bot-fixed

# Deploy ulang
vercel --prod
```

---

## ❓ Troubleshooting Umum

### Error: `npm install` gagal / memory error
```bash
# Tambah swap memory dulu
npm install --max-old-space-size=512
```

### Error: `node: version too old`
```bash
pkg install nodejs-lts
```

### Error saat `vercel login`: tidak bisa buka browser
```bash
# Gunakan login dengan token
# 1. Buka vercel.com di browser HP
# 2. Settings → Tokens → Create token
# 3. Jalankan:
VERCEL_TOKEN=token_kamu vercel --prod --token token_kamu
```

### Error build: `Module not found`
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install --legacy-peer-deps
npm run build
```

### App terbuka tapi data tidak muncul
- Pastikan Environment Variables sudah di-set di Vercel dashboard
- Klik Redeploy setelah menambah env vars

---

## 📱 Tips Termux di HP

- Gunakan keyboard eksternal atau aktifkan **Extra Keys** di Termux:
  Settings → Extra keys rows
- Swipe dari kiri untuk buka sesi baru
- Pakai `Ctrl+C` untuk stop proses yang berjalan

---

## ✅ Checklist Deploy

- [ ] Termux terinstall dari F-Droid
- [ ] Node.js v18+ terinstall
- [ ] Vercel CLI terinstall
- [ ] Project ter-ekstrak/clone
- [ ] `npm install` berhasil
- [ ] `npm run build` berhasil (opsional tapi disarankan)
- [ ] `vercel login` berhasil
- [ ] `vercel --prod` berhasil
- [ ] Environment variables di-set di Vercel dashboard
- [ ] Redeploy setelah set env vars
- [ ] App bisa dibuka di browser ✨

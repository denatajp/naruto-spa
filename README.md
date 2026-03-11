# 🍃 Shinobi Intelligence Dashboard (Dattebayo API)

Sebuah aplikasi dashboard bertema Naruto yang interaktif untuk memantau data karakter, klan, desa, hingga status Bijuu secara real-time. Dibangun dengan **React**, **Vite**, dan state management **Zustand**.



## 👁️ Fitur Unggulan (Dōjutsu)

* **Three Eye Modes**: Pengalaman UI yang adaptif dengan 3 mode (Normal, Sharingan, dan Rinnegan) menggunakan React Context.
* **Centralized State**: Menggunakan **Zustand** untuk manajemen data global yang efisien dan meminimalisir fetch API berulang.
* **Geopolitical Analysis**: Visualisasi populasi desa-desa besar (Konoha, Suna, dll).
* **Bijuu Monitoring**: Pemantauan status Jinchūriki dan Chakra Signature para Tailed Beasts.
* **Bingo Book**: Daftar anggota Akatsuki yang terintegrasi dengan data kriminal tingkat tinggi.
* **Modern UI/UX**: Dibangun dengan Tailwind CSS, Framer Motion (opsional), dan efek backdrop blur yang elegan.

## 🛠️ Tech Stack

* **Framework**: [React.js](https://reactjs.org/) (Vite)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Routing**: [React Router DOM v6](https://reactrouter.com/)
* **API Source**: [Dattebayo API](https://api-dattebayo.vercel.app/)

## 🚀 Cara Menjalankan Project

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/denatajp/naruto-spa.git
   cd naruto-spa
   ```

2. **Install Dependencies**
   Gunakan npm atau yarn untuk menginstall semua library yang dibutuhkan:
   ```bash
   npm install
   ```

3. Jalankan Aplikasi (Development)
   ```bash
   npm run dev
   ```

## Struktur Project
```
src/
├── assets/         # Asset statis (Logo, Gambar)
├── components/     # Komponen UI modular (Reusable)
├── context/        # EyeContext (Logika Theme Switcher)
├── store/          # Zustand store (Global State & API Fetching)
├── pages/          # Halaman utama (Dashboard, Akatsuki, Bijuu, dll)
├── App.jsx         # Entry point & Routing
└── index.css       # Tailwind directives & Custom font
```

## ⛩️ Arsitektur Data (Endpoints)

Aplikasi ini mengintegrasikan seluruh sumber data (8 endpoint) dari **Dattebayo API** untuk memberikan wawasan menyeluruh tentang dunia Shinobi:

1. **👤 Characters (`/characters`)**
   Pusat data profil Shinobi, termasuk kemampuan, klasifikasi rank, dan riwayat hidup.
   
2. **🏮 Clans (`/clans`)**
   Informasi silsilah klan besar maupun kecil beserta daftar anggota keluarga yang teridentifikasi.

3. **🏘️ Villages (`/villages`)**
   Statistik populasi dan administrasi dari lima desa besar (Gokage) maupun desa-desa kecil lainnya.

4. **🧬 Kekkei Genkai (`/kekkei-genkai`)**
   Arsip teknik pembatas darah atau kemampuan genetik khusus yang tidak bisa ditiru oleh ninja biasa.

5. **👹 Tailed Beasts (`/tailed-beasts`)**
   Pemantauan entitas chakra raksasa (Bijuu), jumlah ekor, status segel, dan identitas Jinchūriki mereka.

6. **☁️ Akatsuki (`/akatsuki`)**
   Data kriminal tingkat S yang tergabung dalam organisasi Akatsuki, lengkap dengan status operasional mereka.

7. **🛡️ Teams (`/teams`)**
   Informasi formasi unit tempur (seperti Team 7, Ino-Shika-Cho) dan struktur kepemimpinan di bawah bimbingan Jōnin.

8. **🐚 Kara (`/kara`)**
   Data organisasi misterius yang muncul di era Boruto, termasuk anggota inti (Inners) dan eksternal (Outers).

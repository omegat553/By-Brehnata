# 🎂 Birthday Surprise Website Template

Template website ulang tahun dengan nuansa pastel, animasi, dan alur kejutan.

## Struktur

```text
birthday-surprise-template/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── foto1.jpg
    │   ├── foto2.jpg
    │   ├── foto3.jpg
    │   ├── foto4.jpg
    │   ├── foto5.jpg
    │   └── foto6.jpg
    └── music/
        └── music.mp3
```

## Cara mengisi konten

### 1. Nama dan teks
Buka `index.html`, lalu cari teks:

- `[NAMA]`
- `[NAMAMU]`
- `[TANGGAL / TAHUN]`
- `[TULIS PESAN PANJANG KAMU DI SINI]`

Ganti dengan isi kamu sendiri.

### 2. Foto
Masukkan enam foto ke:

`assets/images/`

dan beri nama:

- `foto1.jpg`
- `foto2.jpg`
- `foto3.jpg`
- `foto4.jpg`
- `foto5.jpg`
- `foto6.jpg`

Format JPG/PNG bisa digunakan, tetapi nama file di HTML harus disesuaikan jika ekstensi berbeda.

### 3. Musik
Masukkan lagu kamu ke:

`assets/music/music.mp3`

Kalau nama file berbeda, ubah bagian `<source>` di `index.html`.

> Catatan: browser biasanya memblokir autoplay audio sebelum ada interaksi pengguna. Template ini mulai mencoba memutar musik setelah kue/lilin diklik.

## Cara menjalankan

Paling mudah:

1. Buka folder ini di VS Code.
2. Install extension **Live Server** jika belum ada.
3. Klik kanan `index.html`.
4. Pilih **Open with Live Server**.

Atau buka `index.html` langsung di browser.

## Deploy ke Netlify

Folder project ini sudah berupa static website.

Kamu bisa upload folder project ke layanan hosting static seperti Netlify. Tidak membutuhkan Node.js, database, atau backend.

## Bagian yang tersedia

1. Opening dengan kue + lilin.
2. Klik kue → lilin mati + asap.
3. Section Happy Birthday.
4. Memory Wall 6 foto.
5. Modal cerita setiap foto.
6. Timeline.
7. Pesan pribadi.
8. Tombol "DO NOT CLICK!".
9. Surprise popup.
10. Final birthday section.
11. Tombol replay.
12. Responsive untuk HP dan desktop.

## Catatan

Template ini dibuat sebagai inspirasi dengan struktur/interaksi birthday-surprise yang serupa. Konten, foto, musik, nama, dan cerita sengaja dibuat placeholder supaya kamu bisa mengisinya sendiri.

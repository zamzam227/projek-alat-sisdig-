# RoboMop — Website Robot Pengepel Otomatis

Website statis interaktif untuk dokumentasi proyek Robot Pengepel Lantai Otomatis berbasis Arduino Uno.

## Cara menjalankan di VS Code
1. Ekstrak file ZIP.
2. Buka folder `robot-pengepel-website` di Visual Studio Code.
3. Jalankan `index.html` dengan ekstensi **Live Server** (klik kanan `index.html` → Open with Live Server).
4. Alternatif: buka `index.html` langsung di browser modern.

Tidak membutuhkan instalasi npm, framework, database, atau build tools.

## Struktur folder
- `index.html` — struktur dan seluruh konten website.
- `style.css` — desain responsif dan animasi.
- `script.js` — navigasi, simulasi, filter komponen, checklist, dan modal poster.
- `assets/robot-dari-poster.jpg` — crop ilustrasi robot dari poster yang diberikan.
- `assets/poster-ilmiah-robot-pengepel.png` — poster ilmiah asli yang diberikan.

## Catatan isi
Konten teknis dirangkum dari Modul Proyek Robot Pengepel Lantai Otomatis Berbasis Arduino Uno (2026). Estimasi RAB Rp430.000, ambang obstacle awal 20 cm, waktu pompa ON/OFF 300/700 ms, mundur 500 ms, dan belok kanan 700 ms mengikuti modul. Harga merupakan estimasi.

## Keselamatan
Jauhkan air dari Arduino, L298N, relay, konektor, dan baterai. Motor serta pompa harus memakai sumber daya yang sesuai; jangan membebani pin 5V Arduino secara langsung. Matikan sistem sebelum mengubah wiring.

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Thai', 'sans-serif'] //การใส่ฟอรต์จะเป็นการตั้งค่าฟอนต์หลักและฟอนต์สำรองในกรณีที่เราต้องการจะใช้ฟอนต์ที่ภาษาไทยกะภาษาอังกฤษคนละฟอนต์ก็เลือกฟอนต์ภาษาไทยอย่าให้เจอฟอนต์ภาษาอังกฤษ ฟอนต์ภาษาอังกฤษอย่าให้เจอภาษาไทย
      },
    },
  },
  plugins: [],
}

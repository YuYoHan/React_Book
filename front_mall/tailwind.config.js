/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 디렉토리 내 모든 JSX, TSX 파일들
    "./public/index.html",         // public 디렉토리의 index.html 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

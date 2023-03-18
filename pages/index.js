import Footer from "../components/Footer";
import Header from "../components/Header";
import SwapComponent from "../components/SwapComponent";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
      <Header />
      <SwapComponent />
      {/* <Footer /> */}
    </div>
  );
}

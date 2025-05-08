import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AskAIButton from "../components/chatbot/AskAIButton";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <AskAIButton />
      <Footer />
    </>
  );
}
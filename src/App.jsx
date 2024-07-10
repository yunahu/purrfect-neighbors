import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import Router from "src/Router/Router";

const App = () => {
  return (
    <div>
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
};

export default App;

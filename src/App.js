import HorizontalScroll from "./components/HorizontalScroll";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  return (
    <>
      <HorizontalScroll />
    </>
  );
}

export default App;
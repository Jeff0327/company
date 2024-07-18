import Footer from "../components/Footer";
import Header from "../components/Header";

interface Children {
  children: JSX.Element;
}

function layout({ children }: Children) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default layout;

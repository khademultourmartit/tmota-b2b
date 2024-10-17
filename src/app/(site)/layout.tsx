import Footer from "./_components/Footer";
import Header from "./_components/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;

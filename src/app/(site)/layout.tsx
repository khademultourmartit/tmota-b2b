import { Box } from "@mui/material";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default SiteLayout;

import { Box, Button } from "@mui/material";
import LoginPage from "../(auth)/login/_components/Login";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-3">
      <Box>Home Page</Box>

      <Link href="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
    </main>
  );
}

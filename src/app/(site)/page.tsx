import { Button } from "@mui/material";
import LoginPage from "../(auth)/login/_components/Login";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-3">
      <div>Home Page</div>

      <Link href="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
    </main>
  );
}

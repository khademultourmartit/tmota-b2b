import { Button } from "@mui/material";
import styles from "../../../app/page.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
<Link href='/login'>
<Button variant="contained">
        Login
        </Button>
        </Link>
      </main>
    </div>
  );
}

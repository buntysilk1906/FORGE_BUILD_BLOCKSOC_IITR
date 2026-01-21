import Navbar from "../components/Navbar";
import { WalletProvider } from "../components/WalletContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <WalletProvider>
          <Navbar />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import "@fontsource/caveat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Little Birthday Surprise ❤️",
  description: "",
};

export default function RootLayout({
children,
}:{
children:React.ReactNode;
}){

return(

<html lang="en">

<body>

{children}

</body>

</html>

);

}

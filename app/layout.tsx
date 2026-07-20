import "./globals.css";
import "@fontsource/caveat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Little Birthday Surprise ❤️",
  description: "A small corner of the universe, made just to make you smile.",
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

import "./globals.css";
import { Poppins } from "next/font/google";
import "@fontsource/caveat";

const poppins = Poppins({
subsets:["latin"],
weight:["300","400","500","600","700","800"]
});

export default function RootLayout({
children,
}:{
children:React.ReactNode;
}){

return(

<html>

<body className={poppins.className}>

{children}

</body>

</html>

);

}
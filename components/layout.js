import Navbar from './navbar'
import Footer from './footer'
import Box from "@mui/material/Box";

export default function Layout({ children }) {
    return (
        <>
            <Box sx={{ display: 'flex',
                flexDirection: 'row', }}>
                <Box>
                    <Navbar />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <main >{children}</main>
                    <Footer />
                </Box>
            </Box>

        </>
    )
}

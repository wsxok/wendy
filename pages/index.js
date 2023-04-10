import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Layout from "../components/layout";

export default function Page() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page1
        </Link>

        <Link href="/login" color="secondary">
          Go to the login page2
        </Link>
        <Link href="/home" color="secondary">
          Go to the home page3
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
Page.getLayout = function getLayout(page) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}

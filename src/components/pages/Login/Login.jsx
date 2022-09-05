import React from "react";
import { Grid, useMediaQuery, TextField, Button, Box } from "@mui/material";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";

export function Login() {
  const { setIsSignedIn } = useAuthenticationContext();
  const windowSizeAboveMd = useMediaQuery("(min-width: 900px)");
  return (
    <Grid container direction="row">
      {windowSizeAboveMd && (
        <Grid
          item
          md={6}
          lg={6}
          sx={{ height: "100vh", backgroundColor: "green" }}
        />
      )}

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "blue",
          }}
        >
          <TextField />
          <TextField />
          <Button onClick={() => setIsSignedIn(true)}>Login</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

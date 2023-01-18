import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        color="secondary"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      />
    </Box>
  );
};

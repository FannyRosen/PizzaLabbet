import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
      }}
    >
      <CircularProgress
        color="secondary"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      />
    </Box>
  );
};

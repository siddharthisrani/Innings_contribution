/* eslint-disable react/prop-types */

import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";

const CustomRunsModal = ({ open, setOpen }) => {
  const handleCustomRuns = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only("xs")]: {
            top: "unset",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: "none",
            maxWidth: "unset",
          },
        })}>
        <Typography level="h4" color="warning">
          Enter Custom Runs
        </Typography>
        <Divider />
        <Input
          name="customRuns"
          placeholder="5, 7 ,8 ..."
          sx={{ my: 2, mx: 1 }}></Input>
        <Box
          sx={{
            mt: 1,
            mx: 1,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}>
          <Button
            variant="solid"
            color="success"
            sx={{ flexGrow: 1 }}
            onClick={() => handleCustomRuns()}>
            Add Runs
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default CustomRunsModal;

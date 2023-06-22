import { Search } from "@mui/icons-material";
import { Box, FormControl, Modal, TextField } from "@mui/material";
import React from "react";

const SearchModal = ({ open, handleClose, children }) => {
  return (
    <div>
      {children}
      <Modal
        sx={{ position: "relative" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "2px",
              border: "1px solid gray",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
          >
            <Search sx={{ mr: "7px" }} />
            <TextField
              variant="standard"
              placeholder="Search..."
              sx={{ input: { color: "white" } }}
              InputProps={{
                disableUnderline: true,
              }}
            ></TextField>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchModal;

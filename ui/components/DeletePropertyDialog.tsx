"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "@/lib/axios.instance";
import { useMutation } from "@tanstack/react-query";
import { IError } from "@/interface/error.interface";
import { IResponse } from "@/interface/response.interface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LinearProgress } from "@mui/material";
interface Props {
  propertyId: string;
}

const DeleteProperty = (props: Props) => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-property"],
    mutationFn: async () => {
      return await axiosInstance.delete(
        `/properties/delete/${props.propertyId}`
      );
    },
    onSuccess: (res: IResponse) => {
      toast.success(res.data.message);
      router.push("/landlord/view-property");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        fullWidth
        variant="contained"
        color="error"
        style={{ backgroundColor: "#6c2d2d", color: "#fff" }}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isPending && <LinearProgress color="error" />}

        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this property?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Property once deleted cannot be restored.This process is
            <span className="font-semibold"> irreversible </span>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="success">
            No
          </Button>
          <Button
            onClick={() => {
              mutate();
              handleClose();
            }}
            autoFocus
            variant="contained"
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default DeleteProperty;

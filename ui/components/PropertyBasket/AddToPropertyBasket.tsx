import { Button } from "@mui/material";
import React from "react";
import HouseIcon from "@mui/icons-material/House";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { IError } from "@/interface/error.interface";
import { IResponse } from "@/interface/response.interface";
import { useRouter } from "next/navigation";
interface Props {
  propertyId: string;
}
const AddToPropertyBasket = (props: Props) => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-to-property-basket"],
    mutationFn: async (values: { productId: string }) => {
      return await axiosInstance.post("cart/property/add", values);
    },
    onSuccess: (res: IResponse) => {
      toast.success(res.data.message);
      router.push("/tenant/property-basket");
      //   queryClient.invalidateQueries({ queryKey: ["get-cart-items-count"] });
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
      router.replace("/tenant/property-basket");
    },
  });
  if (isPending) {
    return (
      <Button
        variant="contained"
        color="secondary"
        disabled
        startIcon={<HouseIcon />}
      >
        Adding...
      </Button>
    );
  }
  return (
    <div>
      <Button
        onClick={() => {
          mutate({ propertyId: props.propertyId });
        }}
        variant="contained"
        startIcon={<HouseIcon />}
        sx={{
          backgroundColor: "#6c2d2d",
          "&:hover": {
            backgroundColor: "#7a3b3b",
          },
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
        }}
      >
        Add to Property Basket
      </Button>
    </div>
  );
};

export default AddToPropertyBasket;

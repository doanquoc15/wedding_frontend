"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// eslint-disable-next-line import/order
import { useForm } from "react-hook-form";

// import/no-unresolved
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import TextInputField from "@/components/common/TextInputField";
import Error from "@/components/common/Error";
import ButtonBtn from "@/components/common/Button";
import LoadingButton from "@/components/common/Loading";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import { MESSAGE_SUCCESS } from "@/constants/errors";
import { UploadImage } from "@/services/upload";
import { serviceSchema } from "@/libs/validation/serviceSchema";
import {
  createService,
  getServiceById,
  updateService,
} from "@/services/service";
import { PATH } from "@/constants/common";

const Detail_New_Dish = ({ params }) => {
  //useForm
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      serviceName: "",
      capacity: 1,
      price: 0,
    },
    mode: "all",
  });

  //useState
  const [imageChange, setImageChange] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();
  //function
  //onSubmit
  const onSubmit = async (data: any) => {
    const creatData = {
      serviceName: data.serviceName,
      price: data.price,
      capacity: data.capacity,
      image: imageChange,
    };
    try {
      if (params?.slug === "new") {
        await createService(creatData);
        dispatch(
          statusApiReducer.actions.setMessageUpdate(
            MESSAGE_SUCCESS.CREATE_SERVICE_SUCCESS
          )
        );
      } else {
        await updateService(+params?.slug, creatData);
        dispatch(
          statusApiReducer.actions.setMessageUpdate(
            MESSAGE_SUCCESS.UPDATED_SUCCESS
          )
        );
      }
      router.push(PATH.MANAGEMENT_SERVICE);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFile = async (e: any) => {
    try {
      const imageUpload = await UploadImage(e.target.files[0]);
      setImageChange(imageUpload);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const fetchServiceById = async () => {
    setIsLoading(true);
    try {
      const res = await getServiceById(+params?.slug);
      reset({
        serviceName: res?.serviceName,
        capacity: res?.capacity,
        price: res?.price,
      });
      setImageChange(res?.image);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setIsLoading(false);
    }
  };
  //useEffect
  useEffect(() => {
    if (params?.slug !== "new" && typeof +params?.slug === "number") {
      fetchServiceById();
    }
    return;
  }, [params?.slug]);

  return (
    <div>
      <form className="flex gap-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="min-w-[250px] min-h-[300px] overflow-hidden object-cover">
          {imageChange && (
            <Image
              src={imageChange}
              alt="avatar"
              width={250}
              height={300}
              objectFit="cover"
              className="border-[1px] rounded-[5px] border-[--clr-blue-300]"
              priority={true}
            />
          )}
          <label
            htmlFor="file"
            className="flex justify-center gap-5 items-center"
          >
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleChangeFile(e)}
            />
            <FileUploadIcon
              style={{ fontSize: "40px", cursor: "pointer", color: "red" }}
            />{" "}
            <span>Chọn ảnh</span>
          </label>
        </div>
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-10 justify-center w-full">
            <div className="w-full">
              <label className="text-[#333] font-semibold">Tên dịch vụ</label>
              <div className="w-[400px]">
                <TextInputField
                  name="serviceName"
                  label=""
                  control={control}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  error={!!errors?.serviceName}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.serviceName && (
                      <Error message={errors?.serviceName?.message as string} />
                    )
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-[#333] font-semibold">Phí dịch vụ</label>
              <div className="w-[400px]">
                <TextInputField
                  name="price"
                  label=""
                  control={control}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  error={!!errors?.price}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.price && (
                      <Error message={errors?.price?.message as string} />
                    )
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-[#333] font-semibold">Sức chứa</label>
              <div className="w-[400px]">
                <TextInputField
                  name="capacity"
                  label=""
                  control={control}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  error={!!errors?.capacity}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.capacity && (
                      <Error message={errors?.capacity?.message as string} />
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <ButtonBtn
              startIcon={isLoading && <LoadingButton />}
              type="submit"
              width={150}
            >
              {params?.slug === "new" ? "Tạo mới" : "Cập nhật"}
            </ButtonBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Detail_New_Dish;

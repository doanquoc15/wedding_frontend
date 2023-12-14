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
import { createDishSchema } from "@/libs/validation/createDishSchema";
import { getAllTypeDish } from "@/services/type-dish";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { MESSAGE_SUCCESS } from "@/constants/errors";
import { UploadImage } from "@/services/upload";
import { createDish, getDishById, updateDish } from "@/services/menu-item";

const Detail_New_Dish = ({ params }) => {
  //useForm
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(createDishSchema),
    defaultValues: {
      dishName: "",
      description: "",
      price: 0,
      image: "",
      typeId: "",
    },
    mode: "all",
  });

  //useState
  const [imageChange, setImageChange] = useState(null);
  const [typeDishes, setTypeDishes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //const
  const dispatch = useAppDispatch();
  const router = useRouter()
  ;

  //function

  //onSubmit
  const onSubmit = async (data: any) => {
    const creatData = {
      dishName: data.dishName,
      description: data.description,
      price: data.price,
      typeId: +data.typeId,
      image: imageChange
    };
    try {
      if (params?.slug === "new") {
        await createDish(creatData);
        dispatch(statusApiReducer.actions.setMessageUpdate(MESSAGE_SUCCESS.CREATE_DISH_SUCCESS));
      } else {
        await updateDish(params?.slug, creatData);
        dispatch(statusApiReducer.actions.setMessageUpdate(MESSAGE_SUCCESS.UPDATED_SUCCESS));
      }
      router.push("/admin/dishes");
    } catch
    (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setIsLoading(false);
    }
  };

  //get all type dish
  const fetchTypeDishes = async () => {
    try {
      const { data, total } = await getAllTypeDish({ pageSize: 1000 });
      setTypeDishes(data?.map(item => ({
        id: item?.id,
        value: item?.id,
        label: item?.typeName,
      })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
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

  const fetchDishById = async () => {
    setIsLoading(true);
    try {
      const res = await getDishById(+params?.slug);
      reset(
        {
          dishName: res?.dishName,
          description: res?.description,
          price: res?.price,
          typeId: res?.typeId,
        }
      );
      setImageChange(res?.image);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setIsLoading(false);
    }
  };
  //useEffect

  useEffect(() => {
    fetchTypeDishes();
  }, []);

  useEffect(() => {
    console.log(+params?.slug);
    if (params?.slug !== "new" && typeof +params?.slug === "number") {
      fetchDishById();
    }
    return;
  }, [params?.slug]);

  return (
    <div>
      <form className="flex gap-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="min-w-[250px] min-h-[300px] overflow-hidden object-cover">
          {imageChange && <Image
            src={imageChange}
            alt="avatar"
            width={250}
            height={300}
            objectFit="cover"
            className="border-[1px] rounded-[5px] border-[--clr-blue-300]"
            priority={true}
          />}
          <label htmlFor="file" className="flex justify-center gap-5 items-center">
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleChangeFile(e)}
            />
            <FileUploadIcon style={{ fontSize: "40px", cursor: "pointer", color: "red" }}/> <span>Chọn ảnh</span>
          </label>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Tên món ăn</label>
                <div className="w-[400px]">
                  <TextInputField
                    name="dishName"
                    label=""
                    control={control}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    error={!!errors?.dishName}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.dishName && (
                        <Error message={errors?.dishName?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Giá tiền</label>
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
                        <Error message={errors?.price?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Loại món ăn</label>
                <SelectField
                  name="typeId"
                  label=""
                  labelDisplay=""
                  control={control}
                  options={typeDishes}
                  className="h-[52px] w-[400px]"
                  inputProps={{
                    className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                    maxLength: 400,
                  }}
                />
              </div>
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Mô tả</label>
                <div className="w-[400px]">
                  <TextAreaField
                    error={!!errors.typeId}
                    name="description"
                    label=""
                    placeholder="Nhập mô tả cho món ăn ..."
                    defaultValue=""
                    control={control}
                    className="w-full"
                    rows={5}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <ButtonBtn startIcon={isLoading && <LoadingButton/>} type="submit"
              width={150}>{params?.slug === "new" ? "Tạo mới" : "Cập nhật"}</ButtonBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Detail_New_Dish;
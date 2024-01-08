"use client";
import React, { useEffect, useState } from "react";
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
import { createType, getTypeById, updateType, } from "@/services/type-dish";
import { PATH } from "@/constants/common";
import TextAreaField from "@/components/common/TextAreaField";
import { schemaType } from "@/libs/validation/type_dish";

const Detail_New_Service = ({ params }) => {
  //useForm
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schemaType),
    defaultValues: {
      typeName: "",
      description: "",
    },
    mode: "all",
  });

  //useState
  const [isLoading, setIsLoading] = useState(false);

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();
  //function
  //onSubmit
  const onSubmit = async (data: any) => {
    const creatData = {
      typeName: data.typeName,
      description: data.description,
    };
    try {
      if (params?.slug === "new") {
        await createType(creatData);
        dispatch(
          statusApiReducer.actions.setMessageUpdate(
            MESSAGE_SUCCESS.CREATE_TYPE_SUCCESS
          )
        );
      } else {
        await updateType(+params?.slug, creatData);
        dispatch(
          statusApiReducer.actions.setMessageUpdate(
            MESSAGE_SUCCESS.UPDATED_SUCCESS
          )
        );
      }
      router.push(PATH.MANAGEMENT_TYPE);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTypeById = async () => {
    setIsLoading(true);
    try {
      const res = await getTypeById(+params?.slug);
      reset({
        typeName: res?.typeName,
        description: res?.description,
      });
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    } finally {
      setIsLoading(false);
    }
  };
  //useEffect
  useEffect(() => {
    if (params?.slug !== "new" && typeof +params?.slug === "number") {
      fetchTypeById();
    }
    return;
  }, [params?.slug]);

  return (
    <div>
      <form className="flex gap-10 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="flex flex-col gap-10 justify-center items-center w-full">
            <div className="w-fit">
              <label className="text-[#333] font-semibold">Tên loại món ăn</label>
              <div className="w-[400px]">
                <TextInputField
                  name="typeName"
                  label=""
                  control={control}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  error={!!errors?.typeName}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.typeName && (
                      <Error message={errors?.typeName?.message as string}/>
                    )
                  }
                />
              </div>
            </div>
            <div className="w-fit">
              <label className="text-[#333] font-semibold">Mô tả loại món ăn</label>
              <div className="w-[400px]">
                <TextAreaField
                  error={!!errors.description}
                  name="description"
                  label=""
                  placeholder="Nhập mô tả cho loại món ăn ..."
                  defaultValue=""
                  control={control}
                  className="w-full"
                  rows={5}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <ButtonBtn
              startIcon={isLoading && <LoadingButton/>}
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

export default Detail_New_Service;

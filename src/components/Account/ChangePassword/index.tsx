import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextInputField from "@/components/common/TextInputField";
import Error from "@/components/common/Error";
import { changePassSchema } from "@/libs/validation/changePassSchema";
import LoadingButton from "@/components/common/Loading";
import ButtonBtn from "@/components/common/Button";
import { changePassword } from "@/services/user";
import { LocalStorage } from "@/shared/config/localStorage";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";

const ChangePassword = () => {
  //const
  const dispatch = useAppDispatch();

  //useForm
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,

  } = useForm({
    resolver: yupResolver(changePassSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });
  //functions
  const onSubmit = async (values: any) => {
    const params = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      const id = JSON.parse(LocalStorage.get("user") || "{}")?.id;
      const data = await changePassword(id, params);
      dispatch(statusApiReducer.actions.setMessageUpdate("Đổi mật khẩu thành công"));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex justify-center items-center flex-col gap-8">
          <div className="flex gap-1 flex-col">
            <label className="text-[#333] font-semibold">Mật khẩu cũ</label>
            <div className="w-[400px]">
              <TextInputField
                name="oldPassword"
                label=""
                control={control}
                inputProps={{
                  className: "border-0 h-full p-0 px-3",
                  maxLength: 256,
                }}
                error={!!errors?.oldPassword}
                className="w-full max-h-[40px] input-custom"
                helperText={
                  errors?.oldPassword && (
                    <Error message={errors?.oldPassword?.message as string}/>
                  )
                }
              />
            </div>
          </div>
          <div className="flex gap-1 flex-col">
            <label className="text-[#333] font-semibold">Mật khẩu mới</label>
            <div className="w-[400px]">
              <TextInputField
                name="newPassword"
                label=""
                control={control}
                inputProps={{
                  className: "border-0 h-full p-0 px-3",
                  maxLength: 256,
                }}
                error={!!errors?.newPassword}
                className="w-full max-h-[40px] input-custom"
                helperText={
                  errors?.newPassword && (
                    <Error message={errors?.newPassword?.message as string}/>
                  )
                }
              />
            </div>
          </div>
          <div className="flex gap-1 flex-col">
            <label className="text-[#333] font-semibold">Xác nhận mật khẩu mới</label>
            <div className="w-[400px]">
              <TextInputField
                name="confirmPassword"
                label=""
                control={control}
                inputProps={{
                  className: "border-0 h-full p-0 px-3",
                  maxLength: 256,
                }}
                error={!!errors?.confirmPassword}
                className="w-full max-h-[40px] input-custom"
                helperText={
                  errors?.confirmPassword && (
                    <Error message={errors?.confirmPassword?.message as string}/>
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <ButtonBtn type="submit" width={400}
            startIcon={isSubmitting && <LoadingButton/>}>Hoàn tất</ButtonBtn>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
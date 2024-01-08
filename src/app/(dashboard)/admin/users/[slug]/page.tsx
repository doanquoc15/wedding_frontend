"use client";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
// import/no-unresolved
import dayjs from "dayjs";
import moment from "moment";
import { useRouter } from "next/navigation";

import { UploadImage } from "@/services/upload";
import TextInputField from "@/components/common/TextInputField";
import Error from "@/components/common/Error";
import SelectField from "@/components/common/SelectField";
import { GENDER_OPTIONS, PATH, SHORT_DATE } from "@/constants/common";
import { callAPIAddress, getAllProvince } from "@/services/addressApi";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import stylesCommon from "@/constants/style";
import DatePickerField from "@/components/common/DatePickerField";
import ButtonBtn from "@/components/common/Button";
import { createUser, getMeRole, updateUser } from "@/services/user";
import { LocalStorage } from "@/shared/config/localStorage";
import { MESSAGE_SUCCESS } from "@/constants/errors";
import { usersReducer } from "@/stores/reducers/user";
import LoadingButton from "@/components/common/Loading";

const Detail_New_User = ({ params }) => {
  //useForm

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    // resolver: yupResolver(createdUserSchema),
    defaultValues: {
      dateOfBirth: undefined,
      name: "",
      email: "",
      phone: "",
      gender: "",
      province: "",
      district: "",
      ward: "",
    },
    mode: "all",
  });

  //useState
  const [myInfo, setMyInfo] = useState<any>({});
  const [imageChange, setImageChange] = useState<any>();
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>("");

  //const
  const dispatch = useAppDispatch();
  const router = useRouter();

  //Functions
  const handleChangeFile = async (e) => {
    try {
      const imageUpload = await UploadImage(e.target.files[0]);
      setImageChange(imageUpload);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const handleProvinceChange = async (provinceName, type = "p") => {
    const districtName = JSON.parse(LocalStorage.get("user") || "{}")?.address?.split(",")[1].trim();

    let code;
    if (typeof provinceName === "number") {
      code = provinceName;
    } else {
      code = provinces.filter(item => item?.value === provinceName)[0]?.code;
    }

    try {
      const res = await callAPIAddress(code, type);
      if (typeof provinceName === "number") {
        const districtCode = res?.districts?.filter(item => item?.name === districtName)[0]?.code;
        handleDistrictChange(districtCode, "d");
      }
      setDistricts(res?.districts?.map((district: any) => ({
        label: district.name,
        value: district.name,
        code: district.code
      })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const handleDistrictChange = async (districtName, type = "d") => {
    let code;
    if (typeof districtName === "number") {
      code = districtName;
    } else {
      code = districts.filter(item => item?.value === districtName)[0]?.code;
    }
    try {
      const res = await callAPIAddress(code, type);
      setWards(res?.wards?.map((ward: any) => ({ label: ward.name, value: ward.name, code: ward.code })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  //get all province
  const getAllProvinces = async () => {
    try {
      const res = await getAllProvince();
      setProvinces(res?.map((province: any) => ({
        label: province.name,
        value: province.name,
        code: province.code
      })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  //handle edit
  const handleEdit = (event) => {
    event.preventDefault();
  };

  //get user by id
  const fetchUserById = async () => {
    let code;
    try {
      const res = await getMeRole();
      LocalStorage.add("user", JSON.stringify(res));
      const pro = await getAllProvince();
      const address = res?.address?.split(",");
      if (address) {
        code = pro?.filter(item => item?.name === address[2]?.trim())[0]?.code;
      }
      code && handleProvinceChange(code, "p");

      if (params?.slug !== "new") {
        reset({
          name: res?.name,
          email: res?.email,
          dateOfBirth: res?.dateOfBirth && moment(res?.dateOfBirth).format(SHORT_DATE),
          phone: res?.phone,
          gender: res?.gender?.toUpperCase(),
          province: address && address[2]?.trim(),
          district: address && address[1]?.trim(),
          ward: address && address[0]?.trim() as string,
        });
        setImageChange(res?.image);
      } else {
        setImageChange("");
      }

      setMyInfo(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  //onSubmit
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const dataUpdate = {
      ...data,
      dateOfBirth: data?.dateOfBirth && dayjs(data?.dateOfBirth).format(SHORT_DATE),
      image: imageChange || myInfo?.image,
      address: `${data?.award}, ${data?.district}, ${data?.province}`,
    };
    if (!moment(dataUpdate.dateOfBirth).isValid()) {
      delete dataUpdate.dateOfBirth;
    }

    try {
      if (params?.slug === "new") {
        await createUser(dataUpdate);
        dispatch(statusApiReducer.actions.setMessageUpdate(MESSAGE_SUCCESS.CREATED_USER_SUCCESS));
      } else {
        await updateUser(params?.slug, dataUpdate);
        dispatch(statusApiReducer.actions.setMessageUpdate(MESSAGE_SUCCESS.UPDATED_SUCCESS));
      }
      await getAllProvince();
      setIsLoading(false);
      router.push(PATH.MANAGEMENT_USER);
      dispatch(usersReducer.actions.setStatus());
    } catch
    (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setIsLoading(false);
    }
  };

  //useEffect

  useEffect(() => {
    getAllProvinces(); //get all province
    fetchUserById(); //fetch user current

    //eslint-disable-next-line
  }, []);

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
            <FileUploadIcon style={{ fontSize: "40px", cursor: "pointer", color: "red" }}/>
          </label>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Họ tên</label>
                <div className="w-[326px]">
                  <TextInputField
                    name="name"
                    label=""
                    control={control}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    error={!!errors?.name}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.name && (
                        <Error message={errors?.name?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Giới tính</label>
                <SelectField
                  name="gender"
                  label=""
                  labelDisplay=""
                  control={control}
                  options={GENDER_OPTIONS}
                  className="h-[52px] w-[326px]"
                  inputProps={{
                    className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                    maxLength: 256,
                  }}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Số điện thoại</label>
                <div className="w-[326px]">
                  <TextInputField
                    name="phone"
                    label=""
                    control={control}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    error={!!errors?.phone}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.phone && (
                        <Error message={errors?.phone?.message as string}/>
                      )
                    }
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Ngày sinh</label>
                <div className="w-[326px]">
                  <DatePickerField
                    name="dateOfBirth"
                    label=""
                    openTo="day"
                    views={["year", "month", "day"]}
                    control={control}
                    inputFormat="DD/MM/YYYY"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: stylesCommon.inputHeight,
                        fontSize: stylesCommon.primarySize,
                        width: "326px",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        required={true}
                        {...params}
                        inputProps={{
                          className: "border-0 w-full cursor-pointer text-[13px]",
                          ...params.inputProps,
                          readOnly: true,
                        }}
                        sx={{
                          "& .MuiFormLabel-root": {
                            fontSize: stylesCommon.primarySize,
                            fontFamily: stylesCommon.fontFamily,
                          }, "& .MuiInputBase-input": {
                            fontSize: stylesCommon.primarySize,
                            fontFamily: stylesCommon.fontFamily,
                          },
                        }}
                        className="w-full flex-1"
                        error={!!errors.dateOfBirth}
                        helperText={errors?.dateOfBirth && errors?.dateOfBirth.message}
                      />
                    )}
                  />
                  <div>
                    {errors?.dateOfBirth && (
                      <Error message={errors?.dateOfBirth?.message as string}/>
                    )}
                  </div>
                </div>

              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Tỉnh/Thành phố</label>
                <SelectField
                  name="province"
                  label=""
                  labelDisplay=""
                  control={control}
                  options={provinces}
                  className="h-[52px] w-[326px]"
                  handleChange={handleProvinceChange}
                  inputProps={{
                    className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                    maxLength: 256,
                  }}
                />
              </div>
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Quận/Huyện</label>
                <SelectField
                  name="district"
                  label=""
                  labelDisplay=""
                  control={control}
                  options={districts}
                  handleChange={handleDistrictChange}
                  className="h-[52px] w-[326px]"
                  inputProps={{
                    className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                    maxLength: 256,
                  }}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Phường/Xã</label>
                <SelectField
                  name="ward"
                  label=""
                  labelDisplay=""
                  control={control}
                  options={wards}
                  className="h-[52px] w-[326px]"
                  inputProps={{
                    className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                    maxLength: 256,
                  }}
                />
              </div>
              <div className="w-1/2">
                <label className="text-[#333] font-semibold">Email</label>

                <div className="w-[326px]">
                  <TextInputField
                    name="email"
                    label=""
                    control={control}
                    inputProps={{
                      className: "border-0 h-full p-0 px-3",
                      maxLength: 256,
                    }}
                    error={!!errors?.email}
                    className="w-full max-h-[40px] input-custom"
                    helperText={
                      errors?.email && (
                        <Error message={errors?.email?.message as string}/>
                      )
                    }
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

export default Detail_New_User;
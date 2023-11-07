import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

import TextInputField from "@/components/common/TextInputField";
import Error from "@/components/common/Error";
import DatePickerField from "@/components/common/DatePickerField";
import { times } from "@/data";
import { tableSchema } from "@/libs/validation/tableSchema";
import stylesCommon from "@/constants/style";
import ButtonBtn from "@/components/common/Button";

import { CheckIcon } from "../Icons";

interface IDetailModalBookProps {
  handleClickCancel: () => void;
}

const DetailModalBook = (props: IDetailModalBookProps) => {
  const { handleClickCancel } = props;
  //useForm
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(tableSchema),
    defaultValues: {
      numberTable: 0,
      numberOfGuest: 0,
      date: undefined,
      fullName: "",
      email: "",
      phone: "",
      zone: "",
    },
    mode: "all",
  });

  //useState
  const [activeElements, setActiveElements] = useState<any>([]);

  //functions
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleClick = (elementId) => {
    if (activeElements.includes(elementId)) {
      // If the element is already active, remove it from the list
      setActiveElements(activeElements.filter((id) => id !== elementId));
    } else {
      // If the element is not active, add it to the list
      setActiveElements([...activeElements, elementId]);
    }
  };

  return (
    <div>
      <div className="min-w-[500px] h-auto p-6 relative">
        <div className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Họ và tên
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                <TextInputField
                  name="fullName"
                  label=""
                  control={control}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  error={!!errors?.fullName}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.fullName && (
                      <Error message={errors?.fullName?.message as string} />
                    )
                  }
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Email
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                <TextInputField
                  name="email"
                  label=""
                  control={control}
                  error={!!errors?.email}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.email && (
                      <Error message={errors?.email?.message as string} />
                    )
                  }
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Số điện thoại
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                <TextInputField
                  name="phone"
                  label=""
                  control={control}
                  error={!!errors?.phone}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.phone && (
                      <Error message={errors?.phone?.message as string} />
                    )
                  }
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Lượng khách
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                <TextInputField
                  name="numberOfGuest"
                  label=""
                  control={control}
                  error={!!errors?.numberOfGuest}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.numberOfGuest && (
                      <Error
                        message={errors?.numberOfGuest?.message as string}
                      />
                    )
                  }
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Số lượng bàn
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                <TextInputField
                  name="numberTable"
                  label=""
                  control={control}
                  error={!!errors?.numberTable}
                  inputProps={{
                    className: "border-0 h-full p-0 px-3",
                    maxLength: 256,
                  }}
                  className="w-full max-h-[40px] input-custom"
                  helperText={
                    errors?.numberTable && (
                      <Error message={errors?.numberTable?.message as string} />
                    )
                  }
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Chọn khu
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                {" "}
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="normal"
                    name="radio-buttons-group"
                    className="flex"
                    sx={{
                      "& .MuiTypography-root": {
                        color: "var(--clr-gray-500)",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="normal"
                      control={<Radio />}
                      label="Khu bình thường"
                    />
                    <FormControlLabel
                      value="vip"
                      control={<Radio />}
                      label="Khu vip"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Ngày đặt
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px]">
                <DatePickerField
                  name="date"
                  label=""
                  openTo="day"
                  views={["year", "month", "day"]}
                  control={control}
                  inputFormat="YYYY/MM/DD"
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
                        },
                      }}
                      className="w-full flex-1"
                      error={!!errors.date}
                      helperText={errors?.date && errors?.date.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center justify-between w-[150px] text-clr-gray-500 font-bold text-[13px]">
                Khung giờ
                <span className="text-[--clr-red-400] mr-5">*</span>
              </div>
              <div className="w-[326px] flex justify-between">
                {times?.map((item) => (
                  <p
                    key={item?.id}
                    className={`border-[1px] py-2 px-4 border-gray-200 text-[--clr-gray-500] cursor-pointer 
                           ${
                  activeElements.includes(item?.id)
                    ? "border-red-500"
                    : "border-gray-200"
                  }`}
                    onClick={() => handleClick(item?.id)}
                  >
                    {item?.time}
                  </p>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end mt-[-0.25rem]">
          <ButtonBtn
            bg="var(--clr-orange-400)"
            onClick={handleClickCancel}
            startIcon={<CheckIcon fill="white" />}
          >
            <span className="font-semibold">Thoát</span>
          </ButtonBtn>
        </div>
      </div>
    </div>
  );
};

export default DetailModalBook;

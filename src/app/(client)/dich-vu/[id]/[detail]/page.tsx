"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Tooltip, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getMenuComboById } from "@/services/combo";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { removeDuplicatesByField } from "@/utils/removeFieldObjDuplicate";
import ButtonBtn from "@/components/common/Button";
import { formatMoney } from "@/utils/formatMoney";
import CheckBox from "@/components/common/Checkbox";
import SearchInFilter from "@/components/common/SearchInFilter";
import { getAllDish } from "@/services/menu-item";
import { getQueryParam } from "@/utils/route";
import { LocalStorage } from "@/shared/config/localStorage";
import BookingPDF from "@/components/PDF/BookingPdf";
import ModalPopup from "@/components/common/ModalPopup";
import { CheckIcon } from "@/components/Icons";
import DetailModalBook from "@/components/DetailModalBook";
import LoadingButton from "@/components/common/Loading";
import TabComment from "@/components/TabComment/page";
import { getUserLocal } from "@/services/getUserLocal";

const DetailMenu = () => {
  //useState
  const [menuData, setMenuData] = useState<any>();
  const [dataCombo, setDataCombo] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<any>();
  const [search, setSearch] = useState<any>(getQueryParam("search"));
  const [checkedMenus, setCheckedMenus] = useState<any>([]);
  const [dishQuantities, setDishQuantities] = useState({});
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalChooseTable, setIsOpenModalChooseTable] =
    useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<number>();
  const [comboMenuId, setComboMenuId] = useState<number>();
  const [selectedItems, setSelectedItems] = useState<any>([]);

  //new
  const [menuConvert, setMenuConvert] = useState<any>([]);
  const [allDishConvert, setAllDishConvert] = useState<any>([]);
  const [allPrice, setAllPrice] = useState<any>(0);

  //const
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname?.split("-")[pathname?.split("-").length - 1];
  const breadCrumbs = localStorage.getItem("breadcrumb");

  //function
  const calculatorPrice = (data) => {
    const result = data.reduce((total1, current1) => {

      const result2 = current1.dishes.reduce((total2, current2) => {

        return total2 + current2.price * (dishQuantities[current2?.quantity] || current2.quantity);
      }, 0);
      return total1 + result2;
    }, 0);

    return result;
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleCloseModalChooseTable = () => {
    setIsOpenModalChooseTable(false);
  };

  const handleClickCancel = () => {
    setIsOpenModal(false);
  };
  const handleClickCancelChooseTable = () => {
    setIsOpenModalChooseTable(false);
  };

  const fetchMenuItemTypeDish = async () => {
    try {
      const { menus } = await getAllDish({ pageSize: 100, search });
      setMenuItems(menus);
      setAllDishConvert(menus?.map(item => ({
        menuItemId: item.id,
        quantity: 1,
        price: item.price,
        dishName: item.dishName,
        typeName: item.typeDish.typeName,
        description: item.description || "",
        image: item.image
      })));
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleExport = () => {
    setIsSubmitted(true);
    try {
      const capture: any = document.querySelector(".actual-receipt");
      html2canvas(capture, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const pdf = new jsPDF("p", "px", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);

        const pdfData = pdf.output("blob");
        const url = URL.createObjectURL(pdfData);
        window.open(url, "_blank");
      });
      setIsOpenModal(false);
      setIsSubmitted(false);
    } catch (error: any) {
      setIsSubmitted(false);
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchMenuCombo = async () => {
    try {
      const res = await getMenuComboById(
        Number(pathname?.split("-")[pathname?.split("-").length - 1])
      );
      setMenuConvert(res.comboItems.map(item => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.menuItem.price,
        dishName: item.menuItem.dishName,
        image: item.menuItem.image,
        typeName: item.menuItem.typeDish.typeName,
        description: item.menuItem.description || null
      }))
      );
      setServiceId(res?.serviceId);
      setComboMenuId(res?.id);
      setMenuData(
        res.comboItems?.map((item) => ({
          ...item?.menuItem,
          quantity: item?.quantity,
        }))
      );

      setCheckedMenus(
        res.comboItems?.map((item) => ({
          ...item?.menuItem,
          quantity: item?.quantity,
        }))
      );
      setDataCombo(res);
      const brCrumbs = breadCrumbs && JSON.parse(breadCrumbs);

      dispatch(
        breadCrumbReducer.actions.setBreadCrumbs({
          routes: [
            ...removeDuplicatesByField(
              [
                ...brCrumbs,
                {
                  href: "/",
                  name: "Chi tiết",
                },
              ],
              "name"
            ),
          ],
        })
      );
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleSearch = (keySearch: string) => {
    setSearch(keySearch);
  };

  const organizeDishesByType = (menuItems) => {
    const dishesByType = {};

    menuItems?.forEach((dish) => {
      const typeId = dish.typeDish.id;

      if (!dishesByType[typeId]) {
        dishesByType[typeId] = {
          typeName: dish.typeDish.typeName,
          dishes: [],
        };
      }

      const existingDish = dishesByType[typeId].dishes.find(
        (item) => item.id === dish.id
      );
      if (existingDish) {
        existingDish.quantity += dishQuantities[dish.id] || 1;
      } else {
        dishesByType[typeId].dishes.push({
          ...dish,
          quantity: dish?.quantity,
        });
      }
    });

    return Object.values(dishesByType);
  };

  function convertMenuByType(menuArray) {
    const menuByType = {};

    menuArray.forEach(item => {
      const type = item.typeName;

      if (!menuByType[type]) {
        menuByType[type] = [];
      }
      menuByType[type].push(item);
    });

    return menuByType;
  }

  const handleClickDish = (menu) => {

    if (menuConvert?.filter(item => item?.menuItemId === menu?.menuItemId).length > 0) {
      dispatch(statusApiReducer.actions.setMessageError("Món ăn đã tồn tại"));
      return;
    }

    setMenuConvert((prevMenus) => [...prevMenus, { ...menu, quantity: 1 }]);
  };

  // Function to handle increasing the quantity

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    menuConvert.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleIncrease = (menu) => {
    setMenuConvert((prevMenus) => prevMenus.map(item => ({
      ...item,
      quantity: item.menuItemId === menu.menuItemId ? item.quantity + 1 : item.quantity
    })));
  }
  ;

  // Function to handle decreasing the quantity
  const handleDecrease = (menu) => {
    setMenuConvert((prevMenus) => {
      const updatedMenus = prevMenus.map(item => {
        if (item.menuItemId === menu.menuItemId) {
          const updatedQuantity = item.quantity - 1;
          if (updatedQuantity === 0) {
            return null;
          } else {
            return { ...item, quantity: updatedQuantity };
          }
        }
        return item;
      });

      return updatedMenus.filter(item => item !== null);
    });
  };

  const handleJsonParse = (string: string) => {
    const data = LocalStorage.get(string);
    return JSON.parse(data as string);
  };

  const handleOpenModel = () => {
    if (getUserLocal()?.id) {
      setIsOpenModal(true);
    } else
      dispatch(statusApiReducer.actions.setMessageError("Bạn cần đăng nhập để xem trước bản PDF"));
  };

  const convertDataMenuBook = () => {
    return organizeDishesByType(
      handleJsonParse("menuComboCustomized") || menuData
    );
  };

  const totalPrices = () => {
    return calculatorPrice(
      convertDataMenuBook());
  };

  //handle click Checkbox
  const handleCheckboxClick = (item) => {
    const itemId = item.menuItemId;
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedId) => selectedId !== itemId)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
    }
  };

  const handleChooseTable = () => {
    if (getUserLocal()?.id) {
      setIsOpenModalChooseTable(true);

    } else {
      dispatch(statusApiReducer.actions.setMessageError("Bạn cần đăng nhập để đặt bàn"));
    }
  };

  const covertDataMenuItems = (menuConvert) => (
    menuConvert?.map(dish => ({
      menuItemId: dish.menuItemId,
      quantity: dish.quantity,
      totalPrice: dish.quantity * dish.price
    })));

  //handle delete dishes
  const handleDeleteDishes = () => {
    setMenuConvert(prev => prev.filter(item => !selectedItems.includes(item.menuItemId)));
    setSelectedItems([]);
  };
  const handleAdd = () => {
    if (getUserLocal()?.id) {
      setIsEdit(true);
    } else {
      dispatch(statusApiReducer.actions.setMessageError("Bạn cần đăng nhập để thay đổi món ăn"));
    }
  };

  //useEffect
  useEffect(() => {
    id && fetchMenuCombo();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(breadCrumbReducer.actions.resetBreadCrumb());
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    fetchMenuItemTypeDish();
    //eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    setAllPrice(calculateTotalPrice());
  }, [menuConvert]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-start w-full text-[--clr-gray-500] overflow-auto max-h-[450px]">
        <div className="max-h-[450px] flex-1  text-center min-w-1/3 overflow-auto">

          {isEdit ? (
            <>
              <SearchInFilter
                onSearch={handleSearch}
                isResetAll={true}
                width="450px"
              />
              <div className="overflow-auto sticky w-full">
                {
                  Object.keys(convertMenuByType(allDishConvert)).map((typeName, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-center max-w-full pr-3">
                        <hr className="border-[1px] border-blue-400 w-full"/>
                        <div className="font-bold text-[16px] mx-2 whitespace-nowrap">
                          {index + 1}. {typeName}
                        </div>
                        <hr className="border-[1px] border-blue-400 w-full"/>
                      </div>
                      {convertMenuByType(allDishConvert)[typeName]?.map((menu) => (
                        <div
                          key={menu.id}
                          className="flex items-center gap-3 py-4 px-4 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleClickDish(menu)}
                        >
                          <Avatar
                            alt="Image food"
                            src={
                              menu.image ||
                              "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
                            }
                            sx={{ width: 60, height: 60 }}
                          />
                          <div className="flex items-center">
                            <div className="flex gap-1">
                              <div className="flex flex-col gap-1 max-w-[200px]">
                                <Typography
                                  variant="body1"
                                  className="whitespace-nowrap text-left"
                                >
                                  {menu.dishName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="whitespace-nowrap text-left truncate w-[190px] italic"
                                >
                                  <Tooltip title={menu?.description}>
                                    {menu?.description || (
                                      <div className="italic">Chưa có mô tả</div>
                                    )}
                                  </Tooltip>
                                </Typography>
                              </div>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                className="block"
                                width={150}
                              >
                                Giá: {formatMoney(menu?.price)} VND
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </>

          ) : (
            <>
              <div className="text-[22px] font-[800]">Sky View - Restaurant</div>
              <div className="italic">
                "Những Món Ngon Đặc Biệt Cho Những Người Đặc Biệt"
              </div>
              <div className="text-[19px] text-red-400 font-bold py-[30px]">
                {dataCombo?.comboName}
              </div>
              <Image
                src="https://sdl.thuathienhue.gov.vn/UploadFiles/TinTuc/banh_mi.jpg"
                alt="image food"
                width={400}
                height={0}
              />
            </>
          )}
        </div>
        <div className="max-h-[450px] items-center ml-5 p-6 w-2/3 overflow-auto">
          <div className="sticky">
            <div>
              {Object.keys(convertMenuByType(menuConvert)).map((typeName, index) => (
                <div key={index}>
                  <div className="mb-5 text-[16px] font-semibold text-blue-400">
                    {index + 1}. {typeName}
                  </div>
                  {convertMenuByType(menuConvert)[typeName].map((data, dataIndex) => (
                    <div key={dataIndex} className="flex items-center gap-5 mb-6">
                      <Avatar
                        alt="Image food"
                        src={
                          data.image ||
                          "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
                        }
                        sx={{ width: 100, height: 100 }}
                      />
                      <div className="flex items-center">
                        <div className="flex flex-col min-w-[350px] gap-1">
                          <Typography variant="h6">{data.dishName}</Typography>

                          <Typography
                            variant="body2"
                            className="max-w-[300px] italic"
                          >
                            {data.description || (
                              <div className="italic">Chưa có mô tả</div>
                            )}
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="block"
                          width={150}
                        >
                          Giá:{" "}
                          {formatMoney(data.price * (dishQuantities[data.id] || data.quantity))}
                          VND
                        </Typography>
                        <div className="flex items-center ml-2 gap-2 mr-4">
                          <Button
                            variant="outlined"
                            className="text-black"
                            disabled={!getUserLocal()?.id}
                            onClick={() => handleDecrease(data)}
                          >
                            -
                          </Button>
                          <Typography variant="body2" className="mx-4">
                            {dishQuantities[data.id] || data.quantity}
                          </Typography>
                          <Button
                            disabled={!getUserLocal()?.id}
                            variant="outlined"
                            onClick={() => handleIncrease(data)}
                          >
                            +
                          </Button>
                        </div>
                        <CheckBox
                          name="food"
                          label={""}
                          disabled={!getUserLocal()?.id}
                          onChange={() => handleCheckboxClick(data)}
                          checked={selectedItems.includes(data.menuItemId)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <ButtonBtn onClick={handleOpenModel}>Xem trước file PDF</ButtonBtn>
          <ButtonBtn onClick={handleAdd}>Thêm món</ButtonBtn>
          <ModalPopup
            open={isOpenModal}
            title="Chi tiết"
            setOpen={setIsOpenModal}
            closeModal={handleCloseModal}
          >
            <div className="min-w-[500px] h-auto p-6 relative">
              <div className="flex flex-col gap-4 w-full actual-receipt">
                <BookingPDF
                  total={totalPrices()}
                  data={convertDataMenuBook()}
                  handleExport={handleExport}
                />
              </div>
              <div className="flex justify-end mt-[-0.25rem] gap-4">
                <ButtonBtn
                  bg="var(--clr-orange-400)"
                  onClick={handleClickCancel}
                  startIcon={<CheckIcon fill="white"/>}
                >
                  <span className="font-semibold">Thoát</span>
                </ButtonBtn>
                <ButtonBtn
                  bg="var(--clr-blue-400)"
                  onClick={handleExport}
                  startIcon={isSubmitted && <LoadingButton/>}
                >
                  <span className="font-semibold">Xuất file</span>
                </ButtonBtn>
              </div>
            </div>
          </ModalPopup>
        </div>
        <div className="flex gap-5 items-center">
          {selectedItems.length > 0 &&
            <ButtonBtn onClick={handleDeleteDishes} width={100} bg="var(--clr-red-400)">Xóa</ButtonBtn>}
          <ButtonBtn width={100} onClick={handleChooseTable}>Đặt bàn</ButtonBtn>
          <ModalPopup
            open={isOpenModalChooseTable}
            title={"Đặt bàn"}
            setOpen={setIsOpenModalChooseTable}
            closeModal={handleCloseModalChooseTable}
          >
            <DetailModalBook
              handleClickCancel={handleClickCancelChooseTable}
              handleCloseModals={handleCloseModalChooseTable}
              serviceId={serviceId}
              comboMenuId={comboMenuId}
              comboMenuItem={covertDataMenuItems(menuConvert
              )}
              priceTotalDish={totalPrices()}/>
          </ModalPopup>
          <div>
            Tổng tiền:{" "}
            <span>
              {formatMoney(allPrice)}
              VND
            </span>
          </div>
        </div>
      </div>
      <TabComment combo={dataCombo}/>
    </div>
  );
};

export default DetailMenu;

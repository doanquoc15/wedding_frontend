"use client";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import TitleHead from "@/components/TitleHead";
import FoodDetail from "@/components/FoodDetail";
import SearchInFilter from "@/components/common/SearchInFilter";
import { getAllTypeDish } from "@/services/type-dish";
import { TypeDish } from "@/types/common";
import { MENU_BREADCRUMB, MENU_PAGE_SIZE } from "@/constants/common";
import { getAllFood } from "@/services/menu-item";
import { getQueryParam } from "@/utils/route";
import { useAppDispatch } from "@/stores/hook";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { statusApiReducer } from "@/stores/reducers/statusAPI";

const MenuPage = (querySearch: string) => {
  //state
  const [typeDishes, setTypeDishes] = useState<TypeDish[]>();
  const [selectActive, setSelectActive] = useState<string | number>(
    getQueryParam("typeId") || 0
  );
  const [pageSize, setPageSize] = useState<number>(MENU_PAGE_SIZE);
  const [page, setPage] = useState(1);
  const [foodByType, setFoodByType] = useState<any>();
  const [search, setSearch] = useState<any>(getQueryParam("search"));

  const [total, setTotal] = useState<any>();

  //const
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  //function
  const getTypeDish = async () => {
    try {
      const type = await getAllTypeDish({ pageSize: 1000 });
      const getAllFood = type?.data.reduce(
        (total, item) => total?.concat(item.menuItems),
        []
      );
      setTypeDishes([
        {
          id: 0,
          typeName: "Tất cả món ăn",
          menuItems: getAllFood,
        },
        ...type.data,
      ]);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));

    }
  };

  const getFoods = async () => {
    try {
      const data = await getAllFood({
        pageSize: 1000,
        pageIndex: page,
        typeId: selectActive || 0,
        search: search,
      });
      setTotal(data.total);
      setFoodByType(data.menus);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));

    }
  };

  const handleSearch = (querySearch: string) => {
    setSearch(querySearch);
  };

  const handleClick = (indexActive) => {
    setPageSize(MENU_PAGE_SIZE);
    setSelectActive(indexActive);
  };

  const loadMoreData = () => {
    setPageSize((pageSize) => pageSize + MENU_PAGE_SIZE);
  };
  const handleHidden = () => {
    setPageSize(MENU_PAGE_SIZE);
  };

  //useEffect
  useEffect(() => {
    getTypeDish();
  }, []);

  useEffect(() => {
    getFoods();
    // eslint-disable-next-line
  }, [selectActive, pageSize, search]);

  useEffect(() => {
    dispatch(
      breadCrumbReducer.actions.setBreadCrumbs({
        routes: MENU_BREADCRUMB,
      })
    );

    return () => {
      dispatch(breadCrumbReducer.actions.resetBreadCrumb());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <TitleHead
        title="Menu ẩm thực"
        content="Sky View - Phục vụ quý khách 24/7"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <div className="my-8 pl-8">
            {typeDishes?.map((type, index) => (
              <Link
                href={`${pathname}?typeId=${type.id}`}
                key={index}
                className="text-[14px] border-b-[2px] border-[--clr-gray-200] py-4 flex justify-between"
                onClick={() => handleClick(type.id)}
              >
                <span
                  className={`${
                    selectActive == type.id ? "text-red-500 font-bold" : ""
                  }`}
                >
                  {type?.typeName}
                </span>
                <span
                  className={`w-6 h-6 rounded-[50%] bg-[--clr-gray-400] text-white flex justify-center items-center ${
                    selectActive == type.id ? "bg-red-500" : ""
                  }`}
                >
                  {type?.menuItems?.length || 0}
                </span>
              </Link>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <SearchInFilter onSearch={handleSearch} isResetAll={true}/>

          <div className="grid grid-cols-2 gap-8">
            {foodByType?.map((food) => (
              <div
                key={food.id}
                className="border-b-[2px] border-[--clr-gray-200] p-4"
              >
                <FoodDetail food={food}/>
              </div>
            ))}
          </div>
          {/*<div className="flex justify-end mt-6">*/}
          {/*  {total > pageSize ? (*/}
          {/*    <Button onClick={loadMoreData}>Hiển thị thêm</Button>*/}
          {/*  ) : (*/}
          {/*    total > MENU_PAGE_SIZE && (*/}
          {/*      <Button onClick={handleHidden}>Ẩn bớt</Button>*/}
          {/*    )*/}
          {/*  )}*/}
          {/*</div>*/}
        </Grid>
      </Grid>
    </div>
  );
};

export default MenuPage;

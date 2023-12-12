"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { dataRestaurant } from "@/data";
import ProductionImage from "@/statics/images/gioi-thieu.jpg";
import ArchitectureImage from "@/statics/images/kientruc.jpg";
import ViewBeachImage from "@/statics/images/view-beach.jpg";
import InteriorImage from "@/statics/images/noi-that.jpg";
import SelfieImage from "@/statics/images/selfie.jpg";
import Love1Image from "@/statics/images/love1.jpg";
import Love2Image from "@/statics/images/love2.jpg";
import FamilyImage from "@/statics/images/family.jpg";
import Food1Image from "@/statics/images/food1.jpg";
import Food2Image from "@/statics/images/food2.jpg";
import Food3Image from "@/statics/images/food3.jpg";
import Food4Image from "@/statics/images/food4.jpg";
import Food5Image from "@/statics/images/food5.jpg";
import ChefImage from "@/statics/images/chef.jpg";
import Food6Image from "@/statics/images/food6.jpg";
import Food7Image from "@/statics/images/food7.jpg";
import Food8Image from "@/statics/images/food8.jpg";
import Food9Image from "@/statics/images/food9.jpg";
import Service from "@/statics/images/dich-vu.jpg";
import { INTRODUCTION_BREADCRUMB } from "@/constants/common";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { useAppDispatch } from "@/stores/hook";

const Production = () => {
  //const
  const dispatch = useAppDispatch();

  //useEffect
  useEffect(() => {
    dispatch(
      breadCrumbReducer.actions.setBreadCrumbs({
        routes: INTRODUCTION_BREADCRUMB,
      })
    );

    return () => {
      dispatch(breadCrumbReducer.actions.resetBreadCrumb());
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <header className="bg-[#F5F5F5] min-h-[188px] flex flex-col justify-center items-center">
        <div className="text-[36px] leading-[48px]">Giới thiệu</div>
        <div className="text-[24px] leading-9">Sky View - Restaurant</div>
      </header>
      <main className="pt-[85px] pl-[180px] pr-[150px] flex flex-col gap-8 pb-[56px]">
        <hr className="border-[1px] border-[#979797]" />
        <div className="text-[14px]">
          <div className="text-[20px] font-bold leading-4 mb-4 text-center">
            Tổng quan về Sky View Restaurant Đà Nẵng
          </div>
          <div className="text-justify mb-4">
            Sky View Restaurant nằm trên tầng 20 khách sạn Belle Maison sở hữu
            tầm nhìntuyệt đẹp từ trên cao. Thực khách khi đến với nhà hàng có
            thể được thưởng ngoạn view biển và thành phố, trong khi nhâm nhi
            thưởng thức bữa ăn ngon cùng bạn đồng hành.
          </div>
          <div>
            {dataRestaurant?.map((data, index) => (
              <div key={index} className="flex items-center">
                <b>{data?.title} :</b>
                <span className="ml-4">{data?.description}</span>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <Image
                width={650}
                height={600}
                alt="image restaurant"
                style={{ borderRadius: "10px", marginBottom: "16px" }}
                src={ProductionImage}
              />
            </div>
            <div className="mb-4">
              Nhắc đến Sky View Restaurant các thực khách vẫn thường dùng những
              tính từ như sang trọng, nhẹ nhàng và tinh tế để mô tả. Từ khoảnh
              khắc bước chân vào nhà hàng bạn đã cảm thấy vô cùng choáng ngợp
              với không gian sang trọng, rộng rãi với lối thiết kế hài hòa giữa
              châu Âu và châu Á. Nhà hàng sở hữu không gian thoáng đãng, có ánh
              đèn vàng mang đến cảm giác ấm áp hoặc ánh nến mơ màng cho các cặp
              đôi.
            </div>
            <div>
              Đặc biệt tại tầng 20 của Sky View Restaurant còn có cả một hồ bơi.
              Đây cũng là lý do nhà hàng này rất thích hợp cho những buổi gặp gỡ
              thân mật, hẹn hò hoặc trò chuyện với bạn bè, người thân.
            </div>
          </div>
        </div>
        <hr className="border-[1px] border-[#979797]" />
        <div className="text-[14px]">
          <div className="text-[20px] font-bold leading-4 mb-4 text-center">
            Điểm đặc biệt của Sky View Restaurant
          </div>
          <div className="text-justify">
            <ol style={{ listStyleType: "decimal" }}>
              <li>
                <div className="font-bold text-[15px] mb-2">
                  Kiến trúc hiện đại và sang trọng{" "}
                </div>
                <div>
                  Nằm ở vị trí tầng 20 thuộc khách sạn Belle Maison Parosand Đà
                  Nẵng, nhà hàng Sky View Restaurant sở hữu một không gian mở
                  nhờ những tấm kính trong suốt được lắp đặt xung quanh. Dù ở
                  góc độ nào bạn cũng có thể quan sát thiên nhiên bên ngoài
                  trong lúc thưởng thức bữa ăn.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={ArchitectureImage}
                  />
                </div>
                <div>
                  Nội thất nhà hàng cũng vô cùng sang trọng khi sử dụng những
                  tông màu ấm. Để đảm bảo trải nghiệm cũng như giúp các thực
                  khách có được không gian riêng tư tuyệt hảo, Sky View
                  Restaurant đã rất tinh tế khi sắp xếp các bàn nằm không quá
                  gần nhau. Trần nhà được thế kế từ các thanh gỗ với hệ thống
                  đèn tròn tạo cảm giác ấm cúng, đây cũng là một điểm cộng rất
                  lớn bởi thực khách của nhà hàng đa phần là các cặp đôi, gia
                  đình.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={InteriorImage}
                  />
                </div>
              </li>
              <li>
                <div className="font-bold text-[15px] mb-2">
                  Tầm nhìn tuyệt đẹp của Sky View Restaurant
                </div>
                <div>
                  Sky View Restaurant có tầm nhìn thẳng ra toàn bộ bãi biển đẹp
                  nhất Đà Nẵng –
                  <span className="text-[--clr-red-400]"> Biển Mỹ Khê</span>{" "}
                  giúp thực khách có thể thưởng ngoạn vẻ dịu dàng của mặt biển
                  thơ mộng. Phía trước nhà hàng là view hồ bơi trên cao được
                  nhiều người săn đón và đặt trước nhất. Hãy tưởng tượng mà xem,
                  khung cảnh biển trước mắt cùng hồ bơi dưới ráng chiều khi
                  hoàng hôn buông xuống sẽ xinh đẹp đến nhường nào.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={ViewBeachImage}
                  />
                </div>
                <div>
                  Bạn có thể chụp lại khoảnh khắc tuyệt diệu này cùng những
                  người thân yêu nhất trong cuộc đời. Đó sẽ là một phần ký ức
                  đẹp của một bữa ăn ngon, khung cảnh hoàn mỹ và cả những câu
                  chuyện đong đầy yêu thương đã được chia sẻ cùng nhau. Tại Sky
                  View Restaurant, các buổi tiệc gia đình luôn tràn đầy những
                  niềm vui tiếng cười, đó là những bữa cơm sum vầy ngập tràn
                  hạnh phúc.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={SelfieImage}
                  />
                </div>
              </li>
              <li>
                <div className="font-bold text-[15px] mb-2">
                  Địa điểm được các cặp đôi yêu thích hàng đầu
                </div>
                <div>
                  Sky View Restaurant không chỉ là một nhà hàng nơi mọi người
                  đến thưởng thức{" "}
                  <span className="text-[--clr-red-400]">
                    {" "}
                    món ngon tại Đà Nẵng
                  </span>
                  , mà đây còn là nơi trao gửi những cam kết thiêng liêng. Đã có
                  rất nhiều người tìm đến Sky View để đặt tiệc cầu hôn và lẽ dĩ
                  nhiên, mọi nhân viên trong nhà hàng luôn cố gắng đáp ứng các
                  nhu cầu của họ và đặt hạnh phúc, sự hài lòng khách hàng lên
                  đầu.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={Love1Image}
                  />
                </div>
                <div>
                  Sky View Restaurant cũng đã chứng kiến nhiều giọt nước mắt cảm
                  động chân tình, những lời ngỏ ý đong đầy tình cảm, những nụ
                  hôn nồng nàn kết tinh từ tình yêu của những cặp đôi. Rất nhiều
                  người đã đồng ý cùng nhau chia sẻ ngọt bùi tương lai sau màn
                  cầu hôn đầy lãng mạn được các nhân viên hỗ trợ. Và cũng chính
                  niềm vui của khách hàng đã tạo động lực cho Sky View
                  Restaurant luôn cố gắng để hoàn thiện và phấn đấu tốt hơn
                  trong công tác phục vụ.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    objectFit="cover"
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={Love2Image}
                  />
                </div>
                <div>
                  Ngoài ra Sky View Restaurant cũng là địa chỉ hấp dẫn cho các
                  gia đình vào các dịp cuối tuần hay các kỳ nghĩ lễ để quây quần
                  bên nhau, gắn kết xây đăp tình cảm gia đình.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={FamilyImage}
                  />
                </div>
              </li>
              <li>
                <div className="font-bold text-[15px] mb-2">
                  Nơi mang đến phong cách ẩm thực châu Âu đắt giá
                </div>
                <div>
                  Ẩm thực tại Sky View Restaurant khá đa dạng khi có cả menu
                  A-la-carte và buffet theo phong cách Âu. Các món ngon ở đây
                  đều được chính tay các đầu bếp có thâm niên lâu năm trong nghề
                  chế biến, đảm bảo giữ được hương vị tiêu chuẩn nhất. Bên cạnh
                  hương vị thì cách bài trí món ăn đẹp mắt cũng là một điểm nhấn
                  không thể bỏ qua. Bằng chứng là từng món đều được sắp xếp hết
                  sức nghệ thuật trên đĩa với màu sắc gây tượng mạnh.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={Food8Image}
                  />
                </div>
                <div>
                  Bên cạnh những món ẩm thực châu Âu thì các món hải sản cũng là
                  điểm mạnh của Sky View Restaurant. Bởi nguồn hải sản từ biển
                  Đà Nẵng vốn rất dồi dào và phong phú, luôn đảm bảo độ tươi
                  ngon đúng chuẩn. Có thể nói nhà hàng luôn đem lại cho thực
                  khách một menu trọn vẹn và phong phú, nếu lần đầu ghé bạn có
                  thể phải nhờ nhân viên tư vấn để chọn được món phù hợp.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={Food2Image}
                  />
                </div>
                <div>Menu phục vụ hằng ngày</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4">
                    <Image
                      width={350}
                      height={350}
                      alt="image restaurant"
                      style={{ borderRadius: "10px", marginBottom: "16px" }}
                      src={Food3Image}
                    />
                  </div>
                  <div className="p-4">
                    <Image
                      width={350}
                      height={350}
                      alt="image restaurant"
                      objectFit="cover"
                      style={{ borderRadius: "10px", marginBottom: "16px" }}
                      src={Food4Image}
                    />
                  </div>
                  <div className="p-4">
                    <Image
                      width={350}
                      height={350}
                      alt="image restaurant"
                      style={{ borderRadius: "10px", marginBottom: "16px" }}
                      src={Food5Image}
                    />
                  </div>
                  <div className="p-4">
                    <Image
                      width={350}
                      height={350}
                      alt="image restaurant"
                      style={{ borderRadius: "10px", marginBottom: "16px" }}
                      src={Food7Image}
                    />
                  </div>
                  <div className="p-4">
                    <Image
                      width={350}
                      height={350}
                      alt="image restaurant"
                      style={{ borderRadius: "10px", marginBottom: "16px" }}
                      src={Food1Image}
                    />
                  </div>
                  <div className="p-4">
                    <Image
                      width={350}
                      height={350}
                      alt="image restaurant"
                      style={{ borderRadius: "10px", marginBottom: "16px" }}
                      src={Food9Image}
                    />
                  </div>
                </div>
                <div>
                  Ngoài ra còn có cả những món chính nóng hổi như quầy steak
                  thăn bò ngoại, mì Ý Penna, khoai tây đút lò… Đương nhiên thực
                  đơn cũng có đa dạng các món salad tốt cho sức khỏe, quầy tráng
                  miệng được các đầu bếp chăm chút từ sắc cho đến vị.
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    width={650}
                    height={600}
                    alt="image restaurant"
                    style={{ borderRadius: "10px", marginBottom: "16px" }}
                    src={Food6Image}
                  />
                </div>
              </li>
            </ol>
          </div>
        </div>
        <hr className="border-[1px] border-[#979797]" />
        <div className="text-[14px]">
          <div className="text-[20px] font-bold leading-4 mb-4  text-center">
            Trải nghiệm dịch vụ đẳng cấp tại Sky View
          </div>
          <div>
            <div className="">
              Ngoài không gian sang trọng, món ăn ngon thì dịch vụ tại Sky View
              Restaurant cũng là một điểm cộng lớn đủ làm hài lòng mọi thực
              khách. Khách hàng đến dùng bữa sẽ được nhân viên niềm nở tiếp đón
              và luôn hỗ trợ hết mình khi có các vấn đề phát sinh, nhờ đó bữa ăn
              sẽ thêm phần thoải mái hơn. Nếu cần nhà hàng cũng có hỗ trợ set up
              bàn tiệc nhóm hay hẹn hò cho người có nhu cầu, bạn có thể liên hệ
              nhân viên trước để biết thêm chi tiết.
            </div>
            <div className="flex justify-center mt-4">
              <Image
                width={650}
                height={600}
                alt="image restaurant"
                style={{ borderRadius: "10px", marginBottom: "16px" }}
                src={Service}
              />
            </div>
            <div>
              Cuối cùng, trong năm 2020 Sky View Restaurant Đà Nẵng đã hân hạnh
              tiếp tục trở thành nhà hàng TOP 1 trên Tripadvisor và nhận được
              giải thưởng "TRAVELERS' CHOICE 2020". Đây là giải thưởng dựa trên
              gần 400 đánh giá và xếp hạng của khách hàng trong và ngoài nước,
              chứng minh được sức hút cũng như giá trị mà nhà hàng mang lại.
            </div>
            <div className="flex justify-center mt-4">
              <Image
                width={650}
                height={600}
                alt="image restaurant"
                style={{ borderRadius: "10px", marginBottom: "16px" }}
                src={ChefImage}
              />
            </div>
            <div>
              Nếu bạn muốn trải nghiệm một bữa tối tuyệt vời dưới ánh nến, cùng
              thưởng thức món ăn được bày trí đẹp mắt với ly rượu vang nồng nàn
              trong không gian riêng tư thì có lẽ Sky View Restaurant sẽ là sự
              lựa chọn tuyệt hảo nhất. Đối lập với không gian năng động và vội
              vã bên ngoài khi đi khám phá Đà Nẵng, đến dùng bữa tại nhà hàng
              chúng ta sẽ như được gác lại bao khó khăn và mệt mỏi, chỉ còn
              những giây phút thả lỏng và sum vầy cùng người thân xung quanh.{" "}
            </div>
          </div>
        </div>
        <hr className="border-[1px] border-[#979797]" />
        <div>
          <div className="text-[20px] font-bold leading-4 mb-4">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/taHdKXonqeQ?si=gYxGzlomPvCks5Wz"
              title="YouTube video player"
              //frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              //allowfullscreen
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Production;

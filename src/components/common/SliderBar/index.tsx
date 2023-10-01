import { Carousel } from "react-carousel-minimal";
export default function Slider() {
  const data = [
    {
      image:
        "https://media.mia.vn/uploads/blog-du-lich/sky-view-restaurant-nha-hang-lang-man-ly-tuong-cho-cac-cap-doi-tai-da-nang-3-1636459839.jpg",
      caption: "",
    },
    {
      image:
        "https://nhahangdep.vn/wp-content/uploads/2019/06/lung-linh-anh-sang-trong-thiet-ke-nha-hang-sky-view-ngoai-troi-12.jpg",
      caption: "",
    },
    {
      image:
        "https://media.mia.vn/uploads/blog-du-lich/sky-view-restaurant-nha-hang-lang-man-ly-tuong-cho-cac-cap-doi-tai-da-nang-10-1636459839.jpg",
      caption: "",
    },
    {
      image:
        "https://media.mia.vn/uploads/blog-du-lich/sky-view-restaurant-nha-hang-lang-man-ly-tuong-cho-cac-cap-doi-tai-da-nang-2-1636459839.jpg",
      caption: "",
    },
  ];
  
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div>
          <Carousel
            data={data}
            time={4000}
            width="100%"
            height="calc(100vh - 95px)"
            //slideNumber={true}
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "100vw",
              maxHeight:"calc(100vh - 95px)",
              overflow: "hidden"
            }}
          />
        </div>
      </div>
    </div>
  );
}

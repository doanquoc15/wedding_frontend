import React, { useEffect } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";

const BackToTop = () => {
  const [backToTopButton, setBackToTopButton] = React.useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div>
      {
        backToTopButton && (
          <div className="w-12 h-12 fixed bottom-[40px] right-[40px] z-[1000] text-center p-2 rounded-[50%] bg-indigo-200"
            onClick={scrollToTop}>
            <NavigationIcon className="text-[30px] text-red-400 "/>
          </div>
        )
      }
    </div>
  );
};

export default BackToTop;
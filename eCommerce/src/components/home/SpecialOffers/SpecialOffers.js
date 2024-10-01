import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { SplOfferData } from "../../../constants";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
const SpecialOffers = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (products) {
      const specialOffers = products.filter(product => product.special_offers);
      setData(specialOffers);
    }
  }, [products]);

  const productsLength = data ? data.length : "";

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow:
      productsLength === 1
        ? 1
        : productsLength === 2
        ? 2
        : productsLength === 3
        ? 3
        : 4,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full space-y-10 py-8">
    <h1 className="text-left text-2xl lg:text-4xl font-normal ">
      Oferta
    </h1>
    <Slider {...settings}>
      {data.map((product) => (
        <div key={product.id} className="px-2">
          <Product
            _id={product.id}
            img={product.variants[0].imgUrl[0]}
            productName={product.productName}
            slug={product.slug}
            price={product.price}
            compare_price={product.compare_price}
            color="Black"
            badge={true}
            variants={product.variants}
            brand={product.brand}
            cat={product.cat}
            description={product.description}
            sub_cat={product.sub_cat}
            discount={product.discount_percentage}
            video_youtube={product.video_youtube}
          />
        </div>
      ))}
    </Slider>
  </div>
  );
};

export default SpecialOffers;

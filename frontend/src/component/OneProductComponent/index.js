import React, { useState, useEffect } from "react";
import ColorsSection from "../ColorsSection";
import SizeSection from "../SizeSection";
import Slider from "../Core Component/slider";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CartContent from "../SideDrawer2";
import SideDrawer from "../CartPopup";
import Comment from "../Comment";
import Input from "../Core Component/Input";
import { closeIcon } from "../../icons";
import "./style.scss";
import RatingStars from "../Star";
const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("black");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [product, setProduct] = useState("");
  const [isContain, setIsContain] = useState(false);
  const [qty, setQty] = useState(1);
  const [newCart, setNewCart] = useState([]);
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState([]);
  const [images, setImages] = useState([]);
  const [ratingAvg, setRatingAvg] = useState(0);
  const [rate, setRate] = useState(1);
  const [imageUrls, setImageUrls] = useState([]);

  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const addRate = () => {
    axios
      .post(
        `http://localhost:5000/rate`,
        { productId: id, rate: rate },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("sssssssssssssssssssssssssssssssss");
        console.log(response?.data);
      })
      .catch((error) => {
        console.error("Error Adding Product", error);
      });
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
    axios
      .get(`http://localhost:5000/cart/cartproduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.cart);
        const cart = response.data.cart;
        setCart(cart);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/rate/${id}`, {})
      .then((response) => {
        setRatingAvg(Math.ceil(response.data.rate[0]["avg(rating)"]));
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, [id]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/product/one/${id}`)
      .then((response) => {
        console.log(response?.data);
        const product = response?.data.product;

        setProduct(response?.data.product);
        console.log(product);
        setImages(product.image);
        setPrice(product.price);
        const availablesize = product.sizes.split(",");
        setAvailableSizes(availablesize);

        const availablecolor = product.colors.split(",");
        setAvailableColors(availablecolor);
      })
      .catch((error) => {
        console.error("Error fetching Product", error);
      });
  }, []);

  useEffect(addRate, [rate]);
  const getCommentByProductId = (id) => {
    axios
      .get(`http://localhost:5000/comment/${id}`)
      .then((response) => {
        console.log(response?.data.results);
        const comment = response?.data.results;
        setComment(comment);
        console.log(comment);
      })
      .catch((error) => {
        console.error("Error fetching Comment", error);
      });
  };
  useEffect(() => {
    getCommentByProductId(id);
  }, []);

  const handleCartClick = (productId, price) => {
    axios
      .post(
        "http://localhost:5000/cart",
        {
          product_id: productId,
          color: selectedColor,
          size: selectedSize,
          quantity: qty,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response?.data);
        axios
          .get(`http://localhost:5000/cart/cartproduct`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data.cart);
            const cart = response.data.cart;
            setCart(cart);
          })
          .catch((error) => {
            console.error("Error fetching Product", error);
          });

        setIsOpen(!isOpen);
      })
      .catch((error) => {
        console.error("Error adding to the cart:", error);
      });
  };

  const handleCommentClick = (id, commentText) => {
    axios
      .post(
        "http://localhost:5000/comment",
        { product_id: id, comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response?.data);
        getCommentByProductId(id);
      })
      .catch((error) => {
        console.error("Error adding to the comment:", error);
      });
  };
  const handleDelete = (commentId) => {
    axios
      .delete("http://localhost:5000/comment", {
        params: {
          id: commentId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        const updatedComments = comment.filter((item) => item.id !== commentId);
        setComment(updatedComments);
        getCommentByProductId(id);
      })
      .catch((error) => {
        console.error("Error deleting the comment:", error);
      });
  };
  const getRateByUserId = () => {
    const token =localStorage.getItem("token")
    axios
      .get(
        `http://localhost:5000/rate/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response?.data.userRating);
setRate(response?.data.userRating)
      })
      .catch((error) => {
        console.error("Error Rating", error);
      });
  };
  useEffect(getRateByUserId , [])
  return (
    <div>
      <div className="single-product-container">
        <div className="first-section">
          {/* <div className="small-img">
          <img src={img2} className="img" />
          <img src={img3} className="img" />
          <img src={img4} className="img" />
        </div> */}
          <div className="large-img">
            <img className="img" src={images} />
          </div>
        </div>

        <div className="second-section">
          <RatingStars
            disabled={true}
            rating={ratingAvg}
            setRating={setRatingAvg}
          />
          <div className="title">{product.name}</div>
          <div className="description">{product.description}</div>

          <div className="price">
            <del className="first-price">{product.price}$</del>{" "}
            {product.price - 0.2 * product.price}$
          </div>
          <div className="colors-chips-container">
            <ColorsSection
              availableColors={availableColors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
          <div className="sizes-chips-containetr">
            <SizeSection
              availableSize={availableSizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>

          {/* <button className="btn" onClick={()=>handleCartClick(product.id)}>ADD TO CART</button> */}
          <button
            className="btn"
            onClick={() => {
              togglePopup();
              handleCartClick(product.id, product.price);
            }}
          >
            ADD TO CART
          </button>
        </div>
        <SideDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          content={<CartContent cart={cart} setCart={setCart} />}
          title={"My Cart"}
          setPrice={setPrice}
          footer={
            <button
              className="view-shopping-cart"
              onClick={() => {
                navigate("/cart/viewcart");
              }}
            >
              VIEW SHOPPING CART
            </button>
          }
        />
      </div>

      <div className="reviews-container">
        <div className="reviews">Reviews({comment.length})</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommentClick(id, commentText);
          }}
          className="add-review-container"
        >
          <RatingStars disabled={false} rating={rate} setRating={setRate} />

          <Input
            classname="inp"
            placeholder={"write your opinion"}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
        </form>
        {comment?.map((item) => {
          return (
            <div>
              <Comment
                item={item}
                comment={comment}
                icon={closeIcon}
                handleDelete={() => handleDelete(item?.id)}
              />
              {/* <button onClick={()=>handleDelete(item?.id)}>delete</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleProduct;

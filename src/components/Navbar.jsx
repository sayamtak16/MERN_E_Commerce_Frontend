import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  // console.log("user cart = ",cart)

  // Search
  useEffect(() => {
    setFilteredData(
      products.filter((data) =>
        data?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };
  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price <= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>ShopSwift</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler} >
            <span className="material-symbols-outlined ">search</span>{" "}
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>

                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-3">
                  profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory("laptop")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory("cameras")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterbyCategory("headphone")}
            >
              Hedphones
            </div>
            <div className="items" onClick={() => filterbyPrice(1599)}>
              1599
            </div>
            <div className="items" onClick={() => filterbyPrice(2599)}>
              2599
            </div>
            <div className="items" onClick={() => filterbyPrice(4999)}>
              4999
            </div>
            <div className="items" onClick={() => filterbyPrice(6999)}>
              6999
            </div>
            <div className="items" onClick={() => filterbyPrice(8999)}>
              8999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

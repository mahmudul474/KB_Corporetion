import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SendPaymentDettals from "../SendPaymentDettails/SendPaymentDettals";

export default function KoyelItemWin() {
  const { currentUser } = useContext(AuthContext);

  const {
    data: winProduct = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["winProduct", currentUser],
    queryFn: async () => {
      const res = await fetch(
        `https://kb-server-6jly.vercel.app/user/wins/${currentUser?._id}`
      );
      const data = await res.json();
      return data.wins;
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  console.log(winProduct);

  return (
    <div className="  shadow-md sm:rounded-lg ">
      {winProduct && winProduct.length === 0 ? (
        <div>
          {" "}
          <h2 className="text-xl  my-6 text-center   text-red-400 capitalize">
            No Win Yet
          </h2>{" "}
        </div>
      ) : (
        <div className="h-[400px] overflow-auto">
          <table className="table table-xs table-pin-rows ">
            <thead>
              <tr className="bg-white">
                <td className="text-black bg-white">Product</td>
                <td className="text-black bg-white">Product Name</td>

                <td className="text-black bg-white">Total Item</td>
                <td className="text-black bg-white">Total Weight </td>
                <td className="text-black bg-white">Per Kg price</td>

                <td className="text-black bg-white">Total Price</td>
                <td className="text-black bg-white">Items</td>
                <td className="text-black bg-white">view product</td>
              </tr>
            </thead>
            <tbody>
              {winProduct?.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item?.productPhoto} alt="product" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-black bg-white">{item?.productName}</td>

                  <td className="text-black bg-white">
                    {item.winproduct?.length}
                  </td>
                  <td className="text-black bg-white">
                    {item.totalWeight + "kg"}
                  </td>
                  <td className="text-black bg-white">
                    {item.averagePerKgPrice &&
                      item?.averagePerKgPrice.toFixed() + "$"}
                  </td>
                  <td className="text-black bg-white">
                    {item.total && item?.total.toFixed() + "$"}
                  </td>

                  <td>
                    <a href="#bidding_items">view items</a>

                    <div className="modal" id="bidding_items">
                      <div className="modal-box">
                        <div className="overflow-x-auto">
                          <table className="table">
                            <thead className="bg-white">
                              <tr className="bg-white">
                                <td className="text-black bg-white">item</td>
                                <td className="text-black bg-white">spec</td>
                                <td className="text-black bg-white">
                                  THICKNESS
                                </td>
                                <td className="text-black bg-white">WIDTH</td>
                                <td className="text-black bg-white">WEIGHT</td>
                                <td className="text-black bg-white">TS</td>
                                <td className="text-black bg-white">YP</td>
                                <td className="text-black bg-white">EL</td>
                              </tr>{" "}
                            </thead>
                            <tbody>
                              {/* row 1 */}

                              {item?.winproduct?.map(i => (
                                <tr className="bg-white">
                                  <td className="text-black bg-white">
                                    {i?.item}
                                  </td>
                                  <td className="text-black bg-white">
                                    {i?.spec}
                                  </td>
                                  <td className="text-black bg-white">
                                    {i?.Thickness}
                                  </td>
                                  <td className="text-black bg-white">
                                    {i?.Width}
                                  </td>
                                  <td className="text-black bg-white">
                                    {i?.weight + "kg"}
                                  </td>
                                  <td className="text-black bg-white">
                                    {i?.TS}
                                  </td>
                                  <td className="text-black bg-white">
                                    {i?.YP}
                                  </td>
                                  <td className="text-black bg-white">
                                    {i?.EL}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-action">
                          <a href="#" className="btn">
                            close
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link to={`/product/${item?.productID}`}>
                      <a>view Product</a>
                    </Link>
                  </td>

                  <td onClick={() => openModal(item)}>send Payments</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <SendPaymentDettals
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          closeModal={closeModal}
          data={selectedProduct}
        />
      )}
    </div>
  );
}

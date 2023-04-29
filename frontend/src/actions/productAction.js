import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_ARCHIVE_REQUEST,
  UPDATE_ARCHIVE_SUCCESS,
  UPDATE_ARCHIVE_FAIL,
  // UPDATE_NOTIFY_REQUEST,
  // UPDATE_NOTIFY_SUCCESS,
  // UPDATE_NOTIFY_FAIL,
  // UPDATE_NOTIFY_RESET,
  NEW_NOTIFICATION_REQUEST,
  NEW_NOTIFICATION_SUCCESS,
  NEW_NOTIFICATION_FAIL,
  // NEW_NOTIFICATION_RESET,
  // UPDATE_ARCHIVE_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getFavorites =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });

      const { data } = await axios.get("/api/v1/favorites");

      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getArchives =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });

      const { data } = await axios.get("/api/v1/archives");

      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Archive Status
export const updateArchiveStatus =
  (productId, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ARCHIVE_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(
        `/api/v1/archives/${productId}`,
        // `/api/v1/archives/${id}`,
        productData,
        config
      );

      dispatch({
        type: UPDATE_ARCHIVE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ARCHIVE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log("product details in product action");
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Premium Product
export const premiumProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/premiumproduct/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// notify me
// export const notifyMe = (id, productData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_NOTIFY_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/notify/${id}`,
//       productData,
//       config
//     );

//     dispatch({
//       type: UPDATE_NOTIFY_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_NOTIFY_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const notifyMe = (id, formData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_NOTIFY_REQUEST });

//     const config = {
//       headers: { "Content-Type": "multipart/form-data" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/notify/${id}`,
//       formData,
//       config
//     );

//     dispatch({
//       type: UPDATE_NOTIFY_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_NOTIFY_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const notifyMe = (id, productData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_NOTIFY_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/notify/${id}`,
//       productData,
//       config
//     );

//     dispatch({
//       type: UPDATE_NOTIFY_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_NOTIFY_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const notifyMe = (productId, productData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_NOTIFY_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/notify/${productId}`,
//       null,
//       {
//         ...config,
//         data: productData,
//       }
//     );

//     dispatch({
//       type: UPDATE_NOTIFY_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_NOTIFY_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const notifyMe = (userId, productId) => async (dispatch) => {
//   console.log("pro actions");
//   try {
//     dispatch({ type: UPDATE_NOTIFY_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };
//     console.log("config");

//     console.log(userId);
//     console.log(productId);
//     const { data } = await axios.put(
//       `admin/notify/${productId}`,
//       { userId },
//       config
//     );
//     console.log("data");

//     dispatch({
//       type: UPDATE_NOTIFY_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_NOTIFY_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const newNotification = (notificationData) => async (dispatch) => {
  console.log("new noti");
  try {
    dispatch({ type: NEW_NOTIFICATION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    console.log(config);
    console.log(notificationData);
    for (let pair of notificationData.entries()) {
      console.log(typeof pair[0] + ", ppp   " + typeof pair[1]);
      console.log(pair[0] + ", [[[[[ " + pair[1]);
    }

    const { data } = await axios.put(
      `/api/v1/notification`,
      notificationData,
      config
    );

    dispatch({
      type: NEW_NOTIFICATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_NOTIFICATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteFavorites = (userId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/favorites?userId=${userId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

const products = {
  allProducts: [],
  showDeitail: false,
  showDeitailId: {},
};

export const productsReducer = (state = products, action) => {
  switch (action.type) {
    case "ALL_PRODUCTS": {
      state.allProducts = action.products;
      return { ...state };
    }

    case "SHOW_DETIAL": {
      state.allProducts = [...state.allProducts];
      state.showDeitailId = state.allProducts.find((p) => p._id === action.id);
      state.showDeitail = true;
      return { ...state };
    }

    case "CLOSE_DETAIL": {
      state.showDeitailId = {};
      state.showDeitail = false;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const warehouse = {
  warehouseUpdate: [],
  updateWarehouse: [],
  showWarehouseUpdatDetail: {
    show: false,
    id: "",
  },
  condition: [
    {
      filter: {
        limit: 10,
        currentPage: 1,
        length: 0,
      },
    },
    {
      dates: {
        ma: "-1",
        startDate: new Date(),
        endDate: new Date(),
      },
    },
  ],
};

export const warehouseReducer = (state = warehouse, action) => {
  switch (action.type) {
    case "ALL_WAREHOUSE_UPDATE": {
      state.warehouseUpdate = action.warehouseUpdate;
      state.filter.currentPage = action.currentPage;
      state.filter.length = action.length;
      return { ...state };
    }

    case "UPDATE_WAREHOUSE": {
      // console.log(action.update_products);
      state.updateWarehouse = action.update_products;
      return { ...state };
    }

    case "SHOW_WAREHOUSE_UPDATE_DETAIL": {
      state.showWarehouseUpdatDetail.show = true;
      state.showWarehouseUpdatDetail.id = action.id;
      return { ...state };
    }

    case "SET_SHOW_WAREHOUSE_UPDATE_DETAIL_FALSE": {
      state.showWarehouseUpdatDetail.show = false;
      state.showWarehouseUpdatDetail.id = "";
      return { ...state };
    }

    case "SEARCH_WAREHOUSE_UPDATE": {
      state.warehouseUpdate = action.warehouseUpdate;
      state.condition[0].filter.length = action.length;
      state.condition[0].filter.currentPage = action.currentPage;
      return { ...state };
    }

    case "SET_CONDITION": {
      state.condition = action.condition;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

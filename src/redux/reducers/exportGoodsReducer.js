const exportGoods = {
  ExportGoods: [],
  validate: [
    {
      product: "",
      quantity: "",
    },
  ],

  Information: {
    _id: "",
    date: new Date(),
  },

  InformationValidate: {
    _id: "",
  },

  rowsData: [
    {
      product: "",
      quantity: 0,
      warehouse: 0,
    },
  ],

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

export const exportGoodsReducer = (state = exportGoods, action) => {
  switch (action.type) {
    case "EXPORTGOODS": {
      state.exportGoods = action.data;
      return { ...state };
    }

    case "VALIDATE_PRODUCT_ID": {
      state.validate[action.index].product = "Hãy chọn sản phẩm !!!";
      // console.log(state.validate);
      return { ...state };
    }

    case "VALIDATE_QUANTITY": {
      state.validate[action.index].quantity = "Nhỏ hơn hoặc bằng tồn kho";
      // console.log(state.validate);
      return { ...state };
    }

    case "CLEAN_ROWSDATA": {
      state.rowsData = [
        {
          product: "",
          quantity: 0,
          warehouse: 0,
        },
      ];
      state.validate = [
        {
          product: "",
          quantity: "",
        },
      ];
      return { ...state };
    }

    case "ADD_TABLE_ROWS": {
      const rowsInput = {
        product: "",
        quantity: 0,
        warehouse: 0,
      };
      const validate = {
        product: "",
        quantity: "",
      };
      state.rowsData = [...state.rowsData, rowsInput];
      state.validate = [...state.validate, validate];
      return { ...state };
    }

    case "GOODS_EXPORT_DELETE_ROW": {
      state.rowsData = [
        ...state.rowsData.slice(0, action.index),
        ...state.rowsData.slice(action.index + 1),
      ];
      return { ...state };
    }

    case "GOODS_EXPORT_PRODUCT_ID": {
      let newExportGoods = [...state.rowsData];

      if (action.selectedOption.value === "") {
        state.validate[action.index].product = "Hãy chọn sản phẩm !!!";
      } else {
        newExportGoods[action.index].product = action.selectedOption.value;
        newExportGoods[action.index].warehouse = Number(
          action.selectedOption.warehouse
        );
        state.validate[action.index].product = "";
      }
      state.rowsData = newExportGoods;
      return { ...state };
    }

    case "GOODS_EXPORT_QUANTITY": {
      let newExportGoods = [...state.rowsData];
      if (action.quantity <= newExportGoods[action.index].warehouse) {
        newExportGoods[action.index].quantity = Number(action.quantity);
        state.validate[action.index].quantity = "";
      } else {
        state.validate[action.index].quantity = "Nhỏ hơn hoặc bằng tồn kho";
      }
      state.rowsData = newExportGoods;
      return { ...state };
    }

    case "SET_USER_EXPORT_GOODS": {
      if (action.user === "") {
        state.InformationValidate._id = "Vui lòng chọn nhân viên !!!";
      } else {
        state.Information._id = action.user;
        state.InformationValidate._id = "";
      }
      return { ...state };
    }

    case "SET_DATE_EXPORT_GOODS": {
      state.Information.date = action.date;
      return { ...state };
    }

    case "FILTER": {
      state.condition[0].filter = action.filter;
      return { ...state };
    }

    case "SEARCH_WAREHOUSE_UPDATE": {
      state.ExportGoods = action.data;
      state.condition[0].filter.length = action.length;
      state.condition[0].filter.currentPage = action.currentPage;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

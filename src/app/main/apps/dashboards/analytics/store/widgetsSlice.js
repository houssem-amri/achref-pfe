import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import format from "date-fns/format";

export const getWidgets = createAsyncThunk(
  "analyticsDashboardApp/widgets/getWidgets",
  async () => {
    const Board = await axios.get(
      "http://localhost:3200/api/scrumboard-app-Boards-all/kfefef1245"
    );
    const staff = await axios.get("http://localhost:3200/api/get_staff");
    const admin = await axios.get("http://localhost:3200/api/get_admin");
    const widget4 = await calculNumberBordBydate(Board.data.board);
    const widget5 = await calculNumberListOfBord(Board.data.board);
    const widget6 = await calculNumberChekList(Board.data.board);
    const widget7 = await calculwidget7(widget6);
    const dataBoard = await Board.data.board;
    const datastaff = await staff.data.data;
    const dataadmin = await admin.data.data;
    const widgets = [
      { id: "widget1", series: dataBoard },
      { id: "widget2", series: datastaff },
      { id: "widget3", series: dataadmin },
      { id: "widget4", series: widget4 },
      { id: "widget5", series: widget5 },
      { id: "widget6", series: widget6 },
      { id: "widget7", series: widget7 },
    ];
    return widgets;
  }
);

const calculNumberBordBydate = (Board) => {
  return new Promise((resolve) => {
    let categories = [];
    let dataSerie = [];
    const groups = Board.reduce((groups, game) => {
      let date = format(new Date(game.dateCreated), "dd MMM yyyy");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});
    const groupArrays = Object.keys(groups).map((date) => {
      categories.push(
        format(new Date(groups[date][0].dateCreated), "dd MMM yyyy")
      );
      dataSerie.push(groups[date].length);
      return [
        format(new Date(groups[date][0].dateCreated), "dd MMM yyyy"),
        groups[date].length,
      ];
    });

    let series = [
      {
        name: "nombre de tableaux",
        data: dataSerie,
      },
    ];
    resolve({ categories: categories, series: series });
  });
};

const calculNumberListOfBord = (Board) => {
  return new Promise((resolve) => {
    let List = [];
    let Card = [];
    let categories = [];
    for (let i = 0; i < Board.length; i++) {
      categories.push(Board[i].name);
      List.push(Board[i].lists.length);
      Card.push(Board[i].cards.length);
    }
    let series = [
      { name: "List", data: List },
      { name: "Tâche", data: Card },
    ];
    resolve({ categories: categories, series: series });
  });
};
const calculNumberChekList = (Board) => {
  return new Promise((resolve) => {
    let checklists = [];

    for (let i = 0; i < Board.length; i++) {
      for (let j = 0; j < Board[i].cards.length; j++) {
        for (let l = 0; l < Board[i].cards[j].checklists.length; l++) {
          let object = {
            table: Board[i].name,
            tache: Board[i].cards[j].name,
            checklists: Board[i].cards[j].checklists[l],
          };
          checklists.push(object);
        }
      }
    }

    resolve(checklists);
  });
};
const calculNumberLables = (Board) => {
  return new Promise((resolve) => {
    for (let i = 0; i < Board.length; i++) {
      for (let j = 0; j < Board[i].cards.length; j++) {}
    }
    // let series = [
    //   {
    //     name: "nombre de tableaux",
    //     data: dataSerie,
    //   },
    // ];
    resolve({ categories: [], series: [] });
  });
};
const calculwidget7 = (data) => {
  let T = [];
  return new Promise((resolve) => {
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].checklists.checkItems.length; k++) {
        let created = format(
          new Date(data[i].checklists.checkItems[k].dateCreated),
          "dd MMM yyyy"
        );

        T.push(created);
      }
    }
    const groups = T.reduce((groups, game) => {
      let date = format(new Date(game), "dd MMM yyyy");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {

      return [ date,groups[date].length]
    });

    let series = [
      {
        name: "nombre de Tache",
        data: groupArrays,
      },
    ];

    resolve({ series: series });
  });
};
const widgetsAdapter = createEntityAdapter({});

export const {
  selectEntities: selectWidgetsEntities,
  selectById: selectWidgetById,
} = widgetsAdapter.getSelectors((state) => state.analyticsDashboardApp.widgets);
const widgetsSlice = createSlice({
  name: "analyticsDashboardApp/widgets",
  initialState: widgetsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll,
  },
});

export default widgetsSlice.reducer;

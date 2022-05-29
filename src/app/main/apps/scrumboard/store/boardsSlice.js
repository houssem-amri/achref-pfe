import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import history from "@history";
import BoardModel from "../model/BoardModel";

const super_user_id = "kfefef1245";

export const getBoards = createAsyncThunk(
  "scrumboardApp/boards/getBoards",
  async () => {
    const response = await axios.get(
      "http://localhost:3200/api/scrumboard-app/boards/" + super_user_id
    );
    const data = await response.data.board;
    console.log("etape 1 get all boards", data);

    return data;
  }
);

export const newBoard = createAsyncThunk(
  "scrumboardApp/boards/newBoard",
  async (board, { dispatch }) => {
    console.log("here new new new copie board", board);
    const response = await axios.post(
      `http://localhost:3200/api/scrumboard-app/board/new`,
      {
        board: board || BoardModel(),
        super_user_id: super_user_id,
      }
    );

    const data = await response.data.boards;
    history.push({
      pathname: `/apps/scrumboard/boards/${data._id}/${data.handle}`,
    });
    return data;
  }
);

const boardsAdapter = createEntityAdapter({});

export const { selectAll: selectBoards, selectById: selectBoardById } =
  boardsAdapter.getSelectors((state) => state.scrumboardApp.boards);
const boardsSlice = createSlice({
  name: "scrumboardApp/boards",
  initialState: boardsAdapter.getInitialState({}),
  reducers: {
    resetBoards: (state, action) => {},
  },
  extraReducers: {
    [getBoards.fulfilled]: boardsAdapter.setAll,
  },
});

export const { resetBoards } = boardsSlice.actions;

export default boardsSlice.reducer;

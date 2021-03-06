import * as ActionTypes from "./ActionTypes";

export const addList = (list) => ({
  type: ActionTypes.ADD_LIST,
  payload: list,
});

export const removeList = (listId) => ({
  type: ActionTypes.REMOVE_LIST,
  payload: listId,
});

export const rankList = (listId, list) => ({
  type: ActionTypes.RANK_LIST,
  payload: { listId, list },
});

export const addShowList = (listId, showId) => ({
  type: ActionTypes.ADD_SHOW_LIST,
  payload: { listId, showId },
});

export const removeShowList = (listId, showId) => ({
  type: ActionTypes.REMOVE_SHOW_LIST,
  payload: { listId, showId },
});

export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

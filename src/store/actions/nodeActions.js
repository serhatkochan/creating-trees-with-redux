export const ADD_ROOT = 'ADD_ROOT';
export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';
export const CHANGE_NODE = 'CHANGE_NODE';
export const REMOVE_ALL_NODE = 'REMOVE_ALL_NODE';

export const addRoot = (detail) => ({
  type: ADD_ROOT,
  detail: detail,
});
export const addNode = (detail) => ({
  type: ADD_NODE,
  detail: detail,
});

export const changeNode = (detail) => ({
  type: CHANGE_NODE,
  detail: detail,
});
export const removeNode = (detail) => ({
  type: REMOVE_NODE,
  detail: detail,
});
export const removeAllNode = () => ({
  type: REMOVE_ALL_NODE,
});

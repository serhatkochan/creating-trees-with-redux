import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_ROOT,
  ADD_NODE,
  CHANGE_NODE,
  REMOVE_NODE,
  REMOVE_ALL_NODE,
} from '../actions/nodeActions';
import {
  nodeList,
  nextId,
  total,
  nodeName,
  selfValue,
} from '../initialValues/node';

const initialState = {
  nodeList: nodeList,
  parentId: null,
  selfValue: selfValue,
  total: total,
  nodeName: nodeName,
};

export const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOT:
      return {
        ...state,
        nodeList: {
          ...state.nodeList,
          [`root${action.detail.nextId}`]: {
            id: `root${action.detail.nextId}`,
            parentId: state.parentId,
            selfValue: state.selfValue,
            total: state.total,
            nodeName: state.nodeName,
          },
        },
      };
    case ADD_NODE:
      return {
        ...state,
        nodeList: {
          ...state.nodeList,
          [action.detail.nextId]: {
            id: action.detail.nextId,
            parentId: action.detail.parentId,
            selfValue: state.selfValue,
            total: state.total,
            nodeName: state.nodeName,
          },
        },
      };
    case CHANGE_NODE:
      return {
        ...state,
        nodeList: {
          ...state.nodeList,
          [action.detail.currentNode.id]: {
            ...action.detail.currentNode,
            total:
              state.nodeList[action.detail.currentNode.id].total +
              action.detail.dif,
          },
        },
      };
    case REMOVE_NODE:
      console.log(action);
      let newNodeList = { ...state.nodeList };
      delete newNodeList[action.detail.removeId];
      return {
        ...state,
        nodeList: {
          ...newNodeList,
        },
      };
    case REMOVE_ALL_NODE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

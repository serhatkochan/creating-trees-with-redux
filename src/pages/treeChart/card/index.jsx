import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { GrAdd, GrClose, GrUser } from 'react-icons/gr';
import './index.scss';

const Card = ({
  triggerChangeNodeName,
  triggerAdd,
  triggerRemove,
  node,
  setNode,
}) => {
  const triggerSetNodeName = (value) => {
    triggerChangeNodeName(node, value);
  };
  const triggerSetSelfValue = (value) => {
    const dif = value - node.selfValue;
    node.selfValue = +value;
    setNode(node, dif);
    node.total += dif;
  };

  const delayedChangeSelfValue = useCallback(
    debounce((value) => triggerSetSelfValue(value), 350),
    []
  );
  const delayedChangeNodeName = useCallback(
    debounce((value) => triggerSetNodeName(value), 350),
    []
  );
  const triggerAddNode = (event) => {
    event.preventDefault();
    triggerAdd(node);
  };
  const triggerRemoveNode = (event) => {
    event.preventDefault();
    triggerRemove(node);
  };

  return (
    <div className="addTreeCart">
      <form>
        <div className="nodeName">
          <GrUser />
          <input
            type="text"
            defaultValue={node.id}
            onChange={(event) => delayedChangeNodeName(event.target.value)}
          />
        </div>
        <div className="selfValue">
          <p>Self Value</p>
          <input
            type="number"
            defaultValue={node.selfValue}
            onChange={(event) => delayedChangeSelfValue(event.target.value)}
          />
        </div>
        <div className="total">Total: {node.total}</div>
        <div className="tirggerButtons">
          <button
            className={'triggerAdd'}
            onClick={(event) => triggerAddNode(event)}
          >
            <GrAdd />
          </button>
          <button
            className="triggerRemove"
            onClick={(event) => triggerRemoveNode(event)}
          >
            <GrClose />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Card;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tree, TreeNode } from 'react-organizational-chart';
import { GrAdd, GrClose } from 'react-icons/gr';
import './index.scss';

//pages
import Card from './card';
import {
  addNode,
  addRoot,
  changeNode,
  removeAllNode,
  removeNode,
} from '../../store/actions/nodeActions';

const TreeChart = () => {
  const [nextId, setNexId] = useState(1);
  const nodes = useSelector((state) => state.nodes);
  const dispatch = useDispatch();
  const triggerAddRoot = () => {
    dispatch(addRoot({ nextId }));
    setNexId(nextId + 1);
  };
  const triggerAddNode = (parentNode) => {
    dispatch(addNode({ nextId, parentId: parentNode.id }));
    setNexId(nextId + 1);
    setNode(parentNode, nodes.selfValue);
  };
  const triggerChangeNodeName = (node, newName) => {
    console.log(node, newName);
    const newNode = {
      ...node,
      nodeName: newName,
    };
    dispatch(changeNode({ currentNode: newNode, dif: 0 }));
  };
  // fark eklenecek node
  const setNode = (currentNode, dif) => {
    Object.entries(nodes.nodeList).map((node) => {
      if (node[1].id === currentNode.id) {
        dispatch(changeNode({ currentNode, dif }));
      } else if (node[1].id === currentNode.parentId) {
        setNode(node[1], dif);
      }
    });
  };
  //silinmek istenilen node
  const triggerRemoveNode = (currentNode) => {
    dispatch(removeNode({ removeId: currentNode.id }));
    Object.entries(nodes.nodeList).map((node) => {
      if (node[1].id === currentNode.parentId) {
        setNode(node[1], -currentNode.total); // parentlerinin degerini azalt
      } else if (node[1].parentId === currentNode.id) {
        // çocuklarını sil
        removeChild(node[1]);
      }
    });
  };
  const removeChild = (childNode) => {
    dispatch(removeNode({ removeId: childNode.id }));
    Object.entries(nodes.nodeList).map((node) => {
      if (node[1].parentId === childNode.id) {
        removeChild(node[1]);
      }
    });
  };
  const removeAllRoot = () => {
    dispatch(removeAllNode());
    setNexId(1);
  };
  const getNodes = (parentId) => {
    return Object.entries(nodes.nodeList).map((node) => {
      return (
        node[1].parentId === parentId && (
          <TreeNode
            key={node[1].id}
            label={
              <Card
                node={node[1]}
                setNode={setNode}
                triggerAdd={triggerAddNode}
                triggerRemove={triggerRemoveNode}
                triggerChangeNodeName={triggerChangeNodeName}
              />
            }
          >
            {getNodes(node[1].id)}
          </TreeNode>
        )
      );
    });
  };
  const getTree = () => {
    return Object.entries(nodes.nodeList).map((node) => {
      return (
        node[1].id.toString().includes('root') && (
          <div key={`div${node[1].id}`} className="rootContainer">
            <Tree
              lineWidth={'2px'}
              lineColor={'red'}
              lineBorderRadius={'10px'}
              label={
                <Card
                  node={node[1]}
                  setNode={setNode}
                  triggerAdd={triggerAddNode}
                  triggerRemove={triggerRemoveNode}
                  triggerChangeNodeName={triggerChangeNodeName}
                />
              }
              key={node[1].id}
            >
              {getNodes(node[1].id)}
            </Tree>
          </div>
        )
      );
    });
  };
  useEffect(() => {
    console.log('güncel nodes', nodes);
  }, [nodes]);
  return (
    <div className="treeWrapper">
      <div className="firstCard">
        <div>
          <button onClick={triggerAddRoot}>
            <GrAdd />
          </button>
          <button onClick={removeAllRoot}>
            <GrClose />
          </button>
        </div>
      </div>
      <div className="rootTree">{getTree()}</div>
    </div>
  );
};
export default TreeChart;

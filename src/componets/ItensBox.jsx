import styled from 'styled-components';
import { useState, useEffect } from 'react';
import InputList from './InputList';
import { FiXCircle, FiEdit3, FiMove } from "react-icons/fi";
import persistList from '../server/localStorageData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function removeItem({index, dataList, setDataList, e}){
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  dataList.splice(index, 1);
  setDataList([...dataList]);
  persistList.persistData(dataList);
}

function updateItem({index, dataList, setDataList}){
  if(!dataList[index]){
    return
  }

  const newList = dataList;
  newList[index].status = !newList[index].status;
  setDataList([...newList]);
  persistList.persistData(newList);
}

function  updateNameItem ({index, dataList, setDataList, editItem, setEditControll, e}){
  e.preventDefault();
  if(editItem.length < 2 || editItem[0] === ' '){
    toast("Entrada Inválida");
    return;
  }
  const newList = dataList;
  newList[index].name = editItem;
  setDataList([...newList]);
  persistList.persistData(newList);
  setEditControll(false);
}

function ItemList({item, index, dataList, setDataList}){
  const [editControll, setEditControll] = useState(false);
  const [editItem, setEditItem] = useState(item.name);

  return(
    <>
      {item.status ? 
        <li className="concluida">
          {editControll ? 
            <div>
              <span>{index+1} -</span> 
              <form onSubmit={(e) => updateNameItem({index, dataList, setDataList, editItem, setEditControll, e})}>
                <input 
                  onChange={(e) => setEditItem(e.target.value)}
                  placeholder="Write new to-do"
                  value={editItem} />
              </form>
            </ div> :
            <span onClick={() => updateItem({index, dataList, setDataList})}>
              {index+1} - {item.name}
            </span>}
            <p>
              <StyledEditItem 
                className="concluida" 
                onClick={() => {
                  setEditItem(item.name)
                  setEditControll(!editControll);
                }}/>
              <StyledMoveItem className="concluida"/>
              <StyledDeleteItem 
                onClick={(e) => removeItem({index, dataList, setDataList, e})}/>
            </p>
        </li> 
        : 
        <li>
          {editControll ? 
            <div>
              <span>{index+1} -</span>
              <form onSubmit={(e) => updateNameItem({index, dataList, setDataList, editItem, setEditControll, e})}>
                <input 
                  onChange={(e) => setEditItem(e.target.value)}
                  placeholder="Write new to-do"
                  value={editItem} />
              </form>
            </ div> :
            <span onClick={() => updateItem({index, dataList, setDataList})}>
              {index+1} - {item.name}
            </span>}
          <p>
            <StyledEditItem 
              onClick={() => {
              setEditItem(item.name)
              setEditControll(!editControll);
              }}/>
            <StyledMoveItem />
            <StyledDeleteItem 
              onClick={(e) => removeItem({index, dataList, setDataList, e})}/>
          </p>
        </li> 
      }
    </>
  );
}

export default function ItemBox() {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    const localData = persistList.getData();
    if(setDataList.length > 0){
    setDataList(localData);
  }
  }, []);
  
  return (
    <>
      <InputList dataList={dataList} setDataList={setDataList} />
      <Box >
        {dataList?.map((item, index) => 
          <ItemList 
            key={index} 
            index={index}
            item={item} 
            dataList={dataList}
            setDataList={setDataList}
            />)}
      </Box>
    </>
  );
}

const StyledDeleteItem = styled (FiXCircle)`
    color: #e22545;
`;

const StyledEditItem = styled (FiEdit3)`
    color: #ffffff;
    &.concluida{
      color: #edc4ee;
    }
`;

const StyledMoveItem= styled (FiMove)`
    color: #ffffff;
    &.concluida{
      color: #edc4ee;
    }
`;

const Box = styled.ul`
  li{
    display: flex;
    justify-content: space-between;
    position: relative;
    transition: all 0.8s;
    border-radius: 5px;
    padding: 4px 4px 4px 8px;
    width: 50vw;
    word-break: break-word;
    cursor: pointer;
    text-decoration: none;
    list-style-type: none;
    margin: 8px 0;
    &.concluida{
      span{
        text-decoration: line-through;
        color: #edc4ee;
      }
      scale: 0.97;
      span{
        &:hover{
          text-decoration: none;
        }
      }
    }
    &:hover{
      scale: 1.03;
      border: 1px solid #ffffff;
      width: 50vw;
      p{
        display: flex;
      }
    }
    p{
      display: none;
    }
    span{
      &:hover{
        text-decoration: line-through;
      }
    }
    input{
      height: 30px;
      width: 100%;
      margin: 2px 6px;
      border: none;
      border-radius: 5px;
      outline: 0;
    }
    div{
      display: flex;
    }
  }
`;

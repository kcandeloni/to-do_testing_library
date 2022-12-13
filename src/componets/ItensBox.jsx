import styled from 'styled-components';
import { useState } from 'react';
import InputList from './InputList';
import { FiXCircle } from "react-icons/fi";

function removeItem({index, dataList, setDataList, e}){
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  dataList.splice(index, 1);
  setDataList([...dataList]);
}

function updateItem({index, dataList, setDataList}){
  if(!dataList[index]){
    return
  }
  const newList = dataList;
  newList[index].status = !newList[index].status;
  setDataList([...newList]);
}

function ItemList({item, index, dataList, setDataList}){
  return(
    <>
      {item.status ? 
        <li className="concluida" 
          onClick={() => updateItem({index, dataList, setDataList})}>
            {index+1} - {item.name} 
            <p>
              <StyledIcon 
                onClick={(e) => removeItem({index, dataList, setDataList, e})}/>
            </p>
        </li> 
        : 
        <li onClick={() => updateItem({index, dataList, setDataList})}>
          {index+1} - {item.name} 
          <p>
            <StyledIcon 
              onClick={(e) => removeItem({index, dataList, setDataList, e})}/>
          </p>
        </li> 
      }
    </>
  );
}

export default function ItemBox() {
  const [dataList, setDataList] = useState([]);

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

const StyledIcon = styled (FiXCircle)`
    color: #e22545;
    position: fixed;
    right: 4px;
    top: 4px;
`;

const Box = styled.ul`
  li{
    position: relative;
    &.concluida{
      text-decoration: line-through;
      color: #edc4ee;
      scale: 0.97;
    }
    text-decoration: none;
    list-style-type: none;
    margin: 8px 0;
    p{
      display: none;
    }
    &:hover{
      scale: 1.03;
      border: 1px solid #edc4ee;
      width: 50vw;
      p{
        display: flex;
      }
    }
    transition: all 0.8s;
    border-radius: 5px;
    padding: 4px 30px 4px 8px;
    width: 50vw;
    word-break: break-word;
    cursor: pointer;
  }
`;
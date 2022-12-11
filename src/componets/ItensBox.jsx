import styled from 'styled-components';
import { useState } from 'react';
import InputList from './InputList';

function updateItem({index, dataList, setDataList}){
  const newList = dataList;
  newList[index].status = !newList[index].status;
  setDataList([...newList]);
  console.log(newList)
}

function ItemList({item, index, dataList, setDataList}){
  return(
    <>
      {item.status ? 
        <li className="concluida" 
          onClick={() => updateItem({index, dataList, setDataList})}>
            {index+1} - {item.name}
        </li> 
        : 
        <li onClick={() => updateItem({index, dataList, setDataList})}>
            {index+1} - {item.name}
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

const Box = styled.ul`
    li{
      &.concluida{
        text-decoration: line-through;
        color: #edc4ee;
        scale: 0.97;
      }
      list-style-type: none;
      margin: 8px 0;
      &:hover{
        scale: 1.03;
        border: 1px solid #edc4ee;
        width: 50vw;
      }
      transition: all 0.8s;
      border-radius: 5px;
      padding: 4px 30px 4px 8px;
      width: 50vw;
      word-break: break-all;
      cursor: pointer; 
    }
`;
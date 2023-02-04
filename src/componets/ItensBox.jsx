import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InputList from './InputList';
import { FiXCircle, FiEdit3, FiCheckCircle } from "react-icons/fi";
import persistList from '../server/localStorageData';
import { toast } from 'react-toastify';

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

function updateNameItem ({index, dataList, setDataList, editItem, setEditControll, e}){
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

function ItemList({item, index, dataList, setDataList, provided}){
  const [editControll, setEditControll] = useState(false);
  const [editItem, setEditItem] = useState(item.name);
  
  const addEventClick = (event) => {
    if(event.target.className !== 'focusEdit'){
      setEditControll(false);
      window.removeEventListener('click', addEventClick);
    }
  };

  function editItemEvent (e){
    e.stopPropagation();
    if(!editControll){
      window.addEventListener('click', addEventClick);
    }
    setEditItem(item.name);
    setEditControll(!editControll);
  }

  return(
    <>
      {item.status ? 
        <li className="concluida"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
          {editControll ?
            <div>
              <span>{index+1} -</span> 
              <form onSubmit={(e) => updateNameItem({index, dataList, setDataList, editItem, setEditControll, e})}>
                <input className='focusEdit'
                  onChange={(e) => setEditItem(e.target.value)}
                  placeholder="Write new to-do"
                  value={editItem} 
                  autoFocus />
              </form>
              <StyledCheckItem onClick={(e) => updateNameItem({index, dataList, setDataList, editItem, setEditControll, e})} />
            </ div>
            :
            <span onClick={() => updateItem({index, dataList, setDataList})}>
              {index+1} - {item.name}
            </span>}
            <p>
              <StyledEditItem 
                onClick={(e) => {
                  editItemEvent(e);
                }}/>
              <StyledDeleteItem 
                onClick={(e) => removeItem({index, dataList, setDataList, e})}/>
            </p>
        </li> 
        : 
        <li 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
          {editControll ? 
            <div>
              <span>{index+1} -</span>
              <form onSubmit={(e) => updateNameItem({index, dataList, setDataList, editItem, setEditControll, e})}>
                <input className='focusEdit'
                  onChange={(e) => setEditItem(e.target.value)}
                  placeholder="Write new to-do"
                  value={editItem}
                  autoFocus />
              </form>
              <StyledCheckItem onClick={(e) => updateNameItem({index, dataList, setDataList, editItem, setEditControll, e})} />
            </ div> :
            <span onClick={() => updateItem({index, dataList, setDataList})}>
              {index+1} - {item.name}
            </span>}
          <p>
            <StyledEditItem 
              onClick={(e) => {
                editItemEvent(e);
              }}/>
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
  
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(dataList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDataList(items);
    persistList.persistData(items);
  }
  
  return (
    <>
      <InputList dataList={dataList} setDataList={setDataList} />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <Box 
              {...provided.droppableProps}
              ref={provided.innerRef}>  
              {dataList?.map((item, index) => {
                return(
                  <Draggable key={index} 
                    draggableId={String(index)} 
                    index={index}>
                    {(provided) => (
                      <ItemList
                        provided={provided}
                        key={index} 
                        index={index}
                        item={item} 
                        dataList={dataList}
                        setDataList={setDataList} />
                    )}
                  </Draggable>
              )}
          )}
            {provided.placeholder}
          </Box>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

const StyledDeleteItem = styled (FiXCircle)`
    color: #e22545;
`;

const StyledEditItem = styled (FiEdit3)`
    color: #ffffff;
`;
const StyledCheckItem = styled (FiCheckCircle)`
    color: #ffffff;
    font-size: 24px;
    margin: 0 8px;
`;

const Box = styled.ul`
  li{
    display: flex;
    justify-content: space-between;
    transition: scale 0.8s;
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
      justify-content: center;
      align-items: center;
    }
  }
`;

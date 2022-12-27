import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FiMoreVertical, FiPlus } from "react-icons/fi";
import persistList from '../server/localStorageData';
import Menu from './MenuList';

export default function InputList({dataList, setDataList}) {
  const [newToDo, setNewTodo] = useState("");
  const [stateMenu, setStateMenu] = useState(false);


  function handleForm(e) {
    e.preventDefault();
    if(newToDo.length < 2 || newToDo[0] === ' '){
        toast("Entrada Inválida");
        return;
    }
    setDataList([...dataList, {name: newToDo, status: false}]);
    setNewTodo("");
    persistList.persistData([...dataList, {name: newToDo, status: false}])
  }

  return (
    <>
    <form onSubmit={handleForm}>
      <StyledTitle>To-do</StyledTitle>
      <ContainerMenu>
        <StyledInput
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Write new to-do"
          value={newToDo}
        />
        <StyledAdd onClick={(e) => handleForm(e)}/>
        <StyledMore onClick={()=> setStateMenu(!stateMenu)}/>
        {stateMenu ? 
          <Menu 
            setStateMenu={setStateMenu}
            setDataList={setDataList} />
            : ""}
      </ContainerMenu>
    </form>
    </>
  );
}

const StyledInput = styled.input`
  width: 50vw;
  height: 45px;
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 38px 0 16px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  ::placeholder {
    color: #c6c6c6;
  }
  outline: 0;
`;

const StyledTitle = styled.p`
  margin: 12px 0;
`;

const ContainerMenu = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 45px;
`;

const StyledMore = styled (FiMoreVertical)`
  cursor: pointer;
  &:hover{
    scale: 1.2;
  }
  transition: all 0.8s;  
`;

const StyledAdd = styled (FiPlus)`
  cursor: pointer;
  &:hover{
    scale: 1.2;
  }
  transition: all 0.8s;
  border: 1px solid #ffffff;
  border-radius: 50%;
  margin-left: 8px;
`;

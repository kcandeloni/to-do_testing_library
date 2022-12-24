import styled from 'styled-components';
import { useState } from 'react';
import persistList from '../server/localStorageData';

export default function InputList({dataList, setDataList}) {
  const [newToDo, setNewTodo] = useState("");


  function handleForm(e) {
    e.preventDefault();
    if(newToDo.length < 2 || newToDo[0] === ' '){
        alert("Entrada Inválida");
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
      <StyledInput
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Write new to-do"
          value={newToDo}
        />
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

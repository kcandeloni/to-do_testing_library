import styled from 'styled-components';
import { useState } from 'react';

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
  }

  return (
    <>
    <form onSubmit={handleForm}>
      <p>To-do</p>
      <StyledInput
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Whith new to-do"
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
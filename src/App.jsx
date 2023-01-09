import ContainerTodo from "./componets/ContainerTodo";
import ContainerList from "./componets/ItensBox";
import ItensBox from "./componets/ItensBox";
import GlobalStyle from "./componets/common/GlobalStyled";
import { ToastContainer } from 'react-toastify';

export default function App (){
  return (
    <>
      <GlobalStyle />
      <ContainerTodo>
        <ContainerList>
          <ItensBox />
        </ContainerList>
      </ ContainerTodo>
      <ToastContainer />
    </>);
}
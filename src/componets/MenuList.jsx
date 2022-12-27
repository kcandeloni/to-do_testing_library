import styled from 'styled-components';

export default function Menu({ setStateMenu, setDataList }) {
  
  return (
    <>
      <CaptureClick onClick={()=> setStateMenu(false)}/>
      <BoxMenu>
        <ItemMenu onClick={()=> {
          setDataList([]); 
          setStateMenu(false);
        }}><p>Clear List</p></ItemMenu>
      </BoxMenu>
    </>
  );
}

const BoxMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0vw;
  width: 120px;
  max-height: 80px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 2;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background: #f03e89;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CaptureClick = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const ItemMenu = styled.div`
  height: 24px;
  font-size: 18px;
  margin-top: 4px;
  p{
    cursor: pointer;
    &:hover{
      scale: 1.08;
    }
    transition: all 0.8s;
    border-bottom: 1px solid #ffffff;
  }
  background-color: rgba(120,30,255, 0,5);
`;

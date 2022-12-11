import styled from 'styled-components';

export default function ContainerTodo({
  children
}) {
  return (
    <Box >
      <div>
        {children}
      </div>
    </Box>
  );
}

const Box = styled.div`
    
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 16px 0;
`;
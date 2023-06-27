// ./styles.ts

import styled from 'styled-components';

export const Main = styled.div`
  button {
    padding: 30px;
    margin-top: 50px;
  }

  .filter {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const Table = styled.table`
  margin: 0 auto;
  text-align: center;
  width: 90%;
  border: 1px solid black;
`;

export const TableHeaderCell = styled.th`
  text-align: center;
  border-bottom: 1px solid black;
  padding: 15px;
`;

export const TableRow = styled.tr`
  &.selected {
    background-color: #d9d9d9;
  }
  td {
    padding: 10px;
    border-top: 1px solid black;
  }
`;

export const FilterInput = styled.input`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
`;

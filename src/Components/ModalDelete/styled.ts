import { styled } from 'styled-components';

export const Main = styled.main`
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    text-align: center;
    border: 5px solid black;
    border-radius: 20px;
  }

  .field.is-grouped {
    justify-content: center;
  }

  .button {
    font-size: 12px;
    padding: 20px 30px;
    margin: auto;
    margin-top: 10px;
  }
`;

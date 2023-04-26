import styled from 'styled-components';

export const SectionWrapper = styled.div`
  width: 630px;
  background: ${(props) => props.chatPage ? '#0e1a39' : 'none'};
  padding: ${(props) => props.chatPage ? '21px' : '0 0 40px 0'};
  margin: ${(props) => props.chatPage ? '21px auto 0' : '0 auto'};
`;
export const SectionInfoWrapper = styled.div``;
export const RequirementsList = styled.ul``;
export const ListItem = styled.li`
  font-size: 16px;
  color: #5396DA;
`;
export const CardVerificationHeader = styled.h3`
  font-weight: normal;
`;
export const FormWrapper = styled.div`
  margin-top: 16px;
  > div {
    margin-top: 14px;
  }
`;

export const FormHeader = styled.h3`
  font-weight: normal;
  text-transform: uppercase;
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const ButtonWrapper = styled.div`
  button {
    max-width: 200px!important;
  }
`;

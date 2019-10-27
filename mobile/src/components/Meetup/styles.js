import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  background: rgba(255, 255, 255, 1);
  margin-bottom: 15px;
  border-radius: 5px;
  opacity: ${props => (!props.canceled && !props.past ? 1 : 0.6)};
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  margin-bottom: 20px;
  height: 150px;
  background: rgb(220, 220, 220);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
export const Title = styled.Text`
  margin: 0 10px 15px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;
export const Info = styled.View`
  margin: 0 20px 5px;
  flex-direction: row;
  align-items: center;
`;
export const InfoTxt = styled.Text`
  font-size: 14px;
  color: #999;
  margin-left: 5px;
`;

export const ButtonSubscription = styled(Button)`
  margin: 20px 20px;
`;

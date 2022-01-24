import styled from 'styled-components'

const Card = styled.div`
  flex: 0 0 90%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.color}0D 0%, ${props.color}4D 100%)`};
  border-radius: ${(props) => props.theme.radii[3]}px;

  &:not(:last-child) {
    margin-right: 24px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.span`
  display: block;
  font-size: 24px;
  text-transform: capitalize;
  color: ${(props) => props.theme.colors.content.contrast};
`

const Tasks = styled.span`
  display: block;
  font-size: 16px;
  color: ${(props) => props.theme.colors.content.nonessential};
`

const Progress = styled.div`
  border: 1px solid red;
`

const Project = {
  Card,
  Title,
  Tasks,
  Content,
  Progress,
}

export default Project

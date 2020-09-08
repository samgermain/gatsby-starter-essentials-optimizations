import styled, {css} from 'styled-components'
import variables from 'components/Bootstrap-plus/variables'

export const prevNext = css`
  background-color: rgba(0,0,0,0.8)
  width: 100%;
  margin: 20px;
  padding: 16px;
  color: white !important;
  font-weight: bold;
  font-size: 18px;
  transition: 1.5s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
`

export const prevNextCont = css`
  cursor: pointer;
  height: 100%;
  position: absolute !important;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: auto;
  &:hover {
    background-color: rgba(0,0,0,0.8);
  }
`

export const Carousel = styled.div`
  height: 700px;
`

export const Dots = styled.div`
  text-align: center;
`

export const PrevCont = styled.div`
  ${prevNextCont}
`

export const NextCont = styled.div`
  ${prevNextCont}
  right: 0;
`

export const Prev = styled.span`

  ${prevNext}

  @media screen and (max-width: ${variables.gridBreakpoints.md}) {
    margin-left: 0px;
  }
`

export const Next = styled.span`

  ${prevNext}

  @media screen and (max-width: ${variables.gridBreakpoints.md}) {
    margin-right: 0px;
  }
`

export const SlideGrid = styled.span`

  height: 80%;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(2, 1fr);
  grid-template-areas:
      "u u"
      "u u"
      "d t";
  grid-gap: 20px;
  width: 80%;
  margin: auto;

  @media screen and (max-width: ${variables.gridBreakpoints.md}) {
    width: 90%;
    grid-gap: 15px;
  }
`

/* The dots/bullets/indicators */
export const Dot = styled.span`
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
  &:hover {
    background-color: #717171;  
  }
`
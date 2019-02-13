import * as React from 'react'
import { PropertyControls, ControlType } from 'framer'

import styled from 'styled-components'

const Wrap = styled.div`
  font-weight: 900;
  font-size: 50px;
`

// Define type of property
interface Props {
  pageNum: number
}

export class pageNumber extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    pageNum: 0,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    // text: { type: ControlType.String, title: 'Text' },
  }

  render() {
    return <Wrap>Page {this.props.pageNum}</Wrap>
  }
}

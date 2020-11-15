import React, { useCallback, useEffect, useState, createRef } from 'react';
import { getTheme } from '@fluentui/react';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import { useTransition, animated, useSpring, interpolate } from 'react-spring'

import Investor from "./Investor"
import { Investor as Investors, Query, SelectedInvestor } from "../../src/schematypes/schematypes"
import InvestorShimmer from "./InvestorShimmer"

import { CommandBarButton, IContextualMenuProps, IIconProps, Stack, IStackStyles, initializeIcons, autobind } from 'office-ui-fabric-react';

import AnimateInvestors from "./AnimateInvestors"
import AnimatedInvestor from "./AnimatedInvestor"

import FlipMove from 'react-flip-move';

interface Props {
  filteredInvestors: Query["investors"],
  /* showUpdateInvestorModal: ()=> void, */
  selectedInvestorType: string | undefined,
  selectedInvestorList: SelectedInvestor[],
  /* setSelectedInvestorList: React.Dispatch<React.SetStateAction<SelectedInvestor[]>>, */
  onSelectInvestor: (investor: SelectedInvestor) => void
}

export const InvestorList: React.FC<Props> = React.memo(({ filteredInvestors, selectedInvestorList, onSelectInvestor, children }) => {
  initializeIcons();

  const theme = getTheme();


  const flipMoveStyles = {
    display: "flex",
    flexFlow: "row wrap",
    width: "100%"


    /*  width: "35%" */
  }


  return (

    <Stack
      horizontalAlign="start"
      verticalAlign="start"
      wrap
      horizontal
      styles={{
        root: {
          width: "960px",
          /* margin: '0 auto', */
          textAlign: 'center',
          color: '#605e5c',
          display: 'flex',

        }
      }}
      gap={15}
    >


      <FlipMove enterAnimation={"elevator"} style={flipMoveStyles}>
        {
          filteredInvestors!.map(investor => (

            <AnimatedInvestor key={investor!.id} ref={createRef()}>

              <Investor key={investor!.id} investors={investor} onSelectInvestor={onSelectInvestor} selectedInvestorList={selectedInvestorList} /* showUpdateInvestorModal={showUpdateInvestorModal} */></Investor>

            </AnimatedInvestor>
          ))
        }
      </FlipMove>

    </Stack>

  );
});

export default InvestorList
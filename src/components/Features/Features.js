import React from 'react';
import { Button } from '../../globalStyles';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GiConcentrationOrb } from 'react-icons/gi';
import { GiWireframeGlobe,  } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import {
  FSection,
  FWrapper,
  FHeading,
  FContainer,
  FCard,
  FCardIcon,
  FCardInfo,
  FTitle,
  FDesc
} from './Features.elements';

function Features() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <FSection>
        <FWrapper>
          <FHeading>Our Features</FHeading>
          <FContainer>
            <FCard to='/sign-up'>
              <FCardInfo>
                <FCardIcon>
                  <AiOutlineCheckCircle />
                </FCardIcon>
                <FTitle>IP Address</FTitle>
                <FDesc>Feature Description</FDesc>
                <Button primary>Start</Button>
              </FCardInfo>
            </FCard>
            <FCard to='/sign-up'>
            <FCardInfo>
                <FCardIcon>
                  <GiConcentrationOrb />
                </FCardIcon>
                <FTitle>ASN Information</FTitle>
                <FDesc>Feature Description</FDesc>
                <Button primary>Start</Button>
              </FCardInfo>
              </FCard>
            <FCard to='/sign-up'>
              <FCardInfo>
                <FCardIcon>
                  <GiWireframeGlobe />
                </FCardIcon>
                <FTitle>Global Routing</FTitle>
                <FDesc>Feature Description</FDesc>
                <Button primary>Start</Button>
                </FCardInfo>
            </FCard>
          </FContainer>
        </FWrapper>
      </FSection>
    </IconContext.Provider>
  );
}
export default Features;
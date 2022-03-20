import React,{useState,useEffect,createContext} from 'react';
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
            <FCard to='/visibility'>
              <FCardInfo>
                <FCardIcon>
                  <AiOutlineCheckCircle />
                </FCardIcon>
                <FTitle>Visibility</FTitle>
                <FDesc>Check your IP availability over the Internet.</FDesc>
                <Button primary>Start</Button>
              </FCardInfo>
            </FCard>
            <FCard to='/'>
            <FCardInfo>
                <FCardIcon>
                  <GiConcentrationOrb />
                </FCardIcon>
                <FTitle>History</FTitle>
                <FDesc>Get an overview of past disruptions of your ISP</FDesc>
                <Button primary>Start</Button>
              </FCardInfo>
              </FCard>
            <FCard to='/'>
              <FCardInfo>
                <FCardIcon>
                  <GiWireframeGlobe />
                </FCardIcon>
                <FTitle>Global Routing</FTitle>
                <FDesc>Check the dynamics of your ASN around the world</FDesc>
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
import React, { memo } from 'react';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import HeaderImage from "../assets/EBLogoHeader.png"
import { IStackStyles, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Text,
  DefaultButton,
  IButtonStyles,
  PrimaryButton,
  IconButton,
  IIconProps,

} from 'office-ui-fabric-react';


const headerStackStyles: Partial<IStackStyles> = { root: { width: "100vw", backgroundColor: "#20314b", marginBottom: "10px" } };
const headerImageStyles: Partial<IStackStyles> = { root: { marginLeft: "auto", marginRight: "auto" } };
const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 250 } };
const primaryButtonStyles: Partial<IButtonStyles> = { root: { /* width: 150, */ marginTop: "20px !important" } };
const signInIcon: IIconProps = { iconName: 'SignIn' };

const imageProps: IImageProps = {
  src: HeaderImage,
  imageFit: ImageFit.contain,
};

export const Loading: React.FC = memo(() => {


  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="start"
      verticalFill
      styles={{
        root: {
          /*  width: '960px', */
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c',
         /*  backgroundColor: "rgba(177, 140, 72, 0.1);" */

        }
      }}
      gap={15}>

      <Stack styles={headerStackStyles} horizontal>
        <Image
          {...imageProps}
          alt='Header Image'
          width={400}
          height={100}
          styles={headerImageStyles}
        />


      </Stack>

      <Stack 
      horizontalAlign="center"
      verticalAlign="start"
      
      styles={{
        root: {
          /*  width: '960px', */
          margin: '0 auto',
          textAlign: 'center',
         /*  color: 'white',
          backgroundColor:"white",
          border: "1px solid rgb(138, 136, 134)",
          boxShadow: "2px 3px 11px 7px #00000026", */
          padding: "30px",
          marginTop: "75px !important",

        }
      }}>


       
<Spinner styles={{circle: {width: 80, height: 80}}} size={SpinnerSize.large} />


      </Stack>

    </Stack>

  )



})

export default Loading
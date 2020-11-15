import React, { useEffect, useState } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { IStackStyles, Stack } from 'office-ui-fabric-react/lib/Stack';
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    ContextualMenu,
    Toggle,
    IToggleStyles,
    DefaultButton,
    Modal,
    IDragOptions,
    IconButton,
    IIconProps,
    IModalStyles,
} from 'office-ui-fabric-react';
import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationUpdateInvestorArgs, Query, Investors } from "../../src/schematypes/schematypes"

const GET_INVESTORS = gql`
    
    query {
  investors {
    id
    investorName
    retail
    commercial
    industrial
    hotel
    wc
    gau
    kzn
    allregions
    minInvest
    maxInvest
    listed
    unlisted
    private
    bee
    contacts {
      id
      name
      position
      officeNo
      mobileNo
      email
    }
    }
  }
    `

const UPDATE_INVESTOR = gql`
  mutation UpdateInvestor (
    $investorId: Int!,
      $investorName: String,
      $commercial: Boolean,
   $industrial: Boolean,
   $retail: Boolean,
   $residential: Boolean ,
   $hotel: Boolean,
  
   $wc: Boolean,
   $gau: Boolean,
   $kzn: Boolean,
   $allregions: Boolean,

   $contactId: Int,
   $contactName: String,
   $contactPosition: String,
   $contactOfficeNo: String,
   $contactMobileNo: String,
   $contactEmail: String,
   $minInvest: Int,
   $maxInvest: Int

   $listed: Boolean,
   $unlisted: Boolean,
   $private: Boolean,
   $bee: Boolean,
      
      ) {

    updateInvestor (
  investorId: $investorId,
  investorName: $investorName,
commercial: $commercial,
  industrial: $industrial,
  retail: $retail,
  residential: $residential,
  hotel: $hotel,
  wc: $wc,
  kzn: $kzn,
  gau: $gau,
  allregions: $allregions,
  minInvest: $minInvest,
  maxInvest: $maxInvest,
  listed: $listed,
  unlisted: $unlisted,
  private: $private,
  bee: $bee,
  contactId: $contactId,
 contactName: $contactName,
  contactPosition: $contactPosition,
 contactOfficeNo: $contactOfficeNo,
contactMobileNo: $contactMobileNo,
contactEmail: $contactEmail,
) {
  id,
  investorName,
  commercial,
  industrial,
  retail,
  residential,
  hotel,
  contacts {
    id
      name
      position
      officeNo
      mobileNo
      email
  },
  wc,
  gau,
  kzn,
  allregions,
  minInvest,
  maxInvest,
  listed,
  unlisted,
  private,
  bee
}

  }
  

`;

const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const saveIcon: IIconProps = { iconName: 'Save' };

interface Props {
    isUpdateInvestorModalOpen: boolean;
    hideUpdateInvestorModal: () => void;
    investors: Investors["investors"],
}

export const UpdateInvestorModal: React.FC<Props> = ({ isUpdateInvestorModalOpen, hideUpdateInvestorModal, investors }) => {

    const [updateInvestor, { data }] = useMutation<Mutation, MutationUpdateInvestorArgs>(UPDATE_INVESTOR);

    const saveUpdatedInvestor = () => {

        updateInvestor({
            variables: {
                investorId: selectedInvestor.investorId!,
                investorName: selectedInvestor.investorName,
                commercial: selectedInvestor.investorCommercial,
                industrial: selectedInvestor.investorIndustrial,
                retail: selectedInvestor.investorRetail,
                residential: selectedInvestor.investorResidential,
                hotel: selectedInvestor.investorHotel,
                wc: selectedInvestor.investorWC,
                gau: selectedInvestor.investorGau,
                kzn: selectedInvestor.investorKZN,
                allregions: selectedInvestor.investorAll,
                minInvest: selectedInvestor.investorMin,
                maxInvest: selectedInvestor.investorMax,
                listed: selectedInvestor.investorListed,
                unlisted: selectedInvestor.investorUnlisted,
                private: selectedInvestor.investorPrivate,
                bee: selectedInvestor.investorBEE,
                contactId: selectedInvestor.contactId,
                contactName: selectedInvestor.contactName,
                contactPosition: selectedInvestor.contactPosition,
                contactOfficeNo: selectedInvestor.contactOfficeNo,
                contactMobileNo: selectedInvestor.contactMobileNo,
                contactEmail: selectedInvestor.contactEmail,
            },

            update(cache, { data }) {

                if (!data) {
                    return null;
                }

                const getExistingInvestors = cache.readQuery<Query>({ query: GET_INVESTORS });

                const existingInvestors = getExistingInvestors ? getExistingInvestors.investors : [];
                const updatedInvestor = data.updateInvestor!;
                const newInvestors = existingInvestors!.map(investor => {
                    if (investor!.id === updatedInvestor.id) {
                        return updatedInvestor;
                    } else {
                        return investor;
                    }

                });
           

                if (existingInvestors)
                    cache.writeQuery<Query>({
                        query: GET_INVESTORS,
                        data: { investors: newInvestors }
                    });
            }


        })

        /* setSelectedInvestor({
            investorId: 0,
            investorName: "",
            contactId: 0,
            contactName: "",
            contactPosition: "",
            contactEmail: "",
            contactOfficeNo: "",
            contactMobileNo: "",
            investorCommercial: false,
            investorIndustrial: false,
            investorRetail: false,
            investorResidential: false,
            investorHotel: false,
            investorWC: false,
            investorGau: false,
            investorKZN: false,
            investorAll: false,
            investorListed: false,
            investorUnlisted: false,
            investorPrivate: false,
            investorBEE: false,
            investorMin: 0,
            investorMax: 0,
        }) */

        hideUpdateInvestorModal()
    }



    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)


    const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 200, marginRight: 20 } };
    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 150, marginRight: 20 } };
    const dropdownSectorStyles: Partial<IDropdownStyles> = { dropdown: { width: 420, marginRight: 20 } };
    const dropdownRegionStyles: Partial<IDropdownStyles> = { dropdown: { width: 420, marginRight: 20 } };
    const toggleStyles: Partial<IToggleStyles> = { container: { marginTop: 5 }, label: { marginLeft: 4 } };

    const modalStyles: Partial<IModalStyles> = { main: { transform: "translate(0px, -80px) " } };

    const headerIconStackStyles: Partial<IStackStyles> = { root: { marginRight: 0, marginLeft: "auto" } }

    const investorTypeOptions = [

        { key: 'Listed', text: 'Listed' },
        { key: 'Unlisted', text: 'Unlisted' },
        { key: 'Private', text: 'Private' },
    ];


    const getInitialType = () => {
       
 var initialType: IDropdownOption = {key:"", text:""}

         if(investors?.listed === true) {
            initialType.key =  "Listed"
            initialType.text = "Listed"
            
         } 
         if(investors?.unlisted === true) {
            initialType.key =  "Unlisted"
            initialType.text = "Unlisted"
         } 
         if(investors?.private === true) {
            initialType.key =  "Private"
            initialType.text = "Private"
         } 
         return initialType
         
        
     }

    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>(getInitialType());

    const onChangeInvestorType = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined): void => {
        if (item !== undefined) {
            setSelectedItem(item);

            switch (item.text) {
                case "Listed":
                    setSelectedInvestor({ ...selectedInvestor, investorListed: true || '', investorUnlisted: false, investorPrivate: false });
                    break;
                case "Unlisted":
                    setSelectedInvestor({ ...selectedInvestor, investorUnlisted: true || '', investorListed: false, investorPrivate: false });
                    break;
                case "Private":
                    setSelectedInvestor({ ...selectedInvestor, investorPrivate: true || '', investorUnlisted: false, investorListed: false });
                    break;
            }
        }
    };

    const onChangeInvestorBEE = (ev: React.MouseEvent<HTMLElement>, checked: boolean | undefined) => {
        if (selectedInvestor.investorBEE === false) {
            setSelectedInvestor({ ...selectedInvestor, investorBEE: true });
        } else {
            setSelectedInvestor({ ...selectedInvestor, investorBEE: false });
        }

    }

    const investorSectorOptions = [

        { key: 'Commercial', text: 'Commercial' },
        { key: 'Industrial', text: 'Industrial' },
        { key: 'Retail', text: 'Retail' },
        { key: 'Residential', text: 'Residential' },
        { key: 'Hotel', text: 'Hotel' },
    ];

    const getInitialSector = () => {
        var initialSector: string[] = []
 
         if(investors?.commercial === true) {
            initialSector = [...initialSector, "Commercial"]
         }
         if(investors?.industrial === true) {
            initialSector = [...initialSector, "Industrial"]
         }
         if(investors?.retail === true) {
            initialSector = [...initialSector, "Retail"]
         }
         if(investors?.residential === true) {
            initialSector = [...initialSector, "Residential"]
         }
         if(investors?.hotel === true) {
            initialSector = [...initialSector, "Hotel"]
         }
         return initialSector
     }

    const [selectedSector, setSelectedSector] = React.useState<string[]>(getInitialSector());

    const onChangeInvestorSector = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined): void => {
        if (item) {

            console.log(item)
            setSelectedSector(
                item.selected ? [...selectedSector, item.key as string] : selectedSector.filter(key => key !== item.key),
            );
        }

        if (item !== undefined) {


            switch (item.text) {
                case "Commercial":
                    if (selectedInvestor.investorCommercial === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorCommercial: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorCommercial: false });
                    }
                    break;
                case "Industrial":
                    if (selectedInvestor.investorIndustrial === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorIndustrial: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorIndustrial: false });
                    }
                    break;
                case "Retail":
                    if (selectedInvestor.investorRetail === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorRetail: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorRetail: false });
                    }
                    break;
                case "Residential":
                    if (selectedInvestor.investorResidential === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorResidential: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorResidential: false });
                    }
                    break;
                case "Hotel":
                    if (selectedInvestor.investorHotel === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorHotel: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorHotel: false });
                    }
                    break;
            }
        }
    };

    const investorRegionOptions = [

        { key: 'WC', text: 'WC' },
        { key: 'Gau', text: 'GAU' },
        { key: 'KZN', text: 'KZN' },
        { key: 'All', text: 'ALL REGIONS' },

    ];

    const getInitialRegion = () => {
        var initialRegion: string[] = []
 
         if(investors?.wc === true) {
             initialRegion = [...initialRegion, "WC"]
         }
         if(investors?.gau === true) {
             initialRegion = [...initialRegion, "Gau"]
         }
         if(investors?.kzn === true) {
             initialRegion = [...initialRegion, "KZN"]
         }
         if(investors?.allregions === true) {
             initialRegion = [...initialRegion, "All"]
         }
         return initialRegion
     }

    const [selectedRegion, setSelectedRegion] = React.useState<string[]>(getInitialRegion());


    const onChangeInvestorRegion = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined): void => {
        if (item) {

            console.log(item)
            setSelectedRegion(
                item.selected ? [...selectedRegion, item.key as string] : selectedRegion.filter(key => key !== item.key),
            );
        }

        if (item !== undefined) {

            switch (item.key) {
                case "WC":
                    if (selectedInvestor.investorWC === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorWC: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorWC: false });
                    }
                    break;
                case "Gau":
                    if (selectedInvestor.investorGau === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorGau: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorGau: false });
                    }
                    break;
                case "KZN":
                    if (selectedInvestor.investorKZN === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorKZN: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorKZN: false });
                    }
                    break;
                case "All":
                    if (selectedInvestor.investorAll === false) {
                        setSelectedInvestor({ ...selectedInvestor, investorAll: true || '' });
                    } else {
                        setSelectedInvestor({ ...selectedInvestor, investorAll: false });
                    }
                    break;
            }
        }
    };

    const sliderInvestorMinOnChange = (value: number) => {
        setSelectedInvestor({ ...selectedInvestor, investorMin: value });
    }

    const sliderInvestorMaxOnChange = (value: number) => {
        setSelectedInvestor({ ...selectedInvestor, investorMax: value });
    }

    const sliderAriaValueText = (value: number) => `R${value}m`;
    const sliderValueFormat = (value: number) => `R${value}m`;


    const stackTokens = { childrenGap: 15 };

    const investorId = () => {
        if (investors !== undefined && investors !== null && investors?.id !== undefined && investors?.id !== null) {
            if (investors?.id !== undefined) {
                return investors?.id
            }
        }
    }

    const contactId = () => {
        if (investors !== undefined && investors !== null && investors?.contacts !== undefined && investors?.contacts !== null) {
            if (investors?.contacts[0] !== null) {
                return investors?.contacts[0].id

            }
        }
    }


    const contactName = () => {
        if (investors !== undefined && investors !== null && investors?.contacts !== undefined && investors?.contacts !== null) {
            if (investors?.contacts[0] !== null) {
                return investors?.contacts[0].name

            }
        }
    }

    const contactPosition = () => {
        if (investors !== undefined && investors !== null && investors?.contacts !== undefined && investors?.contacts !== null) {
            if (investors?.contacts[0] !== null) {
                if (investors?.contacts[0].position !== null)
                    return investors?.contacts[0].position

            }
        }
    }

    const contactEmail = () => {
        if (investors !== undefined && investors !== null && investors?.contacts !== undefined && investors?.contacts !== null) {
            if (investors?.contacts[0] !== null) {
                if (investors?.contacts[0].email !== null)
                    return investors?.contacts[0].email

            }
        }
    }

    const contactOfficeNo = () => {
        if (investors !== undefined && investors !== null && investors?.contacts !== undefined && investors?.contacts !== null) {
            if (investors?.contacts[0] !== null) {
                if (investors?.contacts[0].officeNo !== null)
                    return investors?.contacts[0].officeNo

            }
        }
    }

    const contactMobileNo = () => {
        if (investors !== undefined && investors !== null && investors?.contacts !== undefined && investors?.contacts !== null) {
            if (investors?.contacts[0] !== null) {
                if (investors?.contacts[0].mobileNo !== null)
                    return investors?.contacts[0].mobileNo

            }
        }
    }

    const investorMin = () => {
        if (investors !== undefined && investors !== null && investors?.minInvest !== undefined && investors?.minInvest !== null) {

            return investors?.minInvest

        }
    }

    const investorMax = () => {
        if (investors !== undefined && investors !== null && investors?.maxInvest !== undefined && investors?.maxInvest !== null) {

            return investors?.maxInvest

        }
    }

    const investorBEE = () => {
        if (investors !== undefined && investors !== null && investors?.bee !== undefined && investors?.bee !== null) {

            return investors?.bee

        }
    }


    const [selectedInvestor, setSelectedInvestor] = React.useState(
        {
            investorId: investorId(),
            investorName: investors?.investorName,
            contactId: contactId(),
            contactName: contactName(),
            contactPosition: contactPosition(),
            contactEmail: contactEmail(),
            contactOfficeNo: contactOfficeNo(),
            contactMobileNo: contactMobileNo(),
            investorCommercial: investors?.commercial,
            investorIndustrial: investors?.industrial,
            investorRetail: investors?.retail,
            investorResidential: investors?.residential,
            investorHotel: investors?.hotel,
            investorWC: investors?.wc,
            investorGau: investors?.gau,
            investorKZN: investors?.kzn,
            investorAll: investors?.allregions,
            investorListed: investors?.listed,
            investorUnlisted: investors?.unlisted,
            investorPrivate: investors?.private,
            investorBEE: investorBEE(),
            investorMin: investors?.minInvest,
            investorMax: investors?.maxInvest,
        });

    

    const onChangeInvestorName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setSelectedInvestor({ ...selectedInvestor, investorName: newValue || '' });
        },
        [selectedInvestor],
    );

    const onChangeContactName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setSelectedInvestor({ ...selectedInvestor, contactName: newValue || '' });
        },
        [selectedInvestor],
    );
    const onChangeContactPosition = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setSelectedInvestor({ ...selectedInvestor, contactPosition: newValue || '' });
        },
        [selectedInvestor],
    );
    const onChangeContactEmail = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setSelectedInvestor({ ...selectedInvestor, contactEmail: newValue || '' });
        },
        [selectedInvestor],
    );
    const onChangeContactOfficeNo = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setSelectedInvestor({ ...selectedInvestor, contactOfficeNo: newValue || '' });
        },
        [selectedInvestor],
    );
    const onChangeContactMobileNo = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setSelectedInvestor({ ...selectedInvestor, contactMobileNo: newValue || '' });
        },
        [selectedInvestor],
    );


    



    const titleId = useId('title');



    return (
        <div>


            <Modal
                styles={modalStyles}
                titleAriaId={titleId}
                isOpen={isUpdateInvestorModalOpen}
                onDismiss={hideUpdateInvestorModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>Update Investor</span>
                    <Stack horizontal
                        styles={headerIconStackStyles}
                    >

                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={saveIcon}
                            ariaLabel="Save Investor"
                            onClick={saveUpdatedInvestor}
                        />
                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={cancelIcon}
                            ariaLabel="Close popup modal"
                            onClick={hideUpdateInvestorModal}
                        />

                    </Stack>

                </div>
                <div className={contentStyles.body} >

                    <Stack tokens={stackTokens}>
                        <Stack horizontal
                            styles={{
                                root: {
                                    /* width: '400px', */
                                    /*  margin: '10px', */

                                    color: '#605e5c',

                                    marginLeft: "0",
                                    marginRight: "auto",
                                    /* display: "block" */

                                }
                            }}>
                            <TextField
                                label="Investor Name"
                                value={selectedInvestor.investorName}
                                onChange={onChangeInvestorName}
                                styles={textFieldStyles}

                            />

                            <Dropdown
                                label="Investor Type"
                                selectedKey={selectedItem ? selectedItem.key : undefined}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={onChangeInvestorType}
                                placeholder="Select type"
                                options={investorTypeOptions}
                                styles={dropdownStyles}
                            />

                            <Toggle styles={toggleStyles} label="BEE?" onChange={onChangeInvestorBEE} checked={selectedInvestor.investorBEE}  />

                        </Stack>

                        <Stack horizontal>

                            <TextField
                                label="Contact Name"
                                value={selectedInvestor.contactName}
                                onChange={onChangeContactName}
                                styles={textFieldStyles}
                            />
                            <TextField
                                label="Contact Position"
                                value={selectedInvestor.contactPosition}
                                onChange={onChangeContactPosition}
                                styles={textFieldStyles}
                            />

                        </Stack>
                        <Stack horizontal>

                            <TextField
                                label="Contact Email"
                                value={selectedInvestor.contactEmail}
                                onChange={onChangeContactEmail}
                                styles={textFieldStyles}
                            />

                        </Stack>

                        <Stack horizontal>

                            <TextField
                                label="Contact Office No"
                                value={selectedInvestor.contactOfficeNo}
                                onChange={onChangeContactOfficeNo}
                                styles={textFieldStyles}
                            />
                            <TextField
                                label="Contact Mobile No"
                                value={selectedInvestor.contactMobileNo}
                                onChange={onChangeContactMobileNo}
                                styles={textFieldStyles}
                            />

                        </Stack>

                        <Stack horizontal>

                            <Dropdown
                                placeholder="Select Sector"
                                label="Sectors"
                                selectedKeys={selectedSector}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={onChangeInvestorSector}
                                multiSelect
                                options={investorSectorOptions}
                                styles={dropdownSectorStyles}
                            />

                        </Stack>

                        <Stack horizontal>

                            <Dropdown
                                placeholder="Select Region"
                                label="Regions"
                                selectedKeys={selectedRegion}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={onChangeInvestorRegion}
                                multiSelect
                                options={investorRegionOptions}
                                styles={dropdownRegionStyles}
                            />

                        </Stack>

                        <Stack>

                            <Slider
                                label="Minimum Investment"
                                max={200}
                                value={selectedInvestor.investorMin!}
                                showValue
                                step={20}
                                ariaValueText={sliderAriaValueText}
                                valueFormat={sliderValueFormat}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={sliderInvestorMinOnChange}
                            />

                        </Stack>

                        <Stack>

                            <Slider
                                label="Maximum Investment"
                                max={1000}
                                value={selectedInvestor.investorMax!}
                                showValue
                                step={100}
                                ariaValueText={sliderAriaValueText}
                                valueFormat={sliderValueFormat}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={sliderInvestorMaxOnChange}
                            />

                        </Stack>




                    </Stack>


                </div>
            </Modal>
        </div>
    );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        width: 600,

    },

    header: [

        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});

const iconButtonStyles = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: "10px !important",
        marginTop: '4px',
        marginRight: '2px',

    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
    icon: {
        fontSize: "24px",

    }
};

export default UpdateInvestorModal

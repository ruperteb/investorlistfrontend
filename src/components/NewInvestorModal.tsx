import React, { useState } from 'react';
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
    mergeStyles,
} from 'office-ui-fabric-react';
import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationPostInvestorArgs, Query } from "../../src/schematypes/schematypes"

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

const NEW_INVESTOR = gql`
  mutation PostInvestor (
      $investorName: String!,
      $commercial: Boolean,
   $industrial: Boolean,
   $retail: Boolean,
   $residential: Boolean ,
   $hotel: Boolean,
  
   $wc: Boolean,
   $gau: Boolean,
   $kzn: Boolean,
   $allregions: Boolean,

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

    postInvestor (
  
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
 contactName: $contactName,
  contactPosition: $contactPosition,
 contactOfficeNo: $contactOfficeNo,
contactMobileNo: $contactMobileNo,
contactEmail: $contactEmail,
) {
  id
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
    isNewInvestorModalOpen: boolean;
    hideNewInvestorModal: () => void
}

export const NewInvestorModal: React.FC<Props> = ({ isNewInvestorModalOpen, hideNewInvestorModal }) => {

    const [postInvestor, { data }] = useMutation<Mutation, MutationPostInvestorArgs>(NEW_INVESTOR);

    const saveNewInvestor = () => {

        postInvestor({
            variables: {

                investorName: newInvestor.investorName,
                commercial: newInvestor.investorCommercial,
                industrial: newInvestor.investorIndustrial,
                retail: newInvestor.investorRetail,
                residential: newInvestor.investorResidential,
                hotel: newInvestor.investorHotel,
                wc: newInvestor.investorWC,
                gau: newInvestor.investorGau,
                kzn: newInvestor.investorKZN,
                allregions: newInvestor.investorAll,
                minInvest: newInvestor.investorMin,
                maxInvest: newInvestor.investorMax,
                listed: newInvestor.investorListed,
                unlisted: newInvestor.investorUnlisted,
                private: newInvestor.investorPrivate,
                bee: newInvestor.investorBEE,
                contactName: newInvestor.contactName,
                contactPosition: newInvestor.contactPosition,
                contactOfficeNo: newInvestor.contactOfficeNo,
                contactMobileNo: newInvestor.contactMobileNo,
                contactEmail: newInvestor.contactEmail,
            },

            update(cache, { data }) {

                if (!data) {
                    return null;
                }

                const getExistingInvestors = cache.readQuery<Query>({ query: GET_INVESTORS });
                // Add the new todo to the cache
                const existingInvestors = getExistingInvestors ? getExistingInvestors.investors : [];
                const newInvestor = data.postInvestor!/* .returning[0] */;
                if (existingInvestors)
                    cache.writeQuery<Query>({
                        query: GET_INVESTORS,
                        data: { investors: [newInvestor, ...existingInvestors] }
                    });
            }


        })

        setNewInvestor({
            investorName: "",
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
        })
        hideNewInvestorModal()
    }

    /* const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false); */

    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)


    const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 200, marginRight: 20 } };
    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 150, marginRight: 20 } };
    const dropdownSectorStyles: Partial<IDropdownStyles> = { dropdown: { width: 420, marginRight: 20 } };
    const dropdownRegionStyles: Partial<IDropdownStyles> = { dropdown: { width: 420, marginRight: 20 } };
    const toggleStyles: Partial<IToggleStyles> = { container: { marginTop: 5 }, label: { marginLeft: 4 } };

    const modalStyles: Partial<IModalStyles> = { main: { transform: "translate(0px, -80px) " },  };
    
     

    const headerIconStackStyles: Partial<IStackStyles> = { root: { marginRight: 0, marginLeft: "auto",  } }

    const investorTypeOptions = [

        { key: 'Listed', text: 'Listed' },
        { key: 'Unlisted', text: 'Unlisted' },
        { key: 'Private', text: 'Private' },
    ];



    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();



    const onChangeInvestorType = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined): void => {
        if (item !== undefined) {
            setSelectedItem(item);

            switch (item.text) {
                case "Listed":
                    setNewInvestor({ ...newInvestor, investorListed: true || '', investorUnlisted: false, investorPrivate: false });
                    break;
                case "Unlisted":
                    setNewInvestor({ ...newInvestor, investorUnlisted: true || '', investorListed: false, investorPrivate: false });
                    break;
                case "Private":
                    setNewInvestor({ ...newInvestor, investorPrivate: true || '', investorUnlisted: false, investorListed: false });
                    break;
            }
        }
    };

    const onChangeInvestorBEE = (ev: React.MouseEvent<HTMLElement>, checked: boolean | undefined) => {
        if (newInvestor.investorBEE === false) {
            setNewInvestor({ ...newInvestor, investorBEE: true });
        } else {
            setNewInvestor({ ...newInvestor, investorBEE: false });
        }

    }

    const investorSectorOptions = [

        { key: 'Commercial', text: 'Commercial' },
        { key: 'Industrial', text: 'Industrial' },
        { key: 'Retail', text: 'Retail' },
        { key: 'Residential', text: 'Residential' },
        { key: 'Hotel', text: 'Hotel' },
    ];

    const [selectedSector, setSelectedSector] = React.useState<string[]>([]);

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
                    if (newInvestor.investorCommercial === false) {
                        setNewInvestor({ ...newInvestor, investorCommercial: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorCommercial: false });
                    }
                    break;
                case "Industrial":
                    if (newInvestor.investorIndustrial === false) {
                        setNewInvestor({ ...newInvestor, investorIndustrial: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorIndustrial: false });
                    }
                    break;
                case "Retail":
                    if (newInvestor.investorRetail === false) {
                        setNewInvestor({ ...newInvestor, investorRetail: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorRetail: false });
                    }
                    break;
                case "Residential":
                    if (newInvestor.investorResidential === false) {
                        setNewInvestor({ ...newInvestor, investorResidential: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorResidential: false });
                    }
                    break;
                case "Hotel":
                    if (newInvestor.investorHotel === false) {
                        setNewInvestor({ ...newInvestor, investorHotel: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorHotel: false });
                    }
                    break;
            }
        }
    };

    const investorRegionOptions = [

        { key: 'WC', text: 'WC' },
        { key: 'Gau', text: 'GAU' },
        { key: 'KZN', text: 'KZN' },
        { key: 'All', text: 'Other Regions' },

    ];

    const [selectedRegion, setSelectedRegion] = React.useState<string[]>([]);

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
                    if (newInvestor.investorWC === false) {
                        setNewInvestor({ ...newInvestor, investorWC: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorWC: false });
                    }
                    break;
                case "Gau":
                    if (newInvestor.investorGau === false) {
                        setNewInvestor({ ...newInvestor, investorGau: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorGau: false });
                    }
                    break;
                case "KZN":
                    if (newInvestor.investorKZN === false) {
                        setNewInvestor({ ...newInvestor, investorKZN: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorKZN: false });
                    }
                    break;
                case "All":
                    if (newInvestor.investorAll === false) {
                        setNewInvestor({ ...newInvestor, investorAll: true || '' });
                    } else {
                        setNewInvestor({ ...newInvestor, investorAll: false });
                    }
                    break;
            }
        }
    };

    const sliderInvestorMinOnChange = (value: number) => {
        setNewInvestor({ ...newInvestor, investorMin: value });
    }

    const sliderInvestorMaxOnChange = (value: number) => {
        setNewInvestor({ ...newInvestor, investorMax: value });
    }

    const sliderAriaValueText = (value: number) => `R${value}m`;
    const sliderValueFormat = (value: number) => `R${value}m`;


    const stackTokens = { childrenGap: 15 };

    const [newInvestor, setNewInvestor] = React.useState(
        {
            investorName: "",
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
        });

    const onChangeInvestorName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewInvestor({ ...newInvestor, investorName: newValue || '' });
        },
        [newInvestor],
    );

    const onChangeContactName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewInvestor({ ...newInvestor, contactName: newValue || '' });
        },
        [newInvestor],
    );
    const onChangeContactPosition = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewInvestor({ ...newInvestor, contactPosition: newValue || '' });
        },
        [newInvestor],
    );
    const onChangeContactEmail = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewInvestor({ ...newInvestor, contactEmail: newValue || '' });
        },
        [newInvestor],
    );
    const onChangeContactOfficeNo = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewInvestor({ ...newInvestor, contactOfficeNo: newValue || '' });
        },
        [newInvestor],
    );
    const onChangeContactMobileNo = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewInvestor({ ...newInvestor, contactMobileNo: newValue || '' });
        },
        [newInvestor],
    );

    const titleId = useId('title');

    return (
        <div>


            <Modal
                styles={modalStyles}
            
                titleAriaId={titleId}
                isOpen={isNewInvestorModalOpen}
                onDismiss={hideNewInvestorModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>New Investor</span>
                    <Stack horizontal
                        styles={headerIconStackStyles}
                    >

                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={saveIcon}
                            ariaLabel="Save Investor"
                            onClick={saveNewInvestor}
                        />
                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={cancelIcon}
                            ariaLabel="Close popup modal"
                            onClick={hideNewInvestorModal}
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
                                value={newInvestor.investorName}
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

                            <Toggle styles={toggleStyles} label="BEE?" onChange={onChangeInvestorBEE} />

                        </Stack>

                        <Stack horizontal>

                            <TextField
                                label="Contact Name"
                                value={newInvestor.contactName}
                                onChange={onChangeContactName}
                                styles={textFieldStyles}
                            />
                            <TextField
                                label="Contact Position"
                                value={newInvestor.contactPosition}
                                onChange={onChangeContactPosition}
                                styles={textFieldStyles}
                            />

                        </Stack>
                        <Stack horizontal>

                            <TextField
                                label="Contact Email"
                                value={newInvestor.contactEmail}
                                onChange={onChangeContactEmail}
                                styles={textFieldStyles}
                            />

                        </Stack>

                        <Stack horizontal>

                            <TextField
                                label="Contact Office No"
                                value={newInvestor.contactOfficeNo}
                                onChange={onChangeContactOfficeNo}
                                styles={textFieldStyles}
                            />
                            <TextField
                                label="Contact Mobile No"
                                value={newInvestor.contactMobileNo}
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
                                value={newInvestor.investorMin}
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
                                value={newInvestor.investorMax}
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

export default NewInvestorModal

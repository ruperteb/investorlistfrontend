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
    notes
    contacts {
      id
      name
      position
      officeNo
      mobileNo
      email
      investorName {
          id
      }
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
   $notes: String,
      
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
  notes: $notes,
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
  notes
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
    isUpdateInvestorNotesModalOpen: boolean;
    hideUpdateInvestorNotesModal: () => void;
    investors: Investors["investors"],
}

export const UpdateInvestorNotesModal: React.FC<Props> = ({ isUpdateInvestorNotesModalOpen, hideUpdateInvestorNotesModal, investors }) => {

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
                notes: selectedInvestor.notes,
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

        hideUpdateInvestorNotesModal()
    }



    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)


    const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 550, marginRight: 20 } };

    const modalStyles: Partial<IModalStyles> = { main: { transform: "translate(0px, -80px) " } };

    const headerIconStackStyles: Partial<IStackStyles> = { root: { marginRight: 0, marginLeft: "auto" } }

 

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
            notes: investors?.notes
        });

    


    const titleId = useId('title');

    const [multilineNotes, { toggle: toggleMultilineNotes }] = useBoolean(false);

    useEffect(()=>{
        if(selectedInvestor.notes?.length! >60 && multilineNotes===false )
        {
            toggleMultilineNotes();
        }
        if (selectedInvestor.notes?.length! <=60 && multilineNotes===true )
        {
            toggleMultilineNotes();
        }

    },[selectedInvestor.notes])
   
  const onChangeNotes = React.useCallback(
        (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string|undefined): void => {
    /* const newMultiline = newValue!.length > 60;
    if (newMultiline !== multilineNotes ) {
      toggleMultilineNotes();
    } */
    setSelectedInvestor({ ...selectedInvestor, notes: newValue || '' });

  },[selectedInvestor]
  )


    return (
        <div>


            <Modal
                styles={modalStyles}
                titleAriaId={titleId}
                isOpen={isUpdateInvestorNotesModalOpen}
                onDismiss={hideUpdateInvestorNotesModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
    <span id={titleId}>{selectedInvestor.investorName}</span>
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
                            onClick={hideUpdateInvestorNotesModal}
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
                            <TextField multiline={multilineNotes} autoAdjustHeight
                                label="Notes"
                                value={selectedInvestor.notes!}
                                onChange={onChangeNotes}
                                styles={textFieldStyles}

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

export default UpdateInvestorNotesModal

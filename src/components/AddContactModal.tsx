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
import { Mutation, MutationPostContactArgs, Query, Investors } from "../../src/schematypes/schematypes"

/* const GET_CONTACTS = gql`
    
    query {
  contacts {
    id
    name
    position
    email
    officeNo
    mobileNo
    investorName{
      id
    }
    }
    }
  
    ` */

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

const NEW_CONTACT = gql`
  mutation PostContact (
     
    $investorID: Int,
   $contactName: String,
   $contactPosition: String,
   $contactOfficeNo: String,
   $contactMobileNo: String,
   $contactEmail: String,
      
      ) {

    postContact (
  investorID: $investorID,
 contactName: $contactName,
  contactPosition: $contactPosition,
 contactOfficeNo: $contactOfficeNo,
contactMobileNo: $contactMobileNo,
contactEmail: $contactEmail,
) {
    id
    name
    email
    officeNo
    mobileNo
    investorName{
      id
    }

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
    isNewContactModalOpen: boolean;
    hideNewContactModal: () => void;
    investors: Investors["investors"],
}

export const AddContactModal: React.FC<Props> = ({ isNewContactModalOpen, hideNewContactModal, investors }) => {

    const [newContact, setNewContact] = React.useState(
        {
            investorID: investors?.id,
            contactName: "",
            contactPosition: "",
            contactEmail: "",
            contactOfficeNo: "",
            contactMobileNo: "",

        });

    const [postContact, { data }] = useMutation<Mutation, MutationPostContactArgs>(NEW_CONTACT);

    const saveNewContact = () => {

        postContact({
            variables: {
                investorID: newContact.investorID,
                contactName: newContact.contactName,
                contactPosition: newContact.contactPosition,
                contactOfficeNo: newContact.contactOfficeNo,
                contactMobileNo: newContact.contactMobileNo,
                contactEmail: newContact.contactEmail,
            },

            update(cache, { data }) {

                if (!data) {
                    return null;
                }

                const getExistingInvestors = cache.readQuery<Query>({ query: GET_INVESTORS });
             
                const existingInvestors = getExistingInvestors ? getExistingInvestors.investors : [];
                const newContact = data.postContact!;

                const newInvestors = existingInvestors!.map(investor => {
                    if (investor!.id === investors!.id) {
                        const updatedInvestor = {...investor!, contacts:[...investor!.contacts!, newContact]}
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
        
/* 
                if (existingContacts)
                    cache.writeQuery<Query>({
                        query: GET_CONTACTS,
                        data: { contacts: [newContact, ...existingContacts] }
                    }); */
            }


        })

        setNewContact({
            investorID: investors?.id,
            contactName: "",
            contactPosition: "",
            contactEmail: "",
            contactOfficeNo: "",
            contactMobileNo: "",

        })
        hideNewContactModal()
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

    const modalStyles: Partial<IModalStyles> = { main: { transform: "translate(0px, -80px) " }, };



    const headerIconStackStyles: Partial<IStackStyles> = { root: { marginRight: 0, marginLeft: "auto", } }

    const stackTokens = { childrenGap: 15 };

    const onChangeContactName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewContact({ ...newContact, contactName: newValue || '' });
        },
        [newContact],
    );
    const onChangeContactPosition = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewContact({ ...newContact, contactPosition: newValue || '' });
        },
        [newContact],
    );
    const onChangeContactEmail = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewContact({ ...newContact, contactEmail: newValue || '' });
        },
        [newContact],
    );
    const onChangeContactOfficeNo = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewContact({ ...newContact, contactOfficeNo: newValue || '' });
        },
        [newContact],
    );
    const onChangeContactMobileNo = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setNewContact({ ...newContact, contactMobileNo: newValue || '' });
        },
        [newContact],
    );

    const titleId = useId('title');

    return (
        <div>


            <Modal
                styles={modalStyles}

                titleAriaId={titleId}
                isOpen={isNewContactModalOpen}
                onDismiss={hideNewContactModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>Add Contact</span>
                    <Stack horizontal
                        styles={headerIconStackStyles}
                    >

                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={saveIcon}
                            ariaLabel="Save Contact"
                            onClick={saveNewContact}
                        />
                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={cancelIcon}
                            ariaLabel="Close popup modal"
                            onClick={hideNewContactModal}
                        />

                    </Stack>

                </div>
                <div className={contentStyles.body} >

                    <Stack tokens={stackTokens}>
                      

                        <Stack horizontal>

                            <TextField
                                label="Contact Name"
                                value={newContact.contactName}
                                onChange={onChangeContactName}
                                styles={textFieldStyles}
                            />
                            <TextField
                                label="Contact Position"
                                value={newContact.contactPosition}
                                onChange={onChangeContactPosition}
                                styles={textFieldStyles}
                            />

                        </Stack>
                        <Stack horizontal>

                            <TextField
                                label="Contact Email"
                                value={newContact.contactEmail}
                                onChange={onChangeContactEmail}
                                styles={textFieldStyles}
                            />

                        </Stack>

                        <Stack horizontal>

                            <TextField
                                label="Contact Office No"
                                value={newContact.contactOfficeNo}
                                onChange={onChangeContactOfficeNo}
                                styles={textFieldStyles}
                            />
                            <TextField
                                label="Contact Mobile No"
                                value={newContact.contactMobileNo}
                                onChange={onChangeContactMobileNo}
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

export default AddContactModal

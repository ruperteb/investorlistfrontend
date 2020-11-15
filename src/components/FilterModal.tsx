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
} from 'office-ui-fabric-react';







const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const filterIcon: IIconProps = { iconName: 'Filter' };
const clearFilterIcon: IIconProps = { iconName: 'ClearFilter' };

interface Props {
    isFilterModalOpen: boolean;
    hideFilterModal: () => void;
    multiFilter: {
        filterCommercial: boolean
        filterIndustrial: boolean
        filterRetail: boolean
        filterResidential: boolean
        filterHotel: boolean
        filterWC: boolean
        filterGau: boolean
        filterKZN: boolean
        filterAll: boolean
        filterListed: boolean
        filterUnlisted: boolean
        filterPrivate: boolean
        filterBEE: boolean
        filterMin: number
        filterMax: number
    };
    setMultiFilter: React.Dispatch<React.SetStateAction<{
        filterCommercial: boolean
        filterIndustrial: boolean
        filterRetail: boolean
        filterResidential: boolean
        filterHotel: boolean
        filterWC: boolean
        filterGau: boolean
        filterKZN: boolean
        filterAll: boolean
        filterListed: boolean
        filterUnlisted: boolean
        filterPrivate: boolean
        filterBEE: boolean
        filterMin: number
        filterMax: number
    }>>
    setSelectedInvestorType: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export const FilterModal: React.FC<Props> = ({ isFilterModalOpen, hideFilterModal, multiFilter, setMultiFilter, setSelectedInvestorType }) => {

    const [multiFilterCache, setMultiFilterCache] = React.useState(
        {
          filterCommercial: false,
          filterIndustrial: false,
          filterRetail: false,
          filterResidential: false,
          filterHotel: false,
          filterWC: false,
          filterGau: false,
          filterKZN: false,
          filterAll: false,
          filterListed: false,
          filterUnlisted: false,
          filterPrivate: false,
          filterBEE: false,
          filterMin: 0,
          filterMax: 1000,
        });


const applyFilter =() => {
    setSelectedInvestorType("multifilter")
    setMultiFilter(multiFilterCache)
}

const clearFilter = () => {

    setMultiFilter({
        filterCommercial: false,
      filterIndustrial: false,
      filterRetail: false,
      filterResidential: false,
      filterHotel: false,
      filterWC: false,
      filterGau: false,
      filterKZN: false,
      filterAll: false,
      filterListed: false,
      filterUnlisted: false,
      filterPrivate: false,
      filterBEE: false,
      filterMin: 0,
      filterMax: 1000,
    })
    setMultiFilterCache({
        filterCommercial: false,
      filterIndustrial: false,
      filterRetail: false,
      filterResidential: false,
      filterHotel: false,
      filterWC: false,
      filterGau: false,
      filterKZN: false,
      filterAll: false,
      filterListed: false,
      filterUnlisted: false,
      filterPrivate: false,
      filterBEE: false,
      filterMin: 0,
      filterMax: 1000,
    })
    setSelectedType([])
    setSelectedSector([])
    setSelectedRegion([])
    
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

    const modalStyles: Partial<IModalStyles> = { main: { transform: "translate(0px, -80px) " } };

    const headerIconStackStyles: Partial<IStackStyles> = { root: { marginRight: 0, marginLeft: "auto" } }












    const filterTypeOptions = [

        { key: 'Listed', text: 'Listed' },
        { key: 'Unlisted', text: 'Unlisted' },
        { key: 'Private', text: 'Private' },
        { key: 'BEE', text: 'BEE' },

    ];

    const [selectedType, setSelectedType] = React.useState<string[]>([]);

    const onChangefilterType = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined): void => {
        if (item) {

            console.log(item)
            setSelectedType(
                item.selected ? [...selectedType, item.key as string] : selectedType.filter(key => key !== item.key),
            );
        }

        if (item !== undefined) {


            switch (item.text) {
                case "Listed":
                    if (multiFilterCache.filterListed === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterListed: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterListed: false });
                    }
                    break;
                case "Unlisted":
                    if (multiFilterCache.filterUnlisted === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterUnlisted: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterUnlisted: false });
                    }
                    break;
                case "Private":
                    if (multiFilterCache.filterPrivate === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterPrivate: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterPrivate: false });
                    }
                    break;
                case "BEE":
                    if (multiFilterCache.filterBEE === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterBEE: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterBEE: false });
                    }
                    break;

            }
        }
    };

    const filterSectorOptions = [

        { key: 'Commercial', text: 'Commercial' },
        { key: 'Industrial', text: 'Industrial' },
        { key: 'Retail', text: 'Retail' },
        { key: 'Residential', text: 'Residential' },
        { key: 'Hotel', text: 'Hotel' },
    ];

    const [selectedSector, setSelectedSector] = React.useState<string[]>([]);

    const onChangefilterSector = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined): void => {
        if (item) {

            console.log(item)
            setSelectedSector(
                item.selected ? [...selectedSector, item.key as string] : selectedSector.filter(key => key !== item.key),
            );
        }

        if (item !== undefined) {


            switch (item.text) {
                case "Commercial":
                    if (multiFilterCache.filterCommercial === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterCommercial: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterCommercial: false });
                    }
                    break;
                case "Industrial":
                    if (multiFilterCache.filterIndustrial === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterIndustrial: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterIndustrial: false });
                    }
                    break;
                case "Retail":
                    if (multiFilterCache.filterRetail === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterRetail: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterRetail: false });
                    }
                    break;
                case "Residential":
                    if (multiFilterCache.filterResidential === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterResidential: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterResidential: false });
                    }
                    break;
                case "Hotel":
                    if (multiFilterCache.filterHotel === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterHotel: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterHotel: false });
                    }
                    break;
            }
        }
    };

    const filterRegionOptions = [

        { key: 'WC', text: 'WC' },
        { key: 'Gau', text: 'GAU' },
        { key: 'KZN', text: 'KZN' },
        { key: 'All', text: 'ALL REGIONS' },

    ];

    const [selectedRegion, setSelectedRegion] = React.useState<string[]>([]);

    const onChangefilterRegion = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined): void => {
        if (item) {

            console.log(item)
            setSelectedRegion(
                item.selected ? [...selectedRegion, item.key as string] : selectedRegion.filter(key => key !== item.key),
            );
        }

        if (item !== undefined) {

            switch (item.key) {
                case "WC":
                    if (multiFilterCache.filterWC === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterWC: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterWC: false });
                    }
                    break;
                case "Gau":
                    if (multiFilterCache.filterGau === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterGau: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterGau: false });
                    }
                    break;
                case "KZN":
                    if (multiFilterCache.filterKZN === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterKZN: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterKZN: false });
                    }
                    break;
                case "All":
                    if (multiFilterCache.filterAll === false) {
                        setMultiFilterCache({ ...multiFilterCache, filterAll: true || '' });
                    } else {
                        setMultiFilterCache({ ...multiFilterCache, filterAll: false });
                    }
                    break;
            }
        }
    };

    const sliderfilterMinOnChange = (value: number) => {
        setMultiFilterCache({ ...multiFilterCache, filterMin: value });
    }

    const sliderfilterMaxOnChange = (value: number) => {
        setMultiFilterCache({ ...multiFilterCache, filterMax: value });
    }

    const sliderAriaValueText = (value: number) => `R${value}m`;
    const sliderValueFormat = (value: number) => `R${value}m`;


    const stackTokens = { childrenGap: 15 };

    /* const [filter, setfilter] = React.useState(
        {
            filterCommercial: false,
            filterIndustrial: false,
            filterRetail: false,
            filterResidential: false,
            filterHotel: false,
            filterWC: false,
            filterGau: false,
            filterKZN: false,
            filterAll: false,
            filterListed: false,
            filterUnlisted: false,
            filterPrivate: false,
            filterBEE: false,
            filterMin: 0,
            filterMax: 0,
        }); */

    







    const titleId = useId('title');



    return (
        <div>


            <Modal
                styles={modalStyles}
                titleAriaId={titleId}
                isOpen={isFilterModalOpen}
                onDismiss={hideFilterModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>Filter Investors</span>
                    <Stack horizontal
                        styles={headerIconStackStyles}
                    >

                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={filterIcon}
                            ariaLabel="Save filter"
                        onClick={applyFilter}
                        />
                         <IconButton
                            styles={iconButtonStyles}
                            iconProps={clearFilterIcon}
                            ariaLabel="Clear filter"
                        onClick={clearFilter}
                        />
                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={cancelIcon}
                            ariaLabel="Close popup modal"
                            onClick={hideFilterModal}
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


                            <Dropdown
                                placeholder="Select Investor Type"
                                label="Investor Types"
                                selectedKeys={selectedType}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={onChangefilterType}
                                multiSelect
                                options={filterTypeOptions}
                                styles={dropdownSectorStyles}
                            />



                        </Stack>






                        <Stack horizontal>

                            <Dropdown
                                placeholder="Select Sector"
                                label="Sectors"
                                selectedKeys={selectedSector}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={onChangefilterSector}
                                multiSelect
                                options={filterSectorOptions}
                                styles={dropdownSectorStyles}
                            />

                        </Stack>

                        <Stack horizontal>

                            <Dropdown
                                placeholder="Select Region"
                                label="Regions"
                                selectedKeys={selectedRegion}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={onChangefilterRegion}
                                multiSelect
                                options={filterRegionOptions}
                                styles={dropdownRegionStyles}
                            />

                        </Stack>

                        <Stack>

                            <Slider
                                label="Minimum Investment"
                                max={200}
                                value={multiFilterCache.filterMin}
                                showValue
                                step={20}
                                ariaValueText={sliderAriaValueText}
                                valueFormat={sliderValueFormat}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={sliderfilterMinOnChange}
                            />

                        </Stack>

                        <Stack>

                            <Slider
                                label="Maximum Investment"
                                max={1000}
                                value={multiFilterCache.filterMax}
                                showValue
                                step={100}
                                ariaValueText={sliderAriaValueText}
                                valueFormat={sliderValueFormat}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={sliderfilterMaxOnChange}
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

export default FilterModal

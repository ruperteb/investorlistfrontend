import React, { useCallback, useEffect } from "react";
import { Stack, Text, Link, FontWeights } from "office-ui-fabric-react";
import {
  DefaultButton,
  PrimaryButton,
} from "office-ui-fabric-react/lib/Button";
import { useId, useBoolean } from "@uifabric/react-hooks";
import {
  TextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import { Panel } from "office-ui-fabric-react/lib/Panel";
import Login from "../src/components/Login";
import Navigation from "../src/components/Navigation";
import InvestorList from "../src/components/InvestorList";
import NewInvestorModal from "../src/components/NewInvestorModal";
import UpdateInvestorModal from "../src/components/UpdateInvestorModal";
import FilterModal from "../src/components/FilterModal";
import { initializeIcons } from "@uifabric/icons";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import {
  Query,
  Investor,
  SelectedInvestor,
} from "../src/schematypes/schematypes";
import { graphql, ChildDataProps } from "@apollo/react-hoc";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
} from "@react-pdf/renderer";
import CallSheet from "./components/CallSheet";
import { isLoggedInVar } from "./cache";
import Loading from "./components/Loading";

import "./App.css";

initializeIcons();

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

export const App: React.FunctionComponent = () => {
  type Login = {
    login: boolean;
    email: string | undefined;
    password: string | undefined;
    name: string;
  };

  const [login, setLogin] = React.useState<Login>({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  console.log(login);

  const onChangeLoginEmail = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue: string | undefined
    ) => {
      setLogin({ ...login, email: newValue });
    },
    [login]
  );

  const onChangeLoginPassword = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue: string | undefined
    ) => {
      setLogin({ ...login, password: newValue });
    },
    [login]
  );

  const setLoginCallback = (value: boolean) => {
    setLogin({ ...login, login: value });
  };

  const [
    isNewInvestorModalOpen,
    { setTrue: showNewInvestorModal, setFalse: hideNewInvestorModal },
  ] = useBoolean(false);
  /* const [isUpdateInvestorModalOpen, { setTrue: showUpdateInvestorModal, setFalse: hideUpdateInvestorModal }] = useBoolean(false); */

  const [
    isFilterModalOpen,
    { setTrue: showFilterModal, setFalse: hideFilterModal },
  ] = useBoolean(false);
  const [
    isSelectedInvestorPanelOpen,
    { setTrue: openPanel, setFalse: dismissPanel },
  ] = useBoolean(false);

  const [selectedInvestorType, setSelectedInvestorType] = React.useState<
    string | undefined
  >("all");
  const [search, setSearch] = React.useState<string | undefined>("");

  const [selectedInvestorList, setSelectedInvestorList] = React.useState<
    SelectedInvestor[]
  >([]);

  const [enquiryName, setEnquiryName] = React.useState("");

  const onChangeEnquiryName = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setEnquiryName(newValue || "");
    },
    []
  );

  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;
  localStorage.clear();

  const { data: dataLogin } = useQuery(IS_LOGGED_IN);
  console.log(dataLogin.isLoggedIn);

  useEffect(() => {
    if (dataLogin.isLoggedIn === true) {
      setLogin({ ...login, login: false });
    } else {
      setLogin({ ...login, login: true });
    }
  }, [dataLogin.isLoggedIn]);

  const textFieldStyles: Partial<ITextFieldStyles> = {
    fieldGroup: { width: 170, marginRight: 20, marginBottom: 20 },
  };
  const buttonStyles = { root: { marginRight: 8 } };

  const onRenderFooterContent = React.useCallback(
    () => (
      <>
        <TextField
          label="Enquiry Name"
          value={enquiryName}
          onChange={onChangeEnquiryName}
          styles={textFieldStyles}
        />
        <div>
          <PDFDownloadLink
            document={
              <CallSheet
                enquiryName={enquiryName}
                selectedInvestorList={selectedInvestorList}
              />
            }
            fileName={`Call-Sheet:${enquiryName}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
                  PDF
                </PrimaryButton>
              )
            }
          </PDFDownloadLink>

          <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
        </div>
      </>
    ),
    [dismissPanel, enquiryName, selectedInvestorList]
  );

  const onSelectInvestor = useCallback(
    (investor: SelectedInvestor) => {
      if (investor.selected === true) {
        setSelectedInvestorList((selectedInvestorList) => [
          ...selectedInvestorList,
          investor,
        ]);
      } else {
        setSelectedInvestorList(
          selectedInvestorList.filter((i) => {
            return i.id !== investor.id;
          })
        );
      }
    },
    [selectedInvestorList]
  );

  console.log(selectedInvestorList);

  const [multiFilter, setMultiFilter] = React.useState({
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

  const GET_INVESTORS = gql`
    query {
      investors {
        id
        investorName
        retail
        commercial
        industrial
        residential
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
        }
      }
    }
  `;
  const { data, loading, error } = useQuery<Query>(GET_INVESTORS);

  const GET_CONTACTS = gql`
    query {
      contacts {
        id
        name
        position
        email
        officeNo
        mobileNo
        investorName {
          id
        }
      }
    }
  `;

  const {
    data: contactsData,
    loading: contactsLoading,
    error: contactsError,
  } = useQuery<Query>(GET_CONTACTS);

  console.log(contactsData);

  const investors: Query["investors"] = data?.investors;

  const multiFilteredInvestors: Query["investors"] = investors?.filter(
    (investor) => {
      if (
        investor !== null &&
        investor !== undefined &&
        investor.minInvest !== null &&
        investor.minInvest !== undefined &&
        investor.maxInvest !== null &&
        investor.maxInvest !== undefined
      ) {
        if (selectedInvestorType === "listed") {
          return investor?.listed === true;
        }
        if (selectedInvestorType === "unlisted") {
          return investor?.unlisted === true;
        }
        if (selectedInvestorType === "private") {
          return investor?.private === true;
        }
        if (selectedInvestorType === "bee") {
          return investor?.bee === true;
        }
        if (selectedInvestorType === "all") {
          return investor;
        }
        if (selectedInvestorType === "multifilter") {
          return (
            ((investor.commercial && multiFilter.filterCommercial) ||
              (investor.industrial && multiFilter.filterIndustrial) ||
              (investor.retail && multiFilter.filterRetail) ||
              (investor.residential && multiFilter.filterResidential) ||
              (investor.hotel && multiFilter.filterHotel)) &&
            ((investor.wc && multiFilter.filterWC) ||
              (investor.gau && multiFilter.filterGau) ||
              (investor.kzn && multiFilter.filterKZN) ||
              (investor.allregions && multiFilter.filterAll)) &&
            investor.minInvest >= multiFilter.filterMin &&
            investor.maxInvest <= multiFilter.filterMax &&
            ((investor.listed && multiFilter.filterListed) ||
              (investor.unlisted && multiFilter.filterUnlisted) ||
              (investor.private && multiFilter.filterPrivate) ||
              (investor.bee && multiFilter.filterBEE))
          );
        }
      }
    }
  );

  const sortedInvestors: Query["investors"] = multiFilteredInvestors?.sort(
    (a, b) => a!.investorName.localeCompare(b!.investorName)
  );

  const filteredInvestors: Query["investors"] = sortedInvestors?.filter(
    (investor) => {
      if (investor !== null && investor !== undefined) {
        if (investor?.contacts !== null && investor?.contacts !== undefined) {
          return (
            investor?.investorName
              .toLowerCase()
              .includes(search!.toLowerCase()) ||
            investor?.contacts[0]?.name
              .toLowerCase()
              .includes(search!.toLowerCase())
          );
        }
      }
    }
  );

  if (loading) return <Loading></Loading>;
  if (error) return <h1>ERROR</h1>;

  if (login.login === true) {
    return (
      <Login
        login={login}
        onChangeLoginEmail={onChangeLoginEmail}
        onChangeLoginPassword={onChangeLoginPassword}
        setLogin={setLogin}
      ></Login>
    );
  }

  return (
    <>
      <Stack
        horizontalAlign="center"
        verticalAlign="start"
        verticalFill
        styles={{
          root: {
            /*  width: '960px', */
            margin: "0 auto",
            textAlign: "center",
            color: "#605e5c",
            /*   backgroundColor: "#b18c481a;" */
            /* marginTop: "100px" */
          },
        }}
        gap={15}
      >
        <Navigation
          showNewInvestorModal={showNewInvestorModal}
          showFilterModal={showFilterModal}
          selectedInvestorType={selectedInvestorType}
          setSelectedInvestorType={setSelectedInvestorType}
          search={search}
          setSearch={setSearch}
          openPanel={openPanel}
          dismissPanel={dismissPanel}
          isSelectedInvestorPanelOpen={isSelectedInvestorPanelOpen}
          setLoginCallback={setLoginCallback}
        ></Navigation>
        <InvestorList
          filteredInvestors={filteredInvestors}
          selectedInvestorType={selectedInvestorType}
          selectedInvestorList={selectedInvestorList}
          onSelectInvestor={onSelectInvestor}
        ></InvestorList>
        <NewInvestorModal
          isNewInvestorModalOpen={isNewInvestorModalOpen}
          hideNewInvestorModal={hideNewInvestorModal}
        ></NewInvestorModal>
        <FilterModal
          isFilterModalOpen={isFilterModalOpen}
          hideFilterModal={hideFilterModal}
          multiFilter={multiFilter}
          setMultiFilter={setMultiFilter}
          setSelectedInvestorType={setSelectedInvestorType}
        ></FilterModal>

        <Panel
          headerText="Selected Investor List"
          // this prop makes the panel non-modal
          isBlocking={false}
          isOpen={isSelectedInvestorPanelOpen}
          onDismiss={dismissPanel}
          closeButtonAriaLabel="Close"
          onRenderFooterContent={onRenderFooterContent}
          isFooterAtBottom={true}
        >
          {selectedInvestorList.map((investor, index) => (
            <Stack horizontal key={index}>
              <Text>{investor.investorName}</Text>
            </Stack>
          ))}
        </Panel>
      </Stack>

      {/* { <div style={{width: "100vw", height: "100vh"}}> 
      <PDFViewer width="100%" height="100%">
    <CallSheet enquiryName={enquiryName} selectedInvestorList={selectedInvestorList} />
  </PDFViewer>

      </div>} */}
    </>
  );
};

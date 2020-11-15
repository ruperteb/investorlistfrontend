import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { SelectedInvestor } from "../schematypes/schematypes"
import { Font } from '@react-pdf/renderer'
import SegoeUI from "../assets/fonts/SegoeUI.ttf"


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderStyle: "solid",
        borderWidth: 2,
        /* margin: "10px" */

    },
    section: {
        fontFamily: 'SegoeUI',
        display: "flex",
        flexDirection: "row",
        margin: 5,
        marginLeft: "auto",
        marginRight: "auto",


        width: "90%",
        /*  borderStyle: "solid",
         borderWidth: 1, */
        /*    flexGrow: 1, */
    },
    headerSection: {
        display: "flex",
        flexDirection: "row",
        
    },
    pageNumbers: {
       marginRight: 20,
       marginLeft: "auto",
       marginTop: 15,
       fontSize: 8
    },
    enquiryHeading: {
        fontFamily: 'SegoeUI',
        margin: 10,
        marginLeft: 40,
        padding: 10,
    },
    investorHeading: {
        
        color: "black",
        width: "90%",
        height: "30px",
        paddingLeft: 20,
        paddingTop: 1.5,
    },
    investorNumber: {

        width: "10%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 10.5,
        paddingTop: 1.5
    },
    columnOne: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        /*    flexGrow: 1, */
    },
    columnOneOne: {
        width: "23%",
        fontSize: 12,
        borderBottomStyle: "solid",
        borderTopWidth: 1,
        borderRightStyle: "solid",
        borderRightWidth: 1,
        height: "30px",
        paddingTop: 7,
        paddingLeft: 5,

    },
    columnOneTwo: {
        width: "57%",
        fontSize: 12,
        fontWeight: 500,
        borderBottomStyle: "solid",
        borderTopWidth: 1,
        height: "30px",
        paddingTop: 7,
        paddingLeft: 7,
    },
    columnOneThreeCalled: {
        width: "20%",
        fontSize: 12,
        borderBottomStyle: "solid",
        borderTopWidth: 1,
        borderLeftStyle: "solid",
        borderLeftWidth: 1,
        height: "30px",
        paddingTop: 7,
        paddingLeft: 9,
    },
    columnOneThreeSent: {
        width: "20%",
        fontSize: 12,
        borderBottomStyle: "solid",
        borderTopWidth: 1,
        borderLeftStyle: "solid",
        borderLeftWidth: 1,
        height: "30px",
        paddingTop: 7,
        paddingLeft: 3,
    },
    columnTwo: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        /*    flexGrow: 1, */
    },
    columnTwoRowOne: {
        width: "100%",
        fontSize: 12,
        /*  borderStyle: "solid", */
        /*   borderWidth: 1, */
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        height: "30px",
        paddingTop: 6,
        paddingLeft: 75,

    },
    columnTwoRowTwo: {
        width: "100%",
        fontSize: 12,

        /* height: "px", */
        paddingTop: 7,
        paddingLeft: 3,
    },
    columnThree: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "10%",
        borderStyle: "solid",
        borderWidth: 1,
        /*    flexGrow: 1, */
    },
    columnThreeOne: {
        width: "100%",
        fontSize: 8,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        height: "30px",
        paddingTop: 8,
        paddingLeft: 3,

    },
    columnThreeTwo: {
        width: "100%",
        fontSize: 8,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        height: "30px",
        paddingTop: 8,
        paddingLeft: 5,

    },
    columnThreeFour: {
        width: "100%",
        fontSize: 8,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        height: "30px",
        paddingTop: 8,
        paddingLeft: 8,

    },
    columnThreeFive: {
        width: "100%",
        fontSize: 8,

        height: "30px",
        paddingTop: 8,
        paddingLeft: 3,

    },
    columnFour: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        /*    flexGrow: 1, */
    },
    columnFourRowOne: {
        width: "100%",
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        height: "30px",
        paddingTop: 6,
        paddingLeft: 75,

    },
    columnFourRowTwo: {
        width: "100%",
        fontSize: 12,

        /* height: "px", */
        paddingTop: 7,
        paddingLeft: 3,
    },
});

Font.registerHyphenationCallback(word => [word]);


Font.register({ family: 'SegoeUI', fonts: [
    { src: SegoeUI}, 
   /*  { src: source2, fontStyle: 'italic' },
    { src: source3, fontStyle: 'italic', fontWeight: 700 }, */
   ]});

interface Props {

    selectedInvestorList: SelectedInvestor[],
    enquiryName: string

}


const CallSheet: React.FC<Props> = ({ selectedInvestorList, enquiryName }) => (




    <Document >
        <Page wrap orientation="landscape" size="A4" style={styles.page}>
            <View fixed style={styles.headerSection}>

                <Text style={styles.enquiryHeading} >Enquiry:  {" " && enquiryName}</Text>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />

            </View>


            {selectedInvestorList.map((investor, index) => (

                <View key={investor.id} wrap={false} style={styles.section}>

                    <View style={styles.columnOne}>

                        <Text style={styles.investorNumber}>{index + 1}</Text>
                        <Text style={styles.investorHeading}>{investor.investorName}</Text>


                        <Text style={styles.columnOneOne}>Contact:</Text>
                        <Text style={styles.columnOneTwo}>{investor!.contacts![0]?.name}</Text>
                        <Text style={styles.columnOneThreeCalled}>Called?</Text>

                        <Text style={styles.columnOneOne}>Office No:</Text>
                        <Text style={styles.columnOneTwo}>{investor!.contacts![0]?.officeNo}</Text>
                        <Text style={styles.columnOneThreeCalled}></Text>

                        <Text style={styles.columnOneOne}>Mobile No:</Text>
                        <Text style={styles.columnOneTwo}>{investor!.contacts![0]?.mobileNo}</Text>
                        <Text style={styles.columnOneThreeSent}>Sent Info?</Text>

                        <Text style={styles.columnOneOne}>Email:</Text>
                        <Text style={styles.columnOneTwo}>{investor!.contacts![0]?.email}</Text>
                        <Text style={styles.columnOneThreeCalled}></Text>
                    </View>

                    <View style={styles.columnTwo}>
                        <Text style={styles.columnTwoRowOne}>Notes</Text>
                        <Text style={styles.columnTwoRowTwo}></Text>

                    </View>

                    <View style={styles.columnThree}>
                        <Text style={styles.columnThreeOne}></Text>
                        <Text style={styles.columnThreeTwo}>Need to follow up?</Text>
                        <Text style={styles.columnThreeOne}></Text>
                        <Text style={styles.columnThreeFour}>Made follow up?</Text>
                        <Text style={styles.columnThreeFive}></Text>
                    </View>

                    <View style={styles.columnFour}>
                        <Text style={styles.columnFourRowOne}>Notes</Text>
                        <Text style={styles.columnFourRowTwo}></Text>

                    </View>

                </View>


            ))}



        </Page>
    </Document>
);

export default CallSheet
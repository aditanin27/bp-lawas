import { Image, ScrollView, Text, View, FlatList, Dimensions, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { test } from '../../assets/images'
import { IconCari, FilterdanText, Locations, Tingkat, Gender } from '../../assets/icons';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class DetailKehadiran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelter: [],
            filter: [],
            cari: '',
            det: [],
            duit: [],
            detail: this.props.route.params.item,

        };
    }
    getdetailAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/penkehadiran/' + this.state.detail.id_anak)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    det: resdata.data,
                    refreshing: false,
                });
            });
    }

    getduitAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/keuangananak/' + this.state.detail.id_anak)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then(resdata => {
                console.log(resdata.data);
                this.setState({
                    duit: resdata.data,
                    refreshing: false,
                });
            });
    }
    componentDidMount() {
        this.getdetailAPi();
        this.getduitAPi();
        console.log(this.state.detail)
    }
    render() {
        const detail = this.state.detail;
        const money = this.state.duit;

        const labels = this.state.det.map(item => {
            return item.Tahun;
        });

        const values = this.state.det.map(item => {
            return item.Hadir;
        });

        const valuesduit = this.state.duit.map(item => {
            return item.jumlah;
        });
        const duit = this.state.duit.map(item => {
            return item.semester;
        });

        const chartduit = {
            labels: duit,
            datasets: [
                {
                    data: valuesduit,
                },
            ],
        };

        const chartData = {
            labels,
            datasets: [
                {
                    data: values,
                },
            ],
        };
        const chartConfig = {

            backgroundGradientFrom: '#fff',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#fff',
            backgroundGradientToOpacity: 0.5,

            fillShadowGradientOpacity: 1,
            color: (opacity = 1) => `#023047`,
            labelColor: (opacity = 1) => `#333`,
            strokeWidth: 2,

            useShadowColorFromDataset: false,
            decimalPlaces: 0,
        };
        return (
            <View style={{ height: '100%', backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#0EBEDF', height: '20%', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}>Detail Laporan Anak</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: '7%' }}>
                        <Image source={test} style={{ height: 100, width: 100, borderRadius: 50 }}></Image>
                        <View style={{ flexDirection: 'column', marginLeft: 40, marginBottom: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#fff', }}>{detail.full_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Locations />
                                {
                                    detail.nama_shelter === '' | detail.nama_shelter === 'null' | detail.nama_shelter === null ?
                                        <Text style={style.labelkanan}>Belum Memasukan/Tidak Ada Shelter</Text>
                                        :
                                        <Text style={{ color: '#fff', fontSize: 10, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{detail.nama_shelter}</Text>
                                }
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Gender style={{ marginRight: 4 }} />
                                <Text style={{ color: '#fff', }}>{detail.jenis_kelamin}</Text>
                            </View>
                        </View>
                    </View>


                </View>

                {this.state.det.length === 0 ?
                    <View>
                        <Text style={[style.labelkiri, { textAlign: 'center', width: '100%' }]}>TIDAK ADA DATA KEHADIRAN ANAK</Text>
                    </View>
                    :
                    <View horizontal={true}>
                        <Text style={style.labelkiri}>Laporan Kehadiran Anak</Text>
                        <BarChart
                            data={chartData}
                            width={Dimensions.get("window").width * 1}
                            height={220}
                            chartConfig={{
                                paddingRight: 0,
                                paddingTop: 0,
                                backgroundGradientFrom: '#fff',
                                backgroundGradientFromOpacity: 1,
                                backgroundGradientTo: '#fff',
                                backgroundGradientToOpacity: 1,
                                horizontalOffset: 0,
                                fillShadowGradientFromOpacity: 1,
                                fillShadowGradientToOpacity: 1,
                                fillShadowGradientOpacity: 1,
                                fillShadowGradientTo: '#00BFFF',
                                fillShadowGradientFrom: '#1E90FF',
                                fillShadowGradientFromOffset: 0.1,
                                fillShadowGradientToOffset: 0.7,
                                color: (opacity = 1) => `#023047`,
                                labelColor: (opacity = 1) => `#333`,
                                strokeWidth: 2,
                                useShadowColorFromDataset: false,
                                decimalPlaces: 0,

                            }}
                            style={{
                                paddingRight: 0,
                                paddingLeft: 0,
                                paddingBottom: 0,
                                alignItems: 'center',
                                alignSelf: 'center'

                            }}
                            showValuesOnTopOfBars={true}
                            fromZero
                            withHorizontalLabels={false}
                            withVerticalLabels={true}
                            xLabelsOffset={0}
                            showBarTops={false}
                            yLabelsOffset={0}
                            withInnerLines={false}
                            yAxisLabel={''}
                            xAxisLabel={''}
                            valueOnTopOfBarOffsetY={-3}
                            yAxisSuffix=""
                        />
                    </View>
                }
                <View style={{ width: '90%', height: 1, backgroundColor: '#c0c0c0', justifyContent: "center", alignSelf: 'center' }}></View>
                <View horizontal={true}>
                    <Text style={style.labelkiri}>Laporan Keuangan</Text>
                    <BarChart
                        data={chartduit}
                        width={Dimensions.get("window").width * 1}
                        height={220}
                        chartConfig={{
                            paddingRight: 0,
                            paddingTop: 0,
                            backgroundGradientFrom: '#fff',
                            backgroundGradientFromOpacity: 1,
                            backgroundGradientTo: '#fff',
                            backgroundGradientToOpacity: 1,
                            horizontalOffset: 0,
                            fillShadowGradientFromOpacity: 1,
                            fillShadowGradientToOpacity: 1,
                            fillShadowGradientOpacity: 1,
                            fillShadowGradientTo: '#00BFFF',
                            fillShadowGradientFrom: '#1E90FF',
                            fillShadowGradientFromOffset: 0.1,
                            fillShadowGradientToOffset: 0.7,
                            color: (opacity = 1) => `#023047`,
                            labelColor: (opacity = 1) => `#333`,
                            strokeWidth: 2,
                            useShadowColorFromDataset: false,
                            decimalPlaces: 0,

                        }}
                        style={{
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 0,
                            marginLeft: 0,

                        }}
                        showValuesOnTopOfBars={true}
                        fromZero
                        withHorizontalLabels={false}
                        withVerticalLabels={true}
                        xLabelsOffset={0}
                        showBarTops={false}
                        yLabelsOffset={0}
                        withInnerLines={false}
                        yAxisLabel={''}
                        xAxisLabel={""}
                        valueOnTopOfBarOffsetY={-3}
                        yAxisSuffix=""
                    />
                </View>
                <View style={{ width: '90%', height: 1, backgroundColor: '#c0c0c0', justifyContent: "center", alignSelf: 'center' }}></View>

            </View>
        )
    }
}
const style = StyleSheet.create({
    itemflat: {
        flex: 1,
        fontSize: 12,
        marginLeft: 10,
        paddingRight: 30,
        backgroundColor: '#fff',
        color: '#000',
        marginVertical: 10,
        marginHorizontal: 16,
        shadowColor: '#858585',
        overflow: 'hidden',
        shadowRadius: 15,
        elevation: 6,
        shadowOpacity: '25%',
        borderColor: '#7e7e7e',
        borderRadius: 15,
    },
    form: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        width: '100%'
    },
    labelkiri: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 20,
        width: 100,
    },
    labelkanan: {
        fontSize: 12,
        marginHorizontal: 5,
        width: 150,
        color: '#fff'
    },
});

export default DetailKehadiran
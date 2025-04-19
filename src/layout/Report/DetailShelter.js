import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { LocationsH, Orangbanyakhitam, FilterdanText, OrangPutih, Sekolah } from '../../assets/icons'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export class DetailShelter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laporan: [],
            lapfilter: [],
            pilih: '',
            detail: this.props.route.params.item,
        };
    }
    GetLaporanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/aktivitasshelter/' + this.state.detail.id_shelter).then(res => {
            if (res.status === 200)
                return res.json()
        }).then((resdata) => {
            console.log('ini resdata get', resdata);
            const length = resdata.data.length;
            if (length > 0) {
                this.setState({
                    laporan: resdata.data,

                });
            } else {
                this.setState({
                    laporan: resdata.data,
                });
            }
        })
    }

    GetfillaporanAPi() {
        fetch('https://kilauindonesia.org/datakilau/api/filteraktifitas/' + this.state.detail.id_shelter).then(res => {
            if (res.status === 200)
                return res.json()
        }).then((resdata) => {
            console.log('ini resdata get', resdata);
            const length = resdata.data.length;
            if (length > 0) {
                this.setState({
                    lapfilter: resdata.data,

                });
            } else {
                this.setState({
                    lapfilter: resdata.data,
                });
            }
        })
    }
    componentDidMount() {
        this.GetLaporanAPi();
        this.GetfillaporanAPi();
    }

    render() {
        const detail = this.state.detail
        const labels = this.state.laporan.map(item => {
            return item.Tahun;
        });

        const values = this.state.laporan.map(item => {
            return item.jumlah;
        });

        const chartData = {
            labels,
            datasets: [
                {
                    data: values,
                },
            ],
        };


        const labfil = this.state.lapfilter.filter(item =>
            item.jenis_kegiatan === this.state.pilih).map(item => {
                return moment(item.Tahun).format('YYYY-MM')
            });

        const datafil = this.state.lapfilter.filter(item =>
            item.jenis_kegiatan === this.state.pilih).map(item => {
                return item.jumlah
            });


        const fildata = {
            labels: labfil,
            datasets: [
                {
                    data: datafil,
                },
            ],
        };
        const filkeg =
            this.state.lapfilter.filter((item, index) => {
                return this.state.lapfilter.findIndex(i => i.jenis_kegiatan === item.jenis_kegiatan) === index;
            })
        return (
            <View style={{ height: '100%', backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#0EBEDF', height: '15%', }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', marginTop: 10 }}>Detail Shelter</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: '7%' }}>
                        <View style={{ flexDirection: 'column', marginVertical: 10, marginBottom: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Sekolah />
                                <Text style={{ color: '#fff', marginTop: 4, marginLeft: 5 }}>{detail.nama_shelter}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <OrangPutih />
                                <Text style={{ color: '#fff', marginTop: 4, marginLeft: 5 }}>{detail.nama_koordinator}</Text>
                            </View>

                            {/* <View style={{ flexDirection: 'row', marginTop: 5 }}>
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
                            </View> */}
                        </View>
                    </View>
                </View>
                <View style={style.form}>
                    <Text style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        marginVertical: 5,
                        marginLeft: 20,
                        width: 200,
                    }}>Pilih Kegiatan yang Ingin di Tampilkan</Text>
                    <View style={style.kotakpicker}>
                        <Picker style={style.Textinputcss}
                            selectedValue={this.state.pilih}
                            onValueChange={(itemValue) => this.setState({ pilih: itemValue, show: 1 })}
                        >
                            <Picker.Item style={{ fontSize: 12 }} label={'Pilih Kegiatan'} value={'0'} key={'0'} />
                            {
                                filkeg.map((keg, index) =>
                                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={keg.jenis_kegiatan} value={keg.jenis_kegiatan} key={index} />
                                )}
                        </Picker>
                    </View>
                </View>

                {this.state.pilih === '' ?
                    <View>
                    </View> : this.state.lapfilter.length === 0 ?
                        <View>
                            <Text>Data Yang di filter Tidak ada</Text>
                        </View> :
                        <ScrollView horizontal={true}>
                            <Text style={style.labelkiri}>Grafik Aktifitas Shelter</Text>
                            <BarChart
                                data={fildata}
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
                        </ScrollView>
                }
                <View horizontal={true}>
                    <Text style={style.labelkiri}>Grafik Semua Aktifitas Shelter</Text>

                    <BarChart
                        data={chartData}
                        width={Dimensions.get("window").width}
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
                            alignSelf: 'center',


                        }}
                        showValuesOnTopOfBars={true}
                        fromZero
                        withHorizontalLabels={true}
                        withVerticalLabels={true}
                        xLabelsOffset={0}
                        showBarTops={true}
                        yLabelsOffset={0}
                        withInnerLines={false}
                        yAxisLabel={''}
                        xAxisLabel={''}
                        valueOnTopOfBarOffsetY={-3}
                        yAxisSuffix=""
                    />


                </View>

            </View>
        )

    }
}

const style = StyleSheet.create({
    form: {
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
    Textinputcss: {
        width: windowWidth - 50,
        color: '#C0C0C0',
        marginTop: -10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        height: 40,
        borderColor: '#C0C0C0',
        fontFamily: 'Poppins-Regular',
    },
    kotakpicker: {
        marginTop: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDD',
        width: windowWidth * 0.9,
        height: 40,
    },
});
export default DetailShelter
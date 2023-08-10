import {useTransaction} from '../../entity/hook/useTransaction';
import React, {useMemo} from 'react';
import {Text} from 'react-native-ui-lib';
import {LineChart} from 'react-native-charts-wrapper';
import {Dimensions, View, StyleSheet} from 'react-native';

const AnalyticsScreen = () => {
  const {getTransactions} = useTransaction();
  const {data, isLoading, refetch} = getTransactions;

  const chartData = useMemo(() => {
    const array = [];
    return data.data.map(item => {
      // array.push(item.amount);
    }, []);
  }, [data.data]);

  return (
    <View style={{flex: 1, width: Dimensions.get('screen').width, padding: 10}}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={{
            dataSets: [
              {label: 'month', values: [{amount: 1}, {amount: 2}, {amount: 1}]},
            ],
          }}
        />
      </View>
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

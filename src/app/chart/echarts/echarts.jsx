var echarts = require('echarts');

echarts.dataTool = {
    version: '1.0.0',
    gexf: require('./dataTool/gexf'),
    prepareBoxplotData: require('./dataTool/prepareBoxplotData')
};



module.exports = echarts;
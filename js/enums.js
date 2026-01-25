export const TrainLine = Object.freeze({
    EAL: {
        lineCode: 'EAL',
        lineColor: '#53B7E8',
        enName: 'East Rail Line',
        zhName: '東鐵綫'
    },
    AEL: {
        lineCode: 'AEL',
        lineColor: '#00888A',
        enName: 'Airport Express',
        zhName: '機場快綫'
    },
    TCL: {
        lineCode: 'TCL',
        lineColor: '#F7943E',
        enName: 'Tung Chung Line',
        zhName: '東涌綫'
    },
    ISL: {
        lineCode: 'ISL',
        lineColor: '#007DC5',
        enName: 'Island Line',
        zhName: '港島綫'
    },
    TKL: {
        lineCode: 'TKL',
        lineColor: '#7D499D',
        enName: 'Tseung Kwan O Line',
        zhName: '將軍澳綫'
    },
    SIL: {
        lineCode: 'SIL',
        lineColor: '#99cf16',
        enName: 'South Island Line',
        zhName: '南港島綫'
    },
    TWL: {
        lineCode: 'TWL',
        lineColor: '#E2231A',
        enName: 'Tsuen Wan Line',
        zhName: '荃灣綫'
    },
    // Helper methods
    fromCode(code) {
        return Object.values(this).find(line => 
            line.lineCode === code && typeof line === 'object'
        );
    },

    isValidCode(code) {
        return this.fromCode(code) !== undefined;
    }
}); 
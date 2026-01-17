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
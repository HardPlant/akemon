const idol_idx = jest.genMockFromModule('idol_idx');

const idxTable = {
    0: {
        BaseName: "missingno",
        BaseHP: 1,
        BaseATK: 1,
        BaseSPE: 1,
        BaseDEF: 1,
        BaseSDF: 1,
        BaseSPD: 1,
    }
}

function getBaseByIdx(idx) {
    return Object.clone(idxTable[idx]);
}

idol_idx.getBaseByIdx = getBaseByIdx;
module.exports = idol_idx;
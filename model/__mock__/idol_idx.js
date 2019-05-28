const idol_idx = jest.genMockFromModule('idol_idx');

const idxTable = {
    1: {
        name: "missingno",
        HP: 1,
        ATK: 1,
        SPE: 1,
        DEF: 1,
        SDF: 1,
        SPD: 1,
    }
}

function getBaseByIdx(idx) {
    return idxTable[idx];
}

idol_idx.getBaseByIdx = getBaseByIdx;
module.exports = idol_idx;
/**
 * Calculate relative X, on Document level
 * @param {Number} relativeX 0~100
 */
function relativeWidth(relativeX) {
    if (!(0 < relativeX && relativeX < 100)) {
        console.error("[relativeWidth] Assertion Failed");
    }
    return (0.01* relativeX) * document.documentElement.clientWidth;
}
/**
 * Calculate relative Y, on Document level
 * @param {Number} relativeY 0~100 
 */
function relativeHeight(relativeY) {
    if (!(0 < relativeY && relativeY < 100)) {
        console.error("[relativeHeight] Assertion Failed");
    }
    return (0.01*relativeY) * document.documentElement.clientHeight;
}

/**
 * Calculate relative X, on RpgMaker MV Windows Object
 * @param {Number} relativeX 0~100
 * @param {Windows_Base} component Windows_Base Object
 */
function relativeWidth(relativeX, component) {
    if (!(0 < relativeX && relativeX < 100)) {
        console.error("[relativeWidth] Assertion Failed");
    }
    return (0.01* relativeX) * component.contentsWidth();
}
/**
 * Calculate relative X, on RpgMaker MV Windows Object
 * @param {Number} relativeY 0~100 
 * @param {Windows_Base} component Windows_Base Object
 */
function relativeHeight(relativeY, component) {
    if (!(0 < relativeY && relativeY < 100)) {
        console.error("[relativeHeight] Assertion Failed");
    }
    return (0.01*relativeY) * component.contentsHeight();
}

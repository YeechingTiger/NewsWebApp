import actionConstants from "../../global/constants/actionConstants";
function global(state = {}, action) {
    // console.log(action);
    switch (action.type) {
        case actionConstants.GLOBAL_MASK_TOGGLE:
            return Object.assign({}, state, {
                mask: action.data
            })
        default:
            return state;
    }
}
export default global;
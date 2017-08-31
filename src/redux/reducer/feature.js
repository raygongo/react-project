import {
    TOGGLE_TOP_BAR,
    REFRESH
} from '../action'

/**
 * featureBox中的数据操作
 * @param {obj} state 
 * @param {obj} action 
 */

const defaultlState = {
    openTopBar: false,
}

export const feature = (state, action) => {
    switch (action.type) {
        case TOGGLE_TOP_BAR:
            return {
                ...state,
                openTopBar:action.status
            }
    }
}
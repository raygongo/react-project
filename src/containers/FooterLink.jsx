import {connect} from 'react-redux'
import Link from '@/components/Link'
import {setVisibility} from '@/actions'


const mapStateToProps = (state, ownProps) => {

    return {
        active : ownProps.filter === state.visibilityFilter
    }
}

const mapDispachToProps = (dispatch, ownProps) => {

    return {
        onClick: () => {
            dispatch(setVisibility(ownProps.filter))
        }
    }
}

const FooterLink = connect(
    mapStateToProps,
    mapDispachToProps,
)(Link)

export default FooterLink
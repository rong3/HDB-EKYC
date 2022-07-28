import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import { InputControl } from "../../input/inputControl"

const filterStyles = theme => ({
    root: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: 20,
    },
});

function FilterInputCustom(props) {
    const { classes } = props;
    const { item, applyValue } = props;
    const handleFilterChange = (event) => {
        applyValue({ ...item, value: event.target.value });
    };

    return (
        <div className={classes.root}>
            <InputControl
                type="text"
                name="custom-rating-filter-operator"
                defaultValue={item.value}
                onChange={handleFilterChange}
            />
        </div>
    );
}

FilterInputCustom.propTypes = {
    applyValue: PropTypes.func.isRequired,
    item: PropTypes.shape({
        columnField: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        operatorValue: PropTypes.string,
        value: PropTypes.any,
    }).isRequired,
};

export default withStyles(filterStyles)(FilterInputCustom)
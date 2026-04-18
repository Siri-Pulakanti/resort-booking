import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

const DateSelector = (props) => {
  let {
    checkinDate,
    checkoutDate,
    totalDays,
    onCheckInChange,
    onCheckoutChange,
    invalidRange,
  } = props;
  return (
    <div>
      <h2>Date Range</h2>
      <DatePicker selected={checkinDate} onChange={onCheckInChange} />
      <DatePicker selected={checkoutDate} onChange={onCheckoutChange} />
      <span>{totalDays} Nights</span>
      {invalidRange && <p>Invalid Range</p>}
    </div>
  );
};

DateSelector.PropsTypes = {
  checkinDate: PropTypes.instanceOf(Date).isRequired,
  checkoutDate: PropTypes.instanceOf(Date).isRequired,
  onCheckInChange: PropTypes.func.isRequired,
  onCheckoutChange: PropTypes.func.isRequired,
  totalDays: PropTypes.number.isRequired,
};

export default DateSelector;

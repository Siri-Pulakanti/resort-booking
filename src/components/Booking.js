import { Component } from "react";

const _MS_PER_DAY = 24 * 60 * 60 * 1000;
function dataDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

class Booking extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const checkout = new Date();
    checkout.setDate(today.getDate() + 1);
    this.state = {
      checkinDate: today,
      checkoutDate: checkout,
      occupants: 1,
      roomType: "Standard",
    };
  }
  static getDerivedStateFromProps(props, state) {
    const totalDays = dataDiffInDays(state.checkinDate, state.checkoutDate);
    const invalidRange = totalDays <= 0 || totalDays >= 20;
    return {
      totalDays,
      invalidRange,
    };
  }
  onCheckInChange = (checkinDate) => {
    this.setState({
      checkinDate,
    });
  };
  onCheckoutChange = (checkoutDate) => {
    this.setState({
      checkout,
    });
  };
  onOccupantsChange = (occupants) => {
    this.setState({
      occupants,
    });
  };
  onRoomTypeChange = (roomType) => {
    this.setState(roomType);
  };

  render() {
    return (
      <div>
        <h2>Booking</h2>
        <DateSelector
          checkinDate={this.state.checkinDate}
          checkoutDate={this.state.checkoutDate}
          totalDays={this.state.totalDays}
          invalidRange={this.state.invalidRange}
          onCheckInChange={this.onCheckInChange}
          onCheckoutChange={this.onCheckoutChange}
        />
        <RoomDetails
          occupants={this.state.occupants}
          roomType={this.state.roomType}
          onRoomTypeChange={this.state.onRoomTypeChange}
          onOccupantsChange={this.onOccupantsChange}
        />
        {!this.state.invalidRange && (
          <Billing
            roomType={this.state.roomType}
            totalDays={this.state.totalDays}
            occupants={this.state.occupants}
          />
        )}
      </div>
    );
  }
}

export default Booking;

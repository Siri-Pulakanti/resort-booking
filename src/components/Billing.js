import { Component } from "react";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCharge: 0,
      occupantCharges: 0,
      totalRoomCharges: 0,
      totalRoomOccupantCharges: 0,
      discount: 0,
      grandTotal: 0,
      afterTax: 0,
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { roomType, totalDays, occupants } = props;
    const roomCharge = roomType == "Standard" ? 2000 : 4000;
    const occupantCharges = occupants == 1 ? 0 : (occupants - 1) * 200;
    const totalRoomCharges = totalDays * roomCharge;
    const totalOccupantsCharges = totalDays * occupantCharges;

    const discount = totalDays >= 5 ? 15 : 0;
    const grandTotal = Math.ceil(
      totalRoomCharges - (totalRoomCharges - discount) / 100.0,
    );
    const afterTax = (totalOccupantsCharges + grandTotal) * 1.18;
    return {
      roomCharge,
      occupantCharges,
      totalRoomCharges,
      totalOccupantsCharges,
      discount,
      grandTotal,
      afterTax,
    };
  }
  render() {
    return (
      <div>
        <h2>Billing</h2>
        <table>
          <tbody>
            <tr>
              <td>Room Charges</td>
              <td>{this.state.roomCharge}INR</td>
            </tr>
            <tr>
              <td>Nights</td>
              <td>{this.props.totalDays}</td>
            </tr>
            <tr>
              <td>Total RoomCharges</td>
              <td>{this.state.totalRoomCharges}INR</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{this.state.discount}</td>
            </tr>
            <tr>
              <td>Grand Total with Discount</td>
              <td>{this.state.totalRoomCharges}</td>
            </tr>
            <tr>
              <td>Occupants</td>
              <td>{this.props.occupants}</td>
            </tr>
            <tr>
              <td>Occupants Charges</td>
              <td>{this.state.occupantCharges}INR per Day</td>
            </tr>
            <tr>
              <td>Total Occupant Charges</td>
              <td>{this.state.totalRoomOccupantCharges}</td>
            </tr>
            <tr>
              <td>After Taxes</td>
              <td>{this.state.afterTax}INR</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Billing;

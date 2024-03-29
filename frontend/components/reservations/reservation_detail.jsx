import React from 'react';
import { Link } from 'react-router-dom';

class ReservationDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            restaurant_id: this.props.reservation.restaurant_id,
            date: this.props.reservation.prefill_date,
            time: this.props.reservation.starts_at_time,
            num_guests: this.props.reservation.num_guests
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        
        return e => {
            this.setState({[field]:e.currentTarget.value})
        }
    }

    handleSubmit() {
        let dateTime = `${this.state.date}` + ` ` + `${this.state.time}`

        this.props.updateReservation({
            id: this.props.reservation.id,
            starts_at: dateTime,
            num_guests: this.state.num_guests
        })
    };



    render() {

        const timeOptions = ["12:00 PM", "12:30PM"];
        let time;
        for (let i = 1; i < 12; i++) {
            for (let j = 0; j < 2; j++) {
                time = "";
                time = time.concat(`${i}`)

                if (j === 0) {
                    time = time.concat(":00 PM")
                } else {
                    time = time.concat(":30 PM")
                }
                
                timeOptions.push(time)
            }
        }

        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1);
        const day = today.getDate();
        const minDate = `${year}-${month}-${day}`

        return (
          <div>
            <Link to={`/restaurants/${this.props.reservation.restaurant_id}`}>
              <div className="user-profile-restaurant-name">
                {this.props.reservation.restaurant_name}
              </div>
            </Link>
            <div className="user-profile-tabitem-overview">
              <div className="user-profile-tabitem-overview-sections">
                <div className="user-profile-res-partyof">
                  {this.props.user.name}, party of:{" "}
                  {this.props.reservation.num_guests}
                </div>
                <div className="user-profile-res-contact">
                  Retaurant contact info:
                </div>
                <div className="user-profile-res-contact">
                  {this.props.reservation.restaurant_phone}
                </div>
                <div className="user-profile-res-contact">
                  {this.props.reservation.restaurant_address}
                </div>
                <div className="user-profile-res-contact">
                  {this.props.reservation.restaurant_neighborhood}
                </div>
              </div>
              <div className="reservation-info-box">
                <div className="user-profile-reservation-date">
                  <div>Reservation:</div>
                  <div>{this.props.reservation.starts_at_date}</div>
                  <div>{this.props.reservation.starts_at_time}</div>
                </div>
                <div>
                  <ul className="create-reservation-errors">
                    {this.props.errors.map((error, i) => {
                      return <li key={i}>{error}</li>;
                    })}
                  </ul>
                </div>
              </div>

              <div className="update-res-form">
                <form onSubmit={this.handleSubmit}>
                  <input
                    className="update-party-size"
                    type="number"
                    onChange={this.update("num_guests")}
                    value={this.state.num_guests}
                    min="1"
                    max="12"
                  />

                  <input
                    className="update-res-date"
                    value={this.state.date}
                    onChange={this.update("date")}
                    type="date"
                    min={minDate}
                  />

                  <select
                    className="update-time"
                    value={this.state.time.value}
                    onChange={this.update("time")}
                  >
                    <option value="">{this.state.time}</option>
                    {timeOptions.map((el, i) => {
                      return (
                        <option key={i} value={el}>
                          {el}
                        </option>
                      );
                    })}
                  </select>

                  <input
                    className="submit-update"
                    type="submit"
                    value="Update reservation"
                  />
                </form>
                <button
                  className="delete-reservation"
                  onClick={() =>
                    this.props.deleteReservation(this.props.reservation.id)
                  }
                >
                  Delete Reservation
                </button>
              </div>
            </div>
          </div>
        );
    }
}


export default ReservationDetail;

